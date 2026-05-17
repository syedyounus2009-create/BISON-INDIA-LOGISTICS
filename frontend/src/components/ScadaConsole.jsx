// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — SCADA TERMINAL DIAGNOSTIC CONSOLE
// CODESPACE PATH: frontend/src/components/ScadaConsole.jsx
// ============================================================================

import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Database, Activity } from 'lucide-react';

export default function ScadaConsole() {
  const [logs, setLogs] = useState([
    ':: INITIALIZING SCADA TELEMETRY NETWORK ROUTER MATRIX...',
    ':: SYSTEM STATUS: REGISTERING SOVEREIGN ENVIRONMENT LINKS... DONE.',
    ':: ROUTING CORRIDOR NODE ESTABLISHED FOR TELANGANA SECTOR [J-YMIH]'
  ]);

  useEffect(() => {
    const logInterval = setInterval(() => {
      const timestamps = new Date().toLocaleTimeString('en-US', { hour12: false });
      const updates = [
        `[${timestamps}] TELEMETRY SIGNAL RECOVERY: TRACKING INTERFACE STEADY`,
        `[${timestamps}] ROUTER MATRICES STATUS: 100% DATA PACKETS ROUTED SMOOTHLY`,
        `[${timestamps}] SCADA INTERCEPT DOOR: VALIDATING ADMINISTRATIVE AUTHORIZATIONS`,
        `[${timestamps}] CONCURRENCY CHECK: FREIGHT TRANSACTION LOCK VERIFIED`
      ];
      const selectedUpdate = updates[Math.floor(Math.random() * updates.length)];
      setLogs(prev => [...prev.slice(-6), selectedUpdate]); // Lock view to terminal rows
    }, 4000);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="bg-[#121214] border-2 border-zinc-900 rounded-2xl p-6 text-left font-sans max-w-2xl w-full">
      {/* Upper Infrastructure Dashboard Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4 mb-4 select-none">
        <div className="flex items-center space-x-2.5">
          <Terminal className="w-4 h-4 text-[#FF7A00]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-white">LIVE SCADA LOG MATRIX</h3>
        </div>
        <div className="flex items-center space-x-4 text-[10px] font-black text-zinc-500 uppercase tracking-wider">
          <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-emerald-400" /> BUS SYSTEM VERIFIED</span>
          <span className="flex items-center gap-1"><Database className="w-3 h-3 text-[#FF7A00]" /> IST LINK STABLE</span>
        </div>
      </div>

      {/* Terminal Text Screen Output Casing */}
      <div className="bg-zinc-950 border-2 border-zinc-900 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-zinc-400 min-h-[160px] flex flex-col justify-end space-y-1.5 shadow-inner">
        {logs.map((log, index) => (
          <div key={index} className="whitespace-normal break-all">
            <span className="text-[#FF7A00] font-black select-none">&gt;</span> {log}
          </div>
        ))}
      </div>
    </div>
  );
}