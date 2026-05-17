// ============================================================================
// SYSTEM IDENTIFIER: BAYSON SMART LOGISTICS — COMPUTATIONAL ANALYTICS HUB [IC]
// FILE PATH: frontend/src/pages/Analytics.jsx
// ============================================================================

import React from 'react';

export default function Analytics() {
  return (
    <div className="space-y-8 animate-in fade-in duration-150 text-left">
      
      {/* Upper Title Section */}
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-base font-black text-white uppercase tracking-widest">Analytics Dashboard</h2>
        <p className="text-xs text-zinc-500 mt-0.5 font-semibold">Real-time performance distribution signals parsed from BAYSON_DB registries</p>
      </div>

      {/* Main Graphical Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side Component: Revenue Velocity Trend Chart Container */}
        <div className="bg-[#121214] border-2 border-zinc-800/80 p-6 rounded-2xl space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Revenue Velocity</span>
            <span className="text-[10px] font-mono text-[#FF7A00] font-bold">Summation: ₹1.4M</span>
          </div>
          
          {/* Custom CSS Line Graph Visualization Mock */}
          <div className="h-48 flex items-end justify-between pt-4 relative border-b border-l border-zinc-800/80 px-2">
            <div className="absolute left-2 top-0 text-[10px] font-mono text-zinc-600">₹600K</div>
            <div className="absolute left-2 top-16 text-[10px] font-mono text-zinc-600">₹400K</div>
            <div className="absolute left-2 top-32 text-[10px] font-mono text-zinc-600">₹200K</div>
            
            {/* Trend plotting array indicators */}
            {['Dec 25', 'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26'].map((month, idx) => {
              const heights = ['h-40', 'h-36', 'h-24', 'h-20', 'h-20', 'h-12'];
              return (
                <div key={idx} className="flex flex-col items-center space-y-2 z-10 w-12">
                  <div className={`w-3 bg-[#FF7A00] rounded-t-sm ${heights[idx]} shadow-lg shadow-[#FF7A00]/10`} />
                  <span className="text-[9px] font-mono font-bold text-zinc-500">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side Component: Fleet Delivery Target Donut Ratio Box */}
        <div className="bg-[#121214] border-2 border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-4">Trip Operational Metrics</span>
          
          <div className="flex items-center justify-center py-4">
            {/* CSS Ring Circle Simulation Layout */}
            <div className="w-36 h-36 rounded-full border-8 border-[#FF7A00] border-r-zinc-800 flex items-center justify-center relative animate-spin-slow">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center -rotate-0 font-sans">
                <span className="text-2xl font-black text-white font-mono">78%</span>
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-wider">Completed</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6 text-[10px] font-black uppercase tracking-widest pt-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-[#FF7A00] rounded-sm" />
              <span className="text-zinc-300">In Transit</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-zinc-800 rounded-sm" />
              <span className="text-zinc-500">Completed Runs</span>
            </div>
          </div>
        </div>

      </div>

      {/* Lower Row Grid Split: Top Core Corridors and Cargo Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Route Volumetric Load Bars */}
        <div className="bg-[#121214] border-2 border-zinc-800/80 p-6 rounded-2xl space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block">Top Route Corridors</span>
          <div className="space-y-3 font-sans">
            <div>
              <div className="flex justify-between text-[11px] font-bold text-zinc-400 mb-1">
                <span>Chennai ➔ Mumbai</span>
                <span className="font-mono">82 Trips</span>
              </div>
              <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden"><div className="w-[85%] h-full bg-[#FF7A00]" /></div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-bold text-zinc-400 mb-1">
                <span>Hyderabad ➔ Bangalore</span>
                <span className="font-mono">54 Trips</span>
              </div>
              <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden"><div className="w-[55%] h-full bg-[#FF7A00]" /></div>
            </div>
          </div>
        </div>

        {/* Cargo Type Breakdown Segment */}
        <div className="bg-[#121214] border-2 border-zinc-800/80 p-6 rounded-2xl space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block">Load Types (Material Profile)</span>
          <div className="flex items-end justify-around h-24 pt-2 border-b border-zinc-900">
            <div className="flex flex-col items-center space-y-1.5"><span className="text-[9px] text-zinc-500 font-mono">15</span><div className="w-4 h-16 bg-[#FF7A00] rounded-t-sm" /><span className="text-[10px] font-black text-zinc-400 uppercase tracking-tight mt-1">Steel</span></div>
            <div className="flex flex-col items-center space-y-1.5"><span className="text-[9px] text-zinc-500 font-mono">8</span><div className="w-4 h-8 bg-zinc-800 rounded-t-sm" /><span className="text-[10px] font-black text-zinc-500 uppercase tracking-tight mt-1">Agri</span></div>
            <div className="flex flex-col items-center space-y-1.5"><span className="text-[9px] text-zinc-500 font-mono">4</span><div className="w-4 h-4 bg-zinc-800 rounded-t-sm" /><span className="text-[10px] font-black text-zinc-500 uppercase tracking-tight mt-1">Cement</span></div>
          </div>
        </div>

      </div>

    </div>
  );
}