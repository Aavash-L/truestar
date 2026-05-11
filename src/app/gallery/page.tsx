"use client";
import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  category: "demolition" | "asbestos" | "mold";
};

const galleryImages: GalleryImage[] = [
  // ── Asbestos ────────────────────────────────────────────────────────────
  { src: "/images/Jobs/asbestos-removal.jpg",               alt: "Asbestos removal in progress",                    caption: "Asbestos removal",                          category: "asbestos" },
  { src: "/images/Jobs/asbestos-pipes-removal.jpg",         alt: "Asbestos pipe insulation removal",                caption: "Pipe insulation abatement",                 category: "asbestos" },
  { src: "/images/Jobs/asbestos-pipes-removal1.jpg",        alt: "Asbestos pipe insulation removal",                caption: "Pipe insulation abatement",                 category: "asbestos" },
  { src: "/images/Jobs/asbestos-plaster-removal.jpg",       alt: "Asbestos plaster removal",                        caption: "Asbestos plaster removal",                  category: "asbestos" },
  { src: "/images/Jobs/asbestos-popcorn-ceiling.jpg",       alt: "Asbestos popcorn ceiling before removal",         caption: "Popcorn ceiling — before abatement",        category: "asbestos" },
  { src: "/images/Jobs/asbestos-popcorn-ceiling-removal.jpg", alt: "Asbestos popcorn ceiling removal in progress",  caption: "Popcorn ceiling removal",                   category: "asbestos" },
  { src: "/images/Jobs/asbestos-popcorn-ceiling1.jpg",      alt: "Asbestos popcorn ceiling abatement",              caption: "Popcorn ceiling abatement",                 category: "asbestos" },
  { src: "/images/Jobs/asbestos-popcorn-ceiling2.jpg",      alt: "Asbestos popcorn ceiling abatement",              caption: "Popcorn ceiling abatement",                 category: "asbestos" },
  { src: "/images/Jobs/asbestos-siding-removal.jpg",        alt: "Asbestos siding removal",                         caption: "Asbestos siding removal",                   category: "asbestos" },
  { src: "/images/Jobs/asbestos-siding-removal1.jpg",       alt: "Asbestos siding removal",                         caption: "Asbestos siding removal",                   category: "asbestos" },
  { src: "/images/Jobs/asbestos-siding-removal2.jpg",       alt: "Asbestos siding removal",                         caption: "Asbestos siding removal",                   category: "asbestos" },
  { src: "/images/Jobs/asbestos-siding-removal3.jpg",       alt: "Asbestos siding removal",                         caption: "Asbestos siding removal",                   category: "asbestos" },
  { src: "/images/Jobs/asbestos-siding-removal4.jpg",       alt: "Asbestos siding removal",                         caption: "Asbestos siding removal",                   category: "asbestos" },
  { src: "/images/Jobs/asbestos-siding-removal5.jpg",       alt: "Asbestos siding removal",                         caption: "Asbestos siding removal",                   category: "asbestos" },
  { src: "/images/Jobs/asbestos-siding-removal6.jpg",       alt: "Asbestos siding removal",                         caption: "Asbestos siding removal",                   category: "asbestos" },
  { src: "/images/Jobs/asbestos-sign.jpg",                  alt: "Asbestos hazard zone signage",                    caption: "Proper asbestos hazard signage on-site",    category: "asbestos" },
  { src: "/images/Jobs/asbestos-tiles-removal-decon.jpg",   alt: "Asbestos tile removal with decontamination unit", caption: "Tile abatement with decon unit",             category: "asbestos" },
  { src: "/images/Jobs/asbestos-decontamination-unit.jpg",  alt: "Asbestos decontamination unit on-site",           caption: "Decontamination unit setup",                category: "asbestos" },
  { src: "/images/Jobs/siding-1.jpg",                       alt: "Asbestos siding removal — North Jersey",          caption: "Siding removal",                            category: "asbestos" },
  { src: "/images/Jobs/siding-2.jpg",                       alt: "Asbestos siding removal — North Jersey",          caption: "Siding removal",                            category: "asbestos" },
  { src: "/images/Jobs/siding-3.jpg",                       alt: "Asbestos siding removal — North Jersey",          caption: "Siding removal",                            category: "asbestos" },

  // ── Demolition ──────────────────────────────────────────────────────────
  { src: "/images/Jobs/garage-demolition.jpg",              alt: "Garage demolition — North Jersey",                caption: "Garage demolition",                         category: "demolition" },
  { src: "/images/Jobs/garage-demolition1.jpg",             alt: "Garage demolition in progress",                   caption: "Garage demolition",                         category: "demolition" },
  { src: "/images/Jobs/deck-demolition.jpg",                alt: "Deck demolition in progress",                     caption: "Deck demolition",                           category: "demolition" },
  { src: "/images/Jobs/before-deck-demolition.jpg",         alt: "Deck before demolition",                          caption: "Deck demolition — before",                  category: "demolition" },
  { src: "/images/Jobs/before-deck-demolition1.jpg",        alt: "Deck before demolition",                          caption: "Deck demolition — before",                  category: "demolition" },
  { src: "/images/Jobs/before-deck-demolition2.jpg",        alt: "Deck before demolition",                          caption: "Deck demolition — before",                  category: "demolition" },
  { src: "/images/Jobs/after-deck-demolition.jpg",          alt: "Site cleared after deck demolition",              caption: "Deck demolition — after",                   category: "demolition" },
  { src: "/images/Jobs/before-fence-demolition.jpg",        alt: "Fence before demolition",                         caption: "Fence demolition — before",                 category: "demolition" },
  { src: "/images/Jobs/before-fence-demolition1.jpg",       alt: "Fence before demolition",                         caption: "Fence demolition — before",                 category: "demolition" },
  { src: "/images/Jobs/after-fence-demolition.jpg",         alt: "Site cleared after fence demolition",             caption: "Fence demolition — after",                  category: "demolition" },
  { src: "/images/Jobs/after-fence-demolition1.jpg",        alt: "Fence demolition complete",                       caption: "Fence removal — site cleared",              category: "demolition" },
  { src: "/images/Jobs/shed-demolition.jpg",                alt: "Shed demolition — North Jersey",                  caption: "Shed demolition",                           category: "demolition" },
  { src: "/images/Jobs/concrete-patio-demolition.jpg",      alt: "Concrete patio demolition",                       caption: "Concrete patio demolition",                 category: "demolition" },
  { src: "/images/Jobs/asphalt-removal.jpg",                alt: "Asphalt removal",                                 caption: "Asphalt removal",                           category: "demolition" },
  { src: "/images/Jobs/asphalt-removal1.jpg",               alt: "Asphalt removal",                                 caption: "Asphalt removal",                           category: "demolition" },
  { src: "/images/Jobs/asphalt-removal-ground-leveling.jpg", alt: "Asphalt removal and ground leveling",            caption: "Asphalt removal & ground leveling",         category: "demolition" },
  { src: "/images/Jobs/mobile-office-demolition.jpg",       alt: "Mobile office demolition",                        caption: "Mobile office demolition",                  category: "demolition" },
  { src: "/images/Jobs/demolition-machine.jpg",             alt: "Demolition equipment on-site",                    caption: "Demolition equipment on-site",              category: "demolition" },
  { src: "/images/Jobs/before-1.jpg",                       alt: "Job site before demolition",                      caption: "Job site — before",                         category: "demolition" },
  { src: "/images/Jobs/before-2.jpg",                       alt: "Job site before demolition",                      caption: "Job site — before",                         category: "demolition" },
  { src: "/images/Jobs/before-3.jpg",                       alt: "Job site before demolition",                      caption: "Job site — before",                         category: "demolition" },
  { src: "/images/Jobs/img-2633.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-2642.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4382.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4392.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4466.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4468.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4599.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4600.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4665.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4667.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4668.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4832.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4834.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4945.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4946.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4947.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4950.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-4952.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5043.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5045.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5051.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5052.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5116.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5117.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5119.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5121.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5123.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5167.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5169.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5171.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5172.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5174.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
  { src: "/images/Jobs/img-5176.jpg",                       alt: "True Star Contracting job site",                  caption: "On-site work",                              category: "demolition" },
];

const filters = [
  { label: "All",        value: "all"        },
  { label: "Demolition", value: "demolition" },
  { label: "Asbestos",   value: "asbestos"   },
  { label: "Mold",       value: "mold"       },
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

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setLightboxIdx(i)}
                className="block w-full border border-[var(--line)] overflow-hidden hover:border-[var(--brand-red)] transition-colors group break-inside-avoid"
                aria-label={`View ${img.caption}`}
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={i < 6 ? "eager" : "lazy"}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium">{img.caption}</p>
                  </div>
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
