'use client';

import { MessageCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-navy/95 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-white font-bold text-lg sm:text-xl font-[Montserrat]">
              SinoTrade Compliance
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Services
            </a>
            <a href="#process" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Process
            </a>
            <a href="#faq" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              FAQ
            </a>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/message/HPPZ5X6XZSMLM1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-4 py-2 rounded-md transition-all hover:shadow-md text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp Us</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Mobile Navigation - simplified */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <a href="#services" className="text-white/80 hover:text-white transition-colors">
            Services
          </a>
          <a href="#process" className="text-white/80 hover:text-white transition-colors">
            Process
          </a>
          <a href="#faq" className="text-white/80 hover:text-white transition-colors">
            FAQ
          </a>
        </div>
      </div>
    </nav>
  );
}