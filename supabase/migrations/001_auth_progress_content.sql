-- חשבונות, מעקב לימוד ותוכן לעריכה.
-- מפתח service_role לא נכנס לאתר. ההגנה היא RLS, לא הסתרת מפתח anon.
-- את הקובץ מריצים ב-SQL Editor של Supabase (או ב-CLI). תפקיד admin נקבע אחר כך ידנית.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null default '',
  display_name text not null default '',
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now(),
  constraint profiles_email_len check (char_length(email) <= 320),
  constraint profiles_name_len check (char_length(display_name) <= 200)
);

create table if not exists public.content_items (
  id text primary key,
  kind text not null check (kind in (
    'course', 'unit_meta', 'section', 'summary_unit', 'summary_part',
    'card', 'quiz', 'exam_meta', 'exam_question'
  )),
  unit_id text,
  sort integer not null default 0,
  title text not null default '',
  html text,
  body jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id),
  constraint content_id_len check (char_length(id) between 1 and 200),
  constraint content_title_len check (char_length(title) <= 500),
  constraint content_html_len check (html is null or char_length(html) <= 200000),
  constraint content_body_len check (octet_length(body::text) <= 200000)
);

create index if not exists content_items_kind_unit on public.content_items (kind, unit_id);

create table if not exists public.learner_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  seen text[] not null default '{}',
  resume jsonb,
  updated_at timestamptz not null default now(),
  constraint learner_seen_size check (cardinality(seen) <= 50),
  constraint learner_resume_len check (resume is null or octet_length(resume::text) <= 2000)
);

create table if not exists public.practice_status (
  user_id uuid not null references auth.users (id) on delete cascade,
  item_id text not null,
  kind text not null check (kind in ('quiz', 'exam', 'lab')),
  outcome text not null check (outcome in ('correct', 'struggling', 'completed')),
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id),
  constraint practice_item_len check (char_length(item_id) between 1 and 160)
);

create index if not exists practice_status_user on public.practice_status (user_id);

create table if not exists public.bookmarks (
  user_id uuid not null references auth.users (id) on delete cascade,
  part_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, part_id),
  constraint bookmark_part_len check (char_length(part_id) between 1 and 160)
);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  admin_id uuid not null references auth.users (id),
  action text not null check (action in ('reset_progress', 'edit_content', 'import_content')),
  target_user_id uuid,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint audit_detail_len check (octet_length(detail::text) <= 4000)
);

create index if not exists audit_log_created on public.audit_log (created_at desc);

alter table public.profiles enable row level security;
alter table public.content_items enable row level security;
alter table public.learner_state enable row level security;
alter table public.practice_status enable row level security;
alter table public.bookmarks enable row level security;
alter table public.audit_log enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.protect_profile_role()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.role is distinct from old.role
     or new.email is distinct from old.email
     or new.id is distinct from old.id
     or new.created_at is distinct from old.created_at then
    if auth.role() = 'authenticated' or auth.role() = 'anon' then
      raise exception 'profile is locked';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_lock on public.profiles;
create trigger profiles_lock
  before update on public.profiles
  for each row execute function public.protect_profile_role();

create or replace function public.reject_dangerous_html()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  blob text;
begin
  blob := coalesce(new.html, '') || ' ' || coalesce(new.title, '') || ' ' || coalesce(new.body::text, '');
  if blob ~* '<\s*script'
     or blob ~* '<\s*/\s*script'
     or blob ~* '<\s*iframe'
     or blob ~* '<\s*object'
     or blob ~* '<\s*embed'
     or blob ~* '<\s*link'
     or blob ~* '<\s*meta'
     or blob ~* '<\s*style'
     or blob ~* 'javascript\s*:'
     or blob ~* 'data\s*:\s*text/html'
     or blob ~* '\son[a-z]+\s*='
  then
    raise exception 'html rejected';
  end if;
  new.updated_at := now();
  if auth.uid() is not null then
    new.updated_by := auth.uid();
  end if;
  return new;
end;
$$;

drop trigger if exists content_items_guard on public.content_items;
create trigger content_items_guard
  before insert or update on public.content_items
  for each row execute function public.reject_dangerous_html();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists learner_state_touch on public.learner_state;
create trigger learner_state_touch
  before update on public.learner_state
  for each row execute function public.touch_updated_at();

drop trigger if exists practice_status_touch on public.practice_status;
create trigger practice_status_touch
  before update on public.practice_status
  for each row execute function public.touch_updated_at();

revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.protect_profile_role() from public, anon, authenticated;
revoke all on function public.reject_dangerous_html() from public, anon, authenticated;
revoke all on function public.touch_updated_at() from public, anon, authenticated;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists content_select on public.content_items;
create policy content_select on public.content_items
  for select to anon, authenticated
  using (true);

drop policy if exists content_insert on public.content_items;
create policy content_insert on public.content_items
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists content_update on public.content_items;
create policy content_update on public.content_items
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists content_delete on public.content_items;
create policy content_delete on public.content_items
  for delete to authenticated
  using (public.is_admin());

drop policy if exists learner_select on public.learner_state;
create policy learner_select on public.learner_state
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists learner_insert on public.learner_state;
create policy learner_insert on public.learner_state
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists learner_update on public.learner_state;
create policy learner_update on public.learner_state
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists learner_delete on public.learner_state;
create policy learner_delete on public.learner_state
  for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists practice_select on public.practice_status;
create policy practice_select on public.practice_status
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists practice_insert on public.practice_status;
create policy practice_insert on public.practice_status
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists practice_update on public.practice_status;
create policy practice_update on public.practice_status
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists practice_delete on public.practice_status;
create policy practice_delete on public.practice_status
  for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists bookmarks_select on public.bookmarks;
create policy bookmarks_select on public.bookmarks
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists bookmarks_insert on public.bookmarks;
create policy bookmarks_insert on public.bookmarks
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists bookmarks_delete on public.bookmarks;
create policy bookmarks_delete on public.bookmarks
  for delete to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists audit_select on public.audit_log;
create policy audit_select on public.audit_log
  for select to authenticated
  using (public.is_admin());

drop policy if exists audit_insert on public.audit_log;
create policy audit_insert on public.audit_log
  for insert to authenticated
  with check (public.is_admin() and admin_id = auth.uid());

grant select on public.content_items to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.learner_state to authenticated;
grant select, insert, update, delete on public.practice_status to authenticated;
grant select, insert, delete on public.bookmarks to authenticated;
grant select, insert, update, delete on public.content_items to authenticated;
grant select, insert on public.audit_log to authenticated;
grant usage, select on all sequences in schema public to authenticated;

-- אחרי שהחשבון של המנהל נוצר בהתחברות Google:
-- update public.profiles set role = 'admin' where email = 'you@gmail.com';
