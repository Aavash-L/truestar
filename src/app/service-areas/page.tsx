import type { Metadata } from "next";
import Link from "next/link";
import { towns } from "@/data/towns";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Service Areas | North Jersey Demolition & Asbestos Removal",
  description:
    "True Star Contracting serves 60 towns across Bergen, Hudson, Essex, Passaic, and Middlesex counties in North Jersey. Find your town and get a free estimate.",
  alternates: { canonical: "/service-areas" },
};

const counties = ["Bergen", "Hudson", "Essex", "Passaic", "Middlesex"] as const;

export default function ServiceAreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--ink)] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: "Service Areas" }]} />
          <h1
            className="font-display font-extrabold text-white mt-4 mb-4 text-balance"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            North Jersey Service Areas
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            True Star Contracting serves 60 towns across five North Jersey counties. Our primary service area covers towns within 8 miles of our North Arlington headquarters — same-day response for most Tier 1 towns.
          </p>
        </div>
      </section>

      {/* County tabs */}
      <section className="bg-[var(--paper)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {counties.map((county) => {
              const countyTowns = towns.filter((t) => t.county === county);
              const tier1 = countyTowns.filter((t) => t.tier === 1);
              const tier2 = countyTowns.filter((t) => t.tier === 2);
              const tier3 = countyTowns.filter((t) => t.tier === 3);
              if (!countyTowns.length) return null;
              return (
                <div key={county}>
                  <h2 className="font-display font-bold text-[var(--ink)] text-2xl mb-8 pb-3 border-b border-[var(--line)]">
                    {county} County
                  </h2>
                  {tier1.length > 0 && (
                    <div className="mb-8">
                      <div className="text-xs font-bold uppercase tracking-widest text-[var(--brand-red)] mb-4">
                        Primary Service Area
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {tier1.map((town) => (
                          <TownCard key={town.slug} town={town} />
                        ))}
                      </div>
                    </div>
                  )}
                  {tier2.length > 0 && (
                    <div className="mb-8">
                      <div className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-4">
                        Extended Service Area
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {tier2.map((town) => (
                          <TownCard key={town.slug} town={town} />
                        ))}
                      </div>
                    </div>
                  )}
                  {tier3.length > 0 && (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-4">
                        Reach Area
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {tier3.map((town) => (
                          <TownCard key={town.slug} town={town} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function TownCard({ town }: { town: (typeof towns)[0] }) {
  return (
    <Link
      href={`/service-areas/${town.slug}`}
      className={`block border p-4 hover:border-[var(--brand-red)] hover:text-[var(--brand-red)] transition-colors group ${
        town.tier === 1
          ? "border-[var(--ink)] bg-white"
          : "border-[var(--line)] bg-[var(--paper)]"
      }`}
    >
      <div className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--brand-red)] transition-colors">
        {town.name}
      </div>
      <div className="text-xs text-[var(--muted)] mt-0.5">{town.zipCodes[0]}</div>
    </Link>
  );
}
