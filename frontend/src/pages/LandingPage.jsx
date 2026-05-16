import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <div className="font-bold text-xl leading-none">BAYSON</div>
              <div className="text-[9px] text-orange-500 font-semibold tracking-widest">SMART LOGISTICS</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium rounded-lg border hover:bg-gray-50">Login</Link>
            <Link to="/login" className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            India's Smartest Logistics Platform
          </div>
          <h1 className="font-bold text-5xl md:text-7xl mb-4">
            SMART LOGISTICS.<br />
            <span className="text-white/90">POWERFUL MOVEMENT.</span>
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Connect shippers with verified transporters across India. Real-time tracking, GST invoicing, AI matching — everything you need in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-white/90">
              Start for Free →
            </Link>
            <button className="border border-white/30 text-white bg-white/10 px-8 py-3 rounded-lg font-semibold hover:bg-white/20">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-500 py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          <div><div className="text-3xl font-bold">10,000+</div><div className="text-sm opacity-80">Trucks Registered</div></div>
          <div><div className="text-3xl font-bold">50,000+</div><div className="text-sm opacity-80">Loads Delivered</div></div>
          <div><div className="text-3xl font-bold">300+</div><div className="text-sm opacity-80">Cities Covered</div></div>
          <div><div className="text-3xl font-bold">5,000+</div><div className="text-sm opacity-80">Happy Partners</div></div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '📦', title: 'Load Marketplace', desc: 'Post loads and get bids from verified transporters across India.' },
            { icon: '🚚', title: 'Fleet Management', desc: 'Complete truck and driver management with document tracking and alerts.' },
            { icon: '📍', title: 'Live Tracking', desc: 'Real-time trip tracking from pickup to delivery with status updates.' },
            { icon: '💰', title: 'GST Invoicing', desc: 'Auto-generate GST-compliant invoices and manage payments digitally.' },
            { icon: '🛡️', title: 'KYC Verification', desc: 'Verified transporters and shippers for safe and trusted transactions.' },
            { icon: '⚡', title: 'AI Smart Matching', desc: 'AI matches your load with the best available truck on the route.' },
          ].map(f => (
            <div key={f.title} className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 text-2xl">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border text-center">
              <h3 className="text-xl font-bold">Free</h3>
              <p className="text-3xl font-bold mt-2">₹0<span className="text-sm font-normal">/month</span></p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>5 loads/month</li>
                <li>Basic tracking</li>
                <li>Email support</li>
              </ul>
              <Link to="/login" className="mt-6 inline-block px-6 py-2 border rounded-lg hover:bg-gray-50">Get Started</Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border text-center ring-2 ring-orange-500">
              <h3 className="text-xl font-bold">Basic</h3>
              <p className="text-3xl font-bold mt-2">₹999<span className="text-sm font-normal">/month</span></p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>50 loads/month</li>
                <li>Live tracking</li>
                <li>Priority support</li>
                <li>Invoice generation</li>
              </ul>
              <Link to="/login" className="mt-6 inline-block px-6 py-2 bg-orange-500 text-white rounded-lg">Get Started</Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border text-center">
              <h3 className="text-xl font-bold">Premium</h3>
              <p className="text-3xl font-bold mt-2">₹2,999<span className="text-sm font-normal">/month</span></p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>Unlimited loads</li>
                <li>Advanced analytics</li>
                <li>Dedicated manager</li>
                <li>API access</li>
              </ul>
              <Link to="/login" className="mt-6 inline-block px-6 py-2 border rounded-lg hover:bg-gray-50">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 text-center text-sm">
        <p>© 2025 BISON INDIA. All rights reserved. | Smart Logistics. Powerful Movement.</p>
      </footer>
    </div>
  );
}