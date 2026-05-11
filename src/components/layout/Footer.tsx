import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";
import { towns } from "@/data/towns";

const topTowns = towns.filter((t) => t.tier === 1).slice(0, 12);

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[var(--brand-red)] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">TC</span>
              </div>
              <div className="leading-tight">
                <div className="font-black text-white text-sm tracking-tight uppercase">True Star Contracting LLC</div>
                <div className="text-[10px] text-[var(--muted)] uppercase tracking-widest">Free Estimate · Fully Insured</div>
              </div>
            </div>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
              Licensed demolition, asbestos removal, and mold remediation across 60 towns in North Jersey. 25+ years. Family owned.
            </p>
            <div className="text-xs text-[var(--muted)] space-y-1">
              <div>NJ License: {siteConfig.licenses.njLicense}</div>
              <div>NJ DOL Certified</div>
            </div>
            <div className="mt-5">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="True Star Contracting on Instagram"
                className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--brand-red)] transition-colors group"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span className="text-xs group-hover:underline">@truestarcontracting</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[var(--muted)] hover:text-white transition-colors text-sm"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/estimate" className="text-[var(--brand-red)] hover:text-red-400 transition-colors text-sm font-semibold">
                  Get a Free Estimate →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Service Areas</h3>
            <ul className="space-y-2 grid grid-cols-2">
              {topTowns.map((town) => (
                <li key={town.slug}>
                  <Link
                    href={`/service-areas/${town.slug}`}
                    className="text-[var(--muted)] hover:text-white transition-colors text-xs"
                  >
                    {town.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/service-areas" className="mt-4 inline-block text-[var(--brand-red)] hover:text-red-400 text-xs font-semibold">
              View all 60 towns →
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href={siteConfig.phone.href} className="flex items-start gap-2 text-[var(--muted)] hover:text-white transition-colors">
                  <Phone size={14} className="mt-0.5 flex-shrink-0 text-[var(--brand-red)]" />
                  <span className="text-sm font-semibold text-white">{siteConfig.phone.display}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-2 text-[var(--muted)] hover:text-white transition-colors">
                  <Mail size={14} className="mt-0.5 flex-shrink-0 text-[var(--brand-red)]" />
                  <span className="text-sm">{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[var(--brand-red)]" />
                <address className="text-sm text-[var(--muted)] not-italic">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </address>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 flex-shrink-0 text-[var(--brand-red)]" />
                <div className="text-sm text-[var(--muted)]">
                  <div>{siteConfig.hours.display}</div>
                  <div className="text-xs mt-0.5">Office: {siteConfig.hours.officeDisplay}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--ink-2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} True Star Contracting LLC. All rights reserved.
          </div>
          <div className="text-xs text-[var(--muted)] text-center">
            {siteConfig.address.full} · {siteConfig.phone.display} · NJ License {siteConfig.licenses.njLicense}
          </div>
          <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/estimate" className="hover:text-white transition-colors">Free Estimate</Link>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[var(--brand-red)] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
