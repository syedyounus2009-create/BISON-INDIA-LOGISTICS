// ============================================================================
// SYSTEM IDENTIFIER: BAYSON INDIA LOGISTICS — MASTER FAÇADE LANDING INTERFACE
// CODESPACE PATH: frontend/src/pages/LandingPage.jsx
// ============================================================================

import React, { useState } from 'react';
import { Truck, Package, Shield, Zap, MapPin, IndianRupee, ArrowRight, CheckCircle2, Phone, Mail } from 'lucide-react';

const features = [
  { icon: Package, title: 'LOAD MARKETPLACE', desc: 'POST LOADS AND GET BIDS FROM VERIFIED TRANSPORTERS ACROSS INDIA IN MINUTES.' },
  { icon: Truck, title: 'FLEET MANAGEMENT', desc: 'COMPLETE TRUCK AND DRIVER MANAGEMENT WITH DOCUMENT TRACKING AND ALERTS.' },
  { icon: MapPin, title: 'LIVE TRACKING', desc: 'REAL-TIME TRIP TRACKING FROM PICKUP TO DELIVERY WITH STATUS UPDATES.' },
  { icon: IndianRupee, title: 'GST INVOICING', desc: 'AUTO-GENERATE GST-COMPLIANT INVOICES AND MANAGE PAYMENTS DIGITALLY.' },
  { icon: Shield, title: 'KYC VERIFICATION', desc: 'VERIFIED TRANSPORTERS AND SHIPPERS FOR SAFE AND TRUSTED TRANSACTIONS.' },
  { icon: Zap, title: 'AI SMART MATCHING', desc: 'AI MATCHES YOUR LOAD WITH THE BEST AVAILABLE TRUCK ON THE ROUTE.' },
];

const stats = [
  { label: 'TRUCKS REGISTERED', value: '10,000+' },
  { label: 'LOADS DELIVERED', value: '50,000+' },
  { label: 'CITIES COVERED', value: '300+' },
  { label: 'HAPPY PARTNERS', value: '5,000+' },
];

