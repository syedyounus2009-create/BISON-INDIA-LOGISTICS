import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
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
            <a href="#pricing" className="hover:text-amber-500 transition-colors">Pricing</a>
            <a href="#company" className="hover:text-amber-500 transition-colors">Company</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-sm font-semibold text-slate-700 hover:text-amber-500 transition-colors">
              Sign In
            </button>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-500 transition-all shadow-sm">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-100 py-24 sm:py-32 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wider mb-6">
            ✨ India's Smartest Logistics Platform
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto uppercase leading-tight">
            Smart Logistics. <span className="text-amber-500">Powerful Movement.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Connect shippers with verified transporters across India. Real-time tracking, GST invoicing, AI matching — everything you need in one platform.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="bg-amber-500 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-amber-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Post a Load Free
            </button>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Register as Transporter
            </button>
          </div>
        </div>
      </section>

      {/* 3. PERFORMANCE METRICS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y-2 divide-x-0 lg:divide-y-0 lg:divide-x divide-slate-100">
          <div className="pt-4 lg:pt-0">
            <p className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">10,000+</p>
            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-2">Trucks Registered</p>
          </div>
          <div className="pt-4 lg:pt-0">
            <p className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">50,000+</p>
            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-2">Loads Delivered</p>
          </div>
          <div className="pt-4 lg:pt-0">
            <p className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">300+</p>
            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-2">Cities Covered</p>
          </div>
          <div className="pt-4 lg:pt-0">
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
            {/* Tier 1 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400">Free</h3>
                <p className="text-4xl font-black tracking-tight mt-4">₹0<span className="text-sm font-normal text-slate-400">/month</span></p>
                <ul className="mt-6 space-y-3 text-sm text-slate-300 font-medium">
                  <li>• 5 loads/month</li>
                  <li>• Basic tracking</li>
                  <li>• Email support</li>
                </ul>
              </div>
              <button className="mt-8 w-full bg-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-slate-600 transition-colors">Get Started</button>
            </div>

            {/* Tier 2 */}
            <div className="bg-slate-800 p-8 rounded-2xl border-2 border-amber-500 flex flex-col justify-between relative shadow-xl">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</span>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-amber-400">Basic</h3>
                <p className="text-4xl font-black tracking-tight mt-4">₹999<span className="text-sm font-normal text-slate-400">/month</span></p>
                <ul className="mt-6 space-y-3 text-sm text-slate-300 font-medium">
                  <li>• 50 loads/month</li>
                  <li>• Live tracking</li>
                  <li>• Priority support</li>
                  <li>• Invoice generation</li>
                </ul>
              </div>
              <button className="mt-8 w-full bg-amber-500 py-3 rounded-xl font-bold text-sm text-slate-950 hover:bg-amber-600 transition-colors">Buy Plan</button>
            </div>

            {/* Tier 3 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400">Premium</h3>
                <p className="text-4xl font-black tracking-tight mt-4">₹2,999<span className="text-sm font-normal text-slate-400">/month</span></p>
                <ul className="mt-6 space-y-3 text-sm text-slate-300 font-medium">
                  <li>• Unlimited loads</li>
                  <li>• Advanced analytics</li>
                  <li>• Dedicated manager</li>
                  <li>• API access</li>
                  <li>• Custom reports</li>
                </ul>
              </div>
              <button className="mt-8 w-full bg-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-slate-600 transition-colors">Buy Plan</button>
            </div>

            {/* Tier 4 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400">Enterprise</h3>
                <p className="text-4xl font-black tracking-tight mt-4">Custom</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-300 font-medium">
                  <li>• White-label option</li>
                  <li>• SLA guarantee</li>
                  <li>• 24/7 support</li>
                  <li>• Custom integrations</li>
                </ul>
              </div>
              <button className="mt-8 w-full bg-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-slate-600 transition-colors">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">Ready to Move India's Freight Smarter?</h2>
        <p className="text-slate-600 mt-4 font-medium">Join thousands of transporters and shippers already using Bayson Smart Logistics.</p>
        <button className="mt-8 bg-amber-500 text-white font-bold px-8 py-4 rounded-xl text-base shadow-md hover:bg-amber-600 transition-colors">
          Create Account Now
        </button>
      </section>

      {/* 7. MASTER REPOSITORY FOOTER */}
      <footer id="company" className="bg-white border-t border-slate-200 py-16 text-sm font-medium text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center font-black text-white text-xs">B</div>
              <span className="font-bold text-slate-900 tracking-tight">BAYSON</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">Smart Logistics. Powerful Movement. India's trusted trucking platform.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-amber-500">Load Board</a></li>
              <li><a href="#features" className="hover:text-amber-500">Fleet Registry</a></li>
              <li><a href="#features" className="hover:text-amber-500">Live Telemetry</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#company" className="hover:text-amber-500">About Us</a></li>
              <li><a href="#company" className="hover:text-amber-500">Partner Program</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Contact</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="font-bold text-slate-900">+91 XXXXX XXXXX</li>
              <li>support@baysonindia.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 Bayson India Logistics Pvt. Ltd. All rights reserved. | Trademark Registered</p>
        </div>
      </footer>

    </div>
  );
}