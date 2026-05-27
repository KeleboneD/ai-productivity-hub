# AI Workplace Productivity Assistant

A modern, responsive web application that helps professionals automate workplace tasks using AI. Built with React, Tailwind CSS, and TanStack Start.

## Features

### Smart Email Generator
Compose professional emails quickly. Enter a brief description, choose a tone, and get a polished email ready to send.

### Meeting Notes Summarizer
Paste raw meeting notes and get structured summaries with TL;DR, key discussion points, decisions, and actionable items.

### AI Task Planner
Describe a goal or project, and receive a comprehensive plan broken into phases with timelines and risk assessments.

### AI Research Assistant
Generate structured research briefings on any topic, complete with key concepts, trends, and suggested follow-up questions.

### AI Chatbot Interface
An interactive chat for general workplace productivity questions and brainstorming.

## Tech Stack

- **Frontend Framework:** [TanStack Start](https://tanstack.com/start) (React + file-based routing)
- **Styling:** Tailwind CSS v4 with custom OKLCH design tokens
- **UI Components:** shadcn/ui
- **AI Integration:** Lovable AI Gateway (Gemini models)
- **Backend:** Lovable Cloud (server functions & database)

## Project Structure

```
src/
  components/          # Reusable UI components
    AppSidebar.tsx     # Collapsible navigation sidebar
    Disclaimer.tsx     # Responsible AI disclaimer
    ToolWorkspace.tsx  # Generic AI tool interface
    ui/                # shadcn/ui components
  integrations/
    supabase/          # Auth, middleware, and client setup
  lib/
    ai.functions.ts    # Server functions for AI tool calls
  routes/              # File-based routes
    __root.tsx         # Root layout with sidebar & toast
    index.tsx          # Dashboard homepage
    chat.tsx           # Chatbot interface
    email.tsx          # Email generator
    meetings.tsx       # Meeting summarizer
    planner.tsx        # Task planner
    research.tsx       # Research assistant
  styles.css           # Global styles & design tokens
```

## Getting Started

### Prerequisites
- Node.js 20+
- bun (recommended) or npm

### Installation

```bash
bun install
```

### Environment Variables

Create a `.env` file with:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
LOVABLE_API_KEY=...       # For AI gateway access
```

### Development

```bash
bun run dev
```

The app will be available at `http://localhost:3000`.

### Build

```bash
bun run build
```

## Design System

- **Color Palette:** Midnight Indigo — deep navy with electric indigo accents
- **Typography:** Geist Sans (body) & Geist Mono (monospace)
- **Tokens:** All colors defined as OKLCH CSS custom properties in `src/styles.css`

## Key Components

- **ToolWorkspace:** Reusable wrapper for all AI tools. Handles form submission, loading states, editable output, and copy-to-clipboard.
- **AppSidebar:** Collapsible sidebar navigation with tool links and responsive behavior.
- **Disclaimer:** Reusable responsible AI notice displayed across all tools.

## AI Prompts

Each tool uses a specialized system prompt (defined in `src/lib/ai.functions.ts`) to guide the AI model toward high-quality, structured output:

- **Email:** Professional business writing, subject-first format
- **Summary:** TL;DR → Key Points → Decisions → Action Items
- **Planner:** Phased checklists with timelines and risk analysis
- **Research:** Executive summary → concepts → trends → considerations
- **Chat:** Concise, helpful workplace assistant persona

## License

MIT
