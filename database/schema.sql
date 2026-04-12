-- ============================================================
-- Lobo VC Cup 2026 — Database Schema (v2)
-- Run this in the Supabase SQL editor (fresh project or after dropping old tables)
-- ============================================================

-- Enable UUID extension (usually already enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS (profile extension on top of Supabase Auth)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'founder' CHECK (role IN ('founder', 'vc', 'admin')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Automatically create a user profile row when someone signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TEAMS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.teams (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  pathway          TEXT NOT NULL CHECK (pathway IN ('startup', 'vc')),
  idea_description TEXT,
  key_contact_id   UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  is_eligible      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Only one team per key contact
CREATE UNIQUE INDEX IF NOT EXISTS teams_key_contact_idx ON public.teams(key_contact_id);

-- ============================================================
-- TEAM MEMBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.team_members (
  id       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id  UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  name     TEXT NOT NULL,
  email    TEXT NOT NULL
);

-- ============================================================
-- TASKS (admin-created assignments, like Canvas assignments)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tasks (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title              TEXT NOT NULL,
  description        TEXT,
  due_date           TIMESTAMPTZ,
  track              TEXT NOT NULL DEFAULT 'all' CHECK (track IN ('startup', 'vc', 'all')),
  requires_file      BOOLEAN NOT NULL DEFAULT TRUE,
  allowed_file_types TEXT[],          -- e.g. ARRAY['application/pdf', 'video/mp4']
  max_file_size_mb   INTEGER NOT NULL DEFAULT 50,
  storage_bucket     TEXT,            -- which Supabase Storage bucket to use
  sort_order         INTEGER NOT NULL DEFAULT 0,
  created_by         UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TASK SUBMISSIONS (replaces the old submissions table)
-- One submission per team per task (upsert pattern)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.task_submissions (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id      UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  team_id      UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  file_url     TEXT,
  file_name    TEXT,
  file_size    BIGINT,
  company_name TEXT,           -- for per-investment VC docs
  notes        TEXT,           -- optional text note alongside file
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (task_id, team_id)    -- one submission per team per task
);

-- ============================================================
-- UPDATED-AT TRIGGERS
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tasks_updated_at ON public.tasks;
CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS task_submissions_updated_at ON public.task_submissions;
CREATE TRIGGER task_submissions_updated_at
  BEFORE UPDATE ON public.task_submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.users           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_submissions ENABLE ROW LEVEL SECURITY;

-- Drop old submissions table policies if they exist from a previous schema run
DROP POLICY IF EXISTS "Teams can view their own submissions"   ON public.submissions;
DROP POLICY IF EXISTS "Teams can insert their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Teams can update their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admins can view all submissions"        ON public.submissions;

-- USERS policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
CREATE POLICY "Admins can view all users"
  ON public.users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- TEAMS policies
DROP POLICY IF EXISTS "Anyone authenticated can view teams" ON public.teams;
CREATE POLICY "Anyone authenticated can view teams"
  ON public.teams FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can create a team" ON public.teams;
CREATE POLICY "Authenticated users can create a team"
  ON public.teams FOR INSERT
  WITH CHECK (auth.uid() = key_contact_id);

DROP POLICY IF EXISTS "Key contact can update their team" ON public.teams;
CREATE POLICY "Key contact can update their team"
  ON public.teams FOR UPDATE
  USING (auth.uid() = key_contact_id);

DROP POLICY IF EXISTS "Admins can update any team" ON public.teams;
CREATE POLICY "Admins can update any team"
  ON public.teams FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- TEAM MEMBERS policies
DROP POLICY IF EXISTS "Anyone authenticated can view team members" ON public.team_members;
CREATE POLICY "Anyone authenticated can view team members"
  ON public.team_members FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Team key contact can manage members" ON public.team_members;
CREATE POLICY "Team key contact can manage members"
  ON public.team_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id AND t.key_contact_id = auth.uid()
    )
  );

-- TASKS policies
DROP POLICY IF EXISTS "Authenticated users can view tasks" ON public.tasks;
CREATE POLICY "Authenticated users can view tasks"
  ON public.tasks FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert tasks" ON public.tasks;
CREATE POLICY "Admins can insert tasks"
  ON public.tasks FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can update tasks" ON public.tasks;
CREATE POLICY "Admins can update tasks"
  ON public.tasks FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can delete tasks" ON public.tasks;
CREATE POLICY "Admins can delete tasks"
  ON public.tasks FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- TASK SUBMISSIONS policies
DROP POLICY IF EXISTS "Teams can view their own task submissions" ON public.task_submissions;
CREATE POLICY "Teams can view their own task submissions"
  ON public.task_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id AND t.key_contact_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Teams can insert their own task submissions" ON public.task_submissions;
CREATE POLICY "Teams can insert their own task submissions"
  ON public.task_submissions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id AND t.key_contact_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Teams can update their own task submissions" ON public.task_submissions;
CREATE POLICY "Teams can update their own task submissions"
  ON public.task_submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id AND t.key_contact_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can view all task submissions" ON public.task_submissions;
CREATE POLICY "Admins can view all task submissions"
  ON public.task_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admins can delete task submissions" ON public.task_submissions;
CREATE POLICY "Admins can delete task submissions"
  ON public.task_submissions FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ============================================================
-- STORAGE BUCKETS
-- Create these in the Supabase dashboard under Storage,
-- or via the Supabase CLI.
-- ============================================================
-- Bucket: task-submissions   (all tracks, private, 2 GB max per file)
--   This single bucket handles all task file uploads.
--   File naming: {team_id}/{task_id}/{timestamp}_{original_filename}
--
-- Legacy buckets (keep if migrating old data, otherwise skip):
-- Bucket: pitch-decks
-- Bucket: lp-videos
-- Bucket: deal-memos
-- Bucket: term-sheets
-- Bucket: due-diligence
-- Bucket: portfolio-summaries
-- ============================================================

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS teams_pathway_idx        ON public.teams(pathway);
CREATE INDEX IF NOT EXISTS teams_eligible_idx        ON public.teams(is_eligible);
CREATE INDEX IF NOT EXISTS team_members_team_idx     ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS tasks_track_idx           ON public.tasks(track);
CREATE INDEX IF NOT EXISTS tasks_sort_order_idx      ON public.tasks(sort_order);
CREATE INDEX IF NOT EXISTS task_subs_team_idx        ON public.task_submissions(team_id);
CREATE INDEX IF NOT EXISTS task_subs_task_idx        ON public.task_submissions(task_id);
