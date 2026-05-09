import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function StickyTopBar() {
  return (
    <div className="hidden lg:flex items-center justify-between h-12 px-6 bg-[var(--ink)] text-white text-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2 text-[var(--muted)]">
        <span className="text-white font-semibold">True Star Contracting LLC</span>
        <span>·</span>
        <span>Licensed &amp; Insured · NJ + NY</span>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={siteConfig.phone.href}
          className="flex items-center gap-1.5 text-white hover:text-[var(--brand-red)] transition-colors font-semibold"
        >
          <Phone size={14} />
          {siteConfig.phone.display}
        </a>
        <Link
          href="/estimate"
          className="bg-[var(--brand-red)] text-white px-4 py-1.5 text-sm font-semibold hover:bg-red-700 transition-colors"
        >
          Free Estimate
        </Link>
      </div>
    </div>
  );
}
