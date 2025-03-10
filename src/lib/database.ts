import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";
import { SkinProfile, SkinType, SkinConcern, Budget } from "@/types";
import {
  createFallbackSkinProfile,
  createFallbackRoutine,
} from "./fallbackData";

// Create or update user profile
export async function upsertProfile(
  user: User,
  firstName?: string,
  lastName?: string,
) {
  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    first_name: firstName || user.user_metadata?.first_name,
    last_name: lastName || user.user_metadata?.last_name,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error upserting profile:", error);
    throw error;
  }
}

// Save skin profile from quiz
export async function saveSkinProfile(
  userId: string,
  skinType: SkinType,
  skinConcerns: SkinConcern[],
  allergies: string[],
  budget: Budget,
) {
  const { data, error } = await supabase
    .from("skin_profiles")
    .insert({
      user_id: userId,
      skin_type: skinType,
      skin_concerns: skinConcerns,
      allergies: allergies,
      budget: budget,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving skin profile:", error);
    // Return fallback data instead of throwing
    return createFallbackSkinProfile(
      userId,
      skinType,
      skinConcerns,
      allergies,
      budget,
    );
  }

  return data;
}

// Get user's latest skin profile
export async function getLatestSkinProfile(userId: string) {
  const { data, error } = await supabase
    .from("skin_profiles")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 is the error code for no rows returned
    console.error("Error fetching skin profile:", error);
    throw error;
  }

  return data;
}

// Save skincare routine
export async function saveSkincareRoutine(
  userId: string,
  skinProfileId: string,
  morningRoutine: any[],
  eveningRoutine: any[],
  weeklyRoutine: any[],
) {
  const { data, error } = await supabase
    .from("skincare_routines")
    .insert({
      user_id: userId,
      skin_profile_id: skinProfileId,
      morning_routine: morningRoutine,
      evening_routine: eveningRoutine,
      weekly_routine: weeklyRoutine,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving skincare routine:", error);
    // Return fallback data instead of throwing
    return createFallbackRoutine(
      userId,
      skinProfileId,
      morningRoutine,
      eveningRoutine,
      weeklyRoutine,
    );
  }

  return data;
}

// Get user's latest skincare routine
export async function getLatestSkincareRoutine(
  userId: string,
  skinProfileId: string,
) {
  const { data, error } = await supabase
    .from("skincare_routines")
    .select("*")
    .eq("user_id", userId)
    .eq("skin_profile_id", skinProfileId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching skincare routine:", error);
    throw error;
  }

  return data;
}

// Save progress log
export async function saveProgressLog(
  userId: string,
  date: string,
  completedSteps: any[],
  notes?: string,
  photoUrl?: string,
) {
  const { data, error } = await supabase
    .from("progress_logs")
    .insert({
      user_id: userId,
      date: date,
      completed_steps: completedSteps,
      notes: notes,
      photo_url: photoUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving progress log:", error);
    throw error;
  }

  return data;
}

// Save skin metrics
export async function saveSkinMetrics(
  userId: string,
  date: string,
  hydrationLevel: number,
  oiliness: number,
  redness: number,
  texture: number,
  overall: number,
) {
  const { data, error } = await supabase
    .from("skin_metrics")
    .insert({
      user_id: userId,
      date: date,
      hydration_level: hydrationLevel,
      oiliness: oiliness,
      redness: redness,
      texture: texture,
      overall: overall,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving skin metrics:", error);
    throw error;
  }

  return data;
}
