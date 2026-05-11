import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { CopyEmail } from "@/components/CopyEmail";

export const metadata: Metadata = {
  title: "Contact Us | True Star Contracting LLC",
  description:
    "Contact True Star Contracting LLC for demolition, asbestos removal, or mold remediation in North Jersey. Call (201) 790-4530 or use our contact form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[var(--ink)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Contact Us
          </h1>
          <p className="text-white/70 text-lg">Get in touch for a free on-site estimate.</p>
        </div>
      </section>

      <section className="bg-[var(--paper)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="font-display font-bold text-[var(--ink)] text-2xl mb-8">Get In Touch</h2>
              <ul className="space-y-6">
                <li>
                  <a href={siteConfig.phone.href} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-[var(--brand-red)] flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-1">Phone</div>
                      <div className="font-bold text-xl text-[var(--ink)] group-hover:text-[var(--brand-red)] transition-colors">
                        {siteConfig.phone.display}
                      </div>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[var(--ink)]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-1">Email</div>
                    <CopyEmail
                      email={siteConfig.email}
                      className="text-[var(--ink)] hover:text-[var(--brand-red)] transition-colors cursor-pointer text-left"
                    />
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[var(--ink)]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-1">Address</div>
                    <address className="not-italic text-[var(--ink)]">
                      {siteConfig.address.street}<br />
                      {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                    </address>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--paper-2)] border border-[var(--line)] flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-[var(--ink)]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-1">Hours</div>
                    <div className="text-[var(--ink)]">{siteConfig.hours.display}</div>
                    <div className="text-sm text-[var(--muted)] mt-0.5">
                      Office: {siteConfig.hours.officeDisplay}
                    </div>
                  </div>
                </li>
              </ul>

              {/* Map */}
              <div className="mt-8 border border-[var(--line)] overflow-hidden aspect-video">
                <iframe
                  title="True Star Contracting location"
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address.full)}&output=embed&z=14`}
                  className="w-full h-full"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-display font-bold text-[var(--ink)] text-2xl mb-8">Send a Message</h2>
              <EstimateForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
