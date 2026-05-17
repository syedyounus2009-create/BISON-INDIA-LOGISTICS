// ============================================================================
// SYSTEM IDENTIFIER: BAYSON SMART LOGISTICS — RATE DISCOUNTS MATRIX [IC]
// FILE PATH: frontend/src/pages/Promotions.jsx
// ============================================================================

import React, { useState } from 'react';

export default function Promotions() {
  const [promoRegistry, setPromoRegistry] = useState([
    { id: 1, promo_code: 'BAYSONFIRST', title: 'New Corporate Signup Discount', discount_type: 'PERCENT', discount_value: 10, valid_till: '2026-12-31', is_active: true }
  ]);

  const handleCreatePromo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const code = formData.get('promo_code').toUpperCase();
    const title = formData.get('title');
    const value = parseFloat(formData.get('discount_value')) || 0;

    if (!code || value <= 0) return;

    setPromoRegistry([...promoRegistry, {
      id: promoRegistry.length + 1,
      promo_code: code,
      title,
      discount_type: 'PERCENT',
      discount_value: value,
      valid_till: '2026-09-30',
      is_active: true
    }]);
    e.target.reset();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 text-left">
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-widest">Rate Promotions Matrix</h2>
        <p className="text-xs text-zinc-500 mt-0.5 font-semibold">Deploy strategic tariff voucher configurations across target shipping tenants</p>
      </div>

      <div className="bg-[#121214] border-2 border-zinc-800/80 p-5 rounded-2xl">
        <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 text-[#FF7A00]">Inject Corporate Promo Voucher</h4>
        <form onSubmit={handleCreatePromo} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input name="promo_code" required type="text" placeholder="Promo Token String (e.g. INAMBER)" className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF7A00] font-mono font-black tracking-wider uppercase" />
          <input name="title" required type="text" placeholder="Campaign Title Description" className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF7A00] font-semibold" />
          <input name="discount_value" required type="number" placeholder="Discount Value %" className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF7A00] font-mono font-bold" />
          <button type="submit" className="sm:col-span-3 bg-[#FF7A00] hover:bg-[#FF8C1A] text-[#111111] py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors shadow-md">
            Activate Promo Token Node
          </button>
        </form>
      </div>

      <div className="bg-[#121214] border-2 border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-zinc-900 text-[10px] font-bold text-zinc-500 border-b border-zinc-800/80 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Promo Token Suffix</th>
              <th className="px-6 py-4">Campaign Context Definition</th>
              <th className="px-6 py-4">Tariff Deduction Value</th>
              <th className="px-6 py-4">Term Validity Expiry</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 font-semibold text-zinc-300 font-mono">
            {promoRegistry.map((p, idx) => (
              <tr key={idx} className="hover:bg-zinc-900/30 transition-colors">
                <td className="px-6 py-4 text-white text-xs font-black tracking-tight">{p.promo_code}</td>
                <td className="px-6 py-4 text-zinc-300 font-sans font-bold">{p.title}</td>
                <td className="px-6 py-4 text-[#FF7A00] font-black text-xs">{p.discount_value}% Deduction</td>
                <td className="px-6 py-4 text-zinc-500">{p.valid_till}</td>
                <td className="px-6 py-4 text-center font-sans">
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold uppercase">
                    ACTIVE
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}