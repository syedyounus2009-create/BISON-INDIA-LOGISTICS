// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — DESKTOP SIDEBAR CONTROL HUB [IC]
// FILE PATH: frontend/src/components/layout/Sidebar.jsx
// ============================================================================

import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  // Navigation element trace mapping ruleset
  const menuItems = [
    { id: 'overview', label: '📋 Operations Tower' },
    { id: 'traffic', label: '⚡ Traffic Core' },
    { id: 'fleet', label: '🚚 Fleet & Drivers' },
    { id: 'partners', label: '🤝 Partner Portals' },
    { id: 'ioports', label: '🔌 Smart Connections' },
    { id: 'listings', label: '🗂️ All Listings' },
    { id: 'health', label: '🟢 System Parameters' }
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 select-none animate-in fade-in duration-150">
      <div>
        {/* Brand Casing Anchor */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800 space-x-3">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-black text-white text-xl tracking-tighter">B</div>
          <div>
            <span className="text-base font-black tracking-tight text-white block leading-none">BISON</span>
            <span className="text-[9px] font-bold tracking-widest text-amber-500 uppercase">INDIA LOGISTICS</span>
          </div>
        </div>

        {/* Dynamic Trace Selection Sockets */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === item.id
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Hardware Environment Version Label */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50 text-[10px] font-bold tracking-wider text-slate-500 text-center uppercase">
        BIL ENVIRONMENT v1.2.2
      </div>
    </aside>
  );
}