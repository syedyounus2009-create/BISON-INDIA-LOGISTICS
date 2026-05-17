// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — OPERATOR REGISTRY DECK
// FILE PATH: frontend/src/components/drivers/DriverFormModal.jsx
// ============================================================================

import React from 'react';

export default function DriverFormModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const payload = {
      name: formData.get('name'),
      mobile: formData.get('mobile'),
      license_number: formData.get('license_number').toUpperCase(),
      status: 'AVAILABLE',
      franchise_id: parseInt(formData.get('franchise_id')) || null
    };

    onSave(payload);
    e.target.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl subpixel-antialiased">
        
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-tight">Onboard Certified Operator Account</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Target Table: public.drivers</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg font-bold leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Driver Full Name (varchar)</label>
              <input required name="name" type="text" placeholder="e.g. M. A. Rahman" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Contact Mobile Number</label>
              <input required name="mobile" type="tel" placeholder="e.g. 9177012345" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Commercial Driving License (DL Number)</label>
            <input required name="license_number" type="text" placeholder="e.g. TS-09-DL-2026-X" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold" />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Linked Franchise Node Reference ID</label>
            <input name="franchise_id" type="number" placeholder="Optional Partner Link ID" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono" />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-md">Authorize Operator</button>
          </div>
        </form>

      </div>
    </div>
  );
}