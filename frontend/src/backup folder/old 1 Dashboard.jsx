// ============================================================================
// BOOK TITLE: BISON INDIA LOGISTICS — FULL-STACK WORKSPACE MANAGEMENT ENGINE
// CODESPACE PATH: frontend/src/Dashboard.jsx
// ============================================================================

import React, { useState } from 'react';

export default function Dashboard() {
  // ----------------------------------------------------------------------------
  // GLOBAL STATE MANAGEMENT (CORE HUB ROUTING AND TRACKING INTERFACES)
  // ----------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('overview'); // Options: 'overview' | 'traffic' | 'fleet' | 'partners' | 'countries' | 'ioports' | 'health' | 'listings'
  const [searchQuery, setSearchQuery] = useState('');

  // Smart Port Connection Hardware Simulation Parameters
  const [hdmiStatus, setHdmiStatus] = useState('CONNECTED');
  const [usbStatus, setUsbStatus] = useState('DISCONNECTED');
  const [opticalStatus, setOpticalStatus] = useState('ACTIVE');
  const [avAuxStatus, setAvAuxStatus] = useState('IDLE');
  const [activeHardwareLog, setActiveHardwareLog] = useState('System I/O Port Abstraction layer energized successfully.');

  // In-Memory Structural State Ledgers
  const [loads, setLoads] = useState([
    { id: 'LOAD-101', tenantId: 'BISON-IN-MAIN', origin: 'Hyderabad', destination: 'Mumbai', cargo: 'Industrial Steel Sheets', weight: '28 MT', priceModel: 'FIXED', rate: '₹45,000', status: 'Open / Awaiting Trucks' },
    { id: 'LOAD-102', tenantId: 'BISON-IN-MAIN', origin: 'Warangal', destination: 'Chennai', cargo: 'Agricultural Feedstock', weight: '14 MT', priceModel: 'BIDDING', rate: '₹22,000 (Base Bid)', status: 'Open / Awaiting Trucks' }
  ]);

  const [trucks, setTrucks] = useState([
    { id: 'DRV-101', plate: '9177012345', type: 'TS-09-XYZ-12', status: '2029-12-31', driver: 'M. A. Rahman' },
    { id: 'DRV-102', plate: '9988776655', type: 'AP-16-ABC-34', status: '2028-06-15', driver: 'K. Singh' }
  ]);

  const [partners, setPartners] = useState([
    { id: 'PTN-001', name: 'Telangana Franchise Fleet', type: 'Franchise', model: 'Percentage', value: '5.00%', status: 'Active' },
    { id: 'PTN-002', name: 'Deccan Reseller Logistics', type: 'Reseller', model: 'Fixed-Tier', value: '₹500/Trip', status: 'Active' }
  ]);

  const [countries, setCountries] = useState([
    { code: 'IN', currency: 'INR', taxRate: '18%', carrier: 'Delhivery', status: 'Live' },
    { code: 'AE', currency: 'AED', taxRate: '5%', carrier: 'Aramex', status: 'Configured' }
  ]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased flex">

      {/* ==================================================================== */}
      {/* CHAPTER 1: PRIMARY SIDEBAR CONTROL PANEL                             */}
      {/* ==================================================================== */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          <div className="h-20 flex items-center px-6 border-b border-slate-800 space-x-3">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-black text-white text-xl tracking-tighter">B</div>
            <div>
              <span className="text-base font-black tracking-tight text-white block leading-none">BISON</span>
              <span className="text-[9px] font-bold tracking-widest text-amber-500 uppercase">INDIA LOGISTICS</span>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'overview' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>📋 Operations Tower</button>
            <button onClick={() => setActiveTab('traffic')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'traffic' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>⚡ Traffic Core</button>
            <button onClick={() => setActiveTab('fleet')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'fleet' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>🚚 Fleet & Drivers</button>
            <button onClick={() => setActiveTab('partners')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'partners' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>🤝 Partner Portals</button>
            <button onClick={() => setActiveTab('countries')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'countries' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>🌐 Region Expansion</button>
            <button onClick={() => setActiveTab('ioports')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'ioports' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>🔌 Smart Connections</button>
            <button onClick={() => setActiveTab('listings')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'listings' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>🗂️ All Listings</button>
            <button onClick={() => setActiveTab('health')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'health' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>🟢 System Parameters</button>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 text-[10px] font-bold tracking-wider text-slate-500 text-center uppercase">BIL ENVIRONMENT v1.2.2</div>
      </aside>

      {/* Main Content Viewport Frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-20 bg-slate-950/40 border-b border-slate-800 px-8 flex items-center justify-between shrink-0">
          <div className="max-w-md w-full relative">
            <input type="text" placeholder="Query manifests across RLS tenant mappings..." className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-300 focus:outline-none focus:border-amber-500" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs font-bold text-white uppercase tracking-tight">Eng. Syed Younus</p>
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Lead Architect</p>
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center font-black text-xs text-amber-500">IST</div>
          </div>
        </header>

        <main className="p-8 space-y-8 flex-1">
          {/* CHAPTER 3: OPERATIONS CONTROL TOWER */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Marketplace Manifests</p><p className="text-3xl font-black text-white mt-2 font-mono">{loads.length} Active</p></div>
                <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Fleet</p><p className="text-3xl font-black text-white mt-2 font-mono">{trucks.length} Units</p></div>
                <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Isolated Tenants</p><p className="text-3xl font-black text-emerald-400 mt-2 font-mono">IST-Sovereign</p></div>
                <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl border-emerald-500/20"><p className="text-xs font-bold uppercase tracking-wider text-emerald-500">PostgreSQL Target</p><p className="text-3xl font-black text-emerald-400 mt-2 font-mono">BAYSON_DB</p></div>
              </div>

              <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-sm font-black text-white uppercase tracking-tight mb-4">Post New Shipment Manifest Entry</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const origin = e.target.origin.value; const destination = e.target.destination.value;
                  const cargo = e.target.cargo.value; const weight = e.target.weight.value;
                  const priceType = e.target.priceType.value; const rateValue = e.target.rateValue.value;
                  if (!origin || !destination || !cargo || !weight || !rateValue) return;

                  setLoads([{ id: `LOAD-${100 + loads.length + 1}`, tenantId: 'BISON-IN-MAIN', origin, destination, cargo, weight: `${weight} MT`, status: 'Open / Awaiting Trucks', priceModel: priceType.toUpperCase(), rate: priceType === 'fixed' ? `₹${parseInt(rateValue).toLocaleString('en-IN')}` : `₹${parseInt(rateValue).toLocaleString('en-IN')} (Base Bid)` }, ...loads]);
                  e.target.reset();
                }} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <input name="origin" required type="text" placeholder="Origin" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none" />
                  <input name="destination" required type="text" placeholder="Destination" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none" />
                  <input name="cargo" required type="text" placeholder="Cargo Profile" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none" />
                  <input name="weight" required type="number" placeholder="Weight (Tons)" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none" />
                  <select name="priceType" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none"><option value="fixed">Fixed Price</option><option value="bidding">Bidding Mode</option></select>
                  <input name="rateValue" required type="number" placeholder="Value in INR" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none sm:col-span-3" />
                  <button type="submit" className="sm:col-span-4 bg-amber-500 text-slate-950 py-3 rounded-xl text-xs font-black uppercase tracking-wider">Execute Secure Load Broadcast</button>
                </form>
              </div>

              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex justify-between items-center"><span className="text-xs font-black text-slate-400 uppercase">Live Freight Marketplace Ledger</span><button onClick={() => setLoads(loads.map(l => ({ ...l, status: "Assigned / Dispatched" })))} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-lg">⚡ Accept All Manifests</button></div>
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-slate-900 text-[10px] font-bold text-slate-500 border-b border-slate-800 uppercase"><tr><th className="px-6 py-4">Load ID</th><th className="px-6 py-4">Route</th><th className="px-6 py-4">Cargo & Weight</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Rate</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-center">Action</th></tr></thead>
                  <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300">
                    {loads.map((load, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/30">
                        <td className="px-6 py-4 font-mono text-xs text-white">{load.id}</td>
                        <td className="px-6 py-4">{load.origin} ➔ {load.destination}</td>
                        <td className="px-6 py-4 text-slate-400">{load.cargo} ({load.weight})</td>
                        <td className="px-6 py-4"><span className="text-[10px] font-bold bg-slate-900 border px-2 py-0.5 rounded text-slate-400">{load.priceModel}</span></td>
                        <td className="px-6 py-4 text-amber-500 font-bold font-mono">{load.rate}</td>
                        <td className="px-6 py-4"><span className={`text-[10px] px-2 py-0.5 rounded border font-bold uppercase ${load.status.includes('Assigned') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>{load.status}</span></td>
                        <td className="px-6 py-4 text-center">{load.status.includes('Open') ? <button onClick={() => setLoads(loads.map(l => l.id === load.id ? { ...l, status: "Assigned / Dispatched" } : l))} className="bg-slate-900 text-[10px] uppercase border px-2 py-1 rounded font-bold">Accept</button> : <span className="text-slate-600 text-[10px] uppercase font-bold">Locked</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CHAPTER 4: TRAFFIC NETWORK MODULE */}
          {activeTab === 'traffic' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight">J-YMIH Traffic Optimization Core</h3>
                <p className="text-xs text-slate-500 mt-1 font-semibold">Automated route optimization nodes across regional corridors</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[{ segment: "NH-65 Corridor (Hyderabad Gateway)", speed: "68 km/h", state: "Optimal Flow" }, { segment: "NH-44 Junction (Telangana)", speed: "34 km/h", state: "Moderate Friction" }].map((node, i) => (
                  <div key={i} className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{node.segment}</p>
                    <p className="text-2xl font-black text-white font-mono mt-2">{node.speed}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHAPTER 5: FLEET MANAGEMENT SYSTEM */}
          {activeTab === 'fleet' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl">
                <h4 className="text-sm font-black text-white uppercase tracking-tight mb-4">Onboard Verified Operator (BAYSON_DB Format)</h4>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const d = e.target.driver_name.value; const m = e.target.mobile_number.value;
                  const l = e.target.license_number.value; const ex = e.target.license_expiry.value;
                  if (!d || !m || !l || !ex) return;

                  setTrucks([{ id: `DRV-${100 + trucks.length + 1}`, plate: m, type: l, status: ex, driver: d }, ...trucks]);
                  e.target.reset();
                }} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div><label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Driver Name</label><input name="driver_name" required type="text" className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-xs text-white focus:outline-none" /></div>
                  <div><label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Mobile Number</label><input name="mobile_number" required type="text" className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-xs text-white focus:outline-none" /></div>
                  <div><label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">License Number</label><input name="license_number" required type="text" className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-xs text-white focus:outline-none" /></div>
                  <div><label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">License Expiry</label><input name="license_expiry" required type="date" className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-xs text-slate-400 focus:outline-none" /></div>
                  <button type="submit" className="sm:col-span-4 bg-amber-500 text-slate-950 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">Commit Driver Schema Entry to Registry</button>
                </form>
              </div>

              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-slate-900 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-800"><tr><th className="px-6 py-4">System ID</th><th className="px-6 py-4">Driver Full Name</th><th className="px-6 py-4">Contact Number</th><th className="px-6 py-4">License Number</th><th className="px-6 py-4">Expiry Date</th></tr></thead>
                  <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300">
                    {trucks.map((truck, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/30">
                        <td className="px-6 py-4 font-mono text-white text-xs">{truck.id}</td>
                        <td className="px-6 py-4 text-white font-bold">{truck.driver}</td>
                        <td className="px-6 py-4 font-mono text-slate-400">{truck.plate}</td>
                        <td className="px-6 py-4 font-mono text-amber-500">{truck.type}</td>
                        <td className="px-6 py-4 text-slate-300">{truck.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CHAPTER 6: PARTNERS CONFIGURATOR */}
          {activeTab === 'partners' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div><h3 className="text-lg font-black uppercase text-white tracking-tight">Plug-In Partner Management Core</h3><p className="text-xs text-slate-500 mt-1 font-semibold">Deploy and brand sandboxed franchise or affiliate nodes instantly</p></div>
              <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl">
                <h4 className="text-sm font-black text-white uppercase tracking-tight mb-4">Onboard New White-Label Partner</h4>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const n = e.target.pname.value; const ty = e.target.ptype.value; const v = e.target.pval.value;
                  if (!n || !ty || !v) return;
                  setPartners([...partners, { id: `PTN-00${partners.length+1}`, name: n, type: ty, model: 'Percentage', value: v, status: 'Active' }]);
                  e.target.reset();
                }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input name="pname" required type="text" placeholder="Partner/Franchise Corporate Name" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none" />
                  <select name="ptype" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none"><option value="Franchise">Franchise Partner</option><option value="Reseller">White-Label Reseller</option></select>
                  <input name="pval" required type="text" placeholder="Commission" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none" />
                  <button type="submit" className="sm:col-span-3 bg-amber-500 text-slate-950 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">Initialize Sandbox Domain Context</button>
                </form>
              </div>
            </div>
          )}

          {/* CHAPTER 7: COUNTRY EXPANSION */}
          {activeTab === 'countries' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div><h3 className="text-lg font-black uppercase text-white tracking-tight">Regional Country Expansion</h3></div>
              <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const c = e.target.ccode.value; const cy = e.target.ccur.value;
                  if (!c || !cy) return;
                  setCountries([...countries, { code: c.toUpperCase(), currency: cy.toUpperCase(), taxRate: '12%', carrier: 'FedEx', status: 'Live' }]);
                  e.target.reset();
                }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input name="ccode" required maxLength={2} placeholder="ISO Code" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white" />
                  <input name="ccur" required maxLength={3} placeholder="Currency" className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs text-white" />
                  <button type="submit" className="bg-amber-500 text-slate-950 text-xs font-bold uppercase py-2.5 rounded-xl">Inject Country</button>
                </form>
              </div>
            </div>
          )}

          {/* CHAPTER 8: SMART I/O CONNECTIONS */}
          {activeTab === 'ioports' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl">
                  <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-400">HDMI Core Display</span><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /></div>
                  <div className="mt-4 flex gap-2"><button onClick={() => { setHdmiStatus('CONNECTED'); setActiveHardwareLog('[HDMI] Port synced.'); }} className="text-[10px] font-bold uppercase bg-slate-900 border px-3 py-1 rounded">Plug</button></div>
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-400"><p className="text-amber-500 font-bold mb-1">⚡ ACTIVITY MONITOR:</p><p className="text-white">{activeHardwareLog}</p></div>
            </div>
          )}

          {/* CHAPTER 11: ALL LISTINGS CENTRAL MASTER PANEL */}
          {activeTab === 'listings' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div><h3 className="text-lg font-black uppercase text-white tracking-tight">Unified Listings Central Registry</h3><p className="text-xs text-slate-500 mt-1 font-semibold">Master audit data-stream cross-referencing all sub-module instances in real time</p></div>
              
              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-4 bg-slate-900/60 border-b border-slate-800 text-xs font-black text-amber-500 uppercase">📦 Shipment Freight Manifests ({loads.length})</div>
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <tbody className="divide-y divide-slate-800/40 text-slate-300 font-medium">
                    {loads.map((l, i) => (
                      <tr key={i} className="hover:bg-slate-900/20">
                        <td className="px-6 py-3 font-mono text-white text-xs">{l.id}</td>
                        <td className="px-6 py-3 font-semibold text-slate-200">{l.origin} ➔ {l.destination}</td>
                        <td className="px-6 py-3 font-mono text-amber-500">{l.rate}</td>
                        <td className="px-6 py-3 text-right"><span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{l.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-4 bg-slate-900/60 border-b border-slate-800 text-xs font-black text-amber-500 uppercase">👤 Registered Operators & Drivers ({trucks.length})</div>
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <tbody className="divide-y divide-slate-800/40 text-slate-300 font-medium">
                    {trucks.map((t, i) => (
                      <tr key={i} className="hover:bg-slate-900/20">
                        <td className="px-6 py-3 font-mono text-white text-xs">{t.id}</td>
                        <td className="px-6 py-3 font-bold text-slate-200">{t.driver}</td>
                        <td className="px-6 py-3 font-mono text-amber-500">{t.type}</td>
                        <td className="px-6 py-3 text-right"><span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded">{t.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CHAPTER 12: IST COGNITIVE PRICING & BID DISTRIBUTION MATRIX */}
          {activeTab === 'overview' && (
            <div className="mt-8 pt-8 border-t border-slate-800 space-y-6 animate-in fade-in duration-200">
              <div><h4 className="text-sm font-black text-white uppercase tracking-tight">IST Freight Pricing & Distance Calculation Matrix</h4><p className="text-xs text-slate-500 mt-0.5">Automated yield metrics factoring truck configurations, target routes, and live bidding steps</p></div>
              <div className="bg-slate-950/30 border border-slate-800 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4 md:col-span-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 block">⚡ Live Route Parameter Simulation</span>
                  <div><label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Route Distance Profile (Kilometers)</label><input id="simDistance" type="number" defaultValue={750} className="w-full bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono font-bold text-white focus:outline-none" /></div>
                  <div><label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">Vehicle Capacity Configuration</label><select id="simVehicleType" className="w-full bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-white focus:outline-none"><option value="6">6-Wheel Open Truck</option><option value="12">14-Axle Container</option><option value="18">Multi-Axle Trailer</option></select></div>
                  <button type="button" onClick={() => {
                    const dist = parseFloat(document.getElementById('simDistance').value) || 0; const mult = parseFloat(document.getElementById('simVehicleType').value) || 1;
                    const baseFreightRate = dist * mult * 8; const gstComponent = baseFreightRate * 0.18;
                    alert(`[IST MATRIX CALCULATION OUTPUT]\n\n• Base Freight Charge: ₹${baseFreightRate.toLocaleString('en-IN')}\n• Statutory GST Levy (18%): ₹${gstComponent.toLocaleString('en-IN')}\n• Gross Committed Invoicing Target: ₹ ${(baseFreightRate + gstComponent).toLocaleString('en-IN')}`);
                  }} className="w-full bg-slate-900 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-800 text-[10px] font-black uppercase py-3 rounded-xl tracking-wider transition-all">Execute Formula Yield Verification</button>
                </div>
                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-xl md:col-span-2 flex flex-col justify-between">
                  <div className="space-y-3"><span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">📐 Active Bidding Step & Formula Structure</span><p className="text-xs text-slate-400 leading-relaxed font-medium">Our platform pricing distribution loop applies a direct multiplier layout to guarantee market clarity across enterprise nodes:</p><div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-400/90">Base Freight Charge = (Distance in Kilometers) × (Vehicle Multiplier) × ₹8.00<br />Committed Gross Total = Base Freight Charge + 18% GST Compliance Rate</div></div>
                  <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between text-xs text-slate-500 font-bold"><span>Pricing Formula Status: <span className="text-emerald-400 font-mono">VERIFIED</span></span><span>System Clock: Real Time</span></div>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 9: SYSTEM INTEGRITY PARAMETERS */}
          {activeTab === 'health' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-slate-900 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-800"><tr><th className="px-6 py-4">Node Node</th><th className="px-6 py-4 text-center">LED</th><th className="px-6 py-4">Action Logic</th></tr></thead>
                  <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300">
                    <tr><td className="px-6 py-4 font-bold text-white">Multi-Tenancy RLS Engine</td><td className="px-6 py-4 text-center text-emerald-400">🟢</td><td className="px-6 py-4 text-slate-400">Schema-per-tenant architecture verifying authorization constraints safely.</td></tr>
                    <tr><td className="px-6 py-4 font-bold text-white">HDMI core Display Port Link</td><td className="px-6 py-4 text-center text-emerald-400">🟢</td><td className="px-6 py-4 text-slate-400">Stable: Projecting viewport configurations smoothly under 1.22 MHz constant runtime.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}