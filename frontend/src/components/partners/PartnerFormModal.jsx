// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — REGIONAL FRANCHISE INJECTOR [IC]
// FILE PATH: frontend/src/components/partners/PartnerFormModal.jsx
// ============================================================================

import React from 'react';

export default function PartnerFormModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const payload = {
      partner_type: formData.get('partner_type'), // franchise, affiliate, reseller
      company_name: formData.get('company_name'),
      commission_model: formData.get('commission_model'), // percentage, fixed
      commission_value: parseFloat(formData.get('commission_value')) || 0,
      payment_terms: formData.get('payment_terms'),
      contract_start: formData.get('contract_start'),
      contract_end: formData.get('contract_end'),
      status: 'active'
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
            <h3 className="text-xs font-black text-white uppercase tracking-tight">Onboard Franchise Network Node</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Target: public.partners</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg font-bold leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Corporate Node Identity</label>
              <input required name="company_name" type="text" placeholder="e.g. Telangana Fleet Group" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold" />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Partner Classification</label>
              <select name="partner_type" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold">
                <option value="franchise">Franchise Node Hub</option>
                <option value="reseller">White-Label Reseller</option>
                <option value="affiliate">Affiliate Network</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Commission Yield Model</label>
              <select name="commission_model" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold">
                <option value="percentage">Percentage Allocation (%)</option>
                <option value="fixed">Fixed Flat Tier Rate (INR)</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Settlement Rules Scale Value</label>
              <input required name="commission_value" type="number" step="0.01" placeholder="e.g. 5.00 or 500" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none font-mono font-bold" />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Payment / Clearing Settlement Terms</label>
            <input required name="payment_terms" type="text" placeholder="e.g. Net-15 Escrow Clearing" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Contract Commencement</label>
              <input required name="contract_start" type="date" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider mb-1">Contract Term Expiry</label>
              <input required name="contract_end" type="date" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-400 focus:outline-none" />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl text-[11px] font-black uppercase tracking-wider transition-colors shadow-md">Initialize Hub Node</button>
          </div>
        </form>

      </div>
    </div>
  );
}