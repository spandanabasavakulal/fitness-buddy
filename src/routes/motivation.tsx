import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Quote,
  Moon,
  Droplets,
  Apple,
  Wind,
  Sun,
  Sparkles,
  Shuffle,
  Dumbbell,
} from "lucide-react";

export const Route = createFileRoute("/motivation")({
  head: () => ({
    meta: [
      { title: "Motivation & Habits — Fitness Buddy" },
      { name: "description", content: "Daily quotes, healthy habits, sleep and hydration tips." },
    ],
  }),
  component: Motivation,
});

const quotes = [
  { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
  { text: "Small steps every day lead to big changes.", author: "Anonymous" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "Fitness is not about being better than someone else. It's about being better than you used to be.", author: "Khloé Kardashian" },
];

const habits = [
  { icon: Moon, title: "Sleep 7–9 hours", desc: "Consistent sleep boosts recovery, mood and metabolism." },
  { icon: Droplets, title: "Hydrate first thing", desc: "Start the day with a glass of water before coffee." },
  { icon: Apple, title: "Eat whole foods", desc: "Fill half your plate with fruits and vegetables." },
  { icon: Wind, title: "Move every hour", desc: "Take a 2-minute stretch break to reset posture." },
  { icon: Sun, title: "Morning sunlight", desc: "10 minutes outside helps regulate your circadian rhythm." },
  { icon: Dumbbell, title: "Train 3–5×/week", desc: "Mix strength, cardio and mobility for balanced fitness." },
];

const sleepTips = [
  "Keep your bedroom cool (18–20°C) and dark.",
  "No screens 30 minutes before bed.",
  "Same sleep and wake time — even on weekends.",
];

const waterTips = [
  "Carry a 1L bottle and refill twice.",
  "Drink a glass before every meal.",
  "Add lemon or mint if plain water feels boring.",
];

function Motivation() {
  const [idx, setIdx] = useState(0);
  const q = quotes[idx];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:py-10">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Motivation & Habits</h1>
        <p className="text-sm text-muted-foreground">
          Small daily wins compound into lifelong health.
        </p>
      </div>

      {/* Quote */}
      <Card className="mb-6 overflow-hidden border-0 bg-gradient-hero text-primary-foreground shadow-glow">
        <CardContent className="p-8 md:p-12">
          <Quote className="h-8 w-8 opacity-70" />
          <blockquote className="mt-4 font-display text-2xl font-semibold leading-snug md:text-3xl">
            "{q.text}"
          </blockquote>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm opacity-90">— {q.author}</div>
            <Button
              variant="secondary"
              onClick={() => setIdx((i) => (i + 1) % quotes.length)}
              className="bg-white/15 text-primary-foreground hover:bg-white/25"
            >
              <Shuffle className="mr-1 h-4 w-4" /> New quote
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Habits */}
      <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
        <Sparkles className="h-4 w-4 text-primary" /> Healthy habits
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {habits.map((h) => (
          <Card key={h.title} className="transition-all hover:-translate-y-0.5 hover:shadow-soft">
            <CardContent className="p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                <h.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 font-display font-semibold">{h.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <TipCard icon={Moon} title="Sleep recommendations" tips={sleepTips} tone="primary" />
        <TipCard icon={Droplets} title="Water reminders" tips={waterTips} tone="success" />
      </div>
    </div>
  );
}

function TipCard({
  icon: Icon,
  title,
  tips,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tips: string[];
  tone: "primary" | "success";
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <div
          className={
            "grid h-10 w-10 place-items-center rounded-xl text-white " +
            (tone === "primary" ? "bg-gradient-primary" : "bg-gradient-success")
          }
        >
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tips.map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm">
              <span
                className={
                  "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full " +
                  (tone === "primary" ? "bg-primary" : "bg-success")
                }
              />
              {t}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
