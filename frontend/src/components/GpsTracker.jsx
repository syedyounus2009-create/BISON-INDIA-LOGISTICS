// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — GPS LIVE TELEMETRY RADAR
// CODESPACE PATH: frontend/src/components/GpsTracker.jsx
// ============================================================================

import React, { useState, useEffect } from 'react';
import { MapPin, Radio, ShieldAlert, Navigation } from 'lucide-react';

export default function GpsTracker({ activeTripNumber = 'TRIP-77124', assetKey = 'TRK-9021' }) {
  const [telemetry, setTelemetry] = useState({
    latitude: '17.3850° N',
    longitude: '78.4867° E',
    speed: '62 KM/H',
    signalStrength: 'OPTIMAL',
    currentHub: 'HYDERABAD MAIN HUB'
  });

  // Emulate live coordinate updates arriving through the data router matrices
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      const simulatedVariance = (Math.random() * 0.009).toFixed(4);
      setTelemetry(prev => ({
        ...prev,
        latitude: `17.${3850 + Math.floor(Math.random() * 20)}° N`,
        longitude: `78.${4867 + Math.floor(Math.random() * 20)}° E`,
        speed: `${55 + Math.floor(Math.random() * 15)} KM/H`
      }));
    }, 3000);

    return () => clearInterval(telemetryInterval);
  }, []);

  return (
    <div className="bg-[#121214] border-2 border-zinc-900 rounded-2xl p-5 text-left font-sans max-w-md w-full">
      {/* Header telemetry band */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-[#FF7A00] animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-white">{activeTripNumber} SYSTEM BUS</span>
        </div>
        <span className="text-[9px] font-black px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
          GPS LOCK
        </span>
      </div>

      {/* Grid metrics row layout */}
      <div className="grid grid-cols-2 gap-3 mb-4 font-mono">
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3">
          <span className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">LATITUDE LAT</span>
          <span className="text-xs text-white font-black">{telemetry.latitude}</span>
        </div>
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3">
          <span className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">LONGITUDE LNG</span>
          <span className="text-xs text-white font-black">{telemetry.longitude}</span>
        </div>
      </div>

      {/* Lower operational matrix metrics */}
      <div className="space-y-2 border-t border-zinc-900/60 pt-3">
        <div className="flex justify-between items-center text-xs font-sans">
          <span className="text-zinc-500 font-black uppercase tracking-wider">VEHICLE LOG NODE</span>
          <span className="text-white font-black uppercase">{assetKey}</span>
        </div>
        <div className="flex justify-between items-center text-xs font-sans">
          <span className="text-zinc-500 font-black uppercase tracking-wider">CURRENT PROCESSING SPEED</span>
          <span className="text-[#FF7A00] font-black font-mono">{telemetry.speed}</span>
        </div>
        <div className="flex justify-between items-center text-xs font-sans">
          <span className="text-zinc-500 font-black uppercase tracking-wider">CURRENT LOC ROUTE</span>
          <span className="text-white font-black uppercase tracking-tight flex items-center gap-1">
            <Navigation className="w-3 h-3 text-[#FF7A00] fill-[#FF7A00] rotate-45" />
            {telemetry.currentHub}
          </span>
        </div>
      </div>
    </div>
  );
}