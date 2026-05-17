// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — HARDWARE I/O PORT ARRAY PANEL [IC]
// FILE PATH: frontend/src/pages/SmartConnections.jsx
// ============================================================================

import React, { useState } from 'react';

export default function SmartConnections() {
  const [hdmiStatus, setHdmiStatus] = useState('CONNECTED');
  const [usbStatus, setUsbStatus] = useState('DISCONNECTED');
  const [opticalStatus, setOpticalStatus] = useState('ACTIVE');
  const [activeHardwareLog, setActiveHardwareLog] = useState('System I/O Port Abstraction layer energized successfully.');

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-tight">System I/O Port Gateway Panel</h2>
        <p className="text-xs text-slate-500 mt-0.5 font-semibold">Live hot-swap hardware connection array matching hardware consumer electronic rulesets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* HDMI Port */}
        <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl relative">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-slate-400">HDMI Display Stream</span>
            <span className={`w-2.5 h-2.5 rounded-full ${hdmiStatus === 'CONNECTED' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-2">Projection Stream Output</p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => { setHdmiStatus('CONNECTED'); setActiveHardwareLog('[HDMI] External monitor link projection initialized safely.'); }} className="flex-1 bg-slate-900 hover:bg-slate-800 text-[10px] font-bold uppercase py-2 rounded-xl border border-slate-800 text-white">Plug</button>
            <button onClick={() => { setHdmiStatus('DISCONNECTED'); setActiveHardwareLog('[HDMI] Link severed. External viewport offline.'); }} className="flex-1 bg-slate-900 hover:bg-red-950/30 text-[10px] font-bold uppercase py-2 rounded-xl border border-slate-800 text-slate-400">Unplug</button>
          </div>
        </div>

        {/* USB Port */}
        <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl relative">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-slate-400">USB Telemetry Input</span>
            <span className={`w-2.5 h-2.5 rounded-full ${usbStatus === 'CONNECTED' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-2">GPS Fleet Hardware Dongle</p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => { setUsbStatus('CONNECTED'); setActiveHardwareLog('[USB] Plug & Play tracking device mounted. Parsing data stream.'); }} className="flex-1 bg-slate-900 hover:bg-slate-800 text-[10px] font-bold uppercase py-2 rounded-xl border border-slate-800 text-white">Plug</button>
            <button onClick={() => { setUsbStatus('DISCONNECTED'); setActiveHardwareLog('[USB] Tracker connection disconnected from socket.'); }} className="flex-1 bg-slate-900 hover:bg-red-950/30 text-[10px] font-bold uppercase py-2 rounded-xl border border-slate-800 text-slate-400">Unplug</button>
          </div>
        </div>

        {/* Optical Port */}
        <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl relative">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-slate-400">Optical Fiber Out</span>
            <span className={`w-2.5 h-2.5 rounded-full ${opticalStatus === 'ACTIVE' ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-2">SMS Message Gateway Intercept</p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => { setOpticalStatus('ACTIVE'); setActiveHardwareLog('[OPTICAL] Fiber line operating at high-speed baseline.'); }} className="flex-1 bg-slate-900 hover:bg-slate-800 text-[10px] font-bold uppercase py-2 rounded-xl border border-slate-800 text-white">Plug</button>
            <button onClick={() => { setOpticalStatus('MUTED'); setActiveHardwareLog('[OPTICAL] Signal loop muted safely.'); }} className="flex-1 bg-slate-900 hover:bg-red-950/30 text-[10px] font-bold uppercase py-2 rounded-xl border border-slate-800 text-slate-400">Unplug</button>
          </div>
        </div>
      </div>

      <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl font-mono text-xs text-slate-400">
        <p className="text-amber-500 font-bold uppercase tracking-wider mb-2">🔌 ACTIVE TELEVISION INTERCEPT BUS MONITOR:</p>
        <p className="text-white animate-in fade-in duration-75">{activeHardwareLog}</p>
      </div>
    </div>
  );
}