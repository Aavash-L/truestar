"use client";
import { useEffect, useState } from "react";
import { CheckCircle, Circle, ExternalLink } from "lucide-react";
import type { ChecklistCategory } from "@/data/seo-checklist";

type Props = {
  checklist: ChecklistCategory[];
  grantAccess?: boolean;
};

export function SeoChecklistClient({ checklist, grantAccess }: Props) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (grantAccess) {
      document.cookie = "seo_access=truestar2026; path=/; max-age=86400";
    }
    try {
      const stored = localStorage.getItem("seo_checklist");
      if (stored) setChecked(JSON.parse(stored));
    } catch {}
  }, [grantAccess]);

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try {
      localStorage.setItem("seo_checklist", JSON.stringify(next));
    } catch {}
  };

  const total = checklist.flatMap((c) => c.items).length;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <h1 className="font-display font-bold text-[var(--ink)] text-3xl">SEO Checklist</h1>
        <div className="text-sm text-[var(--muted)]">
          <span className="font-bold text-[var(--ink)]">{done}</span> / {total} complete
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[var(--paper-2)] mb-12 border border-[var(--line)]">
        <div
          className="h-full bg-[var(--brand-red)] transition-all duration-500"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>

      <div className="space-y-12">
        {checklist.map((category) => (
          <section key={category.id}>
            <h2 className="font-bold text-[var(--ink)] text-lg mb-6 pb-2 border-b border-[var(--line)]">
              {category.name}
            </h2>
            <ul className="space-y-4">
              {category.items.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <button
                    onClick={() => toggle(item.id)}
                    className="flex-shrink-0 mt-0.5 text-[var(--muted)] hover:text-[var(--brand-red)] transition-colors"
                    aria-label={checked[item.id] ? "Mark incomplete" : "Mark complete"}
                  >
                    {checked[item.id] ? (
                      <CheckCircle size={20} className="text-green-600" />
                    ) : (
                      <Circle size={20} />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-semibold text-sm ${checked[item.id] ? "line-through text-[var(--muted)]" : "text-[var(--ink)]"}`}>
                        {item.title}
                      </span>
                      <span
                        className={`text-xs px-1.5 py-0.5 font-bold uppercase tracking-wide ${
                          item.priority === "high"
                            ? "bg-red-100 text-[var(--brand-red)]"
                            : item.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-[var(--paper-2)] text-[var(--muted)]"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{item.description}</p>
                    {item.resource && (
                      <a
                        href={item.resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[var(--brand-red)] mt-1 hover:underline"
                      >
                        {item.resourceLabel || item.resource} <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="text-xs text-[var(--muted)] mt-12 text-center">
        Progress is saved in your browser&apos;s localStorage. This page is not indexed by search engines.
      </p>
    </div>
  );
}
