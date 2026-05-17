// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — REGIONAL EXPANSION CONFIGURATOR [IC]
// FILE PATH: frontend/src/pages/RegionExpansion.jsx
// ============================================================================

import React, { useState } from 'react';

export default function RegionExpansion() {
  const [countries, setCountries] = useState([
    { code: 'IN', currency: 'INR', taxRate: '18%', carrier: 'Delhivery', status: 'Live' },
    { code: 'AE', currency: 'AED', taxRate: '5%', carrier: 'Aramex', status: 'Configured' }
  ]);

  const handleInject = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const code = formData.get('code').toUpperCase();
    const currency = formData.get('currency').toUpperCase();
    const taxRate = `${formData.get('tax')}%`;
    const carrier = formData.get('carrier');

    if (!code || !currency) return;

    setCountries([...countries, { code, currency, taxRate, carrier, status: 'Live' }]);
    e.target.reset();
    alert("Country configuration context document injected down the live trace.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-tight">Regional Country Expansion</h2>
        <p className="text-xs text-slate-500 mt-0.5 font-semibold">Inject localized country parameters without triggering system compilation reboots</p>
      </div>

      <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl">
        <h4 className="text-xs font-black text-white uppercase tracking-tight mb-4">Inject Runtime Context Configuration Document</h4>
        <form onSubmit={handleInject} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input name="code" required maxLength={2} type="text" placeholder="ISO Code (e.g. KE)" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono uppercase font-bold" />
          <input name="currency" required maxLength={3} type="text" placeholder="Currency (e.g. KES)" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono uppercase font-bold" />
          <input name="tax" required type="number" placeholder="Tax Rate %" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono font-bold" />
          <input name="carrier" required type="text" placeholder="Onboarded Carrier" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-semibold" />
          <button type="submit" className="sm:col-span-4 bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-md">
            Execute JSON Document Injection
          </button>
        </form>
      </div>

      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-900 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">ISO Code</th>
              <th className="px-6 py-4">Operating Currency</th>
              <th className="px-6 py-4">Tax Structure</th>
              <th className="px-6 py-4">Default Carrier Integration</th>
              <th className="px-6 py-4">System State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300 font-mono">
            {countries.map((c, i) => (
              <tr key={i} className="hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4 text-amber-500 text-sm font-black tracking-tighter">{c.code}</td>
                <td className="px-6 py-4 text-white">{c.currency}</td>
                <td className="px-6 py-4 text-slate-400">{c.taxRate}</td>
                <td className="px-6 py-4 text-slate-300 font-sans font-semibold">{c.carrier}</td>
                <td className="px-6 py-4 font-sans">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold uppercase">● {c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}