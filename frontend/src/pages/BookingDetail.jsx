// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — CORRIDOR TRACKING INSPECTOR [IC]
// FILE PATH: frontend/src/pages/BookingDetail.jsx
// ============================================================================

import React from 'react';

export default function BookingDetail({ tripId = 'TRIP-77124', onCloseDetail }) {
  // Analytical profile matching public.trips column schemas
  const activeInspectionProfile = {
    trip_number: tripId,
    load_reference: 'LOAD-101',
    carrier_unit: 'TS-09-UB-1234 (Sealed Container)',
    operator_technician: 'M. A. Rahman',
    start_hub: 'Hyderabad Depot Gateway',
    destination_hub: 'Mumbai Port Terminal Area',
    current_velocity: '64 km/h',
    gps_coordinates: '17.3850° N, 78.4867° E'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-left">
      
      {/* Return Interface Navigation Bar */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-base font-black text-white uppercase tracking-widest">Trip Inspector Console</h2>
          <p className="text-xs text-zinc-500 mt-0.5 font-semibold">Deep data inspection matching telemetry packets inside public.trips</p>
        </div>
        <button onClick={onCloseDetail} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-xl text-xs font-black text-zinc-400 uppercase tracking-widest transition-colors">
          🠔 Return to Index
        </button>
      </div>

      {/* Main Structural Splitting Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Telemetry Asset Variables Grid Sheet */}
        <div className="bg-[#121214] border-2 border-zinc-800/80 p-5 rounded-2xl md:col-span-2 space-y-4 font-mono">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00] font-sans block mb-2">Committed Manifest Parameters</span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900">
              <p className="text-[10px] text-zinc-500 font-bold uppercase font-sans tracking-wider">Active Trip Key</p>
              <p className="text-white font-black mt-1 text-sm">{activeInspectionProfile.trip_number}</p>
            </div>
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900">
              <p className="text-[10px] text-zinc-500 font-bold uppercase font-sans tracking-wider">Load Manifest Link</p>
              <p className="text-[#FF7A00] font-black mt-1 text-sm">{activeInspectionProfile.load_reference}</p>
            </div>
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900">
              <p className="text-[10px] text-zinc-500 font-bold uppercase font-sans tracking-wider">Assigned Fleet Unit</p>
              <p className="text-zinc-200 font-bold mt-1 font-sans text-xs">{activeInspectionProfile.carrier_unit}</p>
            </div>
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900">
              <p className="text-[10px] text-zinc-500 font-bold uppercase font-sans tracking-wider">Authorized Operator</p>
              <p className="text-zinc-200 font-bold mt-1 font-sans text-xs">{activeInspectionProfile.operator_technician}</p>
            </div>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 font-sans space-y-1">
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Active Dispatch Corridor Channel</p>
            <p className="text-white text-xs font-bold pt-1">
              {activeInspectionProfile.start_hub} ➔ {activeInspectionProfile.destination_hub}
            </p>
          </div>
        </div>

        {/* Right Side: GPS Live Vector Tracker Stream Simulation */}
        <div className="bg-[#121214] border-2 border-zinc-800/80 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-2">GPS Telemetry Intercept</span>
            <div className="h-28 bg-zinc-950 rounded-xl border border-zinc-900 flex flex-col items-center justify-center p-3 text-center relative overflow-hidden">
              <span className="w-3 h-3 bg-cyan-400 rounded-full animate-ping absolute top-8" />
              <p className="text-xs font-mono font-bold text-white z-10">{activeInspectionProfile.current_velocity}</p>
              <p className="text-[9px] font-mono text-zinc-500 mt-1 z-10 uppercase tracking-tight">{activeInspectionProfile.gps_coordinates}</p>
            </div>
          </div>
          <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider leading-relaxed border-t border-zinc-900 pt-4">
            • Data stream refresh speed synchronized directly with regional telemetry coordinates.
          </div>
        </div>

      </div>

    </div>
  );
}