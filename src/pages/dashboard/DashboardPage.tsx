import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/lib/supabase";
import { getLatestSkinProfile, getLatestSkincareRoutine } from "@/lib/database";
import RoutineTracker from "./components/RoutineTracker";
import ProgressPhotos from "./components/ProgressPhotos";
import SkinMetrics from "./components/SkinMetrics";
import ProfileSettings from "./components/ProfileSettings";
import DashboardOverview from "./components/DashboardOverview";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get current user from Supabase
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/login");
          return;
        }

        // Get user's skin profile
        const skinProfile = await getLatestSkinProfile(user.id);

        // Get user's routine
        let routine = null;
        if (skinProfile) {
          const { data: routines } = await supabase
            .from("skincare_routines")
            .select("*")
            .eq("user_id", user.id)
            .eq("skin_profile_id", skinProfile.id)
            .order("created_at", { ascending: false })
            .limit(1);

          if (routines && routines.length > 0) {
            routine = routines[0];
          }
        }

        // Set user data
        setUserData({
          user,
          skinProfile: skinProfile || {
            id: "default-profile-id",
            user_id: user.id,
            skin_type: "normal",
            skin_concerns: [],
            allergies: [],
            budget: "medium",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          routine: routine || {
            id: "default-routine-id",
            user_id: user.id,
            skin_profile_id: "default-profile-id",
            morning_routine: [],
            evening_routine: [],
            weekly_routine: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        });
      } catch (error) {
        console.error("Error checking auth:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container max-w-6xl mx-auto py-12 px-4 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Loading Dashboard</h1>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-pink-400">
              Your Skincare Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your progress and maintain your skincare routine
            </p>
          </div>

          <DashboardOverview />

          <Tabs defaultValue="routine" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="routine">Morning Routine</TabsTrigger>
              <TabsTrigger value="evening">Evening Routine</TabsTrigger>
            </TabsList>

            <TabsContent value="routine" className="space-y-6">
              <RoutineTracker
                userId={userData?.user?.id}
                routineId={userData?.routine?.id}
              />
            </TabsContent>

            <TabsContent value="evening" className="space-y-6">
              <RoutineTracker
                userId={userData?.user?.id}
                routineId={userData?.routine?.id}
                defaultTab="evening"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
