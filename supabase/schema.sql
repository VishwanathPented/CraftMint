-- Craftmint LLP — Supabase schema
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
--
-- Each collection is stored as a simple document table (id + jsonb payload).
-- This mirrors the shape lib/store.ts already used for the local JSON files,
-- so the application code didn't need to change per-field — only lib/store.ts
-- and lib/supabase.ts did.

create table if not exists leads (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists sample_requests (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists resources (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists articles (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now()
);

alter table leads enable row level security;
alter table sample_requests enable row level security;
alter table projects enable row level security;
alter table resources enable row level security;
alter table articles enable row level security;

-- No policies are added: the app only ever talks to these tables using the
-- Supabase service role key from server-side API routes, which bypasses RLS.
-- Row Level Security is enabled purely so the tables aren't publicly
-- readable/writable if the anon key were ever used against them.

-- Public storage bucket for project/finish images uploaded via the admin
-- dashboard (replaces the old /public/uploads/projects local-disk storage).
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;
