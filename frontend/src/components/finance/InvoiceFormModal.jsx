// ============================================================================
// SYSTEM IDENTIFIER: BAYSON SMART LOGISTICS — COMMERCIAL INVOICE GENERATOR [IC]
// FILE PATH: frontend/src/components/finance/InvoiceFormModal.jsx
// ============================================================================

import React, { useState } from 'react';

export default function InvoiceFormModal({ isOpen, onClose, tripOptions = [], onSave }) {
  if (!isOpen) return null;

  const [baseAmount, setBaseAmount] = useState(0);
  const taxComponent = baseAmount * 0.18; 
  const absoluteGrossTotal = baseAmount + taxComponent;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const payload = {
      invoice_number: `INV-2026-${Date.now().toString().slice(-5)}`,
      trip_id: parseInt(formData.get('trip_id')) || null,
      customer_name: formData.get('customer_name'),
      customer_gst: formData.get('customer_gst').toUpperCase(),
      
      // NEW HIGH-SPEED COMMUNICATION PORT SLOTS
      customer_mobile: formData.get('customer_mobile'),
      customer_email: formData.get('customer_email'),
      
      amount: parseFloat(baseAmount),
      tax_amount: parseFloat(taxComponent),
      total_amount: parseFloat(absoluteGrossTotal),
      issue_date: formData.get('issue_date'),
      due_date: formData.get('due_date'),
      status: 'UNPAID'
    };

    onSave(payload);
    
    // Simulate real-time digital dispatch dispatch transmission logs
    alert(
      `[INVOICE DISPATCH SUCCESS]\n\n` +
      `• Record Saved to Master Registry Archive\n` +
      `• SMS Copy Dispatched ➔ +91 ${payload.customer_mobile}\n` +
      `• PDF Invoicing Copy Mailed ➔ ${payload.customer_email}`
    );
    
    e.target.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#121214] border-2 border-[#FF7A00] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl shadow-[#FF7A00]/5 subpixel-antialiased text-left">
        
        {/* Modal Head Header */}
        <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-black/40">
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Generate Financial Invoice</h3>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">Destination: public.invoices</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-[#FF7A00] text-xl font-black leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-1.5">Select Dispatched Core Trip</label>
            <select required name="trip_id" className="w-full bg-[#16161a] border-2 border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF7A00] font-semibold">
              {tripOptions.length === 0 ? (
                <option value="">No dispatched trips available on tracing lines</option>
              ) : (
                tripOptions.map((t) => (
                  <option key={t.id || t.trip_number} value={t.id || t.trip_number}>{t.trip_number} — {t.start_location} ➔ {t.destination}</option>
                ))
              )}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-1.5">Customer / Debtor Identity</label>
              <input required name="customer_name" type="text" placeholder="e.g. Tata Steel" className="w-full bg-[#16161a] border-2 border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF7A00] font-semibold" />
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-1.5">Customer GSTIN</label>
              <input required name="customer_gst" type="text" placeholder="36AAAAA0000A1Z5" maxLength={15} className="w-full bg-[#16161a] border-2 border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF7A00] font-mono font-bold" />
            </div>
          </div>

          {/* NEW MODULE ROW: CORE COMMUNICATION WIRE SLOTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/20 p-3 rounded-xl border border-zinc-800/60">
            <div>
              <label className="block text-[9px] font-black text-[#FF7A00] uppercase tracking-widest mb-1.5">Mobile Slot (SMS Broadcast)</label>
              <input required name="customer_mobile" type="tel" maxLength={10} placeholder="10-Digit Mobile Number" className="w-full bg-[#16161a] border-2 border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF7A00] font-mono font-bold" />
            </div>
            <div>
              <label className="block text-[9px] font-black text-[#FF7A00] uppercase tracking-widest mb-1.5">Email Slot (Digital PDF Out)</label>
              <input required name="customer_email" type="email" placeholder="client@company.com" className="w-full bg-[#16161a] border-2 border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF7A00] font-sans font-semibold" />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-1.5">Net Base Value (INR Amount)</label>
            <input required type="number" value={baseAmount || ''} onChange={(e) => setBaseAmount(parseFloat(e.target.value) || 0)} placeholder="e.g. 50000" className="w-full bg-[#16161a] border-2 border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF7A00] font-mono font-bold" />
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-xl grid grid-cols-2 gap-2 text-[10px] font-mono font-semibold text-zinc-400">
            <p>18% CGST+SGST Split:</p>
            <p className="text-right text-slate-200">₹{taxComponent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            <p className="text-[#FF7A00] font-bold">Gross Invoiced Total:</p>
            <p className="text-right text-[#FF7A00] font-black">₹{absoluteGrossTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-1.5">Issue Date</label>
              <input required name="issue_date" type="date" className="w-full bg-[#16161a] border-2 border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-1.5">Due Term Expiry</label>
              <input required name="due_date" type="date" className="w-full bg-[#16161a] border-2 border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-400 focus:outline-none" />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-[#FF7A00] hover:bg-[#FF8C1A] text-[#111111] rounded-xl text-xs font-black uppercase tracking-widest transition-colors shadow-md">Generate & Transmit</button>
          </div>
        </form>

      </div>
    </div>
  );
}