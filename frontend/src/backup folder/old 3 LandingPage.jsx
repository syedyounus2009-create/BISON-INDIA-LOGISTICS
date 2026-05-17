import React, { useState } from 'react';

export default function LandingPage() {
  // State logic to control the Sign-In Modal visibility
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userRole, setUserRole] = useState('shipper'); // shipper or transporter

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-black text-white text-2xl tracking-tighter">
              B
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block leading-none">BAYSON</span>
              <span className="text-[10px] font-bold tracking-widest text-amber-600 uppercase">Smart Logistics</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-amber-500 transition-colors">Platform</a>
            <a href="#video-demo" className="hover:text-amber-500 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-amber-500 transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="text-sm font-semibold text-slate-700 hover:text-amber-500 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-500 transition-all shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION WITH VIDEO HOLDER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-100 py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wider mb-6">
              ✨ India's Smartest Logistics Platform
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto uppercase leading-tight">
              Smart Logistics. <span className="text-amber-500">Powerful Movement.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Connect shippers with verified transporters across India. Real-time tracking, GST invoicing, AI matching — everything you need in one platform.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="bg-amber-500 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-amber-600 transition-all shadow-md"
              >
                Post a Load Free
              </button>
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="bg-slate-900 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-slate-800 transition-all shadow-md"
              >
                Register as Transporter
              </button>
            </div>
          </div>

          {/* DEDICATED DEMO VIDEO CONTAINER */}
          <div id="video-demo" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
            <div className="bg-slate-900 rounded-2xl shadow-2xl border-4 border-slate-900 overflow-hidden aspect-video relative group">
              {/* Temporary Visual Placeholder Layer */}
              <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 translate-x-0.5">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <h3 className="text-white text-xl font-black uppercase tracking-tight">Bayson Platform Demo Video</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-md">
                  Showing how shippers post loads, how drivers use the app tracking interface, and how regional traffic nodes update in real time.
                </p>
              </div>
              {/* Ready to take an <iframe src="your-video-link"/> or <video> tag later */}
            </div>
          </div>

        </div>
      </section>

      {/* 3. PERFORMANCE METRICS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">10,000+</p>
            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-2">Trucks Registered</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">50,000+</p>
            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-2">Loads Delivered</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">300+</p>
            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-2">Cities Covered</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">5,000+</p>
            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-2">Happy Partners</p>
          </div>
        </div>
      </section>

      {/* 4. CORE CAPABILITIES (FEATURES) */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">Everything You Need</h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Built for India's trucking industry — from small fleet owners to enterprise shippers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Load Marketplace", desc: "Post loads and get bids from verified transporters across India in minutes." },
            { title: "Fleet Management", desc: "Complete truck and driver management with document tracking and alerts." },
            { title: "Live Tracking", desc: "Real-time trip tracking from pickup to delivery with status updates." },
            { title: "GST Invoicing", desc: "Auto-generate GST-compliant invoices and manage payments digitally." },
            { title: "KYC Verification", desc: "Verified transporters and shippers for safe and trusted transactions." },
            { title: "AI Smart Matching", desc: "AI matches your load with the best available truck on the route." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-400 transition-all hover:shadow-md group">
              <div className="w-12 h-12 bg-slate-900 group-hover:bg-amber-500 text-white font-bold rounded-xl flex items-center justify-center mb-6 transition-colors text-lg">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRICING ARCHITECTURE */}
      <section id="pricing" className="bg-slate-900 text-white py-24 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 mt-4 text-base font-medium">No hidden charges. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {/* Tiers omit for spacing details, matching the earlier structured layout */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400">Basic</h3>
                <p className="text-4xl font-black tracking-tight mt-4">₹999<span className="text-sm font-normal text-slate-400">/mo</span></p>
                <ul className="mt-6 space-y-3 text-sm text-slate-300 font-medium">
                  <li>• 50 loads/month</li>
                  <li>• Live tracking</li>
                  <li>• Invoice generation</li>
                </ul>
              </div>
              <button onClick={() => setIsLoginOpen(true)} className="mt-8 w-full bg-amber-500 py-3 rounded-xl font-bold text-sm text-slate-950">Buy Plan</button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE SIGN-IN / GET STARTED MODAL POPOUP */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header / Close controls */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-xl text-slate-900 uppercase tracking-tight">Account Access</h3>
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="text-slate-400 hover:text-slate-900 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Form Workspace */}
            <div className="p-6">
              {/* Identity Toggle tabs */}
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl mb-6">
                <button 
                  onClick={() => setUserRole('shipper')}
                  className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${userRole === 'shipper' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  Shipper / Business
                </button>
                <button 
                  onClick={() => setUserRole('transporter')}
                  className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${userRole === 'transporter' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  Transporter / Driver
                </button>
              </div>

              {/* Core Inputs */}
              <form onSubmit={(e) => { e.preventDefault(); alert('Routing to Operations Dashboard via backend verification logic...'); setIsLoginOpen(false); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Mobile Number / Email ID</label>
                  <input required type="text" placeholder="Enter registration identity" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 font-medium text-sm text-slate-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Password / Security PIN</label>
                  <input required type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 font-medium text-sm text-slate-900" />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center space-x-2 text-xs font-semibold text-slate-500 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 accent-amber-500" />
                    <span>Keep me logged in</span>
                  </label>
                  <a href="#" className="text-xs font-bold text-amber-600 hover:underline">Forgot access key?</a>
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-sm hover:bg-amber-500 transition-colors mt-4 shadow-md">
                  Verify & Open Workspace
                </button>
              </form>
            </div>

            {/* Footer Registration switcher */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs font-semibold text-slate-500">
              New to the platform? <a href="#" className="text-amber-600 font-bold hover:underline">Create an account here</a>
            </div>

          </div>
        </div>
      )}

      {/* 7. FOOTER */}
      <footer id="company" className="bg-white border-t border-slate-200 py-12 text-xs font-medium text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2026 Bayson India Logistics Pvt. Ltd. All rights reserved. | Trademark Registered</p>
        </div>
      </footer>

    </div>
  );
}