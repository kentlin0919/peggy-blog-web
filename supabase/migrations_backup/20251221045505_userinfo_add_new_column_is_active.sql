alter table public.user_info
add column is_active boolean not null default true,
add column disabled_at timestamptz,
add column disabled_reason text;
