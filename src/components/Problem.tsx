'use client';

import { Globe, Search, ShieldAlert } from 'lucide-react';

const problems = [
  {
    icon: Globe,
    title: 'Language Barrier',
    description: 'The Chinese CIFER system is entirely in Mandarin. Mistranslations lead to instant rejection.',
  },
  {
    icon: Search,
    title: 'Code Mapping Nightmare',
    description: 'Mapping your local HS codes to China\'s exact 10-digit CIQ architecture is a regulatory nightmare.',
  },
  {
    icon: ShieldAlert,
    title: 'Port Detention Risk',
    description: 'Shipping without an active 18-digit GACC number means your goods will be detained or destroyed at the port.',
  },
];

export default function Problem() {
  return (
    <section id="services" className="bg-bg-ice py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-navy text-center mb-12">
          Don't Let Decree 248 Block Your Exports.
        </h2>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary-navy/10 rounded-lg flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-primary-navy" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-text-charcoal mb-3">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-text-muted leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}