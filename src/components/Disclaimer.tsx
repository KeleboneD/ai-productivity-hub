import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
      <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <p>
        AI outputs can be inaccurate or biased. Review for accuracy and confidentiality before
        sharing. Don't paste regulated or personal data you wouldn't put in an external tool.
      </p>
    </div>
  );
}
