-- ============================================================
-- Lobo VC Cup 2026 — Database Schema
-- Run this in the Supabase SQL editor after creating your project
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
-- SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.submissions (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id      UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  type         TEXT NOT NULL CHECK (type IN (
                 'pitch_deck',
                 'lp_video',
                 'deal_memo',
                 'term_sheet',
                 'due_diligence',
                 'portfolio_summary'
               )),
  file_url     TEXT NOT NULL,
  file_name    TEXT NOT NULL,
  file_size    BIGINT,
  company_name TEXT,                        -- For per-investment docs (deal_memo, term_sheet, due_diligence)
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS submissions_updated_at ON public.submissions;
CREATE TRIGGER submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- USERS policies
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON public.users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- TEAMS policies
CREATE POLICY "Anyone authenticated can view teams"
  ON public.teams FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create a team"
  ON public.teams FOR INSERT
  WITH CHECK (auth.uid() = key_contact_id);

CREATE POLICY "Key contact can update their team"
  ON public.teams FOR UPDATE
  USING (auth.uid() = key_contact_id);

CREATE POLICY "Admins can update any team"
  ON public.teams FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- TEAM MEMBERS policies
CREATE POLICY "Anyone authenticated can view team members"
  ON public.team_members FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Team key contact can manage members"
  ON public.team_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id AND t.key_contact_id = auth.uid()
    )
  );

-- SUBMISSIONS policies
CREATE POLICY "Teams can view their own submissions"
  ON public.submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id AND t.key_contact_id = auth.uid()
    )
  );

CREATE POLICY "Teams can insert their own submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id AND t.key_contact_id = auth.uid()
    )
  );

CREATE POLICY "Teams can update their own submissions"
  ON public.submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id AND t.key_contact_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all submissions"
  ON public.submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ============================================================
-- STORAGE BUCKETS
-- Create these in the Supabase dashboard under Storage,
-- or via the Supabase CLI. This is documentation of what to create.
-- ============================================================
-- Bucket: pitch-decks      (founders only, private)
-- Bucket: lp-videos        (VC only, private)
-- Bucket: deal-memos       (VC only, private)
-- Bucket: term-sheets      (VC only, private)
-- Bucket: due-diligence    (VC only, private)
-- Bucket: portfolio-summaries (VC only, private)
--
-- File naming: {team_id}/{timestamp}_{original_filename}
-- ============================================================

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS teams_pathway_idx ON public.teams(pathway);
CREATE INDEX IF NOT EXISTS teams_eligible_idx ON public.teams(is_eligible);
CREATE INDEX IF NOT EXISTS team_members_team_idx ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS submissions_team_idx ON public.submissions(team_id);
CREATE INDEX IF NOT EXISTS submissions_type_idx ON public.submissions(type);
