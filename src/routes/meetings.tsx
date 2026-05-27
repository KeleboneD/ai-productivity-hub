import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workmate AI" },
      { name: "description", content: "Turn raw meeting notes into summaries and action items." },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  return (
    <ToolWorkspace
      tool="summary"
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript. Get a TL;DR, decisions, and action items."
      icon={<FileText className="h-6 w-6" />}
      fields={[
        { name: "context", label: "Meeting context", placeholder: "e.g. Weekly product sync, attendees: Anna, Ben, Chen", rows: 2, required: false },
        { name: "notes", label: "Raw notes or transcript", placeholder: "Paste your notes or transcript here…", rows: 12 },
      ]}
      buildPrompt={(v) =>
        `Meeting context:\n${v.context || "(none provided)"}\n\nRaw notes:\n${v.notes}\n\nProduce the structured summary.`
      }
      outputLabel="Summary"
    />
  );
}
