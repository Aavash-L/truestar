"use client";
import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: { src: string; alt: string; caption?: string }[];
  currentIdx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ images, currentIdx, onClose, onPrev, onNext }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const current = images[currentIdx];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 hover:text-[var(--brand-red)] transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:text-[var(--brand-red)] transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      {/* Image */}
      <div className="max-w-5xl max-h-[80vh] mx-16" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt}
          className="max-w-full max-h-[75vh] object-contain"
        />
        {current.caption && (
          <p className="text-white text-sm text-center mt-3 text-[var(--muted)]">{current.caption}</p>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:text-[var(--brand-red)] transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight size={36} />
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs">
        {currentIdx + 1} / {images.length}
      </div>
    </div>
  );
}
