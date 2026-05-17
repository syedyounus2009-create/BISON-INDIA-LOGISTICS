// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — SYSTEM TARIFF CONFIGURATOR
// FILE PATH: frontend/src/pages/PricingManager.jsx
// ============================================================================

import React, { useState } from 'react';

export default function PricingManager({ currentPricing, onUpdatePricing }) {
  // Local scratchpad states initialized with current operational tiers
  const [standardPrice, setStandardPrice] = useState(currentPricing?.standard?.rate || '4,999');
  const [enterprisePrice, setEnterprisePrice] = useState(currentPricing?.enterprise?.rate || '12,499');
  
  const [standardFeatures, setStandardFeatures] = useState(
    currentPricing?.standard?.features?.join(', ') || 'Basic Routing, 5 Active Trucks Tracker, Standard GST Billing'
  );
  const [enterpriseFeatures, setEnterpriseFeatures] = useState(
    currentPricing?.enterprise?.features?.join(', ') || 'Unlimited Routes, Multi-Tenant Isolation, Hardware GPS Hook, Advanced SCADA Mimic'
  );

  const [notification, setNotification] = useState('');

  const handleApplyTariffChanges = (e) => {
    e.preventDefault();
    
    // Construct the payload structure to pass back to the master controller bus
    const updatedTariffPayload = {
      standard: {
        rate: standardPrice,
        features: standardFeatures.split(',').map(f => f.trim())
      },
      enterprise: {
        rate: enterprisePrice,
        features: enterpriseFeatures.split(',').map(f => f.trim())
      }
    };

    onUpdatePricing(updatedTariffPayload);
    setNotification('🟢 TARIFF CONFIGURATION COMMITTED SUCCESSFULLY TO MEMORY BUS.');
    setTimeout(() => setNotification(''), 4000);
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-150">
      
      {/* Configuration Header */}
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-base font-black text-white uppercase tracking-widest">Global Pricing & Tariff Configurator</h2>
        <p className="text-xs text-zinc-500 mt-0.5 font-bold uppercase tracking-tight">Modify subscription models and package features instantly across public domains</p>
      </div>

      {notification && (
        <div className="bg-emerald-950/40 border-2 border-emerald-500/40 p-4 rounded-xl font-mono text-xs text-emerald-400 font-bold tracking-wide">
          {notification}
        </div>
      )}

      <form onSubmit={handleApplyTariffChanges} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* STANDARD NODE CONFIGURATION BLOCK */}
          <div className="bg-[#121214] border-2 border-zinc-800/80 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">Standard Node Parameters</span>
              <span className="text-[10px] font-mono font-black text-[#FF7A00] bg-[#FF7A00]/10 px-2 py-0.5 rounded uppercase">Tier 1</span>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest">Monthly Subscription Rate (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-zinc-500 text-xs font-bold">₹</span>
                <input 
                  required 
                  type="text" 
                  value={standardPrice} 
                  onChange={(e) => setStandardPrice(e.target.value)} 
                  placeholder="4,999" 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-7 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF7A00] font-mono font-black" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest">Feature List (Comma Separated Strings)</label>
              <textarea 
                rows={3}
                value={standardFeatures}
                onChange={(e) => setStandardFeatures(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#FF7A00] font-medium leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* ENTERPRISE CORE CONFIGURATION BLOCK */}
          <div className="bg-[#121214] border-2 border-[#FF7A00]/40 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">Enterprise Core Parameters</span>
              <span className="text-[10px] font-mono font-black text-[#111111] bg-[#FF7A00] px-2 py-0.5 rounded uppercase">Best Yield</span>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest">Monthly Subscription Rate (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-zinc-500 text-xs font-bold">₹</span>
                <input 
                  required 
                  type="text" 
                  value={enterprisePrice} 
                  onChange={(e) => setEnterprisePrice(e.target.value)} 
                  placeholder="12,499" 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-7 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF7A00] font-mono font-black" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest">Feature List (Comma Separated Strings)</label>
              <textarea 
                rows={3}
                value={enterpriseFeatures}
                onChange={(e) => setEnterpriseFeatures(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#FF7A00] font-medium leading-relaxed resize-none"
              />
            </div>
          </div>

        </div>

        {/* Form Submission Action Solder */}
        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            className="bg-[#FF7A00] hover:bg-[#FF8C1A] text-[#111111] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md font-sans"
          >
            Update System Tariff Configurations
          </button>
        </div>
      </form>

    </div>
  );
}