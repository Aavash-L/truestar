import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ChevronRight, ArrowRight } from "lucide-react";
import { subServices } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { QuoteSidebar } from "@/components/QuoteSidebar";
import {
  buildSubServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";

// ── Related service registry ─────────────────────────────────────────────────
// href: null = future page (not yet built — render as text, no link)

const RELATED: Record<string, { name: string; href: string | null }> = {
  "demolition":              { name: "Demolition",                       href: "/services/demolition" },
  "asbestos-removal":        { name: "Asbestos Removal",                 href: "/services/asbestos-removal" },
  "mold-remediation":        { name: "Mold Remediation",                 href: "/services/mold-remediation" },
  "garage-demolition":       { name: "Garage Demolition",                href: "/services/demolition/garage-demolition" },
  "kitchen-demolition":      { name: "Kitchen Demolition",               href: "/services/demolition/kitchen-demolition" },
  "bathroom-demolition":     { name: "Bathroom Demolition",              href: "/services/demolition/bathroom-demolition" },
  "house-teardown":          { name: "Full House Teardown",              href: "/services/demolition/house-teardown" },
  "concrete-cutting":        { name: "Concrete Cutting & Demolition",    href: "/services/demolition/concrete-cutting" },
  "mobile-home-demolition":  { name: "Mobile Home & Office Demolition",  href: "/services/demolition/mobile-home-demolition" },
  "shed-demolition":         { name: "Shed/Outbuilding Demolition",      href: null },
  "deck-porch-demolition":   { name: "Deck & Porch Demolition",          href: null },
  "junk-removal":            { name: "Junk Removal & Cleanouts",         href: null },
  "flooring-removal":        { name: "Flooring Removal",                 href: null },
  "wall-removal":            { name: "Interior Wall Removal",            href: null },
  "site-clearing":           { name: "Site Clearing & Grading",          href: null },
  "exterior-demolition":     { name: "Exterior Building Demolition",     href: null },
  "concrete-slab-removal":   { name: "Concrete Slab Removal",            href: null },
  "concrete-core-drilling":  { name: "Concrete Core Drilling",           href: null },
};

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return subServices.map((s) => ({ sub: s.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sub: string }>;
}): Promise<Metadata> {
  const { sub: subSlug } = await params;
  const sub = subServices.find((s) => s.slug === subSlug);
  if (!sub) return {};

  // Keep meta title under 60 chars — shorten "Concrete Cutting & Demolition"
  const metaName =
    sub.slug === "concrete-cutting" ? "Concrete Cutting" : sub.name;
  const title = `${metaName} in North Jersey | True Star Contracting`;
  const description = `${sub.longDescription.slice(0, 145)}… Free estimate. Call ${siteConfig.phone.display}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${sub.parentSlug}/${sub.slug}`,
    },
    openGraph: {
      title,
      description,
      images: sub.heroImage ? [{ url: sub.heroImage }] : [],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function SubServicePage({
  params,
}: {
  params: Promise<{ sub: string }>;
}) {
  const { sub: subSlug } = await params;
  const sub = subServices.find((s) => s.slug === subSlug);
  if (!sub) notFound();

  const serviceSchema = buildSubServiceSchema(sub);
  const faqSchema = buildFaqSchema(sub.faq);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Services", url: "/services" },
    { name: "Demolition", url: "/services/demolition" },
    { name: sub.name, url: `/services/demolition/${sub.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero — full width */}
      <section className="bg-[var(--ink)] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { label: "Services", href: "/services" },
              { label: "Demolition", href: "/services/demolition" },
              { label: sub.name },
            ]}
          />
          <h1
            className="font-display font-extrabold text-white mt-4 mb-6 text-balance"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            {sub.name} in North Jersey
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8 leading-relaxed">
            {sub.longDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={siteConfig.phone.href}
              className="inline-flex items-center justify-center gap-2 bg-[var(--brand-red)] text-white px-8 py-4 font-bold text-lg hover:bg-red-700 transition-colors"
            >
              <Phone size={20} />
              Call {siteConfig.phone.display}
            </a>
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Schedule a Site Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Two-column body: content left, sticky sidebar right */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_360px] lg:items-start">

        {/* Sidebar: first on mobile, right column on desktop */}
        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-24 px-4 sm:px-6 lg:px-8 py-8 lg:pt-20 lg:pb-8">
            <QuoteSidebar prefillService={sub.slug} />
          </div>
        </div>

        {/* Article content: second on mobile, left column on desktop */}
        <div className="order-2 lg:order-1 min-w-0">

          {/* Our Process */}
          <section className="bg-[var(--paper)] py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display font-bold text-[var(--ink)] text-3xl mb-10">
                Our Process
              </h2>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sub.processSteps.map((step) => (
                  <li key={step.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--brand-red)] text-white font-black text-sm flex items-center justify-center flex-shrink-0 font-display">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--ink)] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* What's Included */}
          <section className="bg-[var(--paper-2)] border-y border-[var(--line)] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display font-bold text-[var(--ink)] text-2xl mb-8">
                What&apos;s Included
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sub.whatIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight
                      size={16}
                      className="text-[var(--brand-red)] mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-[var(--ink)] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Why hire a pro */}
          <section className="bg-[var(--paper)] py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display font-bold text-[var(--ink)] text-2xl mb-4">
                Why Hire a Licensed Pro
              </h2>
              <p className="text-[var(--ink)] leading-relaxed">
                {sub.whyHireAPro}
              </p>
            </div>
          </section>

        </div>
      </div>

      {/* Mid-page CTA — full width */}
      <CTABanner service={sub.name} />

      {/* FAQ */}
      <section className="bg-[var(--paper)] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[var(--ink)] text-3xl mb-10">
            {sub.name} — FAQ
          </h2>
          <FAQAccordion faqs={sub.faq} />
        </div>
      </section>

      {/* Service area note */}
      <section className="bg-[var(--paper-2)] border-y border-[var(--line)] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--ink)] leading-relaxed">
            Available across all 60 towns we serve in Bergen, Hudson, Essex,
            Passaic, and Middlesex counties.{" "}
            <Link
              href="/service-areas"
              className="text-[var(--brand-red)] font-semibold hover:underline"
            >
              View all service areas →
            </Link>
          </p>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-[var(--paper)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[var(--ink)] text-2xl mb-8">
            Related Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sub.relatedServices.map((slug) => {
              const entry = RELATED[slug];
              if (!entry) return null;
              return (
                <div
                  key={slug}
                  className="border border-[var(--line)] p-5 flex flex-col gap-3"
                >
                  <h3 className="font-semibold text-[var(--ink)] text-sm leading-snug">
                    {entry.name}
                  </h3>
                  {entry.href ? (
                    <Link
                      href={entry.href}
                      className="inline-flex items-center gap-1 text-xs text-[var(--brand-red)] font-semibold hover:underline mt-auto"
                    >
                      Learn more <ArrowRight size={12} />
                    </Link>
                  ) : (
                    <span className="text-xs text-[var(--muted)] mt-auto">
                      Coming soon
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--ink)] py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-white text-2xl mb-3">
            Ready to get started?
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Free on-site estimate. Written quote within 24 hours. Permits
            handled. Call now or submit the form.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={siteConfig.phone.href}
              className="inline-flex items-center justify-center gap-2 bg-[var(--brand-red)] text-white px-8 py-4 font-bold text-lg hover:bg-red-700 transition-colors"
            >
              <Phone size={20} />
              {siteConfig.phone.display}
            </a>
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