export default function LandingPage({ onLoginSuccess }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('Shipper'); 
  const [loginStep, setLoginStep] = useState(1);
  
  const [accountQuery, setAccountQuery] = useState('');
  const [accessPin, setAccessPin] = useState('');
  const [otpVerification, setOtpVerification] = useState('');

  const plans = [
    { name: 'FREE', price: '0', features: ['5 LOADS/MONTH', 'BASIC TRACKING', 'EMAIL SUPPORT'], color: 'border-zinc-800 bg-[#121214]' },
    { name: 'BASIC', price: '999', features: ['50 LOADS/MONTH', 'LIVE TRACKING', 'PRIORITY SUPPORT', 'INVOICE GENERATION'], color: 'border-[#FF7A00] bg-[#121214]', popular: true },
    { name: 'PREMIUM', price: '2,999', features: ['UNLIMITED LOADS', 'ADVANCED ANALYTICS', 'DEDICATED MANAGER', 'API ACCESS'], color: 'border-zinc-800 bg-[#121214]' },
    { name: 'ENTERPRISE', price: 'CUSTOM', features: ['WHITE-LABEL OPTION', 'SLA GUARANTEE', '24/7 SUPPORT', 'CUSTOM INTEGRATIONS'], color: 'border-zinc-700 bg-zinc-900' },
  ];

  const openConsoleWithRole = (role) => {
    setActiveRole(role);
    setLoginStep(1);
    setIsLoginOpen(true);
  };

  const handleExecuteVerification = (e) => {
    e.preventDefault();
    if (loginStep === 1) {
      if (!accountQuery || !accessPin) return;
      setLoginStep(2);
    } else {
      if (otpVerification === '1234') {
        if (onLoginSuccess) onLoginSuccess(activeRole);
      } else {
        alert("[SECURITY INTERCEPT] PASSCODE MISMATCH. ENTER '1234'.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans antialiased text-left selection:bg-[#FF7A00] selection:text-black uppercase">
      
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/95 backdrop-blur border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/bison-logo.png" 
              alt="Bayson Logo" 
              className="w-9 h-9 object-contain rounded-lg" 
            />
            <div>
              <div className="font-sans font-black text-xl leading-none text-white tracking-tight">BAYSON</div>
              <div className="text-[9px] text-[#FF7A00] font-black tracking-widest mt-0.5">SMART LOGISTICS</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs font-black tracking-wider text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">FEATURES</a>
            <a href="#pricing" className="hover:text-white transition-colors">PRICING</a>
            <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
          </nav>
          <div className="flex items-center gap-3 select-none">
            <button onClick={() => openConsoleWithRole('Shipper')} className="px-4 py-2 bg-zinc-900/40 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-black rounded-xl transition-all tracking-wider">
              LOGIN
            </button>
            <button onClick={() => openConsoleWithRole('Shipper')} className="px-5 py-2 bg-[#FF7A00] hover:bg-[#FF8C1A] text-white text-xs font-black rounded-xl transition-all tracking-wider border-0">
              GET STARTED
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#0A0A0B] text-white py-24 px-4 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/60 rounded-full px-4 py-1.5 text-xs font-black tracking-widest mb-6 text-zinc-300">
            <span className="w-2 h-2 bg-[#FF7A00] rounded-full animate-pulse" />
            INDIA'S SMART LOGISTICS SYSTEM PLATFORM
          </div>
          <h1 className="font-sans font-black text-5xl md:text-7xl mb-4 tracking-tight leading-[0.95]">
            SMART LOGISTICS.<br />
            <span className="text-[#FF7A00]">POWERFUL FREIGHT RUN.</span>
          </h1>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto font-semibold tracking-tight">
            CONNECT SHIPPERS WITH VERIFIED TRANSPORTERS ACROSS INDIA. REAL-TIME TRACKING, GST INVOICING, AI MATCHING.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto select-none">
            <button onClick={() => openConsoleWithRole('Shipper')} className="px-6 py-3.5 bg-[#FF7A00] hover:bg-[#FF8C1A] text-white text-xs font-black rounded-xl transition-all tracking-widest shadow-lg shadow-[#FF7A00]/10 border-0 flex items-center justify-center gap-2">
              START FOR FREE <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button onClick={() => openConsoleWithRole('Admin')} className="px-6 py-3.5 bg-zinc-900/40 border border-zinc-800 hover:bg-zinc-900 text-zinc-300 text-xs font-black rounded-xl transition-all tracking-widest">
              WATCH DEMO
            </button>
          </div>
        </div>
      </section>

      {/* Stats Block */}
      <section className="bg-[#111113] border-b border-zinc-900 py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-3xl font-black font-sans text-[#FF7A00] tracking-tight">{s.value}</div>
              <div className="text-[10px] text-zinc-500 font-black uppercase mt-1 tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Core Grid */}
      <section id="features" className="py-24 px-4 bg-[#0A0A0B]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans font-black text-4xl mb-3 text-white tracking-tight">EVERYTHING YOU NEED</h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-xs font-black tracking-wider">BUILT FOR INDIA'S TRUCKING INDUSTRY — FROM SMALL FLEET OWNERS TO ENTERPRISE SHIPPERS.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-[#121214] rounded-2xl border border-zinc-800/80 p-6 shadow-sm">
                <div className="w-12 h-12 bg-[#FF7A00] rounded-xl flex items-center justify-center mb-4 shadow-md shadow-[#FF7A00]/5">
                  <f.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-black font-sans text-base mb-2 tracking-wide text-white">{f.title}</h3>
                <p className="text-sm text-zinc-400 font-medium leading-relaxed normal-case">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Matrix Block */}
      <section id="pricing" className="py-24 px-4 bg-[#0A0A0B] border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 select-none">
            <h2 className="font-sans font-black text-4xl mb-3 text-white tracking-tight">SIMPLE, TRANSPARENT PRICING</h2>
            <p className="text-zinc-500 text-xs font-black tracking-wider">NO HIDDEN CHARGES. CANCEL ANYTIME.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map(plan => (
              <div key={plan.name} className={`rounded-xl border-2 p-5 relative text-left flex flex-col justify-between text-white ${plan.color}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF7A00] text-black text-[9px] font-black px-3 py-0.5 rounded-full tracking-widest shadow-sm">MOST POPULAR</div>
                )}
                <div>
                  <div className="font-sans font-black text-lg mb-1 tracking-wide text-white">{plan.name}</div>
                  <div className="flex items-baseline gap-1 mb-4 border-b border-zinc-900/60 pb-4">
                    <span className="text-3xl font-mono font-black text-[#FF7A00]">{plan.price === 'CUSTOM' ? '' : '₹'}{plan.price}</span>
                    {plan.price !== 'CUSTOM' && <span className="text-zinc-500 text-[10px] font-black tracking-wider">/MONTH</span>}
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  className={`w-full text-xs font-black tracking-wider py-2 rounded-xl transition-all ${plan.popular ? 'bg-[#FF7A00] text-black hover:bg-[#FF8C1A] border-0 shadow-md' : 'bg-zinc-900/40 border border-zinc-800 text-zinc-300 hover:text-white'}`} 
                  onClick={() => openConsoleWithRole(plan.name === 'ENTERPRISE' ? 'Admin' : 'Shipper')}
                >
                  GET STARTED
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secure Access Console Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-100">
          <div className="bg-[#121214] border-2 border-[#FF7A00] rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl text-left font-sans">
            
            <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-black/40">
              <h3 className="text-xs font-black uppercase tracking-wider text-white">SECURE ACCESS CONSOLE</h3>
              <button type="button" onClick={() => setIsLoginOpen(false)} className="text-zinc-500 hover:text-[#FF7A00] text-xl font-black leading-none transition-colors">&times;</button>
            </div>

            <div className="p-4 bg-black/20 border-b border-zinc-800 flex gap-1">
              {['Shipper', 'Transport', 'Worker', 'Admin'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => { setActiveRole(role); setLoginStep(1); }}
                  className={`flex-1 text-[10px] font-black uppercase tracking-wider py-2.5 rounded-lg border transition-all ${activeRole === role ? 'bg-[#FF7A00] text-black border-[#FF7A00]' : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white'}`}
                >
                  {role}
                </button>
              ))}
            </div>

            <form onSubmit={handleExecuteVerification} className="p-5 space-y-4">
              {loginStep === 1 ? (
                <>
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">ACCOUNT ID BASE</label>
                    <input required type="text" value={accountQuery} onChange={(e) => setAccountQuery(e.target.value)} placeholder="ENTER ACCOUNT IDENTITY KEY" className="w-full bg-[#16161a] border-2 border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white font-black uppercase tracking-wide focus:outline-none focus:border-[#FF7A00]" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">SECURITY ACCESS PIN</label>
                    <input required type="password" value={accessPin} onChange={(e) => setAccessPin(e.target.value)} placeholder="••••••••" className="w-full bg-[#16161a] border-2 border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#FF7A00]" />
                  </div>
                </>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-100">
                  <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl text-[10px] font-black text-zinc-400 uppercase tracking-wider leading-normal">
                    🔒 INPUT VALIDATION BYPASS CODE <span className="text-[#FF7A00] font-mono font-black">'1234'</span> TO LAUNCH WORKING SESSION LINK.
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-wider">VERIFICATION PASSCODE</label>
                    <input required maxLength={4} type="text" value={otpVerification} onChange={(e) => setOtpVerification(e.target.value)} placeholder="ENTER 4-DIGIT SECURITY KEY" className="w-full bg-[#16161a] border-2 border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-black text-center text-white focus:outline-none focus:border-[#FF7A00]" />
                  </div>
                </div>
              )}

              <button type="submit" className="w-full bg-[#FF7A00] hover:bg-[#FF8C1A] text-black py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md mt-2 border-0">
                {loginStep === 1 ? 'VERIFY ACCESS AUTHORIZATION' : 'EXECUTE FIRMWARE LINK'}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}