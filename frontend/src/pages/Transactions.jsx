// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — SYSTEM CASH BOOK REGISTRY [IC]
// FILE PATH: frontend/src/pages/Transactions.jsx
// ============================================================================

import React from 'react';

export default function Transactions({ transactions = [] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-tight">General Cash Book Registry</h2>
        <p className="text-xs text-slate-500 mt-0.5 font-semibold">Audit tracking for liquid cash flows, fuel card disbursements, and clearings</p>
      </div>

      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-900 text-[10px] font-bold text-slate-500 border-b border-slate-800 uppercase">
            <tr>
              <th className="px-6 py-4">Bank UTR / Ref Number</th>
              <th className="px-6 py-4">Counterparty Account</th>
              <th className="px-6 py-4">Classification</th>
              <th className="px-6 py-4">Payment Instrument</th>
              <th className="px-6 py-4 text-right">Transaction Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300 font-mono">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-slate-600 font-bold uppercase text-[10px] font-sans">No accounting journal entries committed on current bus traces.</td>
              </tr>
            ) : (
              transactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4 text-slate-400 text-xs font-black">{tx.reference_number}</td>
                  <td className="px-6 py-4 text-white font-sans font-bold">{tx.party_name} <span className="text-slate-600 text-[10px] font-mono">({tx.party_type})</span></td>
                  <td className="px-6 py-4 text-slate-400 font-sans">{tx.transaction_type}</td>
                  <td className="px-6 py-4 text-slate-500 font-sans text-[11px]">{tx.payment_mode}</td>
                  <td className={`px-6 py-4 text-right text-xs font-black ${
                    tx.direction === 'CREDIT' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {tx.direction === 'CREDIT' ? '＋' : '─'} ₹{parseFloat(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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