// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — MARKETPLACE LOADBOARD ENVIRONMENT [IC]
// FILE PATH: frontend/src/pages/LoadBoard.jsx
// ============================================================================

import React from 'react';

export default function LoadBoard({ loads = [], onAcceptLoad }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Control Block Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-black text-white uppercase tracking-tight">Central Load Marketplace</h2>
          <p className="text-xs text-slate-500 mt-0.5 font-semibold">Live broadcast corridor streaming across open inter-state channels</p>
        </div>
        <div className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
          Total Nodes: <span className="text-amber-500 font-black">{loads.length}</span>
        </div>
      </div>

      {/* High-Performance Datagrid Table Sheet */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-900 text-[10px] font-bold text-slate-500 border-b border-slate-800 uppercase">
              <tr>
                <th className="px-6 py-4">ID Reference</th>
                <th className="px-6 py-4">Route Traces</th>
                <th className="px-6 py-4">Cargo & Mass</th>
                <th className="px-6 py-4">Pricing Rules</th>
                <th className="px-6 py-4">Target Rate</th>
                <th className="px-6 py-4 text-center">Execution Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300">
              {loads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-600 font-bold uppercase text-[11px] tracking-wider">
                    No active freight shipments broadcasting over local area network traces.
                  </td>
                </tr>
              ) : (
                loads.map((load) => (
                  <tr key={load.id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-white">{load.id}</td>
                    <td className="px-6 py-4 text-slate-200 font-bold">{load.origin} ➔ {load.destination}</td>
                    <td className="px-6 py-4 text-slate-400">{load.cargo} <span className="text-slate-600 font-mono text-[11px]">({load.weight})</span></td>
                    <td className="px-6 py-4">
                      <span className="text-[9px] font-black bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400 uppercase tracking-tight">
                        {load.priceModel || 'FIXED'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-amber-500 font-bold font-mono text-xs">{load.rate}</td>
                    <td className="px-6 py-4 text-center">
                      {load.status.includes('Open') ? (
                        <button
                          onClick={() => onAcceptLoad(load.id)}
                          className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-700 font-black text-[10px] uppercase px-3 py-1.5 rounded-xl transition-all tracking-wider"
                        >
                          Accept Manifest
                        </button>
                      ) : (
                        <span className="text-slate-600 text-[10px] uppercase font-black tracking-widest">Assigned</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}