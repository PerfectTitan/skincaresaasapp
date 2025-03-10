import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import MainLayout from "@/components/layout/MainLayout";
import { SkinType, SkinConcern, Budget } from "@/types";
import SkinTypeStep from "./steps/SkinTypeStep";
import SkinConcernsStep from "./steps/SkinConcernsStep";
import AllergiesStep from "./steps/AllergiesStep";
import BudgetStep from "./steps/BudgetStep";
import { supabase } from "@/lib/supabase";
import { saveSkinProfile } from "@/lib/database";
import { createFallbackSkinProfile } from "@/lib/fallbackData";

const quizSchema = z.object({
  skinType: z.nativeEnum(SkinType),
  skinConcerns: z
    .array(z.nativeEnum(SkinConcern))
    .min(1, "Please select at least one skin concern"),
  allergies: z.array(z.string()),
  budget: z.nativeEnum(Budget),
});

type QuizFormValues = z.infer<typeof quizSchema>;

export default function SkinQuizPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const totalSteps = 4;

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      skinType: undefined,
      skinConcerns: [],
      allergies: [],
      budget: undefined,
    },
  });

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: QuizFormValues) => {
    try {
      setIsSubmitting(true);

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // If not logged in, save to local storage and redirect to signup
        localStorage.setItem("skinQuizData", JSON.stringify(data));
        navigate("/signup");
        return;
      }

      try {
        // Save quiz results to database using our database helper
        await saveSkinProfile(
          user.id,
          data.skinType,
          data.skinConcerns,
          data.allergies,
          data.budget,
        );
      } catch (dbError) {
        console.error("Database error:", dbError);
        // Continue to routine page even if database save fails
      }

      // Generate routine based on quiz results
      navigate("/routine");
    } catch (error) {
      console.error("Error saving quiz results:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container max-w-2xl mx-auto py-12 px-4">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Skin Assessment Quiz</h1>
            <p className="text-muted-foreground">
              Help us understand your skin to create your personalized routine
            </p>
          </div>

          <Progress value={(step / totalSteps) * 100} className="h-2" />

          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {step === 1 && <SkinTypeStep control={form.control} />}
                  {step === 2 && <SkinConcernsStep control={form.control} />}
                  {step === 3 && <AllergiesStep control={form.control} />}
                  {step === 4 && <BudgetStep control={form.control} />}

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={step === 1}
                    >
                      Previous
                    </Button>

                    {step < totalSteps ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Get Your Routine"}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
