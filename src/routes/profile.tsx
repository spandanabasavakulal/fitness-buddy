import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useProfile, type Profile, type Goal, type Gender, type FoodPref, calcBMI, bmiCategory } from "@/lib/profile";
import { UserCircle2, Save } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — Fitness Buddy" },
      { name: "description", content: "Set up your fitness profile to get personalized workouts and meals." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, setProfile, hydrated } = useProfile();
  const [form, setForm] = useState<Profile>(profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated) setForm(profile);
  }, [hydrated, profile]);

  const bmi = calcBMI(form.height, form.weight);
  const cat = bmiCategory(bmi);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    toast.success("Profile saved!", { description: "Your personalized plan is ready." });
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 md:py-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
          <UserCircle2 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Your Profile</h1>
          <p className="text-sm text-muted-foreground">Personalize your fitness experience.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Personal details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" className="sm:col-span-2">
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Alex Doe"
                  required
                />
              </Field>
              <Field label="Age">
                <Input
                  type="number"
                  min={10}
                  max={100}
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: +e.target.value })}
                  required
                />
              </Field>
              <Field label="Gender">
                <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v as Gender })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Height (cm)">
                <Input
                  type="number"
                  min={100}
                  max={230}
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: +e.target.value })}
                  required
                />
              </Field>
              <Field label="Weight (kg)">
                <Input
                  type="number"
                  min={30}
                  max={250}
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: +e.target.value })}
                  required
                />
              </Field>

              <Field label="Fitness Goal" className="sm:col-span-2">
                <Select value={form.goal} onValueChange={(v) => setForm({ ...form, goal: v as Goal })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="weight_gain">Weight Gain</SelectItem>
                    <SelectItem value="muscle_building">Muscle Building</SelectItem>
                    <SelectItem value="general_fitness">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Food Preference" className="sm:col-span-2">
                <RadioGroup
                  value={form.food}
                  onValueChange={(v) => setForm({ ...form, food: v as FoodPref })}
                  className="grid grid-cols-2 gap-3"
                >
                  {(["vegetarian", "non_vegetarian"] as FoodPref[]).map((v) => (
                    <label
                      key={v}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border bg-card p-3 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                    >
                      <RadioGroupItem value={v} />
                      <span className="text-sm font-medium capitalize">
                        {v === "vegetarian" ? "Vegetarian" : "Non-Vegetarian"}
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              </Field>

              <div className="sm:col-span-2 flex justify-end">
                <Button type="submit" className="bg-gradient-primary shadow-soft">
                  <Save className="mr-1 h-4 w-4" /> Save Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Live BMI</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="font-display text-5xl font-bold text-primary">{bmi.toFixed(1)}</div>
            <div
              className={
                "mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold " +
                (cat.tone === "success"
                  ? "bg-success/15 text-success"
                  : cat.tone === "warning"
                  ? "bg-accent text-accent-foreground"
                  : "bg-destructive/15 text-destructive")
              }
            >
              {cat.label}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              BMI is a general guide. Adjust height and weight to see it update live.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"grid gap-2 " + className}>
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
