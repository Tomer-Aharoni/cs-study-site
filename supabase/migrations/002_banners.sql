-- מאפשר סוג תוכן banner. כתיבה נשארת רק למנהל דרך המדיניות הקיימת.
-- Postgres שומר את הבדיקה כ-ANY (ARRAY[...]), לא כ-IN, ולכן מוחקים לפי שם.

alter table public.content_items drop constraint if exists content_items_kind_check;

do $$
declare
  cname text;
begin
  for cname in
    select con.conname
    from pg_constraint con
    where con.conrelid = 'public.content_items'::regclass
      and con.contype = 'c'
      and pg_get_constraintdef(con.oid) ~* 'kind'
  loop
    execute format('alter table public.content_items drop constraint %I', cname);
  end loop;
end $$;

alter table public.content_items
  add constraint content_items_kind_check check (kind in (
    'course', 'unit_meta', 'section', 'summary_unit', 'summary_part',
    'card', 'quiz', 'exam_meta', 'exam_question', 'banner'
  ));
