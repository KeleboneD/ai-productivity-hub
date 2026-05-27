import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workmate AI" },
      { name: "description", content: "Get a structured briefing on any topic." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <ToolWorkspace
      tool="research"
      title="AI Research Assistant"
      description="Get a structured briefing — concepts, trends, considerations, and open questions."
      icon={<Search className="h-6 w-6" />}
      fields={[
        { name: "topic", label: "Topic", placeholder: "e.g. Vector databases for enterprise search", rows: 2 },
        { name: "angle", label: "Specific angle or audience", placeholder: "e.g. For a non-technical executive audience, focus on cost & ROI", rows: 3, required: false },
      ]}
      buildPrompt={(v) =>
        `Topic:\n${v.topic}\n\nAngle / audience:\n${v.angle || "(general professional audience)"}\n\nProduce the briefing.`
      }
      outputLabel="Research briefing"
    />
  );
}
