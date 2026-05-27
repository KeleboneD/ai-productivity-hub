import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workmate AI" },
      { name: "description", content: "Turn a goal into a phased, actionable plan." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <ToolWorkspace
      tool="planner"
      title="AI Task Planner"
      description="Describe your goal — get a phased plan with tasks, timeline, and risks."
      icon={<ListChecks className="h-6 w-6" />}
      fields={[
        { name: "goal", label: "Goal", placeholder: "e.g. Launch a new pricing page for our SaaS by end of quarter", rows: 3 },
        { name: "constraints", label: "Constraints & resources", placeholder: "Team size, deadline, budget, dependencies…", rows: 3, required: false },
      ]}
      buildPrompt={(v) =>
        `Goal:\n${v.goal}\n\nConstraints & resources:\n${v.constraints || "(none specified)"}\n\nProduce the plan.`
      }
      outputLabel="Action plan"
    />
  );
}
