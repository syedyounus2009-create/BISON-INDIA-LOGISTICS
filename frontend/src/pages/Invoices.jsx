// ============================================================================
// SYSTEM IDENTIFIER: BAYSON SMART LOGISTICS — COMMERCIAL INVOICES MATRIX [IC]
// FILE PATH: frontend/src/pages/Invoices.jsx
// ============================================================================

import React from 'react';

export default function Invoices({ invoices = [] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-left">
      
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-widest">Accounts Receivable Ledger</h2>
        <p className="text-xs text-zinc-500 mt-0.5 font-semibold">Statutory GST tax invoices issued with recorded multi-channel communication profiles</p>
      </div>

      <div className="bg-[#121214] border-2 border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-zinc-900 text-[10px] font-bold text-zinc-500 border-b border-zinc-800/80 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Invoice Key</th>
              <th className="px-6 py-4">Customer Identity & GSTIN</th>
              <th className="px-6 py-4">Communication Record Channels</th>
              <th className="px-6 py-4 text-right">Gross Outstanding</th>
              <th className="px-6 py-4 text-center">Settlement State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 font-semibold text-zinc-300">
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-slate-600 font-bold uppercase text-[10px]">No commercial invoices generated on traces.</td>
              </tr>
            ) : (
              invoices.map((inv, idx) => {
                return (
                  <tr key={idx} className="hover:bg-zinc-900/30 transition-colors font-mono">
                    <td className="px-6 py-4 text-white text-xs font-black">{inv.invoice_number}</td>
                    <td className="px-6 py-4 font-sans">
                      <p className="text-white font-bold">{inv.customer_name}</p>
                      <p className="text-zinc-500 text-[10px] font-mono mt-0.5">{inv.customer_gst}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] text-zinc-400">
                      <p>📱 +91 {inv.customer_mobile || '98480XXXXX'}</p>
                      <p className="text-zinc-500 text-[10px] mt-0.5">✉️ {inv.customer_email || 'automatic@bayson.com'}</p>
                    </td>
                    <td className="px-6 py-4 text-right text-[#FF7A00] font-black text-xs">
                      ₹{parseFloat(inv.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-center font-sans">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                        inv.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}