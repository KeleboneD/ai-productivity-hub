import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workmate AI" },
      { name: "description", content: "Your AI workplace productivity dashboard." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    desc: "Draft polished, on-tone emails in seconds from a short brief.",
  },
  {
    to: "/meetings",
    icon: FileText,
    title: "Meeting Notes Summarizer",
    desc: "Turn raw notes or transcripts into TL;DRs, decisions, and action items.",
  },
  {
    to: "/planner",
    icon: ListChecks,
    title: "AI Task Planner",
    desc: "Break goals into phased, actionable plans with timelines and risks.",
  },
  {
    to: "/research",
    icon: Search,
    title: "AI Research Assistant",
    desc: "Structured briefings on any topic — concepts, trends, open questions.",
  },
  {
    to: "/chat",
    icon: MessageSquare,
    title: "AI Chatbot",
    desc: "A general-purpose assistant for any quick workplace question.",
  },
] as const;

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-4 md:p-8">
      <section
        className="relative overflow-hidden rounded-2xl border border-border p-6 md:p-10"
        style={{ backgroundImage: "var(--gradient-subtle)" }}
      >
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
             style={{ backgroundImage: "var(--gradient-primary)" }} />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Powered by AI
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Your AI workplace,<br className="hidden md:block" /> assembled.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Generate emails, summarize meetings, plan projects, research topics, and chat — all
            from one clean, professional workspace.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="group">
            <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-primary)" }}
                  >
                    <t.icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="mt-3 text-base">{t.title}</CardTitle>
                <CardDescription>{t.desc}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </Link>
        ))}
      </section>

      <Disclaimer />
    </div>
  );
}
