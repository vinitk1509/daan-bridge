import React, { useState } from 'react';
import { Card, Button, Badge } from '../components/UI';
import { ShieldAlert, Radio, Navigation, Phone, Share2, MapPin } from 'lucide-react';

export const Disaster = () => {
  const [sosActive, setSosActive] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [reportForm, setReportForm] = useState({ type: 'Flood', description: '' });
  const [locationLoading, setLocationLoading] = useState(false);

  const handleToggleSOS = () => {
    if (!sosActive) {
      setLocationLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setSosActive(true);
            setLocationLoading(false);
            // In a real app, we would send this location to the backend via websocket/api
          },
          (error) => {
            console.error("Error getting location", error);
            alert("Could not get precise location. Broadcasting SOS with approximate location.");
            setSosActive(true);
            setLocationLoading(false);
          }
        );
      } else {
        alert("Geolocation is not supported. SOS broadcast initiated without precise location.");
        setSosActive(true);
        setLocationLoading(false);
      }
    } else {
      setSosActive(false);
      setUserLocation(null);
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Incident Reported! Emergency teams have been notified of your location.');
    setReportForm({ type: 'Flood', description: '' });
  };

  return (
    <div className="space-y-6">
      {/* SOS Header */}
      <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 overflow-visible relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div>
             <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <ShieldAlert size={32} /> Disaster Relief & SOS
             </h1>
             <p className="opacity-90 max-w-xl">Use this only in case of extreme emergency. This will broadcast your live location to nearby volunteers and rescue teams.</p>
             {sosActive && userLocation && (
               <div className="mt-2 bg-white/20 backdrop-blur-md inline-flex items-center px-3 py-1 rounded-lg text-sm">
                 <MapPin size={14} className="mr-2" />
                 Broadcasting at: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
               </div>
             )}
          </div>
          <button 
             onClick={handleToggleSOS}
             disabled={locationLoading}
             className={`mt-6 md:mt-0 w-32 h-32 rounded-full border-8 border-red-400/50 flex flex-col items-center justify-center font-bold shadow-2xl transition-all duration-300 transform hover:scale-105 ${sosActive ? 'bg-white text-red-600 animate-pulse' : 'bg-red-800 text-white'}`}
          >
             <span className="text-2xl">{locationLoading ? '...' : 'SOS'}</span>
             <span className="text-xs uppercase">{sosActive ? 'Active' : (locationLoading ? 'Locating' : 'Press')}</span>
          </button>
        </div>
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Alerts */}
        <Card className="lg:col-span-2 p-0 overflow-hidden flex flex-col h-[500px]">
           <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                 <Radio size={18} className="text-red-500 animate-pulse" /> Live Disaster Feed
              </h3>
              <div className="flex gap-2">
                 <Badge variant="danger">2 Critical</Badge>
                 <Badge variant="warning">5 Warnings</Badge>
              </div>
           </div>
           
           {/* Map Simulation */}
           <div className="flex-1 bg-slate-200 dark:bg-slate-800 relative group overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
              
              {/* User SOS Marker */}
              {sosActive && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                   <div className="w-32 h-32 bg-red-500/20 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                   <div className="w-20 h-20 bg-red-500/40 rounded-full animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                   <div className="w-6 h-6 bg-red-600 border-4 border-white rounded-full relative shadow-xl z-10"></div>
                   <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full shadow-lg text-xs font-bold whitespace-nowrap animate-bounce">
                      SOS SIGNAL ACTIVE
                   </div>
                </div>
              )}

              {/* Map Marker 1 */}
              <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                 <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                 <div className="w-4 h-4 bg-red-600 rounded-full relative border-2 border-white cursor-pointer hover:scale-110 transition-transform"></div>
                 <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-2 py-1 rounded shadow text-xs whitespace-nowrap font-bold">Flood Alert</div>
              </div>

               {/* Map Marker 2 */}
              <div className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                 <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping absolute"></div>
                 <div className="w-4 h-4 bg-orange-600 rounded-full relative border-2 border-white cursor-pointer hover:scale-110 transition-transform"></div>
                 <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-2 py-1 rounded shadow text-xs whitespace-nowrap font-bold">Supplies Needed</div>
              </div>
           </div>
        </Card>

        {/* Resources & Status */}
        <div className="space-y-6">
           <Card className="p-6">
              <h3 className="font-bold mb-4">Emergency Resources</h3>
              <div className="space-y-3">
                 <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="bg-blue-100 p-2 rounded text-blue-600"><Phone size={18} /></div>
                       <div className="text-left">
                          <p className="text-sm font-bold">Helpline</p>
                          <p className="text-xs text-slate-500">24/7 Support</p>
                       </div>
                    </div>
                    <span className="text-xs font-mono bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">108</span>
                 </button>

                 <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="bg-emerald-100 p-2 rounded text-emerald-600"><Navigation size={18} /></div>
                       <div className="text-left">
                          <p className="text-sm font-bold">Safe Zones</p>
                          <p className="text-xs text-slate-500">Locate shelters</p>
                       </div>
                    </div>
                 </button>
              </div>
           </Card>

           <Card className="p-6">
              <h3 className="font-bold mb-4">Report an Incident</h3>
              <form className="space-y-4" onSubmit={handleReportSubmit}>
                 <div>
                    <label className="text-xs font-medium text-slate-500 uppercase">Type</label>
                    <select 
                        className="w-full mt-1 p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm"
                        value={reportForm.type}
                        onChange={e => setReportForm({...reportForm, type: e.target.value})}
                    >
                       <option>Flood</option>
                       <option>Earthquake</option>
                       <option>Fire</option>
                       <option>Medical Emergency</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-xs font-medium text-slate-500 uppercase">Description</label>
                    <textarea 
                        className="w-full mt-1 p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm h-20 resize-none"
                        value={reportForm.description}
                        onChange={e => setReportForm({...reportForm, description: e.target.value})}
                        placeholder="Describe location and situation..."
                        required
                    ></textarea>
                 </div>
                 <Button className="w-full" type="submit">Submit Report</Button>
              </form>
           </Card>
        </div>
      </div>
    </div>
  );
};