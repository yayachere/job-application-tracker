-- Create applications table
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  company text not null,
  role text not null,
  platform text not null,
  status text not null check (status in ('applied', 'interviewing', 'rejected', 'offer', 'accepted')),
  date_applied date not null,
  notes text,
  salary text,
  location text,
  application_link text,
  resume_version text,
  follow_up_date date,
  needs_follow_up boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.applications enable row level security;

-- Create RLS policies for applications
create policy "applications_select_own" on public.applications for select using (auth.uid() = user_id);
create policy "applications_insert_own" on public.applications for insert with check (auth.uid() = user_id);
create policy "applications_update_own" on public.applications for update using (auth.uid() = user_id);
create policy "applications_delete_own" on public.applications for delete using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists applications_user_id_idx on public.applications(user_id);
create index if not exists applications_status_idx on public.applications(status);
create index if not exists applications_date_applied_idx on public.applications(date_applied);
