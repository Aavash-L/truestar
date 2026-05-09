"use client";
import { Phone } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

export function StickyMobileBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex h-16 pb-safe border-t border-[var(--line)]">
      <a
        href={siteConfig.phone.href}
        className="flex-1 flex items-center justify-center gap-2 bg-[var(--brand-red)] text-white font-bold text-sm"
      >
        <Phone size={18} />
        Call {siteConfig.phone.display}
      </a>
      <Link
        href="/estimate"
        className="flex-1 flex items-center justify-center bg-[var(--ink)] text-white font-bold text-sm border-l border-[var(--ink-2)]"
      >
        Get Estimate
      </Link>
    </div>
  );
}
