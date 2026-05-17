// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — MASTER SYSTEM ACCESS NAVIGATION HEAD [IC]
// FILE PATH: frontend/src/components/layout/Header.jsx
// ============================================================================

import React from 'react';

export default function Header({ currentDeviceMode }) {
  const isMobile = currentDeviceMode === 'MOBILE';

  return (
    <header className="h-20 bg-slate-950 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between shrink-0 select-none z-30">
      
      {/* Search Input Query Socket */}
      <div className={`${isMobile ? 'max-w-[180px]' : 'max-w-md'} w-full relative`}>
        <input 
          type="text" 
          placeholder={isMobile ? "Query db..." : "Query manifests across RLS tenant mappings..."} 
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2 text-xs font-medium text-slate-300 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      {/* Operator Account Verification Socket */}
      <div className="flex items-center space-x-3 shrink-0">
        {!isMobile && (
          <div className="text-right">
            <p className="text-xs font-black text-white uppercase tracking-tight">Eng. Syed Younus</p>
            <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest leading-none mt-0.5">Lead Architect</p>
          </div>
        )}
        <div className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center font-black text-xs text-amber-500 shadow-sm font-mono select-none">
          IST
        </div>
      </div>

    </header>
  );
}