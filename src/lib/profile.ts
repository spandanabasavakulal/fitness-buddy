import { useEffect, useState } from "react";

export type Gender = "male" | "female" | "other";
export type Goal = "weight_gain" | "weight_loss" | "muscle_building" | "general_fitness";
export type FoodPref = "vegetarian" | "non_vegetarian";

export interface Profile {
  name: string;
  age: number;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  goal: Goal;
  food: FoodPref;
}

export const DEFAULT_PROFILE: Profile = {
  name: "",
  age: 25,
  gender: "male",
  height: 170,
  weight: 70,
  goal: "general_fitness",
  food: "vegetarian",
};

const KEY = "fitness-buddy-profile";

export function loadProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(p: Profile) {
  window.localStorage.setItem(KEY, JSON.stringify(p));
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setProfile(loadProfile());
    setHydrated(true);
  }, []);
  const update = (p: Profile) => {
    setProfile(p);
    saveProfile(p);
  };
  return { profile, setProfile: update, hydrated };
}

export function calcBMI(heightCm: number, weightKg: number) {
  const m = heightCm / 100;
  if (!m) return 0;
  return weightKg / (m * m);
}

export function bmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", tone: "warning" as const };
  if (bmi < 25) return { label: "Normal", tone: "success" as const };
  if (bmi < 30) return { label: "Overweight", tone: "warning" as const };
  return { label: "Obese", tone: "destructive" as const };
}

export function goalLabel(g: Goal) {
  return {
    weight_gain: "Weight Gain",
    weight_loss: "Weight Loss",
    muscle_building: "Muscle Building",
    general_fitness: "General Fitness",
  }[g];
}

export function recommendedWater(weightKg: number) {
  // ~35ml per kg -> liters
  return Math.round((weightKg * 0.035) * 10) / 10;
}
