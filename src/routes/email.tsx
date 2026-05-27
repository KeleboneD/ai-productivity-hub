import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workmate AI" },
      { name: "description", content: "Draft polished, on-tone emails from a short brief." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <ToolWorkspace
      tool="email"
      title="Smart Email Generator"
      description="Generate a clean, professional email from a short brief."
      icon={<Mail className="h-6 w-6" />}
      fields={[
        { name: "recipient", label: "Recipient & context", placeholder: "e.g. My manager — about delaying the Q3 report by 2 days" },
        { name: "purpose", label: "Purpose / key points", placeholder: "What should the email accomplish? Key facts to include.", rows: 4 },
        { name: "tone", label: "Tone", placeholder: "e.g. Professional, friendly, apologetic, direct…", rows: 2 },
      ]}
      buildPrompt={(v) =>
        `Recipient & context:\n${v.recipient}\n\nPurpose & key points:\n${v.purpose}\n\nTone:\n${v.tone}\n\nDraft the email.`
      }
      outputLabel="Draft email"
    />
  );
}
