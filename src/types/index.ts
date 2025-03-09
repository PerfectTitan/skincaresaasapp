export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export interface SkinProfile {
  id: string;
  userId: string;
  skinType: SkinType;
  skinConcerns: SkinConcern[];
  allergies: string[];
  budget: Budget;
  createdAt: string;
  updatedAt: string;
}

export enum SkinType {
  DRY = "dry",
  OILY = "oily",
  COMBINATION = "combination",
  NORMAL = "normal",
  SENSITIVE = "sensitive",
}

export enum SkinConcern {
  ACNE = "acne",
  AGING = "aging",
  DRYNESS = "dryness",
  DULLNESS = "dullness",
  HYPERPIGMENTATION = "hyperpigmentation",
  REDNESS = "redness",
  SENSITIVITY = "sensitivity",
  TEXTURE = "texture",
  WRINKLES = "wrinkles",
}

export enum Budget {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  description: string;
  price: number;
  imageUrl: string;
  affiliateLink?: string;
  ingredients?: string[];
  suitableFor: SkinType[];
  addressesConcerns: SkinConcern[];
}

export enum ProductCategory {
  CLEANSER = "cleanser",
  TONER = "toner",
  SERUM = "serum",
  MOISTURIZER = "moisturizer",
  SUNSCREEN = "sunscreen",
  MASK = "mask",
  EXFOLIATOR = "exfoliator",
  EYE_CREAM = "eye_cream",
  TREATMENT = "treatment",
}

export interface SkincareRoutine {
  id: string;
  userId: string;
  skinProfileId: string;
  morningRoutine: RoutineStep[];
  eveningRoutine: RoutineStep[];
  weeklyRoutine: RoutineStep[];
  createdAt: string;
  updatedAt: string;
}

export interface RoutineStep {
  order: number;
  productId: string;
  product: Product;
  frequency: Frequency;
  instructions?: string;
}

export enum Frequency {
  DAILY = "daily",
  WEEKLY = "weekly",
  BIWEEKLY = "biweekly",
  MONTHLY = "monthly",
}

export interface ProgressLog {
  id: string;
  userId: string;
  date: string;
  completedSteps: CompletedStep[];
  notes?: string;
  photoUrl?: string;
}

export interface CompletedStep {
  routineStepId: string;
  completed: boolean;
  productId: string;
}

export interface SkinMetric {
  id: string;
  userId: string;
  date: string;
  hydrationLevel?: number;
  oiliness?: number;
  redness?: number;
  texture?: number;
  overall?: number;
}
