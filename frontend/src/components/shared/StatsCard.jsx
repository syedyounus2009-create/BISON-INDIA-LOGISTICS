// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — REUSABLE TELEMETRY MONITOR CHIP
// FILE PATH: frontend/src/components/shared/StatsCard.jsx
// ============================================================================

import React from 'react';

export default function StatsCard({ title, value, subtext, highlight = false }) {
  return (
    <div className={`border p-5 rounded-2xl transition-all duration-150 ${
      highlight 
        ? 'bg-slate-950/60 border-amber-500/30 shadow-md shadow-amber-500/5' 
        : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
    }`}>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{title}</p>
      <p className={`text-2xl font-black font-mono mt-2 tracking-tight ${highlight ? 'text-amber-500' : 'text-white'}`}>
        {value}
      </p>
      {subtext && (
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">
          {subtext}
        </p>
      )}
    </div>
  );
}