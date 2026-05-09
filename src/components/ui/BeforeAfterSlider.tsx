"use client";
import { useRef, useState, useCallback } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  caption?: string;
};

export function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt, caption }: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging.current) getPosition(e.clientX);
  }, [getPosition]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    getPosition(e.touches[0].clientX);
  }, [getPosition]);

  return (
    <figure>
      <div
        ref={containerRef}
        className="ba-slider relative select-none overflow-hidden aspect-video bg-[var(--paper-2)]"
        onMouseMove={onMouseMove}
        onMouseDown={() => { dragging.current = true; }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchMove={onTouchMove}
        aria-label="Before and after comparison"
        role="img"
      >
        {/* After image (base) */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={afterSrc} alt={afterAlt} className="w-full h-full object-cover" draggable={false} />
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ minWidth: `${(100 / position) * 100}%`, maxWidth: "none" }}
            draggable={false}
          />
        </div>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[var(--brand-red)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--brand-red)] flex items-center justify-center text-white text-xs font-bold shadow-md cursor-col-resize">
            ◀▶
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 font-semibold">BEFORE</div>
        <div className="absolute top-3 right-3 bg-[var(--brand-red)] text-white text-xs px-2 py-1 font-semibold">AFTER</div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-[var(--muted)] text-center">{caption}</figcaption>
      )}
    </figure>
  );
}
