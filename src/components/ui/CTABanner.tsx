import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function CTABanner({ service }: { service?: string }) {
  return (
    <section className="bg-[var(--brand-red)] py-12 px-4">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Get a Free {service ? `${service} ` : ""}Estimate
        </h2>
        <p className="text-red-100 mb-6">We respond within 24 hours. On-site visits, written quotes.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={siteConfig.phone.href}
            className="inline-flex items-center justify-center gap-2 bg-white text-[var(--brand-red)] px-8 py-4 font-bold text-lg hover:bg-red-50 transition-colors"
          >
            <Phone size={20} />
            {siteConfig.phone.display}
          </a>
          <Link
            href="/estimate"
            className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 font-bold text-lg hover:bg-red-700 transition-colors"
          >
            Schedule a Site Visit
          </Link>
        </div>
      </div>
    </section>
  );
}
