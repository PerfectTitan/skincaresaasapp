// Fallback data to use when database operations fail
import { SkinType, SkinConcern, Budget } from "@/types";

// Create a mock skin profile when database save fails
export function createFallbackSkinProfile(
  userId: string,
  skinType: SkinType,
  skinConcerns: SkinConcern[],
  allergies: string[],
  budget: Budget,
) {
  return {
    id: `fallback-${Date.now()}`,
    user_id: userId,
    skin_type: skinType,
    skin_concerns: skinConcerns,
    allergies: allergies,
    budget: budget,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// Create a mock routine when database save fails
export function createFallbackRoutine(
  userId: string,
  skinProfileId: string,
  morningRoutine: any[],
  eveningRoutine: any[],
  weeklyRoutine: any[],
) {
  return {
    id: `fallback-${Date.now()}`,
    user_id: userId,
    skin_profile_id: skinProfileId,
    morning_routine: morningRoutine,
    evening_routine: eveningRoutine,
    weekly_routine: weeklyRoutine,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
