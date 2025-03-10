import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        setError(error.message);
        return;
      }

      // Check if user has completed the quiz
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data: skinProfiles } = await supabase
        .from("skin_profiles")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      // Redirect based on whether user has completed the quiz
      if (!skinProfiles || skinProfiles.length === 0) {
        navigate("/quiz");
      } else {
        navigate("/dashboard");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full space-y-4 text-center">
          <h1 className="text-2xl font-bold">Authentication Error</h1>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
