-- Unique Tech Point — database schema
-- Run this in Supabase Dashboard → SQL Editor → New query → Run.
-- Categories & services live in code (constants.ts); the DB holds products,
-- product images, and customer enquiries.

-- ------------------------------------------------------------------ products
create table if not exists public.products (
  id                bigint generated always as identity primary key,
  title             text not null,
  slug              text not null unique,
  description       text,
  short_description text,
  price             numeric(12,2),
  price_label       text,
  category_slug     text not null,
  brand             text,
  images            text[] not null default '{}',
  in_stock          boolean not null default true,
  featured          boolean not null default false,
  specs             jsonb,
  meta_title        text,
  meta_description  text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  -- Full-text search over the key fields
  search_tsv        tsvector generated always as (
                      to_tsvector('simple',
                        coalesce(title,'') || ' ' ||
                        coalesce(brand,'') || ' ' ||
                        coalesce(short_description,'') || ' ' ||
                        coalesce(category_slug,''))
                    ) stored
);

create index if not exists products_category_slug_idx on public.products (category_slug);
create index if not exists products_brand_idx on public.products (brand);
create index if not exists products_featured_idx on public.products (featured) where featured = true;
create index if not exists products_search_idx on public.products using gin (search_tsv);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------- enquiries
create table if not exists public.enquiries (
  id          bigint generated always as identity primary key,
  name        text not null,
  phone       text not null,
  email       text,
  message     text,
  product_id  bigint references public.products (id) on delete set null,
  subject     text,
  source      text not null default 'general',
  status      text not null default 'new',
  created_at  timestamptz not null default now()
);

create index if not exists enquiries_status_created_idx
  on public.enquiries (status, created_at desc);

-- ----------------------------------------------------------------------- RLS
alter table public.products  enable row level security;
alter table public.enquiries enable row level security;

-- Products: anyone may read; writes go through the service-role client only.
drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products
  for select using (true);

-- Enquiries: anyone may submit (INSERT), but nobody may read via the anon key.
drop policy if exists enquiries_public_insert on public.enquiries;
create policy enquiries_public_insert on public.enquiries
  for insert with check (true);

-- --------------------------------------------------------------- storage bucket
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Public read for product images; writes handled by the service-role client.
drop policy if exists product_images_public_read on storage.objects;
create policy product_images_public_read on storage.objects
  for select using (bucket_id = 'product-images');
