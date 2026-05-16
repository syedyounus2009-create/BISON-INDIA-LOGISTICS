// ============================================================================
// BOOK TITLE: BISON INDIA SMART LOGISTICS — ENTERPRISE LANDING SYSTEM
// CODESPACE PATH: frontend/src/LandingPage.jsx
// ============================================================================

import React, { useState } from 'react';

export default function LandingPage({ onLoginSuccess }) {
  // ----------------------------------------------------------------------------
  // GLOBAL STATE MANAGEMENT (CORE APPLICATION CONTROLLERS)
  // ----------------------------------------------------------------------------
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authView, setAuthView] = useState('login'); // Options: 'login' | 'recovery' | 'otp'
  const [userRole, setUserRole] = useState('shipper'); // Options: 'shipper' | 'transporter' | 'worker' | 'admin'
  const [showPassword, setShowPassword] = useState(false);

  // Input Data Buffers
  const [identityInput, setIdentityInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [recoveryMobile, setRecoveryMobile] = useState('');
  const [otpVerificationCode, setOtpVerificationCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Responsive Layout Device Mode State Engine
  const [currentDeviceMode, setCurrentDeviceMode] = useState('PC');

  // Mock Directory Ledger Records
  const systemDirectory = [
    { id: "BIL-ADM-01", name: "Eng. Syed Younus", mobile: "9848022338", email: "admin@bisonindia.com", role: "admin" },
    { id: "BIL-WRK-05", name: "M. A. Rahman", mobile: "9177012345", email: "rahman@bisonindia.com", role: "worker" },
    { id: "BIL-TRP-88", name: "K. Singh Logistics", mobile: "9988776655", email: "singh@bisonindia.com", role: "transporter" }
  ];

  // ----------------------------------------------------------------------------
  // ACTION DISPATCHERS (LOGIC UTILITIES)
  // ----------------------------------------------------------------------------
  const handleSearchLookup = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      setSearchResult(null);
      return;
    }
    const cleanQuery = searchQuery.trim().toLowerCase();
    const found = systemDirectory.find(user => 
      user.mobile === cleanQuery || 
      user.id.toLowerCase() === cleanQuery || 
      user.email.toLowerCase() === cleanQuery
    );
    setSearchResult(found || "NOT_FOUND");
  };

  const handleAuthenticationSubmit = (e) => {
    e.preventDefault();
    if (userRole === 'admin') {
      setAuthView('otp');
      return;
    }
    alert(`Identity verified for BISON ${userRole.toUpperCase()} workforce track.`);
    setIsLoginOpen(false);
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleOtpVerificationSubmit = (e) => {
    e.preventDefault();
    if (otpVerificationCode === "1234") {
      alert("Admin Mobile Security Token Confirmed. Unlocking Master Core Workspace.");
      setIsLoginOpen(false);
      if (onLoginSuccess) onLoginSuccess();
    } else {
      alert("Security Error: Invalid code. Input the default '1234' verification token.");
    }
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    alert(`Account access instructions routed to mobile number: +91 ${recoveryMobile}`);
    setAuthView('login');
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans antialiased transition-all duration-300 overflow-x-hidden ${
      currentDeviceMode === 'PC' ? 'w-full' : 
      currentDeviceMode === 'TABLET' ? 'max-w-2xl mx-auto shadow-2xl border-x-8 border-slate-800 my-4 rounded-3xl' : 
      'max-w-xs mx-auto shadow-2xl border-x-8 border-slate-900 my-6 rounded-[2.5rem]'
    }`}>

      {/* ==================================================================== */}
      {/* CHAPTER 1: TOP NAVIGATION & ACCESS RUNTIME                           */}
      {/* ==================================================================== */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 shrink-0">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-black text-white text-xl tracking-tighter">B</div>
            {currentDeviceMode === 'PC' && (
              <div>
                <span className="text-base font-black tracking-tight text-slate-900 block leading-none">BISON</span>
                <span className="text-[9px] font-bold tracking-widest text-amber-600 uppercase">Smart Logistics</span>
              </div>
            )}
          </div>

          {currentDeviceMode === 'PC' && (
            <nav className="hidden md:flex space-x-6 text-xs font-bold text-slate-600 uppercase tracking-tight">
              <a href="#features" className="hover:text-amber-500 transition-colors">Platform</a>
              <a href="#search-directory" className="hover:text-amber-500 transition-colors">Search Accounts</a>
              <a href="#pricing" className="hover:text-amber-500 transition-colors">Pricing</a>
              <a href="#company" className="hover:text-amber-500 transition-colors">Contact Us</a>
            </nav>
          )}

          <div className="flex items-center space-x-2">
            <button onClick={() => { setAuthView('login'); setIsLoginOpen(true); }} className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-amber-500 transition-colors">Sign In</button>
            <button onClick={() => { setAuthView('login'); setIsLoginOpen(true); }} className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-bold uppercase hover:bg-amber-500 transition-all shadow-sm">Start</button>
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* CHAPTER 2: BRAND PROPOSITION HERO CONTAINER & VIEW CONTROLS         */}
      {/* ==================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-100 pt-16 pb-12 border-b border-slate-200 subpixel-antialiased">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-sm mx-auto bg-white rounded-xl border border-slate-200 p-1.5 flex gap-1 mb-10 shadow-sm">
            <button type="button" onClick={() => setCurrentDeviceMode('PC')} className={`flex-1 font-black uppercase tracking-wider text-[10px] py-2 rounded-lg transition-all ${currentDeviceMode === 'PC' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>🖥️ PC Mode</button>
            <button type="button" onClick={() => setCurrentDeviceMode('TABLET')} className={`flex-1 font-black uppercase tracking-wider text-[10px] py-2 rounded-lg transition-all ${currentDeviceMode === 'TABLET' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>📋 Middle Mode</button>
            <button type="button" onClick={() => setCurrentDeviceMode('MOBILE')} className={`flex-1 font-black uppercase tracking-wider text-[10px] py-2 rounded-lg transition-all ${currentDeviceMode === 'MOBILE' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>📱 Mobile Mode</button>
          </div>

          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 uppercase tracking-widest mb-6 select-none">✨ India's Smartest Logistics Platform</span>
            <h1 className={`font-black uppercase tracking-tighter text-slate-900 mx-auto leading-none transition-all duration-200 ${currentDeviceMode === 'PC' ? 'text-5xl lg:text-6xl max-w-4xl' : currentDeviceMode === 'TABLET' ? 'text-3xl max-w-xl' : 'text-xl max-w-[280px]'}`}>SMART LOGISTICS. <span className="text-amber-500 block sm:inline">POWERFUL MOVEMENT.</span></h1>
            <p className={`text-slate-600 mx-auto font-medium leading-tight mt-4 transition-all duration-200 ${currentDeviceMode === 'PC' ? 'text-base max-w-2xl' : currentDeviceMode === 'TABLET' ? 'text-sm max-w-md' : 'text-xs max-w-[250px]'}`}>Connect shippers with verified transporters across India. Real-time tracking, GST invoicing, AI matching — everything you need in one platform.</p>
            <div className={`mt-8 flex flex-wrap justify-center gap-3 mx-auto ${currentDeviceMode === 'MOBILE' ? 'max-w-[240px]' : 'max-w-xl'}`}>
              <button onClick={() => { setAuthView('login'); setIsLoginOpen(true); }} className={`bg-amber-500 text-white font-black uppercase tracking-wider rounded-xl shadow-sm hover:bg-amber-600 transition-all ${currentDeviceMode === 'MOBILE' ? 'w-full py-2.5 text-[10px]' : 'px-6 py-3.5 text-xs'}`}>Post a Load Free</button>
              <button onClick={() => { setAuthView('login'); setIsLoginOpen(true); }} className={`bg-slate-900 text-white font-black uppercase tracking-wider rounded-xl shadow-sm hover:bg-slate-800 transition-all ${currentDeviceMode === 'MOBILE' ? 'w-full py-2.5 text-[10px]' : 'px-6 py-3.5 text-xs'}`}>Register Transporter</button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* CHAPTER 3: PLATFORM ACCOUNT SEARCH MODULE                            */}
      {/* ==================================================================== */}
      <section id="search-directory" className="max-w-3xl mx-auto px-4 py-12 scroll-mt-24">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="text-center mb-6">
            <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight">System Directory Quick Lookup</h3>
            <p className="text-xs text-slate-500 mt-1">Search profiles by Mobile number, Account ID, or Email</p>
          </div>
          <form onSubmit={handleSearchLookup} className="flex gap-2">
            <input type="text" placeholder="e.g. 9848022338, BIL-ADM-01" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-amber-500 text-slate-900" />
            <button type="submit" className="bg-slate-900 text-white px-6 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-slate-950 transition-colors">Search</button>
          </form>
          {searchResult && (
            <div className="mt-4 p-4 rounded-xl border text-xs font-semibold animate-in fade-in duration-100">
              {searchResult === "NOT_FOUND" ? (
                <p className="text-red-500 text-center">❌ No verified BISON identity matches that parameters query.</p>
              ) : (
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700">
                  <p><span className="text-slate-400 uppercase text-[10px] block font-bold">Profile Name</span> {searchResult.name}</p>
                  <p><span className="text-slate-400 uppercase text-[10px] block font-bold">Account ID</span> {searchResult.id}</p>
                  <p><span className="text-slate-400 uppercase text-[10px] block font-bold">Registered Mobile</span> +91 {searchResult.mobile}</p>
                  <p><span className="text-slate-400 uppercase text-[10px] block font-bold">System Role Mapping</span> <span className="text-amber-600 uppercase font-black">{searchResult.role}</span></p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* CHAPTER 7: SUBSCRIPTION & TIER PRICING ARCHITECTURE                 */}
      {/* ==================================================================== */}
      <section id="pricing" className="bg-slate-900 text-white py-16 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Transparent Pricing Plans</h2>
            <p className="text-slate-400 mt-2 text-xs font-medium">No hidden charges. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Free Tier</h3>
                <div className="mt-3 flex items-baseline text-slate-100 font-sans"><span className="text-4xl font-black font-mono">₹0</span></div>
                <ul className="mt-5 space-y-2 text-xs text-slate-300 font-medium border-t border-slate-700/60 pt-4">
                  <li>• 5 loads / month</li>
                  <li>• Basic tracking</li>
                </ul>
              </div>
              <button onClick={() => { setAuthView('login'); setIsLoginOpen(true); }} className="mt-6 w-full bg-slate-700 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider">Get Started</button>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border-2 border-amber-500 flex flex-col justify-between relative shadow-xl subpixel-antialiased">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">Most Popular</span>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">Basic Track</h3>
                <div className="mt-3 flex items-baseline font-sans text-slate-100">
                  <span className="text-2xl font-light tracking-tight">₹</span>
                  <span className="text-4xl font-black tracking-tighter font-mono text-white">999</span>
                  <span className="ml-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">/ month</span>
                </div>
                <ul className="mt-5 space-y-2.5 text-xs text-slate-300 font-medium border-t border-slate-700/60 pt-4">
                  <li>⏱️ 50 loads / month</li>
                  <li>📍 Live tracking telemetry</li>
                  <li>📄 GST Invoice generation</li>
                </ul>
              </div>
              <button onClick={() => { setAuthView('login'); setIsLoginOpen(true); }} className="mt-6 w-full bg-amber-500 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 hover:bg-amber-600 transition-colors">Buy Plan</button>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Premium Pro</h3>
                <div className="mt-3 flex items-baseline font-sans text-slate-100"><span className="text-2xl font-light">Custom</span></div>
                <ul className="mt-5 space-y-2 text-xs text-slate-300 font-medium border-t border-slate-700/60 pt-4">
                  <li>• Unlimited loads</li>
                  <li>• API integration access</li>
                </ul>
              </div>
              <button onClick={() => { setAuthView('login'); setIsLoginOpen(true); }} className="mt-6 w-full bg-slate-700 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* CHAPTER 9: ADMINISTRATIVE CORE FOOTER REGISTER                     */}
      {/* ==================================================================== */}
      <footer id="company" className="bg-white border-t border-slate-200 py-12 text-xs font-medium text-slate-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-5 h-5 bg-slate-900 rounded flex items-center justify-center font-black text-white text-[10px]">B</div>
              <span className="font-bold text-slate-900 tracking-tight text-xs">BISON INDIA LOGISTICS</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">Smart Logistics. Powerful Movement.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-3">Platform</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#features" className="hover:text-amber-500">Load Board</a></li>
              <li><a href="#features" className="hover:text-amber-500">Fleet Registry</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-3">Company</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#company" className="hover:text-amber-500">About Us</a></li>
              <li><a href="#company" className="hover:text-amber-500">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-3">Contact</h4>
            <p className="text-slate-700 font-bold">+91 98480 22338</p>
            <p className="text-slate-400 mt-0.5 text-[11px]">support@bisonindia.com</p>
          </div>
        </div>
      </footer>

      {/* ==================================================================== */}
      {/* CHAPTER 10: OVERLAY AUTHENTICATION WORKSPACE MODAL                   */}
      {/* ==================================================================== */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-[290px] sm:max-w-md w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
            
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
                {authView === 'login' ? 'Secure Access Console' : authView === 'recovery' ? 'Credential Recovery' : 'Admin OTP Validation'}
              </h3>
              <button onClick={() => setIsLoginOpen(false)} className="text-slate-400 hover:text-slate-900 text-lg font-bold leading-none">&times;</button>
            </div>

            {authView === 'login' && (
              <div className="p-4">
                <div className="grid grid-cols-4 gap-0.5 bg-slate-100 p-1 rounded-lg mb-4 text-[8px] sm:text-[10px] font-black uppercase tracking-tighter text-center">
                  <button onClick={() => setUserRole('shipper')} className={`py-1.5 rounded-md transition-all ${userRole === 'shipper' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Shipper</button>
                  <button onClick={() => setUserRole('transporter')} className={`py-1.5 rounded-md transition-all ${userRole === 'transporter' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Transport</button>
                  <button onClick={() => setUserRole('worker')} className={`py-1.5 rounded-md transition-all ${userRole === 'worker' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Worker</button>
                  <button onClick={() => setUserRole('admin')} className={`py-1.5 rounded-md transition-all ${userRole === 'admin' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-500'}`}>Admin</button>
                </div>

                <form onSubmit={handleAuthenticationSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[9px] font-bold uppercase text-slate-500 tracking-wider mb-1">Account ID Query</label>
                    <input required type="text" value={identityInput} onChange={(e) => setIdentityInput(e.target.value)} placeholder="Mobile number or email" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-[11px] font-semibold text-slate-900" />
                  </div>
                  
                  <div className="relative">
                    <label className="block text-[9px] font-bold uppercase text-slate-500 tracking-wider mb-1">Security Access PIN</label>
                    <input required type={showPassword ? "text" : "password"} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="••••••••" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-[11px] font-semibold text-slate-900 pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 bottom-2 text-[9px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-tighter">Show</button>
                  </div>
                  
                  <div className="flex"><button type="button" onClick={() => setAuthView('recovery')} className="text-[9px] font-bold text-amber-600 hover:underline">Forgot Access PIN?</button></div>
                  
                  <button type="submit" className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-black py-2.5 rounded-xl uppercase tracking-wider text-[10px] transition-colors shadow-sm">
                    {userRole === 'admin' ? 'Dispatch Mobile OTP Code' : 'Verify & Open Workspace'}
                  </button>
                </form>
              </div>
            )}

            {authView === 'recovery' && (
              <div className="p-4 space-y-3">
                <p className="text-[10px] text-slate-500 font-semibold leading-snug">Input your registered mobile parameters below to generate an access recovery token link sequence.</p>
                <form onSubmit={handleRecoverySubmit} className="space-y-3">
                  <input required type="tel" value={recoveryMobile} onChange={(e) => setRecoveryMobile(e.target.value)} placeholder="Enter 10-digit mobile number" className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-[11px] font-semibold text-slate-900" />
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={() => setAuthView('login')} className="text-[9px] font-bold text-slate-400 hover:underline">Return</button>
                    <button type="submit" className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">Send Code</button>
                  </div>
                </form>
              </div>
            )}

            {authView === 'otp' && (
              <div className="p-4 space-y-3">
                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[10px] text-amber-900 font-semibold leading-normal"><strong>Verification Link:</strong> Input default test security token code: <strong>1234</strong> to bypass gateway.</div>
                <form onSubmit={handleOtpVerificationSubmit} className="space-y-3">
                  <input required type="text" value={otpVerificationCode} onChange={(e) => setOtpVerificationCode(e.target.value)} placeholder="••••" maxLength={4} className="w-full bg-slate-50 border px-3 py-1.5 rounded-xl text-center font-mono text-base font-black text-slate-900 tracking-widest focus:outline-none" />
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={() => setAuthView('login')} className="text-[9px] font-bold text-slate-400 hover:underline">Cancel</button>
                    <button type="submit" className="bg-amber-500 text-slate-950 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">Confirm</button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}