// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — GENERAL CASH FLOW REGISTRY [IC]
// FILE PATH: frontend/src/components/finance/TransactionFormModal.jsx
// ============================================================================

import React from 'react';

export default function TransactionFormModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const payload = {
      amount: parseFloat(formData.get('amount')) || 0,
      direction: formData.get('direction'), 
      transaction_type: formData.get('transaction_type'),
      party_name: formData.get('party_name'),
      party_type: formData.get('party_type'),
      payment_mode: formData.get('payment_mode'),
      reference_number: formData.get('reference_number').toUpperCase(),
      transaction_date: formData.get('transaction_date'),
      notes: formData.get('notes') || '',
      status: 'COMPLETED'
    };

    onSave(payload);
    e.target.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl subpixel-antialiased">
        
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-tight">Record Cash Book Transaction</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Target: public.transactions</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg font-bold leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Transaction Volume (INR)</label>
              <input required name="amount" type="number" step="0.01" placeholder="e.g. 15000" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold" />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Flow Direction</label>
              <select name="direction" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-bold">
                <option value="CREDIT">CREDIT (Inward Revenue)</option>
                <option value="DEBIT">DEBIT (Outward Expense)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Classification Type</label>
              <input required name="transaction_type" type="text" placeholder="e.g. Advance, Fuel" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold" />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Payment Mode Instrument</label>
              <select name="payment_mode" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold">
                <option value="UPI / NetBanking">UPI / NetBanking</option>
                <option value="Razorpay Gateway">Razorpay Node</option>
                <option value="Fuel Card">Fleet Fuel Card</option>
                <option value="Cash">Cash Vault</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Counterparty Name</label>
              <input required name="party_name" type="text" placeholder="e.g. Karimnagar Depot" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none" />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Bank UTR / Reference</label>
              <input required name="reference_number" type="text" placeholder="e.g. UTR99881122" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Settlement Date</label>
              <input required name="transaction_date" type="date" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Counterparty Type</label>
              <input required name="party_type" type="text" placeholder="e.g. Vendor, Client" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Ledger Context Explanations</label>
            <textarea name="notes" placeholder="Specify trip references or itemization splits..." className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none h-14 resize-none font-medium" />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-[11px] font-black uppercase tracking-wider transition-colors shadow-md">Commit Entry</button>
          </div>
        </form>

      </div>
    </div>
  );
}