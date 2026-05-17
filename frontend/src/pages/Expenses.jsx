// ============================================================================
// SYSTEM IDENTIFIER: BAYSON SMART LOGISTICS — FLEET EXPENSE AUDIT CONTROL [IC]
// FILE PATH: frontend/src/pages/Expenses.jsx
// ============================================================================

import React, { useState } from 'react';

export default function Expenses() {
  const [expenseLedger, setExpenseLedger] = useState([
    { id: 'EXP-901', type: 'Fuel Purchase', amount: 24500, trip_id: 'TRIP-77124', location: 'NH-65 Plaza, TS', status: 'APPROVED' },
    { id: 'EXP-902', type: 'Highway Toll Charge', amount: 1850, trip_id: 'TRIP-77124', location: 'Secunderabad Hub', status: 'SUBMITTED' }
  ]);

  const handleCommitExpense = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const type = formData.get('type');
    const amount = parseFloat(formData.get('amount')) || 0;
    const trip_id = formData.get('trip_id');
    const location = formData.get('location');

    if (!type || amount <= 0) return;

    const newRecord = {
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      type,
      amount,
      trip_id: trip_id ? `TRIP-${trip_id}` : 'GENERAL',
      location,
      status: 'SUBMITTED'
    };

    setExpenseLedger([newRecord, ...expenseLedger]);
    e.target.reset();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-left">
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-widest">Operational Expenses Ledger</h2>
        <p className="text-xs text-zinc-500 mt-0.5 font-semibold">Audit tracking for cash outflows, highway toll cards, and fleet fuel maintenance</p>
      </div>

      <div className="bg-[#121214] border-2 border-zinc-800/80 p-5 rounded-2xl">
        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 text-[#FF7A00]">Log Fleet Outflow Voucher</h4>
        <form onSubmit={handleCommitExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input name="type" required type="text" placeholder="Expense Type (e.g. Fuel, Repair)" className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF7A00] font-semibold" />
          <input name="amount" required type="number" step="0.01" placeholder="Amount (INR)" className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF7A00] font-mono font-bold" />
          <input name="trip_id" type="text" placeholder="Trip Suffix ID (Optional)" className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF7A00] font-mono" />
          <input name="location" required type="text" placeholder="Hub Terminal Location" className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF7A00] font-semibold" />
          <button type="submit" className="sm:col-span-4 bg-[#FF7A00] hover:bg-[#FF8C1A] text-[#111111] py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors shadow-md">
            Commit Expense Record Entry
          </button>
        </form>
      </div>

      <div className="bg-[#121214] border-2 border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-zinc-900 text-[10px] font-bold text-zinc-500 border-b border-zinc-800/80 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Voucher Key</th>
              <th className="px-6 py-4">Expense Profile Classification</th>
              <th className="px-6 py-4">Linked Route Trip</th>
              <th className="px-6 py-4">Terminal Geo Location</th>
              <th className="px-6 py-4 text-right">Settled Cost</th>
              <th className="px-6 py-4 text-center">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 font-semibold text-zinc-300 font-mono">
            {expenseLedger.map((exp, idx) => (
              <tr key={idx} className="hover:bg-zinc-900/30 transition-colors">
                <td className="px-6 py-4 text-zinc-500 text-xs font-black">{exp.id}</td>
                <td className="px-6 py-4 text-white font-sans font-bold">{exp.type}</td>
                <td className="px-6 py-4 text-[#FF7A00]">{exp.trip_id}</td>
                <td className="px-6 py-4 text-zinc-400 font-sans">{exp.location}</td>
                <td className="px-6 py-4 text-right text-white font-black text-xs">₹{parseFloat(exp.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td className="px-6 py-4 text-center font-sans">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                    exp.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {exp.status}
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