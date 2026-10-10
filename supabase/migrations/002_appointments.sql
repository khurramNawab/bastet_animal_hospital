-- Migration: 002_appointments.sql
-- Description: Create appointments table for appointment booking requests with RLS enabled

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  request_code text unique not null,
  owner_name text not null,
  phone text not null,
  email text,
  animal text not null default 'dog',
  pet_name text not null,
  breed text,
  pet_age text,
  service text not null,
  doctor text default 'no-preference',
  appointment_date date not null,
  appointment_time time not null,
  message text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  consent boolean not null default true,
  created_at timestamptz not null default now()
);

-- Index for fast slot capacity queries and duplicate checking
create index if not exists idx_appointments_slot 
  on public.appointments (appointment_date, appointment_time);

-- Index for lookup by short request code
create index if not exists idx_appointments_code 
  on public.appointments (request_code);

-- Index for staff triage and status management
create index if not exists idx_appointments_status 
  on public.appointments (status);

-- Enable Row Level Security (RLS)
alter table public.appointments enable row level security;

-- Strictly deny public anonymous access. Only server-side Service Role key can read/write appointments.
revoke all on public.appointments from anon, authenticated;
grant all on public.appointments to service_role;
