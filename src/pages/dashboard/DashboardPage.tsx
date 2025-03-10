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
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [routine, setRoutine] = useState<any>(null);
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
        let routineData = null;
        if (skinProfile) {
          const { data: routines } = await supabase
            .from("skincare_routines")
            .select("*")
            .eq("user_id", user.id)
            .eq("skin_profile_id", skinProfile.id)
            .order("created_at", { ascending: false })
            .limit(1);

          if (routines && routines.length > 0) {
            routineData = routines[0];
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
          routine: routineData || {
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

        setRoutine(
          routineData || {
            morning_routine: [
              {
                order: 1,
                productId: "c1",
                product: {
                  id: "c1",
                  name: "Gentle Foaming Cleanser",
                  brand: "GlowSkin",
                  category: "cleanser",
                  description:
                    "A gentle foaming cleanser that removes impurities without stripping the skin",
                  price: 14.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80",
                },
              },
              {
                order: 2,
                productId: "t1",
                product: {
                  id: "t1",
                  name: "Brightening Toner",
                  brand: "GlowSkin",
                  category: "toner",
                  description:
                    "Alcohol-free toner that balances pH and prepares skin for the next steps.",
                  price: 19.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=300&q=80",
                },
              },
              {
                order: 3,
                productId: "s1",
                product: {
                  id: "s1",
                  name: "Hydrating Serum",
                  brand: "GlowSkin",
                  category: "serum",
                  description:
                    "Lightweight serum with hyaluronic acid for deep hydration.",
                  price: 24.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",
                },
              },
              {
                order: 4,
                productId: "m1",
                product: {
                  id: "m1",
                  name: "Daily Moisturizer",
                  brand: "GlowSkin",
                  category: "moisturizer",
                  description:
                    "Oil-free moisturizer that hydrates without clogging pores.",
                  price: 18.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1593560368921-892072b8d81c?w=300&q=80",
                },
              },
              {
                order: 5,
                productId: "ss1",
                product: {
                  id: "ss1",
                  name: "SPF 50 Sunscreen",
                  brand: "GlowSkin",
                  category: "sunscreen",
                  description:
                    "Broad-spectrum protection against UVA and UVB rays.",
                  price: 22.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1556228841-a3d3b069c2c8?w=300&q=80",
                },
              },
            ],
            evening_routine: [
              {
                order: 1,
                productId: "c2",
                product: {
                  id: "c2",
                  name: "Hydrating Facial Cleanser",
                  brand: "GlowSkin",
                  category: "cleanser",
                  description:
                    "Hydrating cleanser with ceramides to maintain moisture.",
                  price: 15.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
                },
              },
              {
                order: 2,
                productId: "s2",
                product: {
                  id: "s2",
                  name: "Niacinamide Serum",
                  brand: "GlowSkin",
                  category: "serum",
                  description:
                    "Serum that reduces sebum production and improves skin texture.",
                  price: 19.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",
                },
              },
              {
                order: 3,
                productId: "m2",
                product: {
                  id: "m2",
                  name: "Night Cream",
                  brand: "GlowSkin",
                  category: "moisturizer",
                  description:
                    "Rich cream that provides overnight hydration and repair.",
                  price: 24.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1593560368921-892072b8d81c?w=300&q=80",
                },
              },
            ],
          },
        );
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

          <Tabs defaultValue="progress" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="progress">Track Progress</TabsTrigger>
              <TabsTrigger value="routine">View Routine</TabsTrigger>
            </TabsList>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProgressPhotos userId={userData?.user?.id} />
                <SkinMetrics userId={userData?.user?.id} />
              </div>
            </TabsContent>

            <TabsContent value="routine" className="space-y-6">
              <div className="bg-pink-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-pink-500 mb-2">
                  Your Personalized Skincare Routine
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  Based on your quiz answers, we've created a custom routine
                  just for you.
                </p>

                <Tabs defaultValue="morning">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value="morning"
                      className="bg-white/50 data-[state=active]:bg-white"
                    >
                      Morning Routine
                    </TabsTrigger>
                    <TabsTrigger
                      value="evening"
                      className="bg-white/50 data-[state=active]:bg-white"
                    >
                      Evening Routine
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="morning" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {routine?.morning_routine?.map((step: any) => (
                        <div
                          key={step.order}
                          className="bg-white rounded-lg overflow-hidden border"
                        >
                          <div className="aspect-video relative overflow-hidden">
                            <div className="absolute top-2 left-2 bg-pink-100 text-pink-600 text-xs font-medium px-2 py-1 rounded-full">
                              Step {step.order}:{" "}
                              {step.product.category.charAt(0).toUpperCase() +
                                step.product.category.slice(1)}
                            </div>
                            <img
                              src={step.product.imageUrl}
                              alt={step.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold">{step.product.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {step.product.brand}
                            </p>
                            <p className="text-sm">
                              {step.product.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="evening" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {routine?.evening_routine?.map((step: any) => (
                        <div
                          key={step.order}
                          className="bg-white rounded-lg overflow-hidden border"
                        >
                          <div className="aspect-video relative overflow-hidden">
                            <div className="absolute top-2 left-2 bg-pink-100 text-pink-600 text-xs font-medium px-2 py-1 rounded-full">
                              Step {step.order}:{" "}
                              {step.product.category.charAt(0).toUpperCase() +
                                step.product.category.slice(1)}
                            </div>
                            <img
                              src={step.product.imageUrl}
                              alt={step.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold">{step.product.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {step.product.brand}
                            </p>
                            <p className="text-sm">
                              {step.product.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 text-center">
                  <p className="mb-4 text-gray-600">
                    Ready to start your skincare journey?
                  </p>
                  <Button className="bg-pink-500 hover:bg-pink-600">
                    Track Your Progress
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
