// Mock authentication functions to use when Supabase is not configured

const MOCK_USER = {
  id: "mock-user-id",
  email: "user@example.com",
  user_metadata: {
    first_name: "Jane",
    last_name: "Doe",
  },
};

const MOCK_SKIN_PROFILE = {
  id: "mock-profile-id",
  user_id: MOCK_USER.id,
  skin_type: "combination",
  skin_concerns: ["acne", "dryness", "hyperpigmentation"],
  allergies: ["Fragrance", "Alcohol"],
  budget: "medium",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const getMockUser = () => {
  return {
    data: {
      user: MOCK_USER,
      session: {
        access_token: "mock-token",
        expires_at: Date.now() + 3600000,
      },
    },
    error: null,
  };
};

export const getMockSkinProfile = () => {
  return {
    data: [MOCK_SKIN_PROFILE],
    error: null,
  };
};

export const getMockRoutine = () => {
  return {
    data: [
      {
        id: "mock-routine-id",
        user_id: MOCK_USER.id,
        skin_profile_id: MOCK_SKIN_PROFILE.id,
        morning_routine: [],
        evening_routine: [],
        weekly_routine: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
    error: null,
  };
};
