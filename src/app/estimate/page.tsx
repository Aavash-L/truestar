import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { EstimateForm } from "@/components/forms/EstimateForm";

export const metadata: Metadata = {
  title: "Request a Free Estimate | True Star Contracting LLC",
  description:
    "Request a free on-site estimate for demolition, asbestos removal, or mold remediation in North Jersey. We respond within 24 hours. Call (201) 790-4530.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <>
      <section className="bg-[var(--ink)] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Request a Free Estimate
          </h1>
          <p className="text-white/80 text-lg mb-2">
            We&apos;ll respond within 24 hours with next steps.
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
