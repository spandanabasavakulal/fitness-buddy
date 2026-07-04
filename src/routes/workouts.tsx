import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Clock, Flame, Moon, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/workouts")({
  head: () => ({
    meta: [
      { title: "Workout Planner — Fitness Buddy" },
      { name: "description", content: "Weekly home-based workouts for beginners and intermediates." },
    ],
  }),
  component: WorkoutPlanner,
});

type Level = "Beginner" | "Intermediate";

interface Workout {
  day: string;
  title: string;
  focus: string;
  duration: number;
  calories: number;
  level: Level;
  rest?: boolean;
  exercises: { name: string; sets: string }[];
}

const plan: Workout[] = [
  {
    day: "Monday",
    title: "Full Body Strength",
    focus: "Full body",
    duration: 30,
    calories: 220,
    level: "Beginner",
    exercises: [
      { name: "Bodyweight squats", sets: "3 × 15" },
      { name: "Push-ups (knee)", sets: "3 × 10" },
      { name: "Glute bridges", sets: "3 × 15" },
      { name: "Plank", sets: "3 × 30s" },
    ],
  },
  {
    day: "Tuesday",
    title: "HIIT Cardio Burn",
    focus: "Cardio",
    duration: 25,
    calories: 280,
    level: "Intermediate",
    exercises: [
      { name: "Jumping jacks", sets: "4 × 40s" },
      { name: "High knees", sets: "4 × 30s" },
      { name: "Burpees", sets: "4 × 10" },
      { name: "Mountain climbers", sets: "4 × 40s" },
    ],
  },
  {
    day: "Wednesday",
    title: "Active Recovery",
    focus: "Mobility",
    duration: 20,
    calories: 90,
    level: "Beginner",
    rest: true,
    exercises: [
      { name: "Yoga flow", sets: "10 min" },
      { name: "Foam roll", sets: "5 min" },
      { name: "Deep stretches", sets: "5 min" },
    ],
  },
  {
    day: "Thursday",
    title: "Upper Body Push",
    focus: "Chest & shoulders",
    duration: 30,
    calories: 210,
    level: "Intermediate",
    exercises: [
      { name: "Push-ups", sets: "4 × 12" },
      { name: "Pike push-ups", sets: "3 × 8" },
      { name: "Tricep dips", sets: "3 × 12" },
      { name: "Plank shoulder taps", sets: "3 × 20" },
    ],
  },
  {
    day: "Friday",
    title: "Lower Body Focus",
    focus: "Legs & glutes",
    duration: 35,
    calories: 260,
    level: "Beginner",
    exercises: [
      { name: "Lunges", sets: "3 × 12/leg" },
      { name: "Squat pulses", sets: "3 × 20" },
      { name: "Single-leg glute bridge", sets: "3 × 10" },
      { name: "Wall sit", sets: "3 × 45s" },
    ],
  },
  {
    day: "Saturday",
    title: "Core Crusher",
    focus: "Abs & core",
    duration: 20,
    calories: 160,
    level: "Intermediate",
    exercises: [
      { name: "Crunches", sets: "3 × 20" },
      { name: "Leg raises", sets: "3 × 12" },
      { name: "Russian twists", sets: "3 × 30" },
      { name: "Plank", sets: "3 × 45s" },
    ],
  },
  {
    day: "Sunday",
    title: "Rest Day",
    focus: "Recovery",
    duration: 0,
    calories: 0,
    level: "Beginner",
    rest: true,
    exercises: [
      { name: "Light walk", sets: "20 min" },
      { name: "Hydration & sleep", sets: "Priority" },
    ],
  },
];

function WorkoutPlanner() {
  const [level, setLevel] = useState<"All" | Level>("All");
  const filtered = level === "All" ? plan : plan.filter((w) => w.level === level || w.rest);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Workout Planner</h1>
          <p className="text-sm text-muted-foreground">
            7-day home routine — no equipment required.
          </p>
        </div>
        <Tabs value={level} onValueChange={(v) => setLevel(v as typeof level)}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Beginner">Beginner</TabsTrigger>
            <TabsTrigger value="Intermediate">Intermediate</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((w) => (
          <Card
            key={w.day}
            className={
              "overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-soft " +
              (w.rest ? "bg-accent/40" : "")
            }
          >
            <div className={"h-1 w-full " + (w.rest ? "bg-gradient-success" : "bg-gradient-primary")} />
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {w.day}
                </div>
                <CardTitle className="mt-1 text-lg">{w.title}</CardTitle>
              </div>
              <div
                className={
                  "grid h-10 w-10 place-items-center rounded-xl text-white " +
                  (w.rest ? "bg-gradient-success" : "bg-gradient-primary")
                }
              >
                {w.rest ? <Moon className="h-5 w-5" /> : <Dumbbell className="h-5 w-5" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" /> {w.duration || "—"} min
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Flame className="h-3 w-3" /> {w.calories} kcal
                </Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/15">{w.level}</Badge>
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {w.focus}
              </div>
              <ul className="mt-2 space-y-2">
                {w.exercises.map((e) => (
                  <li key={e.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {e.name}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{e.sets}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
