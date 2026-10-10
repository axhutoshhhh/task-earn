-- ==============================================================================
-- TASK EARN DATABASE SCHEMA & SECURITY POLICIES
-- ==============================================================================

-- 1. PROFILES TABLE
-- Linked to Supabase auth.users via id.
-- Stores user identity, display name, and server-controlled role.
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies:
-- Anyone can view their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update only their display_name (cannot escalate role)
CREATE POLICY "Users can update their own display_name"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Automatically create profile row when user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to prevent duplicates
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ==============================================================================
-- 2. FEATURE FLAGS TABLE
-- Allows admin to toggle/pause features (e.g. pause quizzes).
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

-- Feature flags can be read by anyone so the frontend knows if quizzes are paused
CREATE POLICY "Anyone can read feature flags"
  ON public.feature_flags
  FOR SELECT
  USING (true);

-- Only admins can modify feature flags
CREATE POLICY "Only admins can modify feature flags"
  ON public.feature_flags
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert initial feature flags
INSERT INTO public.feature_flags (name, enabled, description)
VALUES 
  ('quizzes', true, 'Enable or pause quiz participation'),
  ('tasks', false, 'Enable or pause task participation (disabled until provider approval)'),
  ('surveys', false, 'Enable or pause survey participation (disabled until provider approval)'),
  ('redemptions', true, 'Enable or pause simulated redemption requests')
ON CONFLICT (name) DO NOTHING;


-- ==============================================================================
-- 3. QUIZ QUESTIONS TABLE
-- Stores multiple-choice questions for quizzes.
-- Access is restricted: client-facing queries must NOT expose correct_index.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of 4 text options e.g. ["Option A", "Option B", ...]
  correct_index INTEGER NOT NULL CHECK (correct_index >= 0 AND correct_index <= 3),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

-- Authenticated users and admins can read questions through server API
-- Server code strips `correct_index` before sending questions to browser
CREATE POLICY "Admins can manage quiz questions"
  ON public.quiz_questions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert 5 initial sample questions for testing
INSERT INTO public.quiz_questions (question, options, correct_index, is_active)
VALUES 
  (
    'What does HTML stand for?',
    '["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markdown Level", "Home Tool Markup Language"]'::jsonb,
    0,
    true
  ),
  (
    'Which programming language is known as the language of the web?',
    '["Python", "JavaScript", "C++", "Java"]'::jsonb,
    1,
    true
  ),
  (
    'What does CSS stand for?',
    '["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Syntax", "Colorful Style System"]'::jsonb,
    1,
    true
  ),
  (
    'What is the primary function of SQL?',
    '["Building user interfaces", "Managing relational databases", "Styling web pages", "Compiling machine code"]'::jsonb,
    1,
    true
  ),
  (
    'What does API stand for?',
    '["Application Programming Interface", "Advanced Program Integration", "Automated Protocol Identifier", "Application Process Initiator"]'::jsonb,
    0,
    true
  )
ON CONFLICT DO NOTHING;


-- ==============================================================================
-- 4. QUIZ ATTEMPTS TABLE (TEMPORARY ATTEMPT DATA)
-- Used ONLY for timing validation, replay prevention, and duplicate claim prevention.
-- Records expire or are marked claimed. No detailed answer history is stored.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_ids JSONB NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  claimed BOOLEAN NOT NULL DEFAULT false,
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Users can only view their own attempts
CREATE POLICY "Users can view their own attempts"
  ON public.quiz_attempts
  FOR SELECT
  USING (auth.uid() = user_id);


-- ==============================================================================
-- 5. REWARD LEDGER TABLE
-- Minimal auditable ledger of all points awarded and deducted.
-- Balance is calculated as SUM(amount) — client balances are NEVER trusted.
-- Only the server (service_role) can insert into the ledger.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reward_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- Positive for credits, negative for debits
  reason TEXT NOT NULL,
  reference_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reward_ledger ENABLE ROW LEVEL SECURITY;

-- Users can read their own reward ledger
CREATE POLICY "Users can view their own ledger"
  ON public.reward_ledger
  FOR SELECT
  USING (auth.uid() = user_id);

-- User cannot directly INSERT/UPDATE/DELETE ledger entries (only server service_role can)


-- ==============================================================================
-- 6. REDEMPTIONS TABLE (SIMULATED REDEMPTION RECORDS)
-- Tracks user requests to redeem demo points. Clearly labelled simulated.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL CHECK (points > 0),
  status TEXT NOT NULL DEFAULT 'simulated_completed' CHECK (status IN ('simulated_pending', 'simulated_completed', 'cancelled')),
  reward_type TEXT NOT NULL DEFAULT 'demo_voucher',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.redemptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own redemption requests
CREATE POLICY "Users can view their own redemptions"
  ON public.redemptions
  FOR SELECT
  USING (auth.uid() = user_id);
