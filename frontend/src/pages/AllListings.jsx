// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — UNIFIED REGISTRY DATA MATRIX [IC]
// FILE PATH: frontend/src/pages/AllListings.jsx
// ============================================================================

import React from 'react';

export default function AllListings({ loads = [], trucks = [], drivers = [] }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-tight">Unified Listings Central Registry</h2>
        <p className="text-xs text-slate-500 mt-1 font-semibold">Master audit data-stream cross-referencing all sub-module instances in real time</p>
      </div>

      {/* SECTION A: MANIFESTS */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 text-xs font-black text-amber-500 uppercase">📦 Shipment Freight Manifests ({loads.length})</div>
        <table className="w-full text-left text-xs whitespace-nowrap">
          <tbody className="divide-y divide-slate-800/40 text-slate-300 font-medium">
            {loads.map((l, i) => (
              <tr key={i} className="hover:bg-slate-900/20">
                <td className="px-6 py-3 font-mono text-white text-xs">{l.id}</td>
                <td className="px-6 py-3 font-semibold text-slate-200">{l.origin} ➔ {l.destination}</td>
                <td className="px-6 py-3 font-mono text-amber-500">{l.rate}</td>
                <td className="px-6 py-3 text-right"><span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{l.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECTION B: VEHICLES */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 text-xs font-black text-amber-500 uppercase">👤 Registered Operators & Drivers ({drivers.length})</div>
        <table className="w-full text-left text-xs whitespace-nowrap">
          <tbody className="divide-y divide-slate-800/40 text-slate-300 font-medium">
            {drivers.map((t, i) => (
              <tr key={i} className="hover:bg-slate-900/20">
                <td className="px-6 py-3 font-mono text-white text-xs">{t.id}</td>
                <td className="px-6 py-3 font-bold text-slate-200">{t.driver || t.name}</td>
                <td className="px-6 py-3 font-mono text-amber-500">{t.license_number}</td>
                <td className="px-6 py-3 text-right"><span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded">{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}