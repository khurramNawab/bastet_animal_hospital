-- Migration: 001_waitlist.sql
-- Create waitlist table for multi-species expansion notifications

CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    name TEXT,
    phone TEXT,
    animal TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT waitlist_email_animal_unique UNIQUE (email, animal)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Note: No public insert/select policies are created.
-- All submissions are securely executed via server-side Service Role key.
