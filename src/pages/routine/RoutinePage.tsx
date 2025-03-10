import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/lib/supabase";
import {
  SkincareRoutine,
  Product,
  SkinType,
  SkinConcern,
  Budget,
} from "@/types";
import { generateMockRoutine } from "@/lib/mockData";
import { getLatestSkinProfile, saveSkincareRoutine } from "@/lib/database";
import {
  createFallbackSkinProfile,
  createFallbackRoutine,
} from "@/lib/fallbackData";

export default function RoutinePage() {
  const [routine, setRoutine] = useState<SkincareRoutine | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("morning");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/login");
          return;
        }

        // Check if user has a skin profile using our database helper
        const skinProfile = await getLatestSkinProfile(user.id);

        if (!skinProfile) {
          navigate("/quiz");
          return;
        }

        // Check if user already has a routine
        const { data: routines, error: routineError } = await supabase
          .from("skincare_routines")
          .select("*")
          .eq("user_id", user.id)
          .eq("skin_profile_id", skinProfile.id)
          .order("created_at", { ascending: false })
          .limit(1);

        if (routineError) {
          console.error("Error fetching routines:", routineError);
        }

        if (routines && routines.length > 0) {
          setRoutine(routines[0]);
        } else {
          // Generate a new routine based on skin profile
          // In a real app, this would call an AI service
          // For now, we'll use mock data
          console.log("Generating mock routine with profile:", skinProfile);
          const mockRoutine = generateMockRoutine({
            userId: user.id,
            skinProfileId: skinProfile.id,
            skinType: skinProfile.skin_type as SkinType,
            skinConcerns: skinProfile.skin_concerns as SkinConcern[],
            budget: skinProfile.budget as Budget,
          });
          console.log("Generated mock routine:", mockRoutine);

          try {
            // Save the routine to the database using our database helper
            const newRoutine = await saveSkincareRoutine(
              user.id,
              skinProfile.id,
              mockRoutine.morningRoutine,
              mockRoutine.eveningRoutine,
              mockRoutine.weeklyRoutine,
            );
            setRoutine(newRoutine);
          } catch (dbError) {
            console.error("Database error:", dbError);
            // Use the mock routine even if database save fails
            setRoutine(mockRoutine);
          }
        }
      } catch (error) {
        console.error("Error fetching routine:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutine();
  }, [navigate]);

  const handleSaveRoutine = async () => {
    try {
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving routine:", error);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto py-12 px-4 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              Generating Your Personalized Routine
            </h1>
            <p className="text-muted-foreground">
              Please wait while our AI creates your perfect skincare routine...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!routine) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto py-12 px-4 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Something went wrong</h1>
            <p className="text-muted-foreground">
              We couldn't generate your skincare routine. Please try again.
            </p>
            <Button onClick={() => navigate("/quiz")}>Retake Quiz</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              Your Personalized Skincare Routine
            </h1>
            <p className="text-muted-foreground">
              Based on your skin profile, we've created a customized routine to
              address your specific needs.
            </p>
          </div>

          <Tabs
            defaultValue="morning"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="morning">Morning Routine</TabsTrigger>
              <TabsTrigger value="evening">Evening Routine</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Treatments</TabsTrigger>
            </TabsList>

            <TabsContent value="morning" className="space-y-4 mt-6">
              {routine.morningRoutine && routine.morningRoutine.length > 0 ? (
                routine.morningRoutine.map((step, index) => (
                  <ProductCard
                    key={index}
                    product={step.product}
                    step={index + 1}
                    instructions={step.instructions}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="py-6">
                    <p className="text-center text-muted-foreground">
                      No morning routine steps found.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="evening" className="space-y-4 mt-6">
              {routine.eveningRoutine && routine.eveningRoutine.length > 0 ? (
                routine.eveningRoutine.map((step, index) => (
                  <ProductCard
                    key={index}
                    product={step.product}
                    step={index + 1}
                    instructions={step.instructions}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="py-6">
                    <p className="text-center text-muted-foreground">
                      No evening routine steps found.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4 mt-6">
              {routine.weeklyRoutine && routine.weeklyRoutine.length > 0 ? (
                routine.weeklyRoutine.map((step, index) => (
                  <ProductCard
                    key={index}
                    product={step.product}
                    step={index + 1}
                    instructions={step.instructions}
                    frequency="Use 1-2 times per week"
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="py-6">
                    <p className="text-center text-muted-foreground">
                      No weekly treatments found.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={() => navigate("/quiz")}>
              Retake Quiz
            </Button>
            <Button onClick={handleSaveRoutine}>Save & Go to Dashboard</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

interface ProductCardProps {
  product: Product;
  step: number;
  instructions?: string;
  frequency?: string;
}

function ProductCard({
  product,
  step,
  instructions,
  frequency,
}: ProductCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">
              Step {step}: {product.category}
            </CardTitle>
            <CardDescription>{frequency}</CardDescription>
          </div>
          <Badge>{product.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>
            <p className="text-sm">{product.description}</p>
            {instructions && (
              <div className="text-sm">
                <span className="font-medium">How to use:</span> {instructions}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-3">
        <div className="flex justify-between w-full items-center">
          <span className="font-medium">${product.price.toFixed(2)}</span>
          <a
            href={product.affiliateLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            View Product
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
