// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — MASTER RECTILINEAR CHASSIS BUS
// CODESPACE PATH: frontend/src/components/layout/AppLayout.jsx
// ============================================================================

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout({ children, activeTab, setActiveTab, currentDeviceMode }) {
  // Returns true if the simulator state drops down into tight mobile parameters
  const isMobileView = currentDeviceMode === 'MOBILE';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col">
      
      {/* Top Header Access Panel Channel */}
      <Header currentDeviceMode={currentDeviceMode} />

      <div className="flex-1 flex min-w-0 overflow-hidden relative">
        
        {/* DESKTOP SIDEBAR BUS TRACE — Suppressed automatically during mobile preview modes */}
        {!isMobileView && (
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        )}

        {/* Central Viewport Processor Canvas Panel */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-8 transition-all duration-200 ${
          isMobileView ? 'pb-24' : ''
        }`}>
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>

        {/* MOBILE BOTTOM TAB CONTROLLER SOCKET — Hot-swapped on during mobile simulation */}
        {isMobileView && (
          <nav className="fixed bottom-0 left-0 right-0 h-16 bg-slate-950 border-t border-slate-800 flex items-center justify-around z-40 px-2 select-none animate-in slide-in-from-bottom duration-200">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`flex flex-col items-center justify-center space-y-0.5 text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'overview' ? 'text-amber-500' : 'text-slate-500'}`}
            >
              <span className="text-sm">📋</span>
              <span>Tower</span>
            </button>
            <button 
              onClick={() => setActiveTab('traffic')} 
              className={`flex flex-col items-center justify-center space-y-0.5 text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'traffic' ? 'text-amber-500' : 'text-slate-500'}`}
            >
              <span className="text-sm">⚡</span>
              <span>Traffic</span>
            </button>
            <button 
              onClick={() => setActiveTab('fleet')} 
              className={`flex flex-col items-center justify-center space-y-0.5 text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'fleet' ? 'text-amber-500' : 'text-slate-500'}`}
            >
              <span className="text-sm">🚚</span>
              <span>Fleet</span>
            </button>
            <button 
              onClick={() => setActiveTab('listings')} 
              className={`flex flex-col items-center justify-center space-y-0.5 text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'listings' ? 'text-amber-500' : 'text-slate-500'}`}
            >
              <span className="text-sm">🗂️</span>
              <span>Audit</span>
            </button>
          </nav>
        )}

      </div>
    </div>
  );
}