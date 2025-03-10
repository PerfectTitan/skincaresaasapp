import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { saveProgressLog } from "@/lib/database";
import { ProgressLog, CompletedStep, RoutineStep } from "@/types";

interface RoutineTrackerProps {
  userId: string;
  routineId: string;
}

export default function RoutineTracker({
  userId,
  routineId,
}: RoutineTrackerProps) {
  const [routine, setRoutine] = useState<any>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("morning");
  const [todayLog, setTodayLog] = useState<ProgressLog | null>(null);

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        // Get user's routine from database
        const { data, error } = await supabase
          .from("skincare_routines")
          .select("*")
          .eq("id", routineId)
          .single();

        if (error) {
          console.error("Error fetching routine:", error);
          // If no routine found, create a mock one for demo purposes
          const mockRoutine = {
            id: routineId,
            user_id: userId,
            morning_routine: [
              {
                order: 1,
                productId: "c1",
                product: {
                  id: "c1",
                  name: "Gentle Foaming Cleanser",
                  brand: "CeraVe",
                  category: "cleanser",
                  description:
                    "Gentle foaming cleanser that removes excess oil without disrupting the skin barrier.",
                  price: 14.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80",
                },
                frequency: "daily",
                instructions:
                  "Gently massage onto damp skin and rinse with lukewarm water.",
              },
              {
                order: 2,
                productId: "t1",
                product: {
                  id: "t1",
                  name: "Hydrating Toner",
                  brand: "Klairs",
                  category: "toner",
                  description:
                    "Alcohol-free toner that hydrates and prepares skin for the next steps.",
                  price: 19.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=300&q=80",
                },
                frequency: "daily",
                instructions:
                  "Apply to clean skin with a cotton pad or fingertips.",
              },
              {
                order: 3,
                productId: "ss1",
                product: {
                  id: "ss1",
                  name: "Ultra-Light Daily UV Defense SPF 50",
                  brand: "Kiehl's",
                  category: "sunscreen",
                  description:
                    "Lightweight sunscreen that protects against UVA and UVB rays.",
                  price: 39.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1556228841-a3d3b069c2c8?w=300&q=80",
                },
                frequency: "daily",
                instructions:
                  "Apply generously to face and neck as the final step of your morning routine.",
              },
            ],
            evening_routine: [
              {
                order: 1,
                productId: "c2",
                product: {
                  id: "c2",
                  name: "Hydrating Facial Cleanser",
                  brand: "CeraVe",
                  category: "cleanser",
                  description:
                    "Hydrating cleanser with ceramides and hyaluronic acid to maintain moisture.",
                  price: 15.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
                },
                frequency: "daily",
                instructions:
                  "Gently massage onto damp skin and rinse with lukewarm water.",
              },
              {
                order: 2,
                productId: "s1",
                product: {
                  id: "s1",
                  name: "Hyaluronic Acid Serum",
                  brand: "The Ordinary",
                  category: "serum",
                  description:
                    "Hydrating serum that plumps skin and reduces fine lines.",
                  price: 7.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",
                },
                frequency: "daily",
                instructions:
                  "Apply a few drops to face and neck, gently pat into skin.",
              },
              {
                order: 3,
                productId: "m2",
                product: {
                  id: "m2",
                  name: "Moisturizing Cream",
                  brand: "CeraVe",
                  category: "moisturizer",
                  description:
                    "Rich cream that provides 24-hour hydration for dry skin.",
                  price: 16.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1593560368921-892072b8d81c?w=300&q=80",
                },
                frequency: "daily",
                instructions: "Apply a small amount to face and neck.",
              },
            ],
            weekly_routine: [
              {
                order: 1,
                productId: "e1",
                product: {
                  id: "e1",
                  name: "AHA 30% + BHA 2% Peeling Solution",
                  brand: "The Ordinary",
                  category: "exfoliator",
                  description:
                    "Chemical exfoliant that improves skin texture and brightness.",
                  price: 7.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&q=80",
                },
                frequency: "weekly",
                instructions:
                  "Apply to clean, dry skin. Leave on for no more than 10 minutes, then rinse thoroughly.",
              },
              {
                order: 2,
                productId: "ma1",
                product: {
                  id: "ma1",
                  name: "Hydrating Overnight Mask",
                  brand: "Laneige",
                  category: "mask",
                  description:
                    "Overnight mask that deeply hydrates and plumps skin.",
                  price: 25.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",
                },
                frequency: "weekly",
                instructions:
                  "Apply as the last step of your evening routine 1-2 times per week.",
              },
            ],
          };
          setRoutine(mockRoutine);
        } else {
          setRoutine(data);
        }

        // Check if there's a log for today
        const today = new Date().toISOString().split("T")[0];
        const { data: logData } = await supabase
          .from("progress_logs")
          .select("*")
          .eq("user_id", userId)
          .eq("date", today)
          .single();

        if (logData) {
          setTodayLog(logData);
          // Convert completed steps to a record for easier access
          const completed: Record<string, boolean> = {};
          logData.completedSteps.forEach((step: CompletedStep) => {
            completed[step.routineStepId] = step.completed;
          });
          setCompletedSteps(completed);
        }
      } catch (error) {
        console.error("Error fetching routine:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutine();
  }, [userId, routineId]);

  const handleCheckStep = async (
    stepId: string,
    productId: string,
    completed: boolean,
  ) => {
    try {
      const newCompletedSteps = { ...completedSteps, [stepId]: completed };
      setCompletedSteps(newCompletedSteps);

      const today = new Date().toISOString().split("T")[0];

      // Convert to array format for database
      const completedStepsArray = Object.entries(newCompletedSteps).map(
        ([routineStepId, isCompleted]) => ({
          routineStepId,
          completed: isCompleted,
          productId: productId,
        }),
      );

      if (todayLog) {
        // Update existing log
        await supabase
          .from("progress_logs")
          .update({ completed_steps: completedStepsArray })
          .eq("id", todayLog.id);
      } else {
        // Create new log using our database helper
        const data = await saveProgressLog(userId, today, completedStepsArray);

        setTodayLog(data);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!routine) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No routine found. Please complete the skin quiz.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getRoutineForTab = () => {
    switch (activeTab) {
      case "morning":
        return routine.morningRoutine || [];
      case "evening":
        return routine.eveningRoutine || [];
      case "weekly":
        return routine.weeklyRoutine || [];
      default:
        return [];
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Skincare Routine</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="morning"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="morning">Morning</TabsTrigger>
            <TabsTrigger value="evening">Evening</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-4">
            {getRoutineForTab().length > 0 ? (
              getRoutineForTab().map((step: RoutineStep) => (
                <div
                  key={step.order}
                  className="flex items-start space-x-3 p-3 border rounded-md"
                >
                  <Checkbox
                    id={`step-${step.order}`}
                    checked={completedSteps[step.productId] || false}
                    onCheckedChange={(checked) =>
                      handleCheckStep(step.productId, step.productId, !!checked)
                    }
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor={`step-${step.order}`}
                      className="font-medium"
                    >
                      Step {step.order}: {step.product.category}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {step.product.name} by {step.product.brand}
                    </p>
                    {step.instructions && (
                      <p className="text-xs text-muted-foreground">
                        {step.instructions}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">
                No steps found for this routine.
              </p>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button variant="outline" className="w-full">
            View Full Routine Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
