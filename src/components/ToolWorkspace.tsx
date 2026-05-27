import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { runAITool } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/Disclaimer";
import { toast } from "sonner";

type Field = {
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
};

interface Props {
  tool: "email" | "summary" | "planner" | "research";
  title: string;
  description: string;
  icon: React.ReactNode;
  fields: Field[];
  buildPrompt: (values: Record<string, string>) => string;
  outputLabel?: string;
}

export function ToolWorkspace({
  tool,
  title,
  description,
  icon,
  fields,
  buildPrompt,
  outputLabel = "Output",
}: Props) {
  const run = useServerFn(runAITool);
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    for (const f of fields) {
      if (f.required !== false && !values[f.name]?.trim()) {
        toast.error(`Please fill in: ${f.label}`);
        return;
      }
    }
    setLoading(true);
    setOutput("");
    try {
      const res = await run({ data: { tool, messages: [{ role: "user", content: buildPrompt(values) }] } });
      setOutput(res.content);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-8">
      <header className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground shadow-[var(--shadow-elegant)]"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">{description}</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Input</CardTitle>
            <CardDescription>Provide structured details to guide the AI.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              {fields.map((f) => (
                <div key={f.name} className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor={f.name}>
                    {f.label}
                    {f.required !== false && <span className="text-destructive"> *</span>}
                  </label>
                  <Textarea
                    id={f.name}
                    placeholder={f.placeholder}
                    rows={f.rows ?? 3}
                    value={values[f.name] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                    className="resize-none"
                  />
                </div>
              ))}
              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Generate
                  </>
                )}
              </Button>
              <Disclaimer />
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">{outputLabel}</CardTitle>
              <CardDescription>You can edit the result before using it.</CardDescription>
            </div>
            {output && (
              <Button variant="outline" size="sm" onClick={copy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {!output && !loading && (
              <div className="flex h-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                Output will appear here.
              </div>
            )}
            {loading && !output && (
              <div className="flex h-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Thinking…
              </div>
            )}
            {output && (
              <Textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                rows={18}
                className="font-mono text-sm leading-relaxed"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
