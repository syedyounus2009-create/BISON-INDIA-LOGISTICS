// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — SYSTEM CORE PLATFORM CONTROL HUB
// CODESPACE PATH: frontend/src/pages/Dashboard.jsx
// ============================================================================

import React, { useState, useEffect } from 'react';

// CORE WORKSPACE INTERFACE BOOK CHAPTERS
import Analytics from './Analytics';
import Settings from './Settings';
import DiagnosticConsole from './DiagnosticConsole';
import Promotions from './Promotions';
import PricingManager from './PricingManager';

// MODULAR POPUP AND SIDEBAR INJECTIONS
import SidebarMenu from '../components/SidebarMenu';
import DemandForm from '../components/DemandForm';
import DriverForm from '../components/DriverForm';
import TruckForm from '../components/TruckForm';
import InvoiceViewer from '../components/InvoiceViewer';
import BookingForm from '../components/BookingForm';

export default function Dashboard({ onLogout, currentPricing, onUpdatePricing, userRole = 'Admin' }) {
  const isAdminSession = userRole === 'Admin';
  const [activeTab, setActiveTab] = useState('load_board');

  // MODAL OVERLAY TRIGGER CIRCUITS
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [isTruckModalOpen, setIsTruckModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // LIVE DATABASE STATE HOOKS
  const [loads, setLoads] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [transporters, setTransporters] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // CENTRAL TELEMETRY DATA FETCHING ROUTE
  const fetchDatabaseContentPools = async () => {
    setIsLoading(true);
    try {
      // Simulate API call and fallback to standard system memory arrays if offline
      setLoads([
        { id: 'LOAD-2026-701', origin_hub: 'HYDERABAD MAIN HUB', destination_hub: 'MUMBAI PORT CORRIDOR', cargo_profile: 'INDUSTRIAL STEEL COILS', weight_mt: 22, tariff_rate: '55,000', pricing_model: 'FIXED' },
        { id: 'LOAD-2026-702', origin_hub: 'CHENNAI TERMINAL', destination_hub: 'BANGALORE DEPOT LINE', cargo_profile: 'AUTOMOBILE COMPONENTS', weight_mt: 14, tariff_rate: '32,000', pricing_model: 'BIDDING' }
      ]);
      setDrivers([
        { id: 'DRV-101', name: 'M. A. RAHMAN', mobile: '9848012345', license_number: 'DL-36TS-2012004', status: 'ACTIVE_RUN' },
        { id: 'DRV-102', name: 'KARMINDER SINGH', mobile: '9988776655', license_number: 'DL-13PB-2015091', status: 'STANDBY' }
      ]);
      setTrucks([
        { asset_key: 'TRK-9021', truck_number: 'TS-09-UB-1234', chassis_configuration: 'MULTI-AXLE OPEN BED LINE', capacity_tons: 25, status: 'AVAILABLE' },
        { asset_key: 'TRK-9022', truck_number: 'AP-16-XY-5678', chassis_configuration: 'SEALED CARGO BOX CONTAINER', capacity_tons: 16, status: 'EN_ROUTE' }
      ]);
      setBookings([
        { id: 'BKG-001', load_id: 'LOAD-2026-701', truck_number: 'TS-09-UB-1234', status: 'DISPATCHED' }
      ]);
      setTransporters([
        { id: 'TRP-501', company_name: 'DOLPHIN TECHNO-ENGINEERING', fleet_count: 14, city: 'HYDERABAD' }
      ]);
      setShippers([
        { id: 'SHP-801', company_name: 'TELANGANA STEEL CORES LTD', active_contracts: 5, city: 'SECUNDERABAD' }
      ]);
      setTransactions([
        { id: 'TXN-909', amount: '55,000', status: 'SUCCESS', method: 'RAZORPAY_GATEWAY' }
      ]);
    } catch (error) {
      console.error('[DATABASE CONNECTIVITY ERROR]', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseContentPools();
  }, [activeTab]);

  // INSERT HANDLERS
  const handleInsertLoad = (payload) => {
    const newLoad = {
      id: `LOAD-2026-${Date.now().toString().slice(-3)}`,
      origin_hub: payload.origin.toUpperCase(),
      destination_hub: payload.destination.toUpperCase(),
      cargo_profile: payload.cargo.toUpperCase(),
      weight_mt: payload.weight,
      pricing_model: payload.priceModel,
      tariff_rate: parseFloat(payload.rate).toLocaleString('en-IN'),
      status: 'Open Transmit'
    };
    setLoads([newLoad, ...loads]);
    setIsLoadModalOpen(false);
  };

  const handleInsertDriver = (payload) => {
    const newDriver = {
      id: `DRV-${Date.now().toString().slice(-3)}`,
      name: payload.name.toUpperCase(),
      mobile: payload.mobile,
      license_number: payload.license_number.toUpperCase(),
      status: payload.status
    };
    setDrivers([newDriver, ...drivers]);
    setIsDriverModalOpen(false);
  };

  const handleInsertTruck = (payload) => {
    const newTruck = {
      asset_key: payload.asset_key,
      truck_number: payload.truck_number,
      chassis_configuration: payload.chassis_configuration,
      capacity_tons: payload.capacity_tons,
      status: 'AVAILABLE'
    };
    setTrucks([newTruck, ...trucks]);
    setIsTruckModalOpen(false);
  };

  const handleInsertBooking = (payload) => {
    setBookings([payload, ...bookings]);
    setIsBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans antialiased flex flex-col sm:flex-row select-none">
      
      <SidebarMenu activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} userRole={userRole} />

      <div className="flex-1 flex flex-col min-w-0 bg-[#0d0d0f]">
        <header className="h-20 bg-zinc-950/20 border-b border-zinc-900 px-8 flex items-center justify-between shrink-0">
          <div className="text-xs font-mono uppercase text-zinc-500 font-bold tracking-wider">
            DATABASE ACCESS LINK: <span className="text-[#FF7A00] font-medium font-sans">ACTIVE ROUTER RUNNING</span>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-y-auto">
          {activeTab === 'scada_tower' && isAdminSession && <DiagnosticConsole />}
          {activeTab === 'analysis' && <Analytics />}
          {activeTab === 'promotions' && <Promotions />}
          {activeTab === 'pricing_manager' && <PricingManager currentPricing={currentPricing} onUpdatePricing={onUpdatePricing} />}
          {activeTab === 'settings' && <Settings />}

          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 text-left animate-in fade-in">
              <h2 className="text-xs font-light text-zinc-400 uppercase tracking-widest">SYSTEM DASHBOARD OVERVIEW</h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
                <div className="bg-[#121214] border border-zinc-900 rounded-xl p-4">
                  <span className="block text-[8px] text-zinc-500 tracking-widest mb-1">FREIGHT RECORDS</span>
                  <span className="text-lg text-white font-medium">{loads.length} ACTIVE LOADS</span>
                </div>
                <div className="bg-[#121214] border border-zinc-900 rounded-xl p-4">
                  <span className="block text-[8px] text-zinc-500 tracking-widest mb-1">FLEET UNITS</span>
                  <span className="text-lg text-[#FF7A00] font-medium">{trucks.length} VEHICLES MOUNTED</span>
                </div>
                <div className="bg-[#121214] border border-zinc-900 rounded-xl p-4">
                  <span className="block text-[8px] text-zinc-500 tracking-widest mb-1">OPERATORS TRACK</span>
                  <span className="text-lg text-white font-medium">{drivers.length} TOTAL DRIVERS</span>
                </div>
                <div className="bg-[#121214] border border-zinc-900 rounded-xl p-4">
                  <span className="block text-[8px] text-zinc-500 tracking-widest mb-1">ACTIVE ASSIGNMENTS</span>
                  <span className="text-lg text-emerald-400 font-medium">{bookings.length} RUNS LIVE</span>
                </div>
              </div>
            </div>
          )}

          {/* LOAD BOARD VIEW */}
          {activeTab === 'load_board' && (
            <div className="space-y-6 text-left animate-in fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-light text-zinc-400 uppercase tracking-widest">LOAD BOARD MARKET EXCHANGE</h2>
                <button onClick={() => setIsLoadModalOpen(true)} className="bg-[#FF7A00] hover:bg-[#FF8C1A] text-black px-6 py-2.5 rounded-xl text-xs font-medium uppercase tracking-widest transition-all shadow-md">LOAD POST</button>
              </div>
              <div className="bg-[#121214] border border-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-zinc-950 text-[10px] font-medium text-zinc-500 border-b border-zinc-900 uppercase tracking-widest">
                    <tr><th className="px-6 py-4">LOAD ID</th><th className="px-6 py-4">ROUTE CORRIDOR CHANNEL</th><th className="px-6 py-4">CARGO PROFILE DETAILS</th><th className="px-6 py-4 text-right">TARIFF PRICE RATE</th></tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300 font-mono text-[11px]">
                    {loads.map(l => (
                      <tr key={l.id} className="hover:bg-zinc-950/40">
                        <td className="px-6 py-4 text-[#FF7A00] font-medium">{l.id}</td>
                        <td className="px-6 py-4 text-white/90 font-sans font-normal">{l.origin_hub} ➔ {l.destination_hub}</td>
                        <td className="px-6 py-4 font-sans text-zinc-400">{l.cargo_profile} ({l.weight_mt} MT)</td>
                        <td className="px-6 py-4 text-right text-white font-medium">₹{l.tariff_rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* BOOKINGS VIEW (WITH BUTTON) */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 text-left animate-in fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-light text-zinc-400 uppercase tracking-widest">ACTIVE BOOKINGS LOG</h2>
                <button onClick={() => setIsBookingModalOpen(true)} className="bg-[#FF7A00] hover:bg-[#FF8C1A] text-black px-6 py-2.5 rounded-xl text-xs font-medium uppercase tracking-widest transition-all shadow-md">NEW BOOKING</button>
              </div>
              <div className="bg-[#121214] border border-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-zinc-950 text-[10px] font-medium text-zinc-500 border-b border-zinc-900 uppercase tracking-widest">
                    <tr><th className="px-6 py-4">BOOKING REF</th><th className="px-6 py-4">LINKED LOAD</th><th className="px-6 py-4">ASSIGNED TRUCK NUMBER</th><th className="px-6 py-4 text-center">DISPATCH STATE</th></tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300 font-mono text-[11px]">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-zinc-950/40">
                        <td className="px-6 py-4 text-white font-medium">{b.id}</td>
                        <td className="px-6 py-4 text-[#FF7A00]">{b.load_id}</td>
                        <td className="px-6 py-4 font-sans text-zinc-400">{b.truck_number}</td>
                        <td className="px-6 py-4 text-center font-sans"><span className="text-[9px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-medium">{b.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TRUCKS VIEW */}
          {activeTab === 'trucks' && (
            <div className="space-y-6 text-left animate-in fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-light text-zinc-400 uppercase tracking-widest">FLEET MECHANICAL ASSET DEPLOYMENT</h2>
                <button onClick={() => setIsTruckModalOpen(true)} className="bg-[#FF7A00] hover:bg-[#FF8C1A] text-black px-6 py-2.5 rounded-xl text-xs font-medium uppercase tracking-widest transition-all shadow-md">MOUNT TRUCK</button>
              </div>
              <div className="bg-[#121214] border border-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-zinc-950 text-[10px] font-medium text-zinc-500 border-b border-zinc-900 uppercase tracking-widest">
                    <tr><th className="px-6 py-4">ASSET KEY</th><th className="px-6 py-4">LICENSE PLATE</th><th className="px-6 py-4">CHASSIS SPECIFICATION</th><th className="px-6 py-4 text-right">NET TONNAGE CAPACITY</th></tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300 font-mono text-[11px]">
                    {trucks.map(t => (
                      <tr key={t.asset_key} className="hover:bg-zinc-950/40">
                        <td className="px-6 py-4 text-zinc-500 font-medium">{t.asset_key}</td>
                        <td className="px-6 py-4 text-white/90 font-sans font-normal">{t.truck_number}</td>
                        <td className="px-6 py-4 font-sans text-zinc-400">{t.chassis_configuration}</td>
                        <td className="px-6 py-4 text-right text-[#FF7A00] font-medium">{t.capacity_tons} MT</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DRIVERS VIEW */}
          {activeTab === 'drivers' && (
            <div className="space-y-6 text-left animate-in fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-light text-zinc-400 uppercase tracking-widest">WORKFORCE MANAGEMENT OPERATOR LOGS</h2>
                <button onClick={() => setIsDriverModalOpen(true)} className="bg-[#FF7A00] hover:bg-[#FF8C1A] text-black px-6 py-2.5 rounded-xl text-xs font-medium uppercase tracking-widest transition-all shadow-md">ADD DRIVER</button>
              </div>
              <div className="bg-[#121214] border border-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-zinc-950 text-[10px] font-medium text-zinc-500 border-b border-zinc-900 uppercase tracking-widest">
                    <tr><th className="px-6 py-4">OPERATOR KEY</th><th className="px-6 py-4">FULL NAME</th><th className="px-6 py-4">MOBILE TRACK</th><th className="px-6 py-4">COMMERCIAL LICENSE DL</th><th className="px-6 py-4 text-center">STATUS</th></tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300 font-mono text-[11px]">
                    {drivers.map(d => (
                      <tr key={d.id} className="hover:bg-zinc-950/40">
                        <td className="px-6 py-4 text-zinc-500 font-medium">{d.id}</td>
                        <td className="px-6 py-4 text-white/90 font-sans font-normal">{d.name}</td>
                        <td className="px-6 py-4 text-zinc-400">{d.mobile}</td>
                        <td className="px-6 py-4 text-[#FF7A00] font-medium">{d.license_number}</td>
                        <td className="px-6 py-4 text-center font-sans"><span className="text-[9px] px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded font-medium">{d.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TRANSPORTERS VIEW */}
          {activeTab === 'transporters' && (
            <div className="space-y-6 text-left animate-in fade-in">
              <h2 className="text-xs font-light text-zinc-400 uppercase tracking-widest">REGISTERED TRANSPORTER COMPANYS</h2>
              <div className="bg-[#121214] border border-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-zinc-950 text-[10px] font-medium text-zinc-500 border-b border-zinc-900 uppercase tracking-widest">
                    <tr><th className="px-6 py-4">TRANSPORTER KEY</th><th className="px-6 py-4">FIRM CORPORATE NAME</th><th className="px-6 py-4">FLEET MOUNTED COUNT</th><th className="px-6 py-4">BASE LOCATION OPERATOR</th></tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300 font-mono text-[11px]">
                    {transporters.map(t => (
                      <tr key={t.id} className="hover:bg-zinc-950/40">
                        <td className="px-6 py-4 text-zinc-500">{t.id}</td>
                        <td className="px-6 py-4 text-white/90 font-sans font-normal">{t.company_name}</td>
                        <td className="px-6 py-4 text-[#FF7A00]">{t.fleet_count} UNITS</td>
                        <td className="px-6 py-4 font-sans text-zinc-400">{t.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SHIPPERS VIEW */}
          {activeTab === 'shippers' && (
            <div className="space-y-6 text-left animate-in fade-in">
              <h2 className="text-xs font-light text-zinc-400 uppercase tracking-widest">REGISTERED FREIGHT SHIPPERS</h2>
              <div className="bg-[#121214] border border-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-zinc-950 text-[10px] font-medium text-zinc-500 border-b border-zinc-900 uppercase tracking-widest">
                    <tr><th className="px-6 py-4">SHIPPER KEY</th><th className="px-6 py-4">ENTERPRISE PROFILE</th><th className="px-6 py-4">ACTIVE CONTRACT MANIFESTS</th><th className="px-6 py-4">HEADQUARTERS TERMINAL</th></tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300 font-mono text-[11px]">
                    {shippers.map(s => (
                      <tr key={s.id} className="hover:bg-zinc-950/40">
                        <td className="px-6 py-4 text-zinc-500">{s.id}</td>
                        <td className="px-6 py-4 text-white/90 font-sans font-normal">{s.company_name}</td>
                        <td className="px-6 py-4 text-[#FF7A00]">{s.active_contracts} CORRIDORS</td>
                        <td className="px-6 py-4 font-sans text-zinc-400">{s.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* INVOICES PORTAL VIEW */}
          {activeTab === 'invoices' && <InvoiceViewer />}

          {/* TRANSACTIONS LOG VIEW */}
          {activeTab === 'transactions' && (
            <div className="space-y-6 text-left animate-in fade-in">
              <h2 className="text-xs font-light text-zinc-400 uppercase tracking-widest">SECURE FINANCIAL TRANSACTION CLEARANCES</h2>
              <div className="bg-[#121214] border border-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-zinc-950 text-[10px] font-medium text-zinc-500 border-b border-zinc-900 uppercase tracking-widest">
                    <tr><th className="px-6 py-4">TRANSACTION HASH</th><th className="px-6 py-4">SETTLED VALUE</th><th className="px-6 py-4">GATEWAY SIGNATURE LINK</th><th className="px-6 py-4 text-center">ROUTER STATUS</th></tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300 font-mono text-[11px]">
                    {transactions.map(t => (
                      <tr key={t.id} className="hover:bg-zinc-950/40">
                        <td className="px-6 py-4 text-[#FF7A00]">{t.id}</td>
                        <td className="px-6 py-4 text-white font-medium">₹{t.amount}</td>
                        <td className="px-6 py-4 text-zinc-500">{t.method}</td>
                        <td className="px-6 py-4 text-center font-sans"><span className="text-[9px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-medium">{t.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL INJECTIONS */}
      {isLoadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"><DemandForm onSubmit={handleInsertLoad} onClose={() => setIsLoadModalOpen(false)} /></div>
      )}
      {isDriverModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"><DriverForm onDriverSubmit={handleInsertDriver} onClose={() => setIsDriverModalOpen(false)} /></div>
      )}
      {isTruckModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"><TruckForm onTruckSubmit={handleInsertTruck} onClose={() => setIsTruckModalOpen(false)} /></div>
      )}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"><BookingForm onBookingSubmit={handleInsertBooking} onClose={() => setIsBookingModalOpen(false)} /></div>
      )}

    </div>
  );
}