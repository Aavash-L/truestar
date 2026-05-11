import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MapPin, ChevronRight } from "lucide-react";
import { towns } from "@/data/towns";
import { services } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { globalFaqs } from "@/data/faqs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildServiceSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { generateTownIntro } from "@/lib/copy-generator";

export async function generateStaticParams() {
  return towns.map((t) => ({ town: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town: townSlug } = await params;
  const town = towns.find((t) => t.slug === townSlug);
  if (!town) return {};

  return {
    title: `Demolition, Asbestos Removal & Mold Remediation in ${town.name}, NJ`,
    description: `Licensed demolition, asbestos removal & mold remediation in ${town.name}, NJ (${town.zipCodes.join(", ")}). 25+ years, free estimates. Call (201) 790-4530.`,
    alternates: { canonical: `/service-areas/${town.slug}` },
  };
}

export default async function TownPage({
  params,
}: {
  params: Promise<{ town: string }>;
}) {
  const { town: townSlug } = await params;
  const town = towns.find((t) => t.slug === townSlug);
  if (!town) notFound();

  const neighborTowns = town.nearbyTowns
    .map((slug) => towns.find((t) => t.slug === slug))
    .filter(Boolean) as typeof towns;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Service Areas", url: "/service-areas" },
    { name: town.name, url: `/service-areas/${town.slug}` },
  ]);
  const faqSchema = buildFaqSchema(globalFaqs);

  const tierReasons =
    town.tier === 1
      ? [
          `We're based in North Arlington — ${town.name} is in our backyard. Estimates typically scheduled within 24 hours.`,
          "Same-day response available for active water damage and mold emergencies.",
          "We know the local permit office and inspection process for " + town.name + " specifically.",
          "No travel surcharges. You pay the same rate as our closest clients.",
        ]
      : town.tier === 2
      ? [
          `${town.name} is within our standard service radius — we're there regularly.`,
          "Estimates typically scheduled within 24–48 hours of your call.",
          "We've handled projects across " + town.county + " County for over 25 years.",
          "Same-day emergency response available for active mold situations.",
        ]
      : [
          `${town.name} is part of our extended service area — we make the trip for the right projects.`,
          "We bring 25+ years of North Jersey experience to every job in " + town.county + " County.",
          "Full compliance with local permit and NJ DOL requirements.",
          "Written clearance documentation on every remediation and abatement project.",
        ];

  const townIntro = generateTownIntro(town);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-[var(--ink)] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { label: "Service Areas", href: "/service-areas" },
              { label: town.name },
            ]}
          />
          <h1
            className="font-display font-extrabold text-white mt-4 mb-4 text-balance"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Demolition, Asbestos Removal &amp; Mold Remediation in {town.name}, NJ
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8 leading-relaxed">
            {townIntro}
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

      {/* Services in this town */}
      <section className="bg-[var(--paper)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[var(--ink)] text-3xl mb-10">
            Our Services in {town.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <article key={service.slug} className="border border-[var(--line)] bg-white p-6 flex flex-col">
                <h3 className="font-bold text-[var(--ink)] text-xl mb-2">{service.name}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed flex-1 mb-4">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/service-areas/${town.slug}/${service.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[var(--brand-red)] hover:gap-2 transition-all"
                >
                  {service.name} in {town.name} <ChevronRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-[var(--paper-2)] border-y border-[var(--line)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[var(--ink)] text-2xl mb-8">
            Why {town.name} Property Owners Choose True Star
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tierReasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-3">
                <ChevronRight size={16} className="text-[var(--brand-red)] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[var(--ink)] leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZIP codes + landmarks */}
      <section className="bg-[var(--paper)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div>
            <h3 className="font-bold text-[var(--ink)] text-sm uppercase tracking-widest mb-4">ZIP Codes Served</h3>
            <div className="flex flex-wrap gap-2">
              {town.zipCodes.map((zip) => (
                <span key={zip} className="border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)]">
                  {zip}
                </span>
              ))}
            </div>
          </div>
          {town.neighborhoods.length > 0 && (
            <div>
              <h3 className="font-bold text-[var(--ink)] text-sm uppercase tracking-widest mb-4">Neighborhoods We Serve</h3>
              <ul className="space-y-1">
                {town.neighborhoods.map((n) => (
                  <li key={n} className="text-sm text-[var(--muted)]">{n}</li>
                ))}
              </ul>
            </div>
          )}
          {town.landmarks.length > 0 && (
            <div>
              <h3 className="font-bold text-[var(--ink)] text-sm uppercase tracking-widest mb-4">Local Landmarks</h3>
              <ul className="space-y-1">
                {town.landmarks.map((l) => (
                  <li key={l} className="text-sm text-[var(--muted)] flex items-center gap-1.5">
                    <MapPin size={12} className="text-[var(--brand-red)] flex-shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Map embed */}
      <section className="bg-[var(--paper-2)] border-t border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h3 className="font-bold text-[var(--ink)] text-sm uppercase tracking-widest mb-4">
            {town.name}, NJ
          </h3>
          <div className="border border-[var(--line)] overflow-hidden aspect-video max-h-80">
            <iframe
              title={`Map of ${town.name}, NJ`}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${town.name}, NJ ${town.zipCodes[0]}`)}&output=embed&z=13`}
              className="w-full h-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Nearby towns */}
      {neighborTowns.length > 0 && (
        <section className="bg-[var(--paper)] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-bold text-[var(--ink)] text-lg mb-6">
              Nearby Towns We Also Serve
            </h2>
            <div className="flex flex-wrap gap-3">
              {neighborTowns.map((t) => (
                <Link
                  key={t.slug}
                  href={`/service-areas/${t.slug}`}
                  className="border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink)] hover:border-[var(--brand-red)] hover:text-[var(--brand-red)] transition-colors"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />

      {/* FAQ */}
      <section className="bg-[var(--paper)] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[var(--ink)] text-3xl mb-10">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={globalFaqs} />
        </div>
      </section>
    </>
  );
}
