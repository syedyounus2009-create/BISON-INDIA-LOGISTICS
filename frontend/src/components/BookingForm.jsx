// ============================================================================
// SYSTEM IDENTIFIER: BAYSON INDIA LOGISTICS — DISPATCH BOOKING REGISTRY
// CODESPACE PATH: frontend/src/components/BookingForm.jsx
// ============================================================================

import React from 'react';
import { BookOpen } from 'lucide-react';

export default function BookingForm({ onBookingSubmit, onClose }) {
  const executeBooking = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    
    const payload = {
      id: 'BKG-' + Math.floor(100 + Math.random() * 899),
      load_id: data.get('loadRef').toUpperCase(),
      truck_number: data.get('truckRef').toUpperCase(),
      status: data.get('dispatchState')
    };

    if (onBookingSubmit) onBookingSubmit(payload);
  };

  return (
    <div className="bg-[#121214] border-2 border-[#FF7A00] p-6 rounded-2xl max-w-sm w-full font-sans text-left shadow-2xl">
      <div className="flex items-center space-x-2 border-b border-zinc-900 pb-3 mb-4 select-none">
        <BookOpen className="w-4 h-4 text-[#FF7A00]" />
        <h3 className="text-xs font-black uppercase tracking-wider text-white">EXECUTE DISPATCH BOOKING</h3>
      </div>

      <form onSubmit={executeBooking} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">LINKED LOAD REFERENCE</label>
          <input required name="loadRef" type="text" placeholder="E.G. LOAD-2026-701" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wide placeholder-zinc-700 focus:outline-none focus:border-[#FF7A00]" />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">ASSIGNED TRUCK NUMBER</label>
          <input required name="truckRef" type="text" placeholder="E.G. TS-09-UB-1234" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wide placeholder-zinc-700 focus:outline-none focus:border-[#FF7A00]" />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">INITIAL DISPATCH STATE</label>
          <select name="dispatchState" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wider focus:outline-none focus:border-[#FF7A00]">
            <option value="DISPATCHED">⚡ ACTIVE TRANSIT DISPATCHED</option>
            <option value="LOADING">📦 AT TERMINAL - LOADING</option>
            <option value="STANDBY">⚙️ PENDING VERIFICATION</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2 pt-2 select-none font-sans">
          <button type="button" onClick={onClose} className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all">
            CANCEL
          </button>
          <button type="submit" className="px-5 py-2.5 bg-[#FF7A00] hover:bg-[#FF8C1A] text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md">
            COMMIT BOOKING
          </button>
        </div>
      </form>
    </div>
  );
}