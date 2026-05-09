import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Shield, Star, CheckCircle, ChevronRight, Hammer, Wind, Droplets } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";
import { towns } from "@/data/towns";
import { reviews } from "@/data/reviews";
import { globalFaqs } from "@/data/faqs";
import { CountUp } from "@/components/ui/CountUp";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { buildFaqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "True Star Contracting LLC | Demolition & Asbestos Removal North Jersey",
  description:
    "Licensed demolition, asbestos removal & mold remediation serving 60 towns in North Jersey. 25+ years, 5.0 Google rating. Call (201) 790-4530 for a free estimate.",
  alternates: { canonical: "/" },
};

const countyGroups: { county: string }[] = [
  { county: "Bergen" },
  { county: "Hudson" },
  { county: "Essex" },
  { county: "Passaic" },
  { county: "Middlesex" },
];

const featuredReviews = reviews.slice(0, 6);

// Icon + accent color per service card
const serviceVisuals: Record<string, { Icon: React.ElementType; accent: string }> = {
  "demolition":       { Icon: Hammer,   accent: "from-red-950/80 to-[var(--ink)]" },
  "asbestos-removal": { Icon: Wind,     accent: "from-slate-800 to-[var(--ink)]" },
  "mold-remediation": { Icon: Droplets, accent: "from-emerald-950/80 to-[var(--ink)]" },
};

