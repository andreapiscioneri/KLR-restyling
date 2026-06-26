"use client";
import { ArrowUpRight } from "lucide-react";

export const hairline = "border border-black/5";
export const softShadow = { boxShadow: "0 40px 100px -40px rgba(46,39,132,0.18)" };

// Opens the user's email client with a prefilled draft recapping a form's fields.
// mailto: links can't carry file attachments — file inputs are listed by filename only,
// with a note asking the sender to attach the file manually before sending.
export function openMailtoDraft(form: HTMLFormElement, to: string, subject: string) {
  const data = new FormData(form);
  const lines: string[] = [];
  for (const [key, value] of data.entries()) {
    if (value instanceof File) {
      if (value.name) lines.push(`${key}: ${value.name} (please attach this file manually)`);
    } else if (value) {
      lines.push(`${key}: ${value}`);
    }
  }
  const body = lines.join("\n");
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Eyebrow({ children, onDark = false, lineColor = "#F8AE01" }: { children: React.ReactNode; onDark?: boolean; lineColor?: string }) {
  return (
    <div
      className={`tracking-[0.25em] uppercase flex items-center gap-3 ${onDark ? "text-white" : "text-[#2E2784]"}`}
      style={{ fontSize: "0.7rem" }}
    >
      <span className="inline-block w-6 h-px" style={{ background: lineColor }} />
      <span>{children}</span>
    </div>
  );
}

export function CTA({
  label,
  onClick,
  variant = "dark",
}: {
  label: string;
  onClick?: () => void;
  variant?: "dark" | "yellow" | "white";
}) {
  const cfg =
    variant === "yellow"
      ? { bg: "bg-[#F8AE01] text-black hover:bg-[#2E2784] hover:text-white", chip: "bg-black/10" }
      : variant === "white"
      ? { bg: "bg-white text-black hover:bg-[#F8AE01] hover:text-black", chip: "bg-black/10" }
      : { bg: "bg-[#2E2784] text-white hover:bg-[#F8AE01] hover:text-black", chip: "bg-white/15" };
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-3 ${cfg.bg} rounded-full pl-5 pr-2 py-2 transition-all duration-500 tracking-tight`}
      style={{ fontSize: "0.9rem" }}
    >
      <span>{label}</span>
      <span className={`w-8 h-8 rounded-full ${cfg.chip} flex items-center justify-center`}>
        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
      </span>
    </button>
  );
}
