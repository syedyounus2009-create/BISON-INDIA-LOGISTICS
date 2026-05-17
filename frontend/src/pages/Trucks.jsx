// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — TRUCKS INVENTORY TELEMETRY MATRIX
// FILE PATH: frontend/src/pages/Trucks.jsx
// ============================================================================

import React from 'react';

export default function Trucks({ trucks = [] }) {
  return (
    <div className="space-y-6 animate-in fade-in text-left">
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-widest">Active Trucks Registry</h2>
        <p className="text-xs text-zinc-500 mt-0.5 font-semibold">Heavy transport assets layout matching telemetry classification columns</p>
      </div>

      <div className="bg-[#121214] border-2 border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-zinc-900 text-[10px] font-bold text-zinc-500 border-b border-zinc-800/80 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Asset ID</th>
              <th className="px-6 py-4">License Plate Number</th>
              <th className="px-6 py-4">Chassis Classification</th>
              <th className="px-6 py-4">Tonnage Capacity</th>
              <th className="px-6 py-4">Primary Telemetry Hardware</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 font-semibold text-zinc-300 font-mono">
            {trucks.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-zinc-600 font-bold uppercase text-[10px] font-sans">No mechanical fleet units recorded on traces.</td>
              </tr>
            ) : (
              trucks.map((truck) => (
                <tr key={truck.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="px-6 py-4 text-zinc-500 font-black">{truck.id}</td>
                  <td className="px-6 py-4 text-white font-bold font-sans">{truck.truck_number}</td>
                  <td className="px-6 py-4 text-zinc-400 font-sans">{truck.truck_type}</td>
                  <td className="px-6 py-4 text-[#FF7A00] font-black">{truck.capacity_tons} MT</td>
                  <td className="px-6 py-4 text-zinc-400 font-sans text-[11px] font-bold">
                    {truck.tracking_hardware === 'ATTACHED_GPS_DEVICE' ? '🚨 ATTACHED VEHICLE GPS DONGLE' : '📱 DRIVER MOBILE COMPANION APP'}
                  </td>
                  <td className="px-6 py-4 text-center font-sans">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                      truck.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      ● {truck.status}
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