import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { saveProgressLog } from "@/lib/database";
import { ProgressLog, CompletedStep, RoutineStep } from "@/types";
import { Sun } from "lucide-react";

interface RoutineTrackerProps {
  userId: string;
  routineId: string;
  defaultTab?: string;
}

export default function RoutineTracker(props: RoutineTrackerProps) {
  const { userId, routineId } = props;
  const [routine, setRoutine] = useState<any>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(props.defaultTab || "morning");
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
                  name: "Brightening Toner",
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
                productId: "s1",
                product: {
                  id: "s1",
                  name: "Hydrating Serum",
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
                order: 4,
                productId: "m1",
                product: {
                  id: "m1",
                  name: "Daily Moisturizer",
                  brand: "CeraVe",
                  category: "moisturizer",
                  description:
                    "Lightweight moisturizer with ceramides and hyaluronic acid.",
                  price: 13.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1593560368921-892072b8d81c?w=300&q=80",
                },
                frequency: "daily",
                instructions: "Apply a small amount to face and neck.",
              },
              {
                order: 5,
                productId: "ss1",
                product: {
                  id: "ss1",
                  name: "SPF 50 Sunscreen",
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
            weekly_routine: [],
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
          logData.completed_steps.forEach((step: CompletedStep) => {
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
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!routine) {
    return (
      <div className="pt-6">
        <p className="text-center text-muted-foreground">
          No routine found. Please complete the skin quiz.
        </p>
      </div>
    );
  }

  const getRoutineForTab = () => {
    switch (activeTab) {
      case "morning":
        return routine.morning_routine || [];
      case "evening":
        return routine.evening_routine || [];
      case "weekly":
        return routine.weekly_routine || [];
      default:
        return [];
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          {activeTab === "morning" ? "Morning Steps" : "Evening Steps"}
        </h2>
        <div className="flex items-center">
          <div className="bg-gray-200 h-2 w-16 rounded-full overflow-hidden mr-2">
            <div className="bg-primary h-full" style={{ width: "80%" }}></div>
          </div>
          <span className="text-sm">80% Complete</span>
        </div>
      </div>

      <div className="space-y-2">
        {getRoutineForTab().length > 0 ? (
          getRoutineForTab().map((step: RoutineStep) => (
            <div
              key={step.order}
              className="flex items-center border rounded-lg p-4 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-4">
                <img
                  src={step.product.imageUrl}
                  alt={step.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{step.product.name}</h4>
                <p className="text-xs text-muted-foreground">
                  Step {step.order}
                </p>
              </div>
              <div>
                {completedSteps[`${activeTab}-${step.productId}`] ? (
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600"
                    disabled
                  >
                    Completed
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-primary hover:text-white"
                    onClick={() =>
                      handleCheckStep(
                        `${activeTab}-${step.productId}`,
                        step.productId,
                        true,
                      )
                    }
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="flex justify-center">
              <Sun className="h-12 w-12 text-primary opacity-50" />
            </div>
            <h3 className="text-lg font-medium">No routine yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Take the skin assessment quiz to get personalized routine
              recommendations.
            </p>
            <Button
              onClick={() => (window.location.href = "/quiz")}
              className="mt-2"
            >
              Take Skin Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
