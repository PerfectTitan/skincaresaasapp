import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
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
        const { data, error } = await supabase
          .from("skincare_routines")
          .select("*")
          .eq("id", routineId)
          .single();

        if (error) throw error;
        setRoutine(data);

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
          .update({ completedSteps: completedStepsArray })
          .eq("id", todayLog.id);
      } else {
        // Create new log
        const { data } = await supabase
          .from("progress_logs")
          .insert({
            user_id: userId,
            date: today,
            completedSteps: completedStepsArray,
          })
          .select()
          .single();

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
