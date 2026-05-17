// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — ACTIVE TRIP BOOKINGS CORRIDOR [IC]
// FILE PATH: frontend/src/pages/Bookings.jsx
// ============================================================================

import React from 'react';

export default function Bookings({ trips = [], onUpdateStatus }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-tight">Active Trip Deployments</h2>
        <p className="text-xs text-slate-500 mt-0.5 font-semibold">Real-time status tracking and documentation clearance logs</p>
      </div>

      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-900 text-[10px] font-bold text-slate-500 border-b border-slate-800 uppercase">
              <tr>
                <th className="px-6 py-4">Trip Key</th>
                <th className="px-6 py-4">Manifest Link</th>
                <th className="px-6 py-4">Route Corridors</th>
                <th className="px-6 py-4">Trip Progress</th>
                <th className="px-6 py-4">Payment Clearing</th>
                <th className="px-6 py-4 text-center">Execution Sockets</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300">
              {trips.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                    No active trip manifests running over current logistics channels.
                  </td>
                </tr>
              ) : (
                trips.map((trip) => (
                  <tr key={trip.id || trip.trip_number} className="hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-white">{trip.trip_number}</td>
                    <td className="px-6 py-4 font-mono text-amber-500">LOAD-{trip.load_id}</td>
                    <td className="px-6 py-4 text-slate-200">{trip.start_location} ➔ {trip.destination}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] px-2 py-0.5 rounded border font-bold uppercase ${
                        trip.trip_status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {trip.trip_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] px-2 py-0.5 rounded border font-bold uppercase ${
                        trip.payment_status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {trip.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {trip.trip_status !== 'DELIVERED' && (
                        <button
                          onClick={() => onUpdateStatus(trip.id || trip.trip_number, 'DELIVERED')}
                          className="bg-slate-900 hover:bg-emerald-600 hover:text-white border border-slate-700 px-2.5 py-1 text-[9px] font-black uppercase rounded-lg transition-all"
                        >
                          Complete POD
                        </button>
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