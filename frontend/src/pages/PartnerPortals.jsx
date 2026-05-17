// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — REGIONAL PARTNERS MODULE [IC]
// FILE PATH: frontend/src/pages/PartnerPortals.jsx
// ============================================================================

import React from 'react';

export default function PartnerPortals({ partners = [] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-tight">Partner Portals Hub</h2>
        <p className="text-xs text-slate-500 mt-0.5 font-semibold">Configured franchise networks, white-label nodes, and active commission rulesets</p>
      </div>

      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-900 text-[10px] font-bold text-slate-500 border-b border-slate-800 uppercase">
            <tr>
              <th className="px-6 py-4">Partner ID</th>
              <th className="px-6 py-4">Corporate Identity</th>
              <th className="px-6 py-4">Classification</th>
              <th className="px-6 py-4">Settlement Rules</th>
              <th className="px-6 py-4">Contract Timeline</th>
              <th className="px-6 py-4">System State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300">
            {partners.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-slate-600 font-bold uppercase text-[10px]">No white-label franchise networks mounted to the active bus line.</td>
              </tr>
            ) : (
              partners.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-white text-xs">{p.id}</td>
                  <td className="px-6 py-4 text-slate-200 font-bold">{p.company_name || p.name}</td>
                  <td className="px-6 py-4 text-slate-400 uppercase text-[11px]">{p.partner_type || p.type}</td>
                  <td className="px-6 py-4 text-amber-500 font-mono font-bold">{p.value || `${p.commission_value} (${p.commission_model})`}</td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-[11px]">{p.contract_start || '2026-05-16'} ➔ {p.contract_end || '2027-05-16'}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-black uppercase">
                      ● {p.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}