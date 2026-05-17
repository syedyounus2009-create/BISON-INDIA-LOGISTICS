// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — PRODUCTION FOOTER MANIFEST
// CODESPACE PATH: frontend/src/components/Footer.jsx
// ============================================================================

import React from 'react';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-white py-16 px-6 border-t border-zinc-900 font-sans text-left selection:bg-[#FF7A00] selection:text-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 select-none">
        
        {/* Brand Column Profile */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img 
              src="/bison-logo.png" 
              alt="Bison Logo" 
              className="w-8 h-8 object-contain rounded" 
            />
            <div>
              <div className="font-sans font-black text-white tracking-tight text-base leading-none">BAYSON</div>
              <div className="text-[9px] text-[#FF7A00] font-black tracking-widest uppercase mt-0.5">SMART LOGISTICS</div>
            </div>
          </div>
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider leading-relaxed">
            Smart Logistics. Powerful Movement. India's trusted trucking platform.
          </p>
        </div>

        {/* Platform Column Routing */}
        <div>
          <h4 className="font-black mb-4 text-xs uppercase tracking-widest text-zinc-400">Platform</h4>
          <ul className="space-y-2 text-[11px] text-zinc-500 font-black uppercase tracking-wider">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
          </ul>
        </div>

        {/* Company Corporate Details */}
        <div>
          <h4 className="font-black mb-4 text-xs uppercase tracking-widest text-zinc-400">Company</h4>
          <ul className="space-y-2 text-[11px] text-zinc-500 font-black uppercase tracking-wider">
            <li><a href="#about" className="hover:text-white transition-colors">About Bayson</a></li>
            <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Technical Communications Line Contact */}
        <div>
          <h4 className="font-black mb-4 text-xs uppercase tracking-widest text-zinc-400">Contact</h4>
          <div className="space-y-2 text-xs text-zinc-500 font-mono">
            <div className="flex items-center gap-2 font-sans font-black uppercase tracking-wide text-zinc-400">
              <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>+91 XXXXX XXXXX</span>
            </div>
            <div className="flex items-center gap-2 font-sans font-black tracking-wide lowercase hover:text-[#FF7A00] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>support@baysonindia.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* Verified Lower Bar Divider Element */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-zinc-900 text-center text-[10px] font-black text-zinc-500 tracking-wider uppercase font-sans">
        © 2026 Bayson India Logistics Pvt. Ltd. All rights reserved. | Trademark Registered
      </div>

    </footer>
  );
}