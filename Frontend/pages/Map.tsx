import React, { useState } from 'react';
import { Card, Badge } from '../components/UI';
import { Search, Filter, MapPin, Navigation } from 'lucide-react';

export const MapView = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="relative h-[calc(100vh-120px)] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl">
      {/* Sidebar Overlay */}
      <div className="absolute top-4 left-4 z-10 w-80 flex flex-col gap-4 h-[calc(100%-2rem)] pointer-events-none">
         {/* Search Box */}
         <Card className="p-2 pointer-events-auto">
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg px-3 py-2">
               <Search size={18} className="text-slate-400 mr-2" />
               <input className="bg-transparent outline-none w-full text-sm" placeholder="Search area..." />
            </div>
         </Card>

         {/* Filters */}
         <div className="pointer-events-auto flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Blood', 'Food', 'Shelter', 'Volunteer'].map(cat => (
               <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all ${activeCategory === cat ? 'bg-primary-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600'}`}
               >
                  {cat}
               </button>
            ))}
         </div>

         {/* List Results */}
         <Card className="flex-1 overflow-y-auto pointer-events-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur">
            <div className="p-3 border-b border-slate-100 dark:border-slate-700">
               <h3 className="font-bold text-sm text-slate-500 uppercase">Nearby (12)</h3>
            </div>
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                  <div className="flex justify-between items-start">
                     <h4 className="font-bold text-sm">City Blood Bank</h4>
                     <Badge variant="danger">Urgent</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">1.2 km away • Open 24/7</p>
               </div>
            ))}
         </Card>
      </div>

      {/* Map Simulation Area */}
      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 group">
         <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
         
         {/* Simulated Markers */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
             <div className="relative group/marker cursor-pointer hover:scale-110 transition-transform">
                 <MapPin className="text-red-500 w-10 h-10 drop-shadow-lg" fill="currentColor" />
                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 p-2 rounded-lg shadow-xl opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                    <p className="font-bold text-xs">Blood Donation Camp</p>
                    <p className="text-[10px] text-slate-500">Click for details</p>
                 </div>
             </div>
         </div>

         <div className="absolute top-1/3 right-1/4">
             <MapPin className="text-blue-500 w-8 h-8 drop-shadow-lg hover:scale-110 transition-transform cursor-pointer" fill="currentColor" />
         </div>

         <div className="absolute bottom-1/3 left-1/3">
             <MapPin className="text-emerald-500 w-8 h-8 drop-shadow-lg hover:scale-110 transition-transform cursor-pointer" fill="currentColor" />
         </div>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 pointer-events-auto">
         <button className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:bg-slate-50 text-slate-600"><Navigation size={20} /></button>
      </div>
    </div>
  );
};