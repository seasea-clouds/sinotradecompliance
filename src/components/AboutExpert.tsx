'use client';

import { MessageCircle } from 'lucide-react';

export default function AboutExpert() {
  return (
    <section id="faq" className="bg-bg-ice py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 shadow-lg">
          {/* Section Header */}
          <h3 className="text-xl sm:text-2xl font-bold text-primary-navy mb-6 text-center">
            Meet Your Local Guide
          </h3>

          {/* Expert Photo Placeholder */}
          <div className="flex justify-center mb-6">
            <img src="/david.jpg" alt="David Zhang" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-md" />
          </div>

          {/* Expert Bio */}
          <div className="text-center mb-8">
            <p className="text-lg text-text-charcoal font-semibold mb-2">David Zhang</p>
            <p className="text-sm text-text-muted mb-4">Senior Regulatory Consultant</p>
            <p className="text-text-muted leading-relaxed max-w-2xl mx-auto">
              Hi, I'm David Zhang, Senior Regulatory Consultant at SinoTrade Compliance.
              Navigating the Chinese bureaucracy shouldn't be a roadblock for your global business.
              My team and I are based in Shanghai, acting as your local eyes and ears.
              We've simplified the entire GACC process into a fast, transparent, and English-friendly experience.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="https://wa.me/message/HPPZ5X6XZSMLM1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white font-bold py-3 px-6 rounded-md transition-all hover:shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with David on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}