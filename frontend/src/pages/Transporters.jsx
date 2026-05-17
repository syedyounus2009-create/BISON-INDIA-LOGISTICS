// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — TRANSPORTERS LEADERBOARD [IC]
// FILE PATH: frontend/src/pages/Transporters.jsx
// ============================================================================

import React from 'react';

export default function Transporters() {
  // Local structural dataset matching public.users joined with metrics
  const transportersList = [
    { id: 'TRP-USR-01', identity: 'K. Singh Logistics', mobile: '9988776655', region: 'Telangana Hub', status: 'ACTIVE' },
    { id: 'TRP-USR-02', identity: 'Deccan Cargo Movers', mobile: '9177098765', region: 'Hyderabad Ring', status: 'ACTIVE' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-tight">Onboarded Transporter Directories</h2>
        <p className="text-xs text-slate-500 mt-0.5 font-semibold">Verified freight transport agencies managing operations under tenant isolation</p>
      </div>

      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-900 text-[10px] font-bold text-slate-500 border-b border-slate-800 uppercase">
            <tr>
              <th className="px-6 py-4">Account Key</th>
              <th className="px-6 py-4">Corporate Agency Name</th>
              <th className="px-6 py-4">Registered Contact Mobile</th>
              <th className="px-6 py-4">Primary Region Terminal</th>
              <th className="px-6 py-4">System State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300">
            {transportersList.map((t, idx) => (
              <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4 font-mono text-white text-xs">{t.id}</td>
                <td className="px-6 py-4 text-slate-200 font-bold">{t.identity}</td>
                <td className="px-6 py-4 font-mono text-slate-400">+91 {t.mobile}</td>
                <td className="px-6 py-4 text-slate-400">{t.region}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-black uppercase">
                    ● {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}