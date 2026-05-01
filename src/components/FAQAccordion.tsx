'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-ice transition-colors"
          >
            <span className="font-semibold text-primary-navy pr-4">{item.question}</span>
            {openIndex === i ? (
              <ChevronUp className="w-5 h-5 text-accent-blue flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-text-muted flex-shrink-0" />
            )}
          </button>
          {openIndex === i && (
            <div className="px-5 pb-5 text-text-charcoal border-t border-gray-100">
              <p className="pt-3">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
