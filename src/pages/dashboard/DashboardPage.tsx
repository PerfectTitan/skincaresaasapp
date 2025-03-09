import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/lib/supabase";
import RoutineTracker from "./components/RoutineTracker";
import ProgressPhotos from "./components/ProgressPhotos";
import SkinMetrics from "./components/SkinMetrics";
import ProfileSettings from "./components/ProfileSettings";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For demo purposes, we'll use mock data instead of actual Supabase calls
        // In a real app, you would use the Supabase client
        const mockUser = {
          id: "mock-user-id",
          email: "user@example.com",
          user_metadata: {
            first_name: "Jane",
            last_name: "Doe",
          },
        };

        const mockSkinProfile = {
          id: "mock-profile-id",
          user_id: mockUser.id,
          skin_type: "combination",
          skin_concerns: ["acne", "dryness", "hyperpigmentation"],
          allergies: ["Fragrance", "Alcohol"],
          budget: "medium",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const mockRoutine = {
          id: "mock-routine-id",
          user_id: mockUser.id,
          skin_profile_id: mockSkinProfile.id,
          morningRoutine: [],
          eveningRoutine: [],
          weeklyRoutine: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        setUserData({
          user: mockUser,
          skinProfile: mockSkinProfile,
          routine: mockRoutine,
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
            <h1 className="text-3xl font-bold">
              Welcome, {userData?.user?.email?.split("@")[0] || "User"}
            </h1>
            <p className="text-muted-foreground">
              Track your skincare journey and see your progress
            </p>
          </div>

          <Tabs defaultValue="routine" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="routine">Routine</TabsTrigger>
              <TabsTrigger value="photos">Progress Photos</TabsTrigger>
              <TabsTrigger value="metrics">Skin Metrics</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="routine" className="space-y-6">
              <RoutineTracker
                userId={userData?.user?.id}
                routineId={userData?.routine?.id}
              />
            </TabsContent>

            <TabsContent value="photos" className="space-y-6">
              <ProgressPhotos userId={userData?.user?.id} />
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <SkinMetrics userId={userData?.user?.id} />
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <ProfileSettings userId={userData?.user?.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
