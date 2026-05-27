import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

type Msg = { role: "system" | "user" | "assistant"; content: string };

const SYSTEM_PROMPTS: Record<string, string> = {
  email:
    "You are an expert business writing assistant. Draft a clear, professional email based on the user's brief. Match the requested tone exactly. Output ONLY the email with a Subject line on the first line (format: 'Subject: ...'), a blank line, then the body. No commentary, no markdown fences.",
  summary:
    "You are an expert meeting notes summarizer. Produce: 1) A 2-3 sentence TL;DR. 2) Key Discussion Points (bulleted). 3) Decisions Made. 4) Action Items as a markdown table with columns Owner | Task | Due. Use clear markdown headings (##).",
  planner:
    "You are an AI project planner. Break the user's goal into an actionable plan. Output: 1) Objective (1 sentence). 2) A markdown checklist of tasks grouped by phase (## Phase 1, ## Phase 2...). 3) Suggested timeline. 4) Risks & mitigations. Keep tasks concrete and verb-led.",
  research:
    "You are an AI research assistant. Given a topic, produce a structured briefing: 1) Executive Summary. 2) Key Concepts (bulleted definitions). 3) Current State & Trends. 4) Notable Considerations / Debates. 5) Suggested Next Questions. Use markdown headings. Note that you don't have live web access, so flag where the user should verify recent facts.",
  chat:
    "You are an AI workplace productivity assistant. Be concise, helpful, and professional. Use markdown when it improves clarity. If asked to do something outside ethical/safe boundaries, decline briefly.",
};

export const runAITool = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      tool: z.enum(["email", "summary", "planner", "research", "chat"]),
      messages: z
        .array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string().min(1).max(20000),
          }),
        )
        .min(1)
        .max(40),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const messages: Msg[] = [
      { role: "system", content: SYSTEM_PROMPTS[data.tool] },
      ...data.messages,
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
      }),
    });

    if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
    if (res.status === 402)
      throw new Error("AI credits exhausted. Add credits in Settings → Workspace → Usage.");
    if (!res.ok) {
      const t = await res.text();
      console.error("AI gateway error", res.status, t);
      throw new Error("AI request failed. Please try again.");
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
