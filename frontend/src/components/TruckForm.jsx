// ============================================================================
// SYSTEM IDENTIFIER: BAYSON INDIA LOGISTICS — FLEET REGISTRY MANAGEMENT
// CODESPACE PATH: frontend/src/components/TruckForm.jsx
// ============================================================================

import React from 'react';
import { Truck } from 'lucide-react';

export default function TruckForm({ onTruckSubmit, onClose }) {
  const executeTruckRegistration = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    
    const payload = {
      asset_key: 'TRK-' + Math.floor(9000 + Math.random() * 999),
      truck_number: data.get('stateCode') + '-' + data.get('rtoCode') + '-' + data.get('series').toUpperCase() + '-' + data.get('digits'),
      chassis_configuration: data.get('chassisConfig'),
      capacity_tons: parseInt(data.get('capacityTons')),
      model_manufacturer: data.get('manufacturer'),
      permit_type: data.get('permitType')
    };

    if (onTruckSubmit) onTruckSubmit(payload);
  };

  return (
    <div className="bg-[#121214] border-2 border-[#FF7A00] p-6 rounded-2xl max-w-sm w-full font-sans text-left shadow-2xl">
      <div className="flex items-center space-x-2 border-b border-zinc-900 pb-3 mb-4 select-none">
        <Truck className="w-4 h-4 text-[#FF7A00]" />
        <h3 className="text-xs font-black uppercase tracking-wider text-white">MOUNT MECHANICAL ASSET</h3>
      </div>

      <form onSubmit={executeTruckRegistration} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">CHASSIS MANUFACTURER</label>
          <select name="manufacturer" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wider focus:outline-none focus:border-[#FF7A00]">
            <option value="TATA">TATA MOTORS CORES</option>
            <option value="ASHOK_LEYLAND">ASHOK LEYLAND HEAVY DUTY</option>
            <option value="MAHINDRA">MAHINDRA BLAZO SERIES</option>
            <option value="EICHER">EICHER PRO TRUCKING BUS</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">CHASSIS CONFIGURATION SPEC</label>
          <select name="chassisConfig" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wider focus:outline-none focus:border-[#FF7A00]">
            <option value="MULTI_AXLE_OPEN">MULTI-AXLE OPEN BED LINE</option>
            <option value="SEALED_CONTAINER">SEALED CARGO BOX CONTAINER</option>
            <option value="HIGH_BED_TRAILER">HIGH-BED LOGISTICS TRAILER</option>
            <option value="TIPPER_BODY">HEAVY DUMP TIPPER TRUCK</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">MAX NET CARGO MASS CAPACITY</label>
          <select name="capacityTons" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wider focus:outline-none focus:border-[#FF7A00]">
            <option value="16">16 METRIC TONS (6-WHEELER)</option>
            <option value="25">25 METRIC TONS (10-WHEELER)</option>
            <option value="31">31 METRIC TONS (12-WHEELER)</option>
            <option value="42">42 METRIC TONS (14-WHEELER+ TRAILER)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">REGISTRATION LICENSE PLATE</label>
          <div className="grid grid-cols-4 gap-2 font-mono">
            <select name="stateCode" className="bg-zinc-950 border-2 border-zinc-900 rounded-xl p-2 text-xs text-white font-black text-center focus:outline-none focus:border-[#FF7A00]">
              <option value="TS">TS</option>
              <option value="AP">AP</option>
              <option value="MH">MH</option>
              <option value="KA">KA</option>
            </select>
            <input required name="rtoCode" type="text" maxLength={2} placeholder="09" className="bg-zinc-950 border-2 border-zinc-900 rounded-xl p-2 text-xs text-white font-black text-center uppercase focus:outline-none focus:border-[#FF7A00]" />
            <input required name="series" type="text" maxLength={2} placeholder="UB" className="bg-zinc-950 border-2 border-zinc-900 rounded-xl p-2 text-xs text-white font-black text-center uppercase focus:outline-none focus:border-[#FF7A00]" />
            <input required name="digits" type="text" maxLength={4} placeholder="1234" className="bg-zinc-950 border-2 border-zinc-900 rounded-xl p-2 text-xs text-white font-black text-center focus:outline-none focus:border-[#FF7A00]" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">NATIONAL / STATE PERMIT TYPE</label>
          <select name="permitType" className="w-full bg-zinc-950 border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wider focus:outline-none focus:border-[#FF7A00]">
            <option value="NATIONAL">NATIONAL PERMIT REGISTERED [ALL INDIA]</option>
            <option value="STATE_ONLY">LOCAL STATE AREA CORRIDOR LOG ONLY</option>
          </select>
        </div>

        {/* RE-STYLED BASE44 COMPLIANT FORM ACTION BUTTONS */}
        <div className="flex justify-end space-x-2 pt-2 select-none font-sans">
          <button type="button" onClick={onClose} className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all">
            CANCEL
          </button>
          <button type="submit" className="px-5 py-2.5 bg-[#FF7A00] hover:bg-[#FF8C1A] text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md">
            SOLDER ASSET UNIT
          </button>
        </div>
      </form>
    </div>
  );
}