// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — COMMERCIAL OPERATORS DECK [IC]
// FILE PATH: frontend/src/pages/Drivers.jsx
// ============================================================================

import React from 'react';

export default function Drivers({ drivers = [] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-base font-black text-white uppercase tracking-tight">Verified Workforce Operators</h2>
        <p className="text-xs text-slate-500 mt-0.5 font-semibold">Authorized driver registries linked with commercial transport licensing parameters</p>
      </div>

      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-900 text-[10px] font-bold text-slate-500 border-b border-slate-800 uppercase">
            <tr>
              <th className="px-6 py-4">System ID</th>
              <th className="px-6 py-4">Operator Full Name</th>
              <th className="px-6 py-4">Mobile Number</th>
              <th className="px-6 py-4">Commercial License DL</th>
              <th className="px-6 py-4">Deployment Availability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300">
            {drivers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-slate-600 font-bold uppercase text-[10px]">No personnel data logs populated down the current data bus line.</td>
              </tr>
            ) : (
              drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-white text-xs">{driver.id}</td>
                  <td className="px-6 py-4 text-white font-bold">{driver.name || driver.driver}</td>
                  <td className="px-6 py-4 font-mono text-slate-400">{driver.mobile}</td>
                  <td className="px-6 py-4 font-mono text-amber-500 font-bold">{driver.license_number}</td>
                  <td className="px-6 py-4">
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                      {driver.status}
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