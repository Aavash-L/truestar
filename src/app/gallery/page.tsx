"use client";
import { useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  category: "demolition" | "asbestos" | "mold" | "all";
};

// TODO: populate with real client photos from /public/images/gallery/
const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/placeholder-1.jpg", alt: "Demolition project in Kearny, NJ", caption: "Interior demolition — Kearny, NJ", category: "demolition" },
  { src: "/images/gallery/placeholder-2.jpg", alt: "Asbestos removal in North Arlington, NJ", caption: "Pipe insulation abatement — North Arlington, NJ", category: "asbestos" },
  { src: "/images/gallery/placeholder-3.jpg", alt: "Mold remediation in Belleville, NJ", caption: "Basement mold remediation — Belleville, NJ", category: "mold" },
  { src: "/images/gallery/placeholder-4.jpg", alt: "Kitchen gut demolition in Nutley, NJ", caption: "Full kitchen gut — Nutley, NJ", category: "demolition" },
  { src: "/images/gallery/placeholder-5.jpg", alt: "Asbestos floor tile removal in Newark, NJ", caption: "VAT floor tile abatement — Newark, NJ", category: "asbestos" },
  { src: "/images/gallery/placeholder-6.jpg", alt: "Mold remediation in Bloomfield, NJ", caption: "Mold clearance — Bloomfield, NJ", category: "mold" },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Demolition", value: "demolition" },
  { label: "Asbestos", value: "asbestos" },
  { label: "Mold", value: "mold" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = active === "all" ? galleryImages : galleryImages.filter((img) => img.category === active);

  return (
    <>
      <section className="bg-[var(--ink)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Project Gallery
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Real work from real North Jersey jobs. No stock photos, no staged shots.
          </p>
        </div>
      </section>

      <section className="bg-[var(--paper)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter chips */}
          <div className="flex gap-2 mb-10 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-4 py-2 text-sm font-semibold border transition-colors ${
                  active === f.value
                    ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                    : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--ink)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIdx(i)}
                className="block w-full border border-[var(--line)] overflow-hidden hover:border-[var(--brand-red)] transition-colors group"
                aria-label={`View ${img.caption}`}
              >
                {/* TODO: replace with next/image */}
                <div className="aspect-video bg-[var(--paper-2)] flex items-center justify-center">
                  <span className="text-[var(--muted)] text-xs">{img.caption}</span>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-[var(--muted)] text-center py-12">No images in this category yet.</p>
          )}
        </div>
      </section>

      {lightboxIdx !== null && (
        <Lightbox
          images={filtered}
          currentIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((prev) => (prev! - 1 + filtered.length) % filtered.length)}
          onNext={() => setLightboxIdx((prev) => (prev! + 1) % filtered.length)}
        />
      )}
    </>
  );
}
