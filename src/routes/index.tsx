import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Dumbbell,
  Apple,
  Bot,
  Sparkles,
  LayoutDashboard,
  Heart,
  Activity,
  Flame,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

const features = [
  { icon: LayoutDashboard, title: "Smart Dashboard", desc: "BMI, goals, workouts and water intake at a glance." },
  { icon: Dumbbell, title: "Workout Planner", desc: "Home-based weekly plans for every level." },
  { icon: Apple, title: "Nutrition Assistant", desc: "Meals tailored to your goal and food preference." },
  { icon: Bot, title: "AI Fitness Coach", desc: "Chat with your coach for real-time guidance." },
  { icon: Sparkles, title: "Motivation & Habits", desc: "Daily quotes, sleep tips and habit builders." },
  { icon: Activity, title: "Progress Tracking", desc: "Weekly activity summaries that keep you honest." },
];

function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-success/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:py-28 md:items-center">
          <div className="text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Flame className="h-3.5 w-3.5" /> AI-Powered Coaching
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Fitness Buddy –<br />
              <span className="bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                Your AI Virtual Fitness Coach
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-white/85 sm:text-lg">
              Personalized workouts, smart nutrition, and a chat coach that keeps you moving —
              built to help you hit any fitness goal from your living room.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                <Link to="/profile">
                  Get Started <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center text-white/90">
              {[
                { k: "50+", v: "Workouts" },
                { k: "100+", v: "Meals" },
                { k: "24/7", v: "AI Coach" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl bg-white/10 p-3 backdrop-blur">
                  <div className="font-display text-2xl font-bold">{s.k}</div>
                  <div className="text-xs opacity-80">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="relative hidden md:block">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-[3rem] bg-white/10 backdrop-blur-lg border border-white/20" />
              <div className="absolute inset-8 rounded-[2.5rem] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-40 w-40 place-items-center rounded-full bg-white/20 backdrop-blur shadow-glow">
                  <Heart className="h-20 w-20 text-white" fill="currentColor" />
                </div>
              </div>
              <FloatingIcon className="top-6 left-6" delay="0s"><Dumbbell className="h-7 w-7 text-primary" /></FloatingIcon>
              <FloatingIcon className="top-10 right-4" delay="0.5s"><Apple className="h-7 w-7 text-success" /></FloatingIcon>
              <FloatingIcon className="bottom-10 left-4" delay="1s"><Trophy className="h-7 w-7 text-primary" /></FloatingIcon>
              <FloatingIcon className="bottom-6 right-6" delay="1.5s"><Activity className="h-7 w-7 text-success" /></FloatingIcon>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold text-primary">Everything you need</div>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            One clean dashboard for your fitness journey
          </h2>
          <p className="mt-3 text-muted-foreground">
            From planning workouts to tracking hydration, Fitness Buddy brings it all together — with
            AI guidance built in.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-primary-foreground shadow-glow md:p-14">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold md:text-3xl">Ready to train smarter?</h3>
              <p className="mt-2 max-w-lg text-white/85">
                Set up your profile in under a minute and unlock your personalized plan.
              </p>
            </div>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/profile">
                Create My Plan <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FloatingIcon({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-glow animate-fade-in ${className}`}
      style={{ animationDelay: delay, animationDuration: "0.8s" }}
    >
      {children}
    </div>
  );
}
