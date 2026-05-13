"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, ArrowRight } from "lucide-react";
import { z } from "zod";
import { siteConfig } from "@/data/siteConfig";

const STORAGE_KEY = "chatBubbleState";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Enter a valid US phone number"),
  message: z.string().min(1, "Please describe what you need help with"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return raw;
}

function ChatPanel({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePhoneBlur = () => setPhone(formatPhone(phone));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const result = schema.safeParse({ name, phone, message });
    if (!result.success) {
      const errs: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof z.infer<typeof schema>;
        if (!errs[key]) errs[key] = issue.message;
      }
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, consent, pageUrl: window.location.href }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "Failed");
      setSuccess(true);
      sessionStorage.setItem(STORAGE_KEY, "submitted");
      setTimeout(() => { onSuccess(); onClose(); }, 5000);
    } catch {
      setSubmitError("Something went wrong. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-[var(--line)] bg-white px-3 py-2.5 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors placeholder:text-[var(--muted)]";

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden border border-[var(--line)] bg-white shadow-2xl"
      style={{ maxHeight: "min(580px, calc(100dvh - 140px))" }}
      role="dialog"
      aria-modal="true"
      aria-label="Chat with True Star Contracting"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: "var(--brand-red)" }}>
        <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-[11px]">TC</span>
        </div>
        <span className="flex-1 text-white font-semibold text-base leading-tight">Have a question?</span>
        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-1 -mr-1" aria-label="Close chat">
          <X size={20} />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="bg-[var(--paper-2)] rounded-lg px-4 py-3 text-sm text-[var(--ink)] leading-relaxed max-w-[90%]">
          Hi! Drop your name, phone, and what you need help with. We&apos;ll text or call you within 1 business hour.
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-4 text-sm text-green-800 leading-relaxed">
            <strong>Thanks!</strong> Mateo will text or call you within 1 business hour.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <div>
              <input type="text" placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={inputClass} />
              {fieldErrors.name && <p className="text-[var(--brand-red)] text-xs mt-1">{fieldErrors.name}</p>}
            </div>

            <div>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 border-[var(--line)] bg-[var(--paper-2)] text-sm text-[var(--muted)] select-none flex-shrink-0">+1</span>
                <input type="tel" placeholder="Phone *" value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={handlePhoneBlur} autoComplete="tel" className={inputClass} />
              </div>
              {fieldErrors.phone && <p className="text-[var(--brand-red)] text-xs mt-1">{fieldErrors.phone}</p>}
            </div>

            <div>
              <textarea rows={3} placeholder="I want to know more" value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass} resize-none`} />
              {fieldErrors.message && <p className="text-[var(--brand-red)] text-xs mt-1">{fieldErrors.message}</p>}
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 flex-shrink-0 accent-[#DC2626]" />
              <span className="text-[11px] text-[var(--muted)] leading-relaxed">
                By submitting you agree to receive SMS or e-mails from True Star Contracting at the number provided. Message and data rates may apply.
              </span>
            </label>

            {submitError && <p className="text-[var(--brand-red)] text-xs">{submitError}</p>}

            <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 bg-[var(--brand-red)] text-white py-3 text-sm font-bold hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed rounded-sm">
              {submitting ? "Sending…" : "Send"}
              {!submitting && <ArrowRight size={15} />}
            </button>

            <p className="text-center text-sm text-[var(--muted)]">
              Or call{" "}
              <a href={siteConfig.phone.href} className="text-[var(--ink)] font-semibold hover:text-[var(--brand-red)] transition-colors">
                {siteConfig.phone.display}
              </a>
            </p>
          </form>
        )}
      </div>

      <div className="flex-shrink-0 px-4 py-2 bg-[var(--paper-2)] border-t border-[var(--line)]">
        <p className="text-[11px] text-[var(--muted)] text-center">Powered by True Star Contracting</p>
      </div>
    </div>
  );
}

export function ChatBubbleWidget() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sessionState, setSessionState] = useState<"submitted" | "dismissed" | "fresh">("fresh");
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelEverOpened, setPanelEverOpened] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const excluded = pathname === "/estimate" || pathname.startsWith("/admin");

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY) as "submitted" | "dismissed" | null;
    const state = stored ?? "fresh";
    setSessionState(state);
    setMounted(true);
    if (state === "fresh") {
      const t1 = setTimeout(() => setPulse(true), 1200);
      const t2 = setTimeout(() => setShowGreeting(true), 3000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  useEffect(() => {
    if (!pulse) return;
    const t = setTimeout(() => setPulse(false), 1000);
    return () => clearTimeout(t);
  }, [pulse]);

  // Close panel on click outside
  useEffect(() => {
    if (!panelOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [panelOpen]);

  // Close panel on Escape
  useEffect(() => {
    if (!panelOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closePanel(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [panelOpen]);

  const openPanel = () => { setPanelOpen(true); setPanelEverOpened(true); setPulse(false); setShowGreeting(false); };
  const closePanel = () => {
    setPanelOpen(false);
    if (sessionState === "fresh") {
      sessionStorage.setItem(STORAGE_KEY, "dismissed");
      setSessionState("dismissed");
    }
  };
  const togglePanel = () => panelOpen ? closePanel() : openPanel();
  const handleSuccess = () => setSessionState("submitted");

  if (!mounted || excluded || sessionState === "submitted") return null;

  return (
    <div
      ref={containerRef}
      className="fixed z-[55] bottom-6 right-6 max-sm:bottom-24 max-sm:right-4 flex flex-col items-end gap-3"
    >
      {/* Greeting tooltip */}
      {showGreeting && !panelOpen && (
        <div className="flex items-start gap-2 bg-white rounded-xl shadow-xl border border-[var(--line)] px-4 py-3 max-w-[260px] animate-fade-in">
          <div className="w-8 h-8 rounded-full bg-[var(--brand-red)] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white font-black text-[10px]">TC</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[var(--ink)] leading-snug">
              Hi there! Have a question?{" "}
              <button
                onClick={openPanel}
                className="text-[var(--brand-red)] font-semibold hover:underline"
              >
                Chat with us here.
              </button>
            </p>
          </div>
          <button
            onClick={() => setShowGreeting(false)}
            className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors flex-shrink-0 -mt-0.5"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Panel */}
      {panelEverOpened && (
        <div
          className="w-[360px] max-sm:w-[calc(100vw-2rem)] transition-all duration-200 origin-bottom-right"
          style={{
            opacity: panelOpen ? 1 : 0,
            transform: panelOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(8px)",
            pointerEvents: panelOpen ? "auto" : "none",
          }}
        >
          <ChatPanel onClose={closePanel} onSuccess={handleSuccess} />
        </div>
      )}

      {/* Bubble button — toggles X / chat icon */}
      <button
        onClick={togglePanel}
        aria-label={panelOpen ? "Close chat" : "Open chat"}
        aria-expanded={panelOpen}
        className={`
          w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl
          hover:scale-105 active:scale-95 transition-all duration-150
          ${pulse && !panelOpen ? "chat-bubble-pulse" : ""}
        `}
        style={{ background: "var(--brand-red)" }}
      >
        <span
          className="transition-transform duration-200"
          style={{ transform: panelOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {panelOpen
            ? <X size={24} />
            : <MessageCircle size={26} fill="white" strokeWidth={0} />
          }
        </span>
      </button>
    </div>
  );
}
