import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { upsertProfile } from "@/lib/database";

interface ProfileSettingsProps {
  userId: string;
}

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  notifyRoutineReminders: z.boolean().default(true),
  notifyProductRecommendations: z.boolean().default(true),
  notifyTips: z.boolean().default(true),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileSettings({ userId }: ProfileSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      notifyRoutineReminders: true,
      notifyProductRecommendations: true,
      notifyTips: true,
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);

        // Get user data from Supabase Auth
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/login");
          return;
        }

        // Get profile data from Supabase Database
        // In a real app, fetch from profiles table
        // For now, we'll use mock data
        const mockProfile = {
          firstName: "Jane",
          lastName: "Doe",
          email: user.email || "",
          notifyRoutineReminders: true,
          notifyProductRecommendations: true,
          notifyTips: true,
        };

        form.reset(mockProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId, navigate, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsSaving(true);

      // In a real app, save to Supabase
      // For now, we'll just simulate the save
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);

      // Real implementation would be:
      // const { data: { user } } = await supabase.auth.getUser();
      // if (user) {
      //   await upsertProfile(user, data.firstName, data.lastName);
      //
      //   await supabase.from('profiles').update({
      //     notify_routine_reminders: data.notifyRoutineReminders,
      //     notify_product_recommendations: data.notifyProductRecommendations,
      //     notify_tips: data.notifyTips
      //   }).eq('id', userId);
      // }
      //
      // // Update email in Auth if changed
      // const { data: { user } } = await supabase.auth.getUser();
      // if (user && user.email !== data.email) {
      //   await supabase.auth.updateUser({ email: data.email });
      // }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
              alt="Profile"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">
              {form.getValues().firstName} {form.getValues().lastName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {form.getValues().email}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Preferences</h3>

              <FormField
                control={form.control}
                name="notifyRoutineReminders"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Routine Reminders</FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        Receive reminders for your daily skincare routine
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifyProductRecommendations"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Product Recommendations</FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        Receive personalized product recommendations
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifyTips"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Skincare Tips</FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        Receive skincare tips and educational content
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/quiz")}
              >
                Retake Skin Quiz
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
