import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { chatWithCoach } from "./api/_chat";
export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "AI Fitness Coach — Fitness Buddy" },
      { name: "description", content: "Chat with your AI fitness coach — powered by IBM Granite (coming soon)." },
    ],
  }),
  component: Coach,
});

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const starters = [
  "Suggest a 20-minute home workout",
  "How much protein should I eat?",
  "Tips to stay motivated",
  "Best stretch for tight hips",
];

const canned = [
  "Great question! A balanced routine mixes strength, cardio and mobility across the week. Start with 3 strength days and 2 cardio sessions.",
  "For most active adults, aim for 1.2–2.0g of protein per kg of body weight, spread across meals.",
  "Track small wins daily — a 10-minute walk still counts. Consistency beats intensity every time.",
  "Hydration matters: sip water throughout the day rather than chugging it all at once.",
];

function Coach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! I'm your Fitness Buddy AI coach. Ask me anything about workouts, nutrition or habits — I'm here to help.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || thinking) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text: t };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: canned[Math.floor(Math.random() * canned.length)],
      };
      setMessages((m) => [...m, reply]);
      setThinking(false);
      inputRef.current?.focus();
    }, 900);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] w-full max-w-4xl flex-col px-4 py-6 sm:px-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
          <Bot className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h1 className="font-display text-xl font-bold sm:text-2xl">AI Fitness Coach</h1>
          <p className="text-xs text-muted-foreground">
            Placeholder responses · IBM Granite integration coming soon
          </p>
        </div>
      </div>

      <Card className="flex flex-1 min-h-0 flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {thinking && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex gap-1">
                  <Dot delay="0s" />
                  <Dot delay="0.15s" />
                  <Dot delay="0.3s" />
                </div>
              </div>
            )}
            {messages.length <= 1 && (
              <div className="mt-2">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" /> Try asking
                </div>
                <div className="flex flex-wrap gap-2">
                  {starters.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary hover:bg-primary/5"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2 border-t bg-background/60 p-3 sm:p-4"
        >
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask your coach anything..."
            rows={1}
            className="min-h-[44px] resize-none"
          />
          <Button
            type="submit"
            disabled={!input.trim() || thinking}
            className="h-11 shrink-0 bg-gradient-primary shadow-soft"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </Card>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={"flex items-start gap-3 " + (isUser ? "flex-row-reverse" : "")}>
      <div
        className={
          "grid h-8 w-8 shrink-0 place-items-center rounded-full text-white " +
          (isUser ? "bg-success" : "bg-gradient-primary")
        }
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed animate-fade-in " +
          (isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-muted text-foreground rounded-tl-sm")
        }
      >
        {message.text}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-2 w-2 animate-pulse rounded-full bg-primary/60"
      style={{ animationDelay: delay }}
    />
  );
}
