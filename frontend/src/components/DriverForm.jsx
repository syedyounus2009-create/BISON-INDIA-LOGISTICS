// ============================================================================
// SYSTEM IDENTIFIER: BAYSON INDIA LOGISTICS — OPERATOR REGISTRY MODULE
// CODESPACE PATH: frontend/src/components/DriverForm.jsx
// ============================================================================

import React from 'react';
import { UserPlus } from 'lucide-react';

export default function DriverForm({ onDriverSubmit, onClose }) {
  const executeDriverRegistration = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    
    const payload = {
      name: data.get('driverName'),
      mobile: data.get('driverMobile'),
      license_number: data.get('licensePrefix') + '-' + data.get('licenseNo').toUpperCase(),
      status: data.get('initialStatus')
    };

    if (onDriverSubmit) onDriverSubmit(payload);
  };

  return (
    <div className="bg-[#121214] border-2 border-[#FF7A00] p-6 rounded-2xl max-w-sm w-full font-sans text-left shadow-2xl">
      <div className="flex items-center space-x-2 border-b border-zinc-900 pb-3 mb-4 select-none">
        <UserPlus className="w-4 h-4 text-[#FF7A00]" />
        <h3 className="text-xs font-black uppercase tracking-wider text-white">REGISTER OPERATOR LINK</h3>
      </div>

      <form onSubmit={executeDriverRegistration} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">OPERATOR FULL NAME</label>
          <input required name="driverName" type="text" placeholder="ENTER DRIVER FULL NAME" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wide placeholder-zinc-700 focus:outline-none focus:border-[#FF7A00]" />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">MOBILE IDENTITY NUMBER</label>
          <input required name="driverMobile" type="tel" maxLength={10} placeholder="ENTER 10-DIGIT MOBILE LOG" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black font-mono tracking-wide placeholder-zinc-700 focus:outline-none focus:border-[#FF7A00]" />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">COMMERCIAL LICENSE PRE-SCHEMATIC</label>
          <div className="flex gap-2">
            <select name="licensePrefix" className="bg-zinc-950 border-2 border-zinc-900 rounded-xl px-2 py-2.5 text-xs text-white font-black uppercase tracking-wider focus:outline-none focus:border-[#FF7A00]">
              <option value="DL-36TS">TS (TELANGANA)</option>
              <option value="DL-16AP">AP (ANDHRA PRADESH)</option>
              <option value="DL-46MH">MH (MAHARASHTRA)</option>
              <option value="DL-13KA">KA (KARNATAKA)</option>
            </select>
            <input required name="licenseNo" type="text" maxLength={11} placeholder="XXXX2026XXX" className="flex-1 bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wider placeholder-zinc-700 focus:outline-none focus:border-[#FF7A00]" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">INITIAL DISPATCH READINESS</label>
          <select name="initialStatus" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wider focus:outline-none focus:border-[#FF7A00]">
            <option value="STANDBY">⚙️ STANDBY STATUS READY ON FLOOR</option>
            <option value="ACTIVE_RUN">⚡ LIVE ON ROUTE ASSIGNMENT IMMEDIATELY</option>
          </select>
        </div>

        {/* RE-STYLED BASE44 COMPLIANT FORM ACTION BUTTONS */}
        <div className="flex justify-end space-x-2 pt-2 select-none font-sans">
          <button type="button" onClick={onClose} className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all">
            CANCEL
          </button>
          <button type="submit" className="px-5 py-2.5 bg-[#FF7A00] hover:bg-[#FF8C1A] text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md">
            COMMIT DRIVER LOG
          </button>
        </div>
      </form>
    </div>
  );
}