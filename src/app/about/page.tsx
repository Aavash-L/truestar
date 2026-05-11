import type { Metadata } from "next";
import Link from "next/link";
import { Phone, CheckCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "About True Star Contracting LLC | North Arlington, NJ",
  description:
    "25+ years of licensed demolition, asbestos removal & mold remediation in North Jersey. Family-owned, NJ DOL certified, EPA AHERA certified. Based in North Arlington, NJ.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--ink)] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            About True Star Contracting
          </h1>
          <p className="text-white/80 text-xl max-w-2xl leading-relaxed">
            Family-owned and licensed for 25+ years. We don&apos;t subcontract, we don&apos;t cut corners, and we show up when we say we will.
          </p>
        </div>
      </section>

      <section className="bg-[var(--paper)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display font-bold text-[var(--ink)] text-3xl mb-6">Our Story</h2>
              <div className="space-y-4 text-[var(--ink)] leading-relaxed">
                <p>
                  True Star Contracting LLC is a family-owned demolition, asbestos abatement, and mold remediation company based in North Arlington, NJ. We&apos;ve been operating across North Jersey for over 25 years.
                </p>
                <p>
                  We started as a focused demolition operation and expanded into asbestos abatement when we saw how often contractors — and property owners — were getting burned by finding hazardous materials mid-project with no plan. Today we handle the full pre-renovation scope in-house: demo, asbestos, and mold. One call, one crew, one point of accountability.
                </p>
                <p>
                  We&apos;re based in North Arlington, and most of our work is in Bergen, Hudson, and Essex counties. We know the local permit offices, the inspectors, and the building stock. That familiarity saves our clients time and money on every job.
                </p>
                <p>
                  {/* TODO: add owner bio/story if provided by client */}
                  {"{{TODO: owner name and personal story — client to provide}}"}
                </p>
              </div>

              <div className="mt-8">
                <a
                  href={siteConfig.phone.href}
                  className="inline-flex items-center gap-2 bg-[var(--brand-red)] text-white px-6 py-3 font-bold hover:bg-red-700 transition-colors"
                >
                  <Phone size={18} />
                  Call Us: {siteConfig.phone.display}
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-[var(--ink)] text-3xl mb-6">Credentials</h2>
              <ul className="space-y-4">
                {[
                  `NJ Contractor License: ${siteConfig.licenses.njLicense}`,
                  `NY License: ${siteConfig.licenses.nyLicense}`,
                  `NJ DOL Asbestos Abatement Certification: ${siteConfig.licenses.njDep}`,
                  `EPA AHERA Certification: ${siteConfig.licenses.epaAhera}`,
                  "General Liability Insurance — certificates on request",
                  "Workers' Compensation Insurance",
                  "25+ years in business",
                  "Family owned and operated",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--ink)] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <h3 className="font-bold text-[var(--ink)] text-lg mb-4">Quick Stats</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { n: "25+", label: "Years in Business" },
                    { n: "150+", label: "Projects" },
                    { n: "5.0", label: "Google Rating" },
                  ].map(({ n, label }) => (
                    <div key={label} className="border border-[var(--line)] p-4 text-center">
                      <div className="font-display font-black text-[var(--brand-red)] text-3xl">{n}</div>
                      <div className="text-xs text-[var(--muted)] mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service areas CTA */}
      <section className="bg-[var(--ink)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-semibold text-lg">Serving 60 towns across North Jersey.</p>
            <p className="text-[var(--muted)] text-sm">Bergen, Hudson, Essex, Passaic, Middlesex counties.</p>
          </div>
          <Link
            href="/service-areas"
            className="flex-shrink-0 border border-white text-white px-6 py-3 font-semibold hover:bg-white hover:text-[var(--ink)] transition-colors"
          >
            View All Service Areas
          </Link>
        </div>
      </section>
    </>
  );
}
