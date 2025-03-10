-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    notify_routine_reminders BOOLEAN DEFAULT TRUE,
    notify_product_recommendations BOOLEAN DEFAULT TRUE,
    notify_tips BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Create skin_profiles table
CREATE TABLE IF NOT EXISTS public.skin_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    skin_type TEXT NOT NULL,
    skin_concerns TEXT[] NOT NULL,
    allergies TEXT[] DEFAULT '{}',
    budget TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Create skincare_routines table
CREATE TABLE IF NOT EXISTS public.skincare_routines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    skin_profile_id UUID REFERENCES public.skin_profiles(id) NOT NULL,
    morning_routine JSONB NOT NULL,
    evening_routine JSONB NOT NULL,
    weekly_routine JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Create progress_logs table
CREATE TABLE IF NOT EXISTS public.progress_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    date DATE NOT NULL,
    completed_steps JSONB NOT NULL,
    notes TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Create skin_metrics table
CREATE TABLE IF NOT EXISTS public.skin_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    date DATE NOT NULL,
    hydration_level INTEGER,
    oiliness INTEGER,
    redness INTEGER,
    texture INTEGER,
    overall INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skincare_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skin_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles: users can only view and edit their own profile
CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Skin Profiles: users can only view and edit their own skin profiles
CREATE POLICY "Users can view own skin profiles" 
    ON public.skin_profiles FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skin profiles" 
    ON public.skin_profiles FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skin profiles" 
    ON public.skin_profiles FOR UPDATE 
    USING (auth.uid() = user_id);

-- Skincare Routines: users can only view and edit their own routines
CREATE POLICY "Users can view own routines" 
    ON public.skincare_routines FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own routines" 
    ON public.skincare_routines FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own routines" 
    ON public.skincare_routines FOR UPDATE 
    USING (auth.uid() = user_id);

-- Progress Logs: users can only view and edit their own logs
CREATE POLICY "Users can view own progress logs" 
    ON public.progress_logs FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress logs" 
    ON public.progress_logs FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress logs" 
    ON public.progress_logs FOR UPDATE 
    USING (auth.uid() = user_id);

-- Skin Metrics: users can only view and edit their own metrics
CREATE POLICY "Users can view own skin metrics" 
    ON public.skin_metrics FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skin metrics" 
    ON public.skin_metrics FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skin metrics" 
    ON public.skin_metrics FOR UPDATE 
    USING (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
