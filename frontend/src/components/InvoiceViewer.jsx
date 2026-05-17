// ============================================================================
// SYSTEM IDENTIFIER: BAYSON INDIA LOGISTICS — FINANCIAL INVOICE SYSTEM
// CODESPACE PATH: frontend/src/components/InvoiceViewer.jsx
// ============================================================================

import React, { useState } from 'react';
import { FileText, ShieldCheck, FileSpreadsheet, IndianRupee } from 'lucide-react';

export default function InvoiceViewer() {
  // Emulate data arriving straight out of your database tables row matrix query
  const [invoices] = useState([
    { id: 'INV-2026-701', booking_ref: 'TRIP-77124', outstanding: '15,000', collected: '40,000', gst_status: 'VALIDATED' },
    { id: 'INV-2026-702', booking_ref: 'TRIP-77891', outstanding: '32,000', collected: '0', gst_status: 'VALIDATED' },
    { id: 'INV-2026-703', booking_ref: 'TRIP-77445', outstanding: '0', collected: '65,000', gst_status: 'PROCESSING_HOLD' }
  ]);

  return (
    <div className="bg-[#121214] border-2 border-zinc-900 rounded-2xl p-6 text-left font-sans w-full max-w-4xl animate-in fade-in duration-100">
      
      {/* Financial Controller Header Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4 mb-6 select-none">
        <div className="flex items-center space-x-2.5">
          <FileText className="w-4 h-4 text-[#FF7A00]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-white">FINANCIAL INVOICE TRANSPARENCY MATRIX</h3>
        </div>
        <button 
          onClick={() => alert('[EXPORT TELEMETRY] Initialized dynamic balance audit sheet export.')}
          className="bg-zinc-950 border border-zinc-800 hover:border-[#FF7A00] text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" /> EXPORT AUDIT LOGS
        </button>
      </div>

      {/* Grid Database Summary Matrix Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-sans select-none">
        <div className="bg-zinc-950 border-2 border-zinc-900 rounded-xl p-4">
          <span className="block text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">TOTAL LIQUIDITY COLLECTED</span>
          <span className="text-xl font-black text-emerald-400 font-mono">₹1,05,000</span>
        </div>
        <div className="bg-zinc-950 border-2 border-zinc-900 rounded-xl p-4">
          <span className="block text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">OUTSTANDING ACCOUNTS RECEIVABLE</span>
          <span className="text-xl font-black text-amber-500 font-mono">₹47,000</span>
        </div>
        <div className="bg-zinc-950 border-2 border-zinc-900 rounded-xl p-4">
          <span className="block text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">GST AUDIT STATUS MAPPING</span>
          <span className="text-xl font-black text-white flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-[#FF7A00]" /> 100% SECURE
          </span>
        </div>
      </div>

      {/* Datatable Layer Array Container */}
      <div className="border-2 border-zinc-900 rounded-xl overflow-hidden bg-black/20">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-zinc-950 text-[9px] font-black text-zinc-500 border-b border-zinc-900 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">INVOICE HASH KEY</th>
              <th className="px-6 py-4">DISPATCH REF LINK</th>
              <th className="px-6 py-4 text-right">OUTSTANDING UNPAID</th>
              <th className="px-6 py-4 text-right">COLLECTED PAID</th>
              <th className="px-6 py-4 text-center">GST COMPLIANCE FLAG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 font-bold text-zinc-300 font-mono">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-zinc-950/40">
                <td className="px-6 py-4 text-[#FF7A00] font-black">{inv.id}</td>
                <td className="px-6 py-4 text-white font-sans font-black uppercase text-xs">{inv.booking_ref}</td>
                <td className="px-6 py-4 text-right text-amber-500 font-black">₹{inv.outstanding}</td>
                <td className="px-6 py-4 text-right text-emerald-400 font-black">₹{inv.collected}</td>
                <td className="px-6 py-4 text-center font-sans select-none">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase ${
                    inv.gst_status === 'VALIDATED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                  }`}>
                    {inv.gst_status}
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