-- Create tables for GlowSage skincare app

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  notify_routine_reminders BOOLEAN DEFAULT TRUE,
  notify_product_recommendations BOOLEAN DEFAULT TRUE,
  notify_tips BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skin profiles table
CREATE TABLE IF NOT EXISTS skin_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  skin_type TEXT NOT NULL,
  skin_concerns TEXT[] NOT NULL,
  allergies TEXT[],
  budget TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skincare routines table
CREATE TABLE IF NOT EXISTS skincare_routines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  skin_profile_id UUID REFERENCES skin_profiles(id) NOT NULL,
  morning_routine JSONB NOT NULL DEFAULT '[]'::JSONB,
  evening_routine JSONB NOT NULL DEFAULT '[]'::JSONB,
  weekly_routine JSONB NOT NULL DEFAULT '[]'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress logs table
CREATE TABLE IF NOT EXISTS progress_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  date DATE NOT NULL,
  completed_steps JSONB NOT NULL DEFAULT '[]'::JSONB,
  notes TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress photos table
CREATE TABLE IF NOT EXISTS progress_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  photo_url TEXT NOT NULL,
  title TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skin metrics table
CREATE TABLE IF NOT EXISTS skin_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  date DATE NOT NULL,
  hydration_level INTEGER,
  oiliness INTEGER,
  redness INTEGER,
  texture INTEGER,
  overall INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skincare_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE skin_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can view their own skin profiles" 
  ON skin_profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own skin profiles" 
  ON skin_profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skin profiles" 
  ON skin_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own skincare routines" 
  ON skincare_routines FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own skincare routines" 
  ON skincare_routines FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skincare routines" 
  ON skincare_routines FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own progress logs" 
  ON progress_logs FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress logs" 
  ON progress_logs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress logs" 
  ON progress_logs FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own progress photos" 
  ON progress_photos FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress photos" 
  ON progress_photos FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress photos" 
  ON progress_photos FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own skin metrics" 
  ON skin_metrics FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own skin metrics" 
  ON skin_metrics FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skin metrics" 
  ON skin_metrics FOR UPDATE 
  USING (auth.uid() = user_id);