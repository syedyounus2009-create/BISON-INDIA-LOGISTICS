// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — SHIPPERS DIRECTORY MATRIX [IC]
// FILE PATH: frontend/src/pages/Shippers.jsx
// ============================================================================

import React from 'react';

export default function Shippers() {
  const shippersList = [
    { id: 'SHP-USR-88', client_name: 'Nizam Sugar Factory', mobile: '9848011223', segment: 'Industrial / Agriculture', status: 'ACTIVE' },
    { id: 'SHP-USR-89', client_name: 'Secunderabad Steel Corp', mobile: '9949055667', segment: 'Metal Manufacturing', status: 'ACTIVE' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-tight">Verified Corporate Shippers</h2>
        <p className="text-xs text-slate-500 mt-0.5 font-semibold">Enterprise clients and manufacturing units posting cargo load manifests</p>
      </div>

      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-900 text-[10px] font-bold text-slate-500 border-b border-slate-800 uppercase">
            <tr>
              <th className="px-6 py-4">Account Key</th>
              <th className="px-6 py-4">Enterprise Client Name</th>
              <th className="px-6 py-4">Primary Contact Mobile</th>
              <th className="px-6 py-4">Material Segment Cargo</th>
              <th className="px-6 py-4">System State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300">
            {shippersList.map((s, idx) => (
              <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4 font-mono text-white text-xs">{s.id}</td>
                <td className="px-6 py-4 text-slate-200 font-bold">{s.client_name}</td>
                <td className="px-6 py-4 font-mono text-slate-400">+91 {s.mobile}</td>
                <td className="px-6 py-4 text-slate-400">{s.segment}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-black uppercase">
                    ● {s.status}
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