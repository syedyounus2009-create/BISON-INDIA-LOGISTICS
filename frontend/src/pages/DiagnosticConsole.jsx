// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — SCADA FILE HEALTH MONITOR
// CODESPACE PATH: frontend/src/pages/DiagnosticConsole.jsx
// ============================================================================

import React, { useState, useEffect } from 'react';
import { Activity, Server, Database, FileCode } from 'lucide-react';

export default function DiagnosticConsole() {
  const [fileNodes, setFileNodes] = useState([]);

  // Emulating the system check loop reading your exact project files
  useEffect(() => {
    setFileNodes([
      { id: 'F01', category: 'MASTER ROUTES', name: 'Dashboard.jsx', status: 'green', action: 'ACTIVE: Rendering Main Workspace Viewport' },
      { id: 'F02', category: 'MASTER ROUTES', name: 'LandingPage.jsx', status: 'green', action: 'STANDBY: Awaiting Auth Hash Login' },
      { id: 'F03', category: 'CORE COMPONENTS', name: 'SidebarMenu.jsx', status: 'green', action: 'LOCKED: Symmetrical BISON Brand Enforced' },
      { id: 'F04', category: 'CORE COMPONENTS', name: 'DemandForm.jsx', status: 'green', action: 'READY: Broadcast Form Parameters Mounted' },
      { id: 'F05', category: 'CORE COMPONENTS', name: 'DriverForm.jsx', status: 'green', action: 'READY: Workforce Logic Solder Complete' },
      { id: 'F06', category: 'CORE COMPONENTS', name: 'TruckForm.jsx', status: 'green', action: 'READY: Chassis Spec Logic Linked' },
      { id: 'F07', category: 'CORE COMPONENTS', name: 'BookingForm.jsx', status: 'green', action: 'READY: Dispatch Matrix Active' },
      { id: 'F08', category: 'DATABASE SCHEMA', name: 'fleet_registry (Postgres)', status: 'green', action: 'SYNCING: Reading Table Rows' },
      { id: 'F09', category: 'DATABASE SCHEMA', name: 'freight_registry (Postgres)', status: 'green', action: 'SYNCING: Reading Table Rows' },
      { id: 'F10', category: 'EXTERNAL NODES', name: 'SMS_Gateway_API', status: 'red', action: 'ACTION REQUIRED: External Socket Offline' },
      { id: 'F11', category: 'EXTERNAL NODES', name: 'Razorpay_Node', status: 'red', action: 'ACTION REQUIRED: API Keys Missing' },
    ]);
  }, []);

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-100 max-w-5xl font-sans uppercase select-none">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end border-b border-zinc-900/50 pb-4">
        <div>
          <h2 className="text-xl font-medium text-white tracking-widest mb-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#FF7A00]" />
            SCADA HEALTH & PARAMETER DASHBOARD
          </h2>
          <p className="text-xs font-light text-zinc-400 tracking-wider">LIVE FILE INTEGRITY AND ARCHITECTURE MONITOR</p>
        </div>
        <div className="text-[10px] font-medium text-[#FF7A00] tracking-widest border border-[#FF7A00]/20 bg-[#FF7A00]/10 px-3 py-1.5 rounded uppercase">
          SYSTEM CLOCK: ACTIVE
        </div>
      </div>

      {/* METRICS SUMMARY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="bg-[#121214] border border-zinc-900 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="block text-[8px] text-zinc-500 tracking-widest mb-1 font-sans">TOTAL FILES TRACKED</span>
            <span className="text-xl text-white font-medium">11 NODES</span>
          </div>
          <FileCode className="w-6 h-6 text-zinc-700" />
        </div>
        <div className="bg-[#121214] border border-zinc-900 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="block text-[8px] text-emerald-500/70 tracking-widest mb-1 font-sans">HEALTHY COMPONENTS</span>
            <span className="text-xl text-emerald-400 font-medium">09 ACTIVE</span>
          </div>
          <Server className="w-6 h-6 text-emerald-900" />
        </div>
        <div className="bg-[#121214] border border-red-900/30 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="block text-[8px] text-red-500/70 tracking-widest mb-1 font-sans">CRITICAL ALERTS</span>
            <span className="text-xl text-red-500 font-medium">02 OFFLINE</span>
          </div>
          <Database className="w-6 h-6 text-red-900/50" />
        </div>
      </div>

      {/* ==================================================================== */}
      {/* FILE LEDGER TABLE                                                    */}
      {/* ==================================================================== */}
      <div className="bg-[#121214] border border-zinc-900 rounded-2xl overflow-hidden mt-6">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-zinc-950 text-[10px] font-medium text-zinc-500 border-b border-zinc-900 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">FILE CATEGORY</th>
              <th className="px-6 py-4">FILE NODE NAME</th>
              <th className="px-6 py-4 text-center">LED STATUS</th>
              <th className="px-6 py-4">OPERATIONAL LOGIC ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300 font-mono text-[11px]">
            {fileNodes.map(node => (
              <tr key={node.id} className="hover:bg-zinc-950/40 transition-colors">
                <td className="px-6 py-4 text-zinc-500 font-sans tracking-wide">{node.category}</td>
                <td className="px-6 py-4 text-white/90 font-medium font-sans tracking-wider">{node.name}</td>
                
                {/* DYNAMIC BLINKING LED INDICATOR */}
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center">
                    <div className="relative flex h-2.5 w-2.5">
                      {node.status === 'green' ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </>
                      ) : (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                        </>
                      )}
                    </div>
                  </div>
                </td>

                <td className={`px-6 py-4 font-sans tracking-wide ${node.status === 'red' ? 'text-red-400' : 'text-zinc-400'}`}>
                  {node.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}