"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-[var(--paper)] border-b border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {/* TODO: replace with next/image when logo asset is available */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[var(--brand-red)] flex items-center justify-center">
                <span className="text-white font-black text-sm">TC</span>
              </div>
              <div className="leading-tight">
                <div className="font-black text-[var(--ink)] text-sm tracking-tight uppercase">True Star</div>
                <div className="text-[10px] text-[var(--muted)] uppercase tracking-widest">Contracting LLC</div>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {/* Services dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 text-sm font-semibold text-[var(--ink)] hover:text-[var(--brand-red)] transition-colors"
                aria-expanded={servicesOpen}
              >
                Services <ChevronDown size={14} className={servicesOpen ? "rotate-180" : ""} style={{ transition: "transform 0.2s" }} />
              </button>
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white border border-[var(--line)] shadow-lg z-10"
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="block px-4 py-3 text-sm text-[var(--ink)] hover:bg-[var(--paper-2)] border-b border-[var(--line)] last:border-0"
                      onClick={() => setServicesOpen(false)}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? "text-[var(--brand-red)]"
                    : "text-[var(--ink)] hover:text-[var(--brand-red)]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <a
              href={siteConfig.phone.href}
              className="flex items-center gap-1.5 text-sm font-bold text-[var(--ink)] hover:text-[var(--brand-red)] transition-colors"
            >
              <Phone size={15} />
              {siteConfig.phone.display}
            </a>

            <Link
              href="/estimate"
              className="bg-[var(--brand-red)] text-white px-5 py-2.5 text-sm font-bold hover:bg-red-700 transition-colors"
            >
              Get Free Estimate
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-[var(--ink)]"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[var(--ink)] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-[var(--ink-2)]">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[var(--brand-red)] flex items-center justify-center">
                <span className="text-white font-black text-sm">TC</span>
              </div>
              <div className="leading-tight">
                <div className="font-black text-white text-sm tracking-tight uppercase">True Star</div>
                <div className="text-[10px] text-[var(--muted)] uppercase tracking-widest">Contracting LLC</div>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-white"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-0">
            <div className="mb-2">
              <div className="text-xs text-[var(--muted)] uppercase tracking-widest mb-3">Services</div>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-lg font-semibold text-white border-b border-[var(--ink-2)]"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <div className="mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-lg font-semibold text-white border-b border-[var(--ink-2)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-6 space-y-3">
            <a
              href={siteConfig.phone.href}
              className="flex items-center justify-center gap-2 w-full bg-[var(--brand-red)] text-white py-4 font-bold text-lg"
            >
              <Phone size={20} />
              {siteConfig.phone.display}
            </a>
            <Link
              href="/estimate"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full border border-white text-white py-4 font-bold text-lg"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
