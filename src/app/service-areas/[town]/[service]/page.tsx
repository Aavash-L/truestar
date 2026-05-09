import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ChevronRight } from "lucide-react";
import { towns } from "@/data/towns";
import { services } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  buildServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";
import {
  generateTownServiceIntro,
  generateWhyChooseUs,
  generateMiniFaq,
} from "@/lib/copy-generator";

export async function generateStaticParams() {
  const params: { town: string; service: string }[] = [];
  for (const town of towns) {
    for (const service of services) {
      params.push({ town: town.slug, service: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string; service: string }>;
}): Promise<Metadata> {
  const { town: townSlug, service: serviceSlug } = await params;
  const town = towns.find((t) => t.slug === townSlug);
  const service = services.find((s) => s.slug === serviceSlug);
  if (!town || !service) return {};

  return {
    title: `${service.name} in ${town.name}, NJ | True Star Contracting`,
    description: `Licensed ${service.name.toLowerCase()} in ${town.name}, NJ (${town.zipCodes.join(", ")}). 25+ years experience, NJ DEP certified. Call (201) 790-4530 for a free estimate.`,
    alternates: { canonical: `/service-areas/${town.slug}/${service.slug}` },
  };
}

export default async function TownServicePage({
  params,
}: {
  params: Promise<{ town: string; service: string }>;
}) {
  const { town: townSlug, service: serviceSlug } = await params;
  const town = towns.find((t) => t.slug === townSlug);
  const service = services.find((s) => s.slug === serviceSlug);
  if (!town || !service) notFound();

  const { opening, secondPara } = generateTownServiceIntro(town, service);
  const whyUs = generateWhyChooseUs(town, service);
  const miniFaq = generateMiniFaq(town, service);
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const neighborTowns = town.nearbyTowns
    .map((slug) => towns.find((t) => t.slug === slug))
    .filter(Boolean) as typeof towns;

  const serviceSchema = buildServiceSchema(service, town);
  const faqSchema = buildFaqSchema(miniFaq);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Service Areas", url: "/service-areas" },
    { name: town.name, url: `/service-areas/${town.slug}` },
    { name: service.name, url: `/service-areas/${town.slug}/${service.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-[var(--ink)] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            crumbs={[
              { label: "Service Areas", href: "/service-areas" },
              { label: town.name, href: `/service-areas/${town.slug}` },
              { label: service.name },
            ]}
          />
          <h1
            className="font-display font-extrabold text-white mt-4 mb-6 text-balance"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {service.name} in {town.name}, NJ
          </h1>
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
              Request Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Intro copy */}
      <section className="bg-[var(--paper)] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--ink)] text-lg leading-relaxed mb-6">{opening}</p>
          <p className="text-[var(--muted)] leading-relaxed">{secondPara}</p>

          {/* ZIP codes inline */}
          {town.zipCodes.length > 0 && (
            <p className="mt-6 text-sm text-[var(--muted)]">
              Serving {town.name} ZIP code{town.zipCodes.length > 1 ? "s" : ""}:{" "}
              <span className="font-semibold text-[var(--ink)]">
                {town.zipCodes.join(", ")}
              </span>
              {town.neighborhoods.length > 0 && (
                <>, including {town.neighborhoods.slice(0, 3).join(", ")}</>
              )}
              .
            </p>
          )}
        </div>
      </section>

      {/* What's included */}
      <section className="bg-[var(--paper-2)] border-y border-[var(--line)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[var(--ink)] text-2xl mb-8">
            What Our {service.shortName} in {town.name} Includes
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.whatIncluded.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight size={16} className="text-[var(--brand-red)] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[var(--ink)] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[var(--paper)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[var(--ink)] text-2xl mb-8">Our Process</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.processSteps.map((step) => (
              <li key={step.step} className="border border-[var(--line)] p-5">
                <div className="text-[var(--brand-red)] font-black text-2xl font-display mb-3">
                  0{step.step}
                </div>
                <h3 className="font-semibold text-[var(--ink)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-[var(--ink)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-white text-2xl mb-8">
            Why Choose True Star for {service.shortName} in {town.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyUs.map((item, i) => (
              <div key={i} className="border border-[var(--ink-2)] p-5">
                <h3 className="font-bold text-white mb-2">{item.heading.replace("${town.county}", town.county).replace("${town.name}", town.name)}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner service={service.shortName} />

      {/* Mini FAQ */}
      <section className="bg-[var(--paper)] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-[var(--ink)] text-2xl mb-8">
            {service.name} in {town.name} — FAQ
          </h2>
          <FAQAccordion faqs={miniFaq} />
        </div>
      </section>

      {/* Other services in this town */}
      <section className="bg-[var(--paper-2)] border-t border-[var(--line)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-[var(--ink)] text-lg mb-6">
            Other Services We Offer in {town.name}
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/service-areas/${town.slug}/${s.slug}`}
                className="border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink)] hover:border-[var(--brand-red)] hover:text-[var(--brand-red)] transition-colors"
              >
                {s.name} in {town.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby towns for this service */}
      {neighborTowns.length > 0 && (
        <section className="bg-[var(--paper)] py-16 border-t border-[var(--line)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-bold text-[var(--ink)] text-lg mb-6">
              Nearby Towns We Serve for {service.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {neighborTowns.map((t) => (
                <Link
                  key={t.slug}
                  href={`/service-areas/${t.slug}/${service.slug}`}
                  className="border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-colors"
                >
                  {service.shortName} in {t.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
