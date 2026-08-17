"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react"; // optional icons

const FaqComponent = ({ content }) => {
    const [openIndex, setOpenIndex] = useState(null);

    if (!content?.faq || !Array.isArray(content?.faq)) {
      return null; // or a loader / empty state
    }

    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    return (
      <section className="w-full flex justify-center px-4 py-24">
        <div className="max-w-[1400px] w-full grid md:grid-cols-2 gap-16">
          {/* Left side - Title */}
          <div className="flex flex-col gap-4">
            <h2 className="font-display font-semibold text-[34px] sm:text-[44px] tracking-[-0.02em] text-ink max-w-[442px] leading-tight text-balance">{content?.faqTitle}</h2>
            <h2 className="text-sm sm:text-[15px] font-normal text-light-gray max-w-[420px] leading-relaxed">{content?.faqSubtitle}</h2>
          </div>

          {/* Right side - FAQ list */}
          <div className="space-y-2">
            {content?.faq.map((faq, index) => (
              <div key={faq.id} className="border-b-1 border-dark-text/10 pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left font-medium text-lg"
                >
                  <h3 className="text-ink font-medium text-lg sm:text-xl pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <Minus className="w-10 h-10 border-1 border-dark-text/10 p-2 rounded-full" />
                  ) : (
                    <Plus className="w-10 h-10 border-1 border-dark-text/10 p-2 rounded-full" />
                  )}
                </button>
                {openIndex === index && faq.answer && faq.answer !== "NaN" && (
                  <p className="mt-2 text-light-gray">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default FaqComponent;
