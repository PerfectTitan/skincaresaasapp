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
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/login');
          return;
        }
        
        // Check if user has completed the quiz
        const { data: skinProfiles } = await supabase
          .from('skin_profiles')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (!skinProfiles || skinProfiles.length === 0) {
          navigate('/quiz');
          return;
        }
        
        // Check if user has a routine
        const { data: routines } = await supabase
          .from('skincare_routines')
          .select('*')
          .eq('user_id', user.id)
          .eq('skin_profile_id', skinProfiles[0].id)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (!routines || routines.length === 0) {
          navigate('/routine');
          return;
        }
        
        setUserData({
          user,
          skinProfile: skinProfiles[0],
          routine: routines[0]
        });
      } catch (error) {
        console.error('Error checking auth:', error);
        navigate('/login');
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
      <div className