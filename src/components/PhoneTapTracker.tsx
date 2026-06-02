"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

export function PhoneTapTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor?.href?.startsWith("tel:")) {
        trackEvent("phone_tap");
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  return null;
}