export default function HomePage() {
  const faqSchema = buildFaqSchema(globalFaqs);
  const byCounty = (county: string) => towns.filter((t) => t.county === county);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO — video background ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pb-16 sm:pb-24 lg:pb-28 bg-[var(--ink)] overflow-hidden">

        {/* Video background — place /public/videos/hero.mp4 to activate */}
        {/* TODO: provide a drone/job-site .mp4 (H.264, ≤20 MB, 1920×1080) */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero/hero.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay — light at top, heavy at bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="text-[var(--brand-red)] text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            Licensed &amp; Insured · NJ + NY · 25+ Years
          </p>

          <h1
            className="font-display font-extrabold text-white mb-8 leading-[1.05] text-balance"
            style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)" }}
          >
            Licensed Demolition &amp;<br className="hidden sm:block" />
            Asbestos Removal<br className="hidden sm:block" />
            Done Right.
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href={siteConfig.phone.href}
              className="inline-flex items-center justify-center gap-2 bg-white text-[var(--ink)] px-7 py-4 font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors rounded-full"
            >
              <Phone size={20} />
              {siteConfig.phone.display}
            </a>
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center gap-2 bg-[var(--brand-red)] text-white px-7 py-4 font-bold text-base sm:text-lg hover:bg-red-700 transition-colors rounded-full"
            >
              Get a Free Estimate
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/65">
            <span className="flex items-center gap-1.5">
              <Star size={13} className="text-yellow-400 fill-yellow-400" />
              5.0 Google · 42 reviews
            </span>
            <span className="hidden sm:block opacity-40">|</span>
            <span className="flex items-center gap-1.5">
              <Shield size={13} className="text-green-400" />
              Licensed NJ + NY
            </span>
            <span className="hidden sm:block opacity-40">|</span>
            <span>Free on-site estimates</span>
            <span className="hidden sm:block opacity-40">|</span>
            <span>Permits handled</span>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-[var(--paper)] border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-[var(--muted)]">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-600" />
              NJ License: {siteConfig.licenses.njLicense}
            </span>
            <span className="hidden sm:block text-[var(--line)]">|</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-600" />
              NJ DEP Certified
            </span>
            <span className="hidden sm:block text-[var(--line)]">|</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-600" />
              EPA AHERA Certified
            </span>
            <span className="hidden sm:block text-[var(--line)]">|</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-600" />
              Fully Insured
            </span>
            <span className="hidden sm:block text-[var(--line)]">|</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-600" />
              Family Owned
            </span>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="bg-[var(--paper)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="font-display font-bold text-[var(--ink)] mb-4 text-balance"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              What We Do
            </h2>
            <p className="text-[var(--muted)] text-lg max-w-xl">
              Three services. One licensed contractor. We handle it all in-house.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => {
              const visual = serviceVisuals[service.slug];
              const Icon = visual?.Icon ?? Hammer;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group border border-[var(--line)] bg-white flex flex-col hover:border-[var(--ink)] transition-colors"
                >
                  {/* Card image area — styled placeholder until real photos arrive */}
                  <div className={`aspect-video bg-gradient-to-br ${visual?.accent ?? "from-[var(--ink-2)] to-[var(--ink)]"} relative overflow-hidden flex items-center justify-center`}>
                    <Icon
                      size={80}
                      className="text-white/10 absolute group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="relative text-[var(--brand-red)] text-xs font-bold uppercase tracking-widest">
                      {service.shortName}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-[var(--ink)] text-xl mb-2 group-hover:text-[var(--brand-red)] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-[var(--muted)] text-sm leading-relaxed flex-1 mb-4">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-[var(--brand-red)] group-hover:gap-2 transition-all">
                      Learn more <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY TRUE STAR ────────────────────────────────────────────────── */}
      <section className="bg-[var(--ink)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display font-bold text-white mb-12 text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Why Choose True Star
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { num: "01", heading: "25+ Years On The Job", body: "We've been working in North Jersey since before most contractors knew what NJ DEP regulations were. That experience shows on every job." },
              { num: "02", heading: "Permits Handled", body: "We pull demolition permits and file NJ DEP asbestos notifications on every applicable job. You don't need to know the process." },
              { num: "03", heading: "24-Hour Estimate Response", body: "We visit the property, assess the scope, and give you a written estimate within 24 hours of your call. No runaround, no price guessing." },
              { num: "04", heading: "Family Owned, Locally Run", body: "We're based in North Arlington and we work across the region. We know the towns, the permit offices, and the building stock." },
            ].map(({ num, heading, body }) => (
              <div key={num} className="flex gap-6">
                <div className="text-[var(--brand-red)] font-black font-display text-4xl leading-none flex-shrink-0 w-12">
                  {num}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">{heading}</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--ink-2)] border-t border-[var(--ink)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { target: 150, suffix: "+", label: "Projects Completed" },
              { target: 250, suffix: "+", label: "Satisfied Customers" },
              { target: 50,  suffix: "+", label: "5-Star Reviews" },
            ].map(({ target, suffix, label }) => (
              <div key={label}>
                <div className="font-display font-black text-white mb-1" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                  <CountUp target={target} suffix={suffix} />
                </div>
                <div className="text-[var(--muted)] text-sm uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      <section className="bg-[var(--paper-2)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <h2
              className="font-display font-bold text-[var(--ink)] text-balance"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              What Our Customers Say
            </h2>
            <div className="flex items-center gap-2 text-[var(--muted)] text-sm">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </span>
              <span className="font-bold text-[var(--ink)]">5.0</span>
              <span>· 42 reviews on Google</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 font-semibold text-[var(--brand-red)] hover:gap-3 transition-all"
            >
              Read all 42 reviews <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ────────────────────────────────────────────────── */}
      <section className="bg-[var(--ink)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2
              className="font-display font-bold text-white mb-4 text-balance"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Serving 60 Towns Across North Jersey
            </h2>
            <p className="text-[var(--muted)] text-lg max-w-2xl">
              We cover Bergen, Hudson, Essex, Passaic, and Middlesex counties. Free estimates throughout our service area.
            </p>
          </div>

          <div className="space-y-8">
            {countyGroups.map(({ county }) => {
              const countyTowns = byCounty(county);
              if (!countyTowns.length) return null;
              return (
                <div key={county}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-3">
                    {county} County
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {countyTowns.map((town) => (
                      <Link
                        key={town.slug}
                        href={`/service-areas/${town.slug}`}
                        className={`text-sm px-3 py-1.5 border transition-colors ${
                          town.tier === 1
                            ? "border-[var(--brand-red)] text-white hover:bg-[var(--brand-red)]"
                            : "border-[var(--ink-2)] text-[var(--muted)] hover:border-white hover:text-white"
                        }`}
                      >
                        {town.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-1.5 font-semibold text-[var(--brand-red)] hover:gap-3 transition-all"
            >
              View all service areas <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--paper)] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display font-bold text-[var(--ink)] mb-10 text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={globalFaqs} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[var(--ink)] py-20 border-t-4 border-[var(--brand-red)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-display font-bold text-white mb-4 text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Get Your Free Estimate Today
          </h2>
          <p className="text-[var(--muted)] text-lg mb-2">
            We respond within 24 hours. {siteConfig.hours.display}.
          </p>
          <p className="text-[var(--muted)] text-sm mb-8">Office: {siteConfig.hours.officeDisplay}</p>

          <a
            href={siteConfig.phone.href}
            className="inline-flex items-center justify-center gap-3 text-white font-black mb-6 hover:text-[var(--brand-red)] transition-colors"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <Phone className="flex-shrink-0" style={{ width: "1em", height: "1em" }} />
            {siteConfig.phone.display}
          </a>

          <div>
            <Link
              href="/estimate"
              className="text-[var(--muted)] hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              Or schedule a site visit →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
