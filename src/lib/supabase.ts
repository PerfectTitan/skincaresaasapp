import { createClient } from "@supabase/supabase-js";

// Use mock implementation if Supabase credentials are not available
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

// For development, we'll use a more robust error handling approach
const isMockEnvironment =
  supabaseUrl.includes("placeholder") ||
  supabaseAnonKey.includes("placeholder");

// Create the Supabase client with better error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Add error handling for network issues
if (isMockEnvironment) {
  console.warn(
    "Using mock Supabase environment. Authentication operations will not work properly.",
  );
}
