// ============================================================================
// SYSTEM IDENTIFIER: BAYSON INDIA LOGISTICS — OPERATION BROADCAST INPUT LAYER
// CODESPACE PATH: frontend/src/components/DemandForm.jsx
// ============================================================================

import React from 'react';
import { PackagePlus, Send } from 'lucide-react';

export default function DemandForm({ onSubmit, onClose }) {
  const executeFormSubmission = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    
    const payload = {
      origin: data.get('origin'),
      destination: data.get('destination'),
      cargo: data.get('cargo'),
      weight: data.get('weight'),
      rate: data.get('rate'),
      priceModel: data.get('priceModel')
    };

    if (onSubmit) onSubmit(payload);
  };

  return (
    <div className="bg-[#121214] border-2 border-[#FF7A00] p-6 rounded-2xl max-w-sm w-full font-sans text-left shadow-2xl">
      <div className="flex items-center space-x-2 border-b border-zinc-900 pb-3 mb-4 select-none">
        <PackagePlus className="w-4 h-4 text-[#FF7A00]" />
        <h3 className="text-xs font-black uppercase tracking-wider text-white">BROADCAST DEMAND LINK</h3>
      </div>

      <form onSubmit={executeFormSubmission} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">ORIGIN HUB LOCATION</label>
          <input required name="origin" type="text" placeholder="ENTER START TERMINAL CORRIDOR" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wide placeholder-zinc-700 focus:outline-none focus:border-[#FF7A00]" />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">DESTINATION PORT</label>
          <input required name="destination" type="text" placeholder="ENTER ARRIVAL HUB LOG" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wide placeholder-zinc-700 focus:outline-none focus:border-[#FF7A00]" />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">CARGO PROFILE DETAILS</label>
          <input required name="cargo" type="text" placeholder="E.G., INDUSTRIAL COILS" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wide placeholder-zinc-700 focus:outline-none focus:border-[#FF7A00]" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">MASS (TONS)</label>
            <input required name="weight" type="number" placeholder="25" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black font-mono focus:outline-none focus:border-[#FF7A00]" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">TARIFF VALUE (INR)</label>
            <input required name="rate" type="number" placeholder="55000" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black font-mono focus:outline-none focus:border-[#FF7A00]" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">PRICING ALGORITHM MODEL</label>
          <select name="priceModel" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wider focus:outline-none focus:border-[#FF7A00]">
            <option value="FIXED">FIXED PRICE CONTRACT TARIFF</option>
            <option value="BIDDING">LIVE EXCHANGING BID MATRIX</option>
          </select>
        </div>

        {/* RE-STYLED BASE44 COMPLIANT FORM ACTION BUTTONS */}
        <div className="flex justify-end space-x-2 pt-2 font-sans select-none">
          <button type="button" onClick={onClose} className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all">
            CANCEL
          </button>
          <button type="submit" className="px-5 py-2.5 bg-[#FF7A00] hover:bg-[#FF8C1A] text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5">
            <Send className="w-3 h-3 stroke-[3]" /> COMMIT DEMAND
          </button>
        </div>
      </form>
    </div>
  );
}