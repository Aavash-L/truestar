"use client";
import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";

type FAQ = { question: string; answer: string };

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[var(--line)]">
      {faqs.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-[var(--ink)] text-sm sm:text-base pr-4">
                {faq.question}
              </span>
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[var(--brand-red)]">
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"}`}
            >
              <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
