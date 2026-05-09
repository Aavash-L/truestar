import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ChevronRight } from "lucide-react";
import { services, subServices } from "@/data/services";
import { towns } from "@/data/towns";
import { siteConfig } from "@/data/siteConfig";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { QuoteSidebar } from "@/components/QuoteSidebar";
import { buildServiceSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return {};

  return {
    title: `${service.name} in New Jersey | True Star Contracting LLC`,
    description: `${service.shortDescription} Serving 60 towns in North Jersey. Call (201) 790-4530 for a free estimate. Licensed & insured.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: serviceSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) notFound();

  const serviceSchema = buildServiceSchema(service);
  const faqSchema = buildFaqSchema(service.faq);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Services", url: "/services" },
    { name: service.name, url: `/services/${service.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero — full width */}
      <section className="bg-[var(--ink)] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: "Services", href: "/services" }, { label: service.name }]} />
          <h1
            className="font-display font-extrabold text-white mt-4 mb-6 text-balance"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {service.name} in New Jersey
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8 leading-relaxed">
            {service.longDescription}
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
            <QuoteSidebar prefillService={serviceSlug} />
          </div>
        </div>

        {/* Article content: second on mobile, left column on desktop */}
        <div className="order-2 lg:order-1 min-w-0">

          {/* What's included + Process */}
          <section className="bg-[var(--paper)] py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="font-display font-bold text-[var(--ink)] text-3xl mb-8">
                    What&apos;s Included
                  </h2>
                  <ul className="space-y-3">
                    {service.whatIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ChevronRight size={16} className="text-[var(--brand-red)] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[var(--ink)] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-display font-bold text-[var(--ink)] text-3xl mb-8">Our Process</h2>
                  <ol className="space-y-6">
                    {service.processSteps.map((step) => (
                      <li key={step.step} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-[var(--brand-red)] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--ink)] mb-1">{step.title}</h3>
                          <p className="text-sm text-[var(--muted)] leading-relaxed">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Why it matters */}
          <section className="bg-[var(--paper-2)] border-y border-[var(--line)] py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display font-bold text-[var(--ink)] text-2xl mb-4">Why This Matters</h2>
              <p className="text-[var(--ink)] leading-relaxed">{service.whyItMatters}</p>
            </div>
          </section>

        </div>
      </div>

      {/* Specialized sub-services — only shown on demolition page */}
      {serviceSlug === "demolition" && (
        <section className="bg-[var(--paper)] py-20 border-t border-[var(--line)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-bold text-[var(--ink)] text-3xl mb-3">
              Specialized Demolition Services
            </h2>
            <p className="text-[var(--muted)] mb-10 max-w-2xl">
              From single-room tear-outs to full house demolitions — we handle every type of demo job.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subServices
                .filter((s) => s.parentSlug === "demolition")
                .map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/services/demolition/${sub.slug}`}
                    className="group border border-[var(--line)] p-6 hover:border-[var(--ink)] transition-colors flex flex-col gap-3"
                  >
                    <h3 className="font-display font-bold text-[var(--ink)] text-lg leading-snug group-hover:text-[var(--brand-red)] transition-colors">
                      {sub.name}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">
                      {sub.shortDescription}
                    </p>
                    <span className="text-sm font-semibold text-[var(--brand-red)] inline-flex items-center gap-1 mt-auto">
                      Learn more →
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Full-width sections below */}
      <CTABanner service={service.shortName} />

      <section className="bg-[var(--paper)] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[var(--ink)] text-3xl mb-10">
            {service.name} FAQ
          </h2>
          <FAQAccordion faqs={service.faq} />
        </div>
      </section>

      <section className="bg-[var(--paper-2)] border-t border-[var(--line)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[var(--ink)] text-3xl mb-4">
            We Offer {service.shortName} in 60 North Jersey Towns
          </h2>
          <p className="text-[var(--muted)] mb-10">
            Click your town for a dedicated page with local specifics, ZIP codes, and pricing context.
          </p>
          <div className="flex flex-wrap gap-2">
            {towns.map((town) => (
              <Link
                key={town.slug}
                href={`/service-areas/${town.slug}/${service.slug}`}
                className={`text-sm px-3 py-2 border transition-colors ${
                  town.tier === 1
                    ? "border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
                    : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                }`}
              >
                {town.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
