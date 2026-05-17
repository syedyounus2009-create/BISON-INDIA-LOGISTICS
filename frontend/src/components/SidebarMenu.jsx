// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — MASTER HANDWRITTEN NAVIGATION
// CODESPACE PATH: frontend/src/components/SidebarMenu.jsx
// ============================================================================

import React from 'react';
import { 
  LayoutDashboard, BarChart3, Box, BookOpen, 
  Truck, Users, Building2, UserSquare2, 
  FileText, CreditCard, Zap, Settings, LogOut 
} from 'lucide-react';

export default function SidebarMenu({ activeTab, setActiveTab, onLogout, userRole = 'Shipper' }) {
  const isAdmin = userRole === 'Admin';

  // Section Group Renderer Helper - Delicate, lightweight typography
  const renderHeaderLabel = (text) => (
    <div className="px-4 pt-4 pb-1 text-[10px] font-medium text-[#FF7A00] tracking-widest border-b border-zinc-900/50 mb-1 select-none">
      {text}
    </div>
  );

  const renderMenuBtn = (id, label, Icon) => {
    const isSelected = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[11px] font-normal tracking-wide transition-all border ${
          isSelected 
            ? 'bg-[#FF7A00] text-black border-[#FF7A00] shadow-md' 
            : 'text-white/80 bg-transparent border-transparent hover:bg-zinc-900/50 hover:border-zinc-800'
        }`}
      >
        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-black' : 'text-zinc-500'}`} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <aside className="w-full sm:w-64 bg-[#0A0A0B] border-r border-zinc-900 flex flex-col justify-between shrink-0 h-screen font-sans uppercase">
      
      {/* ==================================================================== */}
      {/* BRANDING SYSTEM PLATE: LOCKED TO BISON                               */}
      {/* ==================================================================== */}
      <div>
        <div className="h-20 flex items-center px-6 border-b border-zinc-900 space-x-3 bg-zinc-950/20">
          <img 
            src="/bison-logo.png" 
            alt="Bison Logo" 
            className="w-8 h-8 object-contain rounded-md" 
          />
          <div className="text-left select-none">
            <span className="text-sm font-medium tracking-wide text-white block leading-none">BISON</span>
            <span className="text-[9px] font-normal tracking-widest text-[#FF7A00] block mt-1">SMART LOGISTICS</span>
          </div>
        </div>

        {/* Scrollable Operations Menu Tree */}
        <nav className="p-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-150px)] text-left scrollbar-none">
          
          {renderHeaderLabel('OVERVIEW')}
          {renderMenuBtn('dashboard', 'DASHBOARD', LayoutDashboard)}
          {renderMenuBtn('analysis', 'ANALYSIS', BarChart3)}

          {renderHeaderLabel('MARKET PLACE')}
          {renderMenuBtn('load_board', 'LOAD BOARD', Box)}
          {renderMenuBtn('bookings', 'BOOKINGS', BookOpen)}

          {renderHeaderLabel('FLEET')}
          {renderMenuBtn('trucks', 'TRUCKS', Truck)}
          {renderMenuBtn('drivers', 'DRIVERS', Users)}

          {renderHeaderLabel('PARTIES')}
          {renderMenuBtn('transporters', 'TRANSPORTERS', Building2)}
          {renderMenuBtn('shippers', 'SHIPPERS', UserSquare2)}

          {renderHeaderLabel('FINANCE')}
          {renderMenuBtn('invoices', 'INVOICES', FileText)}
          {renderMenuBtn('transactions', 'TRANSACTIONS', CreditCard)}

          {/* ADMIN CATEGORY */}
          {isAdmin && (
            <>
              {renderHeaderLabel('ADMIN')}
              {renderMenuBtn('promotions', 'PROMOTIONS', Zap)}
              {renderMenuBtn('settings', 'SETTINGS', Settings)}
              {renderHeaderLabel('DIAGNOSTICS')}
              {renderMenuBtn('scada_tower', 'SCADA TOWER', Settings)}
            </>
          )}

        </nav>
      </div>

      {/* Disconnect Terminal */}
      <div className="p-3 border-t border-zinc-900 bg-zinc-950/20 select-none">
        <button 
          onClick={onLogout} 
          className="w-full bg-zinc-900/40 border border-zinc-800 hover:bg-red-900/30 hover:border-red-800 hover:text-red-400 text-zinc-400 py-3 rounded-xl text-xs font-normal tracking-widest transition-all flex items-center justify-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>LOGOUT TERMINAL</span>
        </button>
      </div>

    </aside>
  );
}