import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-[var(--muted)] flex-wrap">
      <Link href="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={12} />
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-[var(--ink)] transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-[var(--ink)]">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
