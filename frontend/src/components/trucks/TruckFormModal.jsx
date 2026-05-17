// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — FLEET ASSET ENTRY GATEWAY
// FILE PATH: frontend/src/components/trucks/TruckFormModal.jsx
// ============================================================================

import React from 'react';

export default function TruckFormModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const payload = {
      truck_number: formData.get('truck_number').toUpperCase(),
      truck_type: formData.get('truck_type'),
      capacity_tons: parseFloat(formData.get('capacity_tons')) || 0,
      franchise_id: parseInt(formData.get('franchise_id')) || null,
      status: 'AVAILABLE'
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
            <h3 className="text-sm font-black text-white uppercase tracking-tight">Onboard Fleet Transport Unit</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Target Table: public.trucks</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg font-bold leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Vehicle License Plate Number (varchar Unique)</label>
            <input required name="truck_number" type="text" placeholder="e.g. TS-09-UB-5678" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Vehicle Classification</label>
              <select name="truck_type" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold">
                <option value="Open Truck">6-Wheel Open Cargo Truck</option>
                <option value="Container">14-Axle Sealed Container</option>
                <option value="Trailer">Multi-Axle Flatbed Trailer</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Capacity Limit (Tons)</label>
              <input required name="capacity_tons" type="number" step="0.1" placeholder="e.g. 18.5" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Franchise Affiliate Node Reference (ID Link)</label>
            <input name="franchise_id" type="number" placeholder="Optional Partner Linked ID" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono" />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-md">Register Truck</button>
          </div>
        </form>

      </div>
    </div>
  );
}