import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="border border-[var(--line)] bg-[var(--paper)] flex flex-col">
      <div className="aspect-video bg-[var(--paper-2)] border-b border-[var(--line)] flex items-center justify-center">
        {/* TODO: replace with next/image when service photos available */}
        <span className="text-[var(--muted)] text-sm">Photo coming soon</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-[var(--ink)] text-lg mb-2">{service.name}</h3>
        <p className="text-[var(--muted)] text-sm leading-relaxed flex-1 mb-4">{service.shortDescription}</p>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-red)] hover:gap-2 transition-all"
        >
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
