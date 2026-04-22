'use client';

import { CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-primary-navy min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block mb-6">
          <span className="bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium border border-white/20">
            Decree 248 GACC Compliance Experts
          </span>
        </div>

        {/* H1 Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Clear China Customs Without the Hassle.
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Fast, compliant, and guaranteed GACC registration for global Food & Beverage brands.
          We handle the complex Chinese CIFER system so you can focus on exporting.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="#lead-magnet"
            className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-white font-bold py-4 px-8 rounded-md transition-all hover:shadow-lg text-center"
          >
            Get Your Free Assessment
          </a>
          <a
            href="#lead-magnet"
            className="w-full sm:w-auto text-white/80 hover:text-white font-medium py-4 px-6 transition-colors flex items-center justify-center gap-2"
          >
            or Download Document Checklist (PDF) →
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-sm">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-accent-gold" />
            100% English Support
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-accent-gold" />
            Zero Paperwork
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-accent-gold" />
            7-14 Days Fast Track
          </span>
        </div>
      </div>
    </section>
  );
}