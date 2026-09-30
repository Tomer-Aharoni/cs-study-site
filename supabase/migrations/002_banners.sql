-- מאפשר סוג תוכן banner. כתיבה נשארת רק למנהל דרך המדיניות הקיימת.

do $$
declare
  cname text;
begin
  select con.conname into cname
  from pg_constraint con
  where con.conrelid = 'public.content_items'::regclass
    and con.contype = 'c'
    and pg_get_constraintdef(con.oid) ilike '%kind in%';
  if cname is not null then
    execute format('alter table public.content_items drop constraint %I', cname);
  end if;
end $$;

alter table public.content_items
  add constraint content_items_kind_check check (kind in (
    'course', 'unit_meta', 'section', 'summary_unit', 'summary_part',
    'card', 'quiz', 'exam_meta', 'exam_question', 'banner'
  ));
