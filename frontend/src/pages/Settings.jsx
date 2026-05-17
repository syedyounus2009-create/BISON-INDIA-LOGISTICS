// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — SYSTEM SETTINGS & PREFERENCES
// CODESPACE PATH: frontend/src/pages/Settings.jsx
// ============================================================================

import React, { useState } from 'react';
import { User, Bell, Shield, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const [notificationPrefs, setNotificationPrefs] = useState({
    bookingUpdates: true,
    paymentAlerts: true,
    newLoadMatches: false
  });

  const toggleToggle = (key) => {
    setNotificationPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-100 max-w-4xl font-sans uppercase select-none">
      
      {/* PAGE HEADER */}
      <div>
        <h2 className="text-xl font-medium text-white tracking-widest mb-1">SETTINGS</h2>
        <p className="text-xs font-light text-zinc-400 tracking-wider">MANAGE YOUR ACCOUNT AND PREFERENCES</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ================================================================== */}
        {/* PROFILE SECTION                                                    */}
        {/* ================================================================== */}
        <div className="bg-[#121214] border border-zinc-900 rounded-2xl p-6">
          <div className="flex items-center space-x-2 border-b border-zinc-900/50 pb-4 mb-6">
            <User className="w-4 h-4 text-[#FF7A00]" />
            <h3 className="text-xs font-medium uppercase tracking-widest text-white/90">PROFILE</h3>
          </div>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-[#FF7A00] text-xl font-medium shadow-inner">
              S
            </div>
            <div>
              <div className="text-sm font-medium text-white/90 tracking-widest">SYED YOUNUS</div>
              <div className="text-[10px] text-zinc-400 font-mono tracking-widest lowercase mt-0.5">syedyounus2009@gmail.com</div>
              <div className="text-[9px] bg-[#FF7A00]/10 text-[#FF7A00] px-2 py-0.5 rounded border border-[#FF7A00]/20 font-medium tracking-widest mt-2 inline-block">
                ADMIN
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium text-zinc-500 tracking-widest">FULL NAME</label>
              <input type="text" defaultValue="SYED YOUNUS" className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white/90 font-medium tracking-wider focus:outline-none focus:border-[#FF7A00] transition-colors" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-medium text-zinc-500 tracking-widest">EMAIL ADDRESS</label>
              <input type="email" defaultValue="syedyounus2009@gmail.com" className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-zinc-400 font-mono tracking-wider lowercase focus:outline-none focus:border-[#FF7A00] transition-colors" />
            </div>
            <div className="pt-2">
              <button className="bg-zinc-900 border border-zinc-800 hover:border-[#FF7A00] text-white/90 px-6 py-2.5 rounded-xl text-[10px] font-medium tracking-widest transition-all">
                UPDATE PROFILE
              </button>
            </div>
          </div>
        </div>

        {/* COLUMN 2: NOTIFICATIONS & SECURITY */}
        <div className="space-y-6">
          
          {/* ================================================================== */}
          {/* NOTIFICATIONS SECTION                                              */}
          {/* ================================================================== */}
          <div className="bg-[#121214] border border-zinc-900 rounded-2xl p-6">
            <div className="flex items-center space-x-2 border-b border-zinc-900/50 pb-4 mb-6">
              <Bell className="w-4 h-4 text-[#FF7A00]" />
              <h3 className="text-xs font-medium uppercase tracking-widest text-white/90">NOTIFICATIONS</h3>
            </div>

            <div className="space-y-5">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white/90 tracking-wider">BOOKING UPDATES</div>
                  <div className="text-[9px] font-light text-zinc-500 tracking-widest mt-0.5">GET NOTIFIED ON BOOKING STATUS CHANGES</div>
                </div>
                <button onClick={() => toggleToggle('bookingUpdates')} className={`w-10 h-5 rounded-full relative transition-colors ${notificationPrefs.bookingUpdates ? 'bg-[#FF7A00]' : 'bg-zinc-800'}`}>
                  <div className={`w-3.5 h-3.5 bg-black rounded-full absolute top-0.5 transition-all ${notificationPrefs.bookingUpdates ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              
              {/* Toggle 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white/90 tracking-wider">PAYMENT ALERTS</div>
                  <div className="text-[9px] font-light text-zinc-500 tracking-widest mt-0.5">RECEIVE PAYMENT CONFIRMATION NOTIFICATIONS</div>
                </div>
                <button onClick={() => toggleToggle('paymentAlerts')} className={`w-10 h-5 rounded-full relative transition-colors ${notificationPrefs.paymentAlerts ? 'bg-[#FF7A00]' : 'bg-zinc-800'}`}>
                  <div className={`w-3.5 h-3.5 bg-black rounded-full absolute top-0.5 transition-all ${notificationPrefs.paymentAlerts ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white/90 tracking-wider">NEW LOAD MATCHES</div>
                  <div className="text-[9px] font-light text-zinc-500 tracking-widest mt-0.5">ALERT WHEN LOADS MATCH YOUR TRUCK PROFILE</div>
                </div>
                <button onClick={() => toggleToggle('newLoadMatches')} className={`w-10 h-5 rounded-full relative transition-colors ${notificationPrefs.newLoadMatches ? 'bg-[#FF7A00]' : 'bg-zinc-800'}`}>
                  <div className={`w-3.5 h-3.5 bg-black rounded-full absolute top-0.5 transition-all ${notificationPrefs.newLoadMatches ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* ================================================================== */}
          {/* SECURITY SECTION                                                   */}
          {/* ================================================================== */}
          <div className="bg-[#121214] border border-zinc-900 rounded-2xl p-6">
            <div className="flex items-center space-x-2 border-b border-zinc-900/50 pb-4 mb-4">
              <Shield className="w-4 h-4 text-[#FF7A00]" />
              <h3 className="text-xs font-medium uppercase tracking-widest text-white/90">SECURITY</h3>
            </div>
            <button className="w-full bg-zinc-950 border border-zinc-900 hover:border-[#FF7A00] text-white/90 px-4 py-3 rounded-xl text-[10px] font-medium tracking-widest transition-all text-left flex justify-between items-center">
              <span>CHANGE ACCOUNT PASSWORD</span>
              <span className="text-zinc-500 text-lg leading-none">›</span>
            </button>
          </div>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* DANGER ZONE                                                          */}
      {/* ==================================================================== */}
      <div className="bg-[#121214] border border-red-900/30 rounded-2xl p-6 mt-8">
        <div className="flex items-center space-x-2 border-b border-red-900/20 pb-4 mb-6">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <h3 className="text-xs font-medium uppercase tracking-widest text-red-500">DANGER ZONE</h3>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-white/90 tracking-wider mb-1">DELETE ACCOUNT</div>
            <div className="text-[10px] font-light text-zinc-400 tracking-widest uppercase">
              PERMANENTLY DELETE YOUR ACCOUNT AND ALL ASSOCIATED DATA. THIS ACTION CANNOT BE UNDONE.
            </div>
          </div>
          <button className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 px-6 py-2.5 rounded-xl text-[10px] font-medium tracking-widest transition-all whitespace-nowrap shrink-0">
            DELETE ACCOUNT
          </button>
        </div>
      </div>

    </div>
  );
}