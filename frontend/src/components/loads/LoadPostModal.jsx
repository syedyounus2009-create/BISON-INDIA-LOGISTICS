// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — SHIPMENT MANIFEST CAPTURE CORRIDOR
// FILE PATH: frontend/src/components/loads/LoadPostModal.jsx
// ============================================================================

import React from 'react';

export default function LoadPostModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Explicit extraction matching PostgreSQL loads schema constraints
    const payload = {
      reference_number: `REF-${Date.now().toString().slice(-6)}`,
      pickup_location: formData.get('pickup_location'),
      drop_location: formData.get('drop_location'),
      material_type: formData.get('material_type'),
      weight_tons: parseFloat(formData.get('weight_tons')) || 0,
      offered_price: parseFloat(formData.get('offered_price')) || 0,
      delivery_date: formData.get('delivery_date'),
      status: 'PENDING'
    };

    onSave(payload);
    e.target.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl subpixel-antialiased">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-tight">Post New Marketplace Load</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Target Table: public.loads</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-lg font-bold leading-none">&times;</button>
        </div>

        {/* Modal Body / Entry Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Pickup Location (varchar)</label>
              <input required name="pickup_location" type="text" placeholder="e.g. Hyderabad, TS" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Drop Location (varchar)</label>
              <input required name="drop_location" type="text" placeholder="e.g. Mumbai, MH" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Material Classification</label>
              <input required name="material_type" type="text" placeholder="e.g. Industrial Steel" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Mass Weight (Decimal Tons)</label>
              <input required name="weight_tons" type="number" step="0.01" placeholder="e.g. 25.5" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Offered Price Target (INR)</label>
              <input required name="offered_price" type="number" step="0.01" placeholder="e.g. 48000" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Required Delivery Date</label>
              <input required name="delivery_date" type="date" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-400 focus:outline-none focus:border-amber-500 font-semibold" />
            </div>
          </div>

          {/* Action Sockets */}
          <div className="pt-2 flex items-center justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-md">Broadcast Manifest</button>
          </div>
        </form>

      </div>
    </div>
  );
}