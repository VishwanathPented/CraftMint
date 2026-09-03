"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: React.ReactNode;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${i}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="focus-ring flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-sans text-sm font-medium uppercase tracking-[0.1em] text-charcoal">
                {item.question}
              </span>
              <span
                aria-hidden
                className={cn(
                  "font-display text-xl text-warm-grey transition-transform duration-300",
                  isOpen && "rotate-45",
                )}
              >
                +
              </span>
            </button>
            <div
              id={`accordion-panel-${i}`}
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 max-w-2xl font-sans text-sm leading-relaxed text-charcoal-soft">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
