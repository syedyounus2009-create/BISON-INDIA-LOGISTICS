// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — OPERATIONS MANIFEST DISPATCHER
// FILE PATH: frontend/src/components/bookings/BookingFormModal.jsx
// ============================================================================

import React from 'react';

export default function BookingFormModal({ isOpen, onClose, loadOptions, truckOptions, driverOptions, onSave }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const payload = {
      trip_number: `TRIP-${Date.now().toString().slice(-6)}`,
      load_id: parseInt(formData.get('load_id')),
      truck_id: parseInt(formData.get('truck_id')),
      driver_id: parseInt(formData.get('driver_id')),
      start_location: formData.get('start_location'),
      destination: formData.get('destination'),
      start_date: formData.get('start_date'),
      trip_status: 'CREATED',
      payment_status: 'PENDING'
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
            <h3 className="text-sm font-black text-white uppercase tracking-tight">Generate Active Corridor Trip Manifest</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Target Table: public.trips</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg font-bold leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Select Active Load ID (public.loads)</label>
            <select required name="load_id" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold">
              {loadOptions.map((load) => (
                <option key={load.id} value={load.id}>{load.id} — {load.origin} to {load.destination} ({load.weight})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Assign Vehicle (trucks)</label>
              <select required name="truck_id" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold">
                {truckOptions.map((t) => (
                  <option key={t.id} value={t.id}>{t.truck_number || t.id} ({t.truck_type})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Assign Driver (drivers)</label>
              <select required name="driver_id" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold">
                {driverOptions.map((d) => (
                  <option key={d.id} value={d.id}>{d.driver || d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Start Hub Location</label>
              <input required name="start_location" type="text" placeholder="e.g. Hyderabad, TS" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Destination Hub</label>
              <input required name="destination" type="text" placeholder="e.g. Mumbai, MH" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Trip Commencement Dispatch Date</label>
            <input required name="start_date" type="date" className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-400 focus:outline-none focus:border-amber-500 font-semibold" />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-md">Deploy Route Run</button>
          </div>
        </form>

      </div>
    </div>
  );
}