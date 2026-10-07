-- Giro · CP5 — esquema do banco de dados no Supabase
-- Como aplicar: Supabase Dashboard → SQL Editor → New query → cole este
-- arquivo inteiro → Run. O script pode ser executado mais de uma vez.

-- Estoque de produtos por estabelecimento.
create table if not exists public.giro_products (
  id text not null,
  owner_id text not null,
  name text not null,
  category text not null,
  quantity integer not null default 0,
  expiry date not null,
  icon text,
  created_at timestamptz not null default now(),
  primary key (owner_id, id)
);

-- Histórico de ações (oferta, doação, descarte).
create table if not exists public.giro_history (
  id text not null,
  owner_id text not null,
  product text not null,
  action text not null,
  date_label text not null,
  icon text,
  tone text,
  created_at timestamptz not null default now(),
  primary key (owner_id, id)
);

-- Perfil do estabelecimento, preferências e uso do plano.
create table if not exists public.giro_state (
  owner_id text primary key,
  profile jsonb not null default '{}'::jsonb,
  alerts_enabled boolean not null default true,
  dark_mode boolean not null default false,
  large_text boolean not null default false,
  plan text not null default 'free',
  usage jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Row Level Security ativado em todas as tabelas.
alter table public.giro_products enable row level security;
alter table public.giro_history enable row level security;
alter table public.giro_state enable row level security;

-- Versão acadêmica: o app autentica localmente (sem Supabase Auth), então as
-- políticas permitem acesso via chave pública, com as linhas separadas por
-- owner_id no nível da aplicação.
-- Para produção: migrar para Supabase Auth e restringir com
--   using (owner_id = auth.uid()::text) / with check (owner_id = auth.uid()::text)

drop policy if exists "giro_products_academico" on public.giro_products;
create policy "giro_products_academico" on public.giro_products
  for all to anon, authenticated using (true) with check (true);

drop policy if exists "giro_history_academico" on public.giro_history;
create policy "giro_history_academico" on public.giro_history
  for all to anon, authenticated using (true) with check (true);

drop policy if exists "giro_state_academico" on public.giro_state;
create policy "giro_state_academico" on public.giro_state
  for all to anon, authenticated using (true) with check (true);

grant select, insert, update, delete on public.giro_products to anon, authenticated;
grant select, insert, update, delete on public.giro_history to anon, authenticated;
grant select, insert, update, delete on public.giro_state to anon, authenticated;
