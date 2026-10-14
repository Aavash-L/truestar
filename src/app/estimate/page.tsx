import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { EstimateForm } from "@/components/forms/EstimateForm";

export const metadata: Metadata = {
  title: "Schedule a Free On-Site Estimate | True Star Contracting LLC",
  description:
    "Schedule a free on-site estimate for demolition, asbestos removal, or mold remediation in North Jersey. We come to you. Call (908) 402-0192.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <>
      <section className="bg-[var(--ink)] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Schedule a Free On-Site Estimate
          </h1>
          <p className="text-white/80 text-lg mb-2">
            Fill out the form and we&apos;ll call you to schedule a visit. Every estimate is done in person — we need to see the job before we can quote it.
          </p>
          <a href={siteConfig.phone.href} className="inline-flex items-center gap-2 text-[var(--brand-red)] font-bold text-lg hover:text-red-400 transition-colors">
            <Phone size={20} />
            Or call now: {siteConfig.phone.display}
          </a>
        </div>
      </section>

      <section className="bg-[var(--paper)] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <EstimateForm />
        </div>
      </section>
    </>
  );
}
