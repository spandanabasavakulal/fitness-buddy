import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Droplets,
  Dumbbell,
  Flame,
  HeartPulse,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useProfile, calcBMI, bmiCategory, goalLabel, recommendedWater } from "@/lib/profile";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Fitness Buddy" },
      { name: "description", content: "Your BMI, goals, workouts and hydration in one view." },
    ],
  }),
  component: Dashboard,
});

const weekly = [
  { day: "Mon", value: 80 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 90 },
  { day: "Thu", value: 40 },
  { day: "Fri", value: 75 },
  { day: "Sat", value: 100 },
  { day: "Sun", value: 30 },
];

function Dashboard() {
  const { profile, hydrated } = useProfile();
  const bmi = calcBMI(profile.height, profile.weight);
  const cat = bmiCategory(bmi);
  const water = recommendedWater(profile.weight);
  const drank = 1.6;
  const waterPct = Math.min(100, Math.round((drank / water) * 100));
  const workoutPct = 65;
  const weeklyAvg = Math.round(weekly.reduce((a, b) => a + b.value, 0) / weekly.length);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold sm:text-3xl">
            {hydrated && profile.name ? `Welcome back, ${profile.name.split(" ")[0]}` : "Welcome back"}
          </h1>
          <p className="text-sm text-muted-foreground">Here's your fitness snapshot for today.</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/profile">Edit profile</Link>
        </Button>
      </div>

      {/* Top cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={HeartPulse}
          label="BMI"
          value={bmi.toFixed(1)}
          hint={cat.label}
          tone="primary"
        />
        <StatCard
          icon={Target}
          label="Goal"
          value={goalLabel(profile.goal)}
          hint={`${profile.weight} kg · ${profile.height} cm`}
          tone="success"
        />
        <StatCard
          icon={Flame}
          label="Calories today"
          value="1,840"
          hint="of 2,200 kcal"
          tone="primary"
        />
        <StatCard
          icon={Trophy}
          label="Streak"
          value="7 days"
          hint="Keep it going!"
          tone="success"
        />
      </div>

      {/* Progress */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Workout completion</CardTitle>
            <Dumbbell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="font-display text-4xl font-bold text-primary">{workoutPct}%</div>
              <div className="text-xs text-muted-foreground">This week</div>
            </div>
            <Progress value={workoutPct} className="mt-4 h-2" />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <MiniStat label="Done" value="4" />
              <MiniStat label="Left" value="2" />
              <MiniStat label="Rest" value="1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Water intake</CardTitle>
            <Droplets className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="font-display text-4xl font-bold text-primary">
                {drank}
                <span className="text-lg text-muted-foreground"> / {water} L</span>
              </div>
              <div className="text-xs text-muted-foreground">{waterPct}% of goal</div>
            </div>
            <Progress value={waterPct} className="mt-4 h-2" />
            <div className="mt-3 flex gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={
                    "h-8 flex-1 rounded-md border transition-colors " +
                    (i < Math.round((drank / water) * 8)
                      ? "bg-gradient-primary border-transparent"
                      : "bg-muted")
                  }
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly activity */}
      <Card className="mt-6">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Weekly activity</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">Average completion {weeklyAvg}%</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-success">
            <TrendingUp className="h-3.5 w-3.5" /> +12% vs last week
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-end gap-3">
            {weekly.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-primary transition-all hover:opacity-90"
                    style={{ height: `${d.value}%` }}
                  />
                </div>
                <div className="text-xs font-medium text-muted-foreground">{d.day}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <QuickLink to="/workouts" icon={Dumbbell} title="Today's workout" desc="Full body · 30 min" />
        <QuickLink to="/nutrition" icon={Activity} title="Meal plan" desc="Vegetarian · Balanced" />
        <QuickLink to="/coach" icon={HeartPulse} title="Chat with coach" desc="Ask anything, anytime" />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint: string;
  tone: "primary" | "success";
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {label}
            </div>
            <div className="mt-2 truncate font-display text-2xl font-bold">{value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
          </div>
          <div
            className={
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white " +
              (tone === "primary" ? "bg-gradient-primary" : "bg-gradient-success")
            }
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/60 p-2">
      <div className="font-display text-base font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

function QuickLink({
  to,
  icon: Icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-soft"
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-3 font-display font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </Link>
  );
}
