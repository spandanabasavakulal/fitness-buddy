import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Coffee, Salad, UtensilsCrossed, Cookie, Droplets, Flame } from "lucide-react";
import { useProfile, recommendedWater } from "@/lib/profile";

export const Route = createFileRoute("/nutrition")({
  head: () => ({
    meta: [
      { title: "Nutrition Assistant — Fitness Buddy" },
      { name: "description", content: "Meal recommendations and hydration guidance tailored to your goal." },
    ],
  }),
  component: Nutrition,
});

interface Meal {
  name: string;
  desc: string;
  kcal: number;
  tags: string[];
}

const vegetarian = {
  breakfast: [
    { name: "Oats & berries bowl", desc: "Rolled oats, blueberries, almonds, honey.", kcal: 380, tags: ["High fiber"] },
    { name: "Greek yogurt parfait", desc: "Yogurt, granola, banana, chia seeds.", kcal: 320, tags: ["Protein"] },
  ],
  lunch: [
    { name: "Chickpea power bowl", desc: "Quinoa, chickpeas, roasted veg, tahini.", kcal: 520, tags: ["Protein", "Fiber"] },
    { name: "Paneer wrap", desc: "Whole-wheat wrap, paneer, greens, hummus.", kcal: 480, tags: ["Protein"] },
  ],
  dinner: [
    { name: "Lentil dal & rice", desc: "Brown rice, mixed dal, sautéed spinach.", kcal: 540, tags: ["Comfort"] },
    { name: "Tofu stir-fry", desc: "Tofu, broccoli, bell pepper, ginger sauce.", kcal: 460, tags: ["Low carb"] },
  ],
  snacks: [
    { name: "Fruit & nuts", desc: "Apple slices with almond butter.", kcal: 210, tags: ["Quick"] },
    { name: "Roasted chickpeas", desc: "Crunchy, spiced protein snack.", kcal: 180, tags: ["Protein"] },
  ],
};

const nonveg = {
  breakfast: [
    { name: "Egg & avocado toast", desc: "2 eggs, avocado, whole-grain toast.", kcal: 420, tags: ["Protein"] },
    { name: "Chicken sausage bowl", desc: "Sausage, sweet potato, spinach.", kcal: 400, tags: ["Protein"] },
  ],
  lunch: [
    { name: "Grilled chicken salad", desc: "Chicken, greens, olive oil, quinoa.", kcal: 500, tags: ["High protein"] },
    { name: "Turkey rice bowl", desc: "Ground turkey, brown rice, veg.", kcal: 540, tags: ["Balanced"] },
  ],
  dinner: [
    { name: "Baked salmon", desc: "Salmon, roasted veg, lemon.", kcal: 520, tags: ["Omega-3"] },
    { name: "Chicken stir-fry", desc: "Chicken, broccoli, garlic, rice.", kcal: 500, tags: ["Balanced"] },
  ],
  snacks: [
    { name: "Boiled eggs", desc: "2 eggs with black pepper.", kcal: 155, tags: ["Protein"] },
    { name: "Tuna & crackers", desc: "Tuna with whole-grain crackers.", kcal: 220, tags: ["Protein"] },
  ],
};

function Nutrition() {
  const { profile } = useProfile();
  const meals = profile.food === "vegetarian" ? vegetarian : nonveg;
  const water = recommendedWater(profile.weight);
  const drank = 1.6;
  const waterPct = Math.min(100, Math.round((drank / water) * 100));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Nutrition Assistant</h1>
          <p className="text-sm text-muted-foreground">
            Personalized meals for {profile.food === "vegetarian" ? "Vegetarian" : "Non-Vegetarian"} preference.
          </p>
        </div>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/15">
          {profile.food === "vegetarian" ? "Vegetarian" : "Non-Vegetarian"}
        </Badge>
      </div>

      {/* Hydration */}
      <Card className="mb-6 overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[1fr_auto]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-semibold">Daily water intake</div>
                <p className="text-sm text-muted-foreground">
                  Target: {water} L · Drink a glass every 1–2 hours.
                </p>
              </div>
            </div>
            <Progress value={waterPct} className="mt-4 h-2" />
            <div className="mt-2 text-xs text-muted-foreground">
              {drank} L of {water} L ({waterPct}%)
            </div>
          </CardContent>
          <div className="hidden md:block bg-gradient-primary p-6 text-primary-foreground">
            <div className="font-display text-4xl font-bold">{water}L</div>
            <div className="text-xs opacity-90">recommended</div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <MealSection icon={Coffee} title="Breakfast" meals={meals.breakfast} />
        <MealSection icon={Salad} title="Lunch" meals={meals.lunch} />
        <MealSection icon={UtensilsCrossed} title="Dinner" meals={meals.dinner} />
        <MealSection icon={Cookie} title="Healthy Snacks" meals={meals.snacks} />
      </div>
    </div>
  );
}

function MealSection({
  icon: Icon,
  title,
  meals,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  meals: Meal[];
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {meals.map((m) => (
          <div
            key={m.name}
            className="rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold">{m.name}</div>
                <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
              </div>
              <Badge variant="secondary" className="shrink-0 gap-1">
                <Flame className="h-3 w-3" /> {m.kcal}
              </Badge>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {m.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
