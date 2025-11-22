import React from 'react';
import { Card, Badge, Button } from '../components/UI';
import { MOCK_DELIVERIES } from '../data';
import { Truck, Package, Map, CheckCircle, Clock } from 'lucide-react';

export const Logistics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Logistics & Inventory</h1>
            <p className="text-slate-500 dark:text-slate-400">Track donations from donor to beneficiary.</p>
         </div>
         <Button className="flex items-center gap-2">
            <Package size={18} /> Update Inventory
         </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Live Delivery Map Placeholder */}
         <Card className="lg:col-span-2 min-h-[400px] bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
            <div className="text-center z-10">
               <Map size={64} className="mx-auto text-slate-300 mb-4" />
               <h3 className="text-xl font-bold text-slate-400">Live Tracking Map</h3>
               <p className="text-slate-500">Visualizing 3 active deliveries</p>
            </div>
            {/* Floating Delivery Card Simulation */}
            <div className="absolute top-10 left-10 bg-white dark:bg-slate-900 p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-3 animate-bounce-slow">
               <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Truck size={20} /></div>
               <div>
                  <p className="text-xs font-bold">Vehicle #42</p>
                  <p className="text-[10px] text-slate-500">Arriving in 15m</p>
               </div>
            </div>
         </Card>

         {/* Delivery List */}
         <div className="space-y-4">
            <h3 className="font-bold text-slate-700 dark:text-slate-300">Active Deliveries</h3>
            {MOCK_DELIVERIES.map(delivery => (
               <Card key={delivery.id} className="p-4 border-l-4 border-primary-500">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-xs font-mono text-slate-400">#{delivery.id}</span>
                     <Badge variant={delivery.status === 'DELIVERED' ? 'success' : (delivery.status === 'IN_TRANSIT' ? 'info' : 'warning')}>
                        {delivery.status}
                     </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-slate-600 dark:text-slate-300 truncate">{delivery.from}</span>
                     </div>
                     <div className="pl-1 border-l border-slate-300 dark:border-slate-700 h-4 ml-0.5"></div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-slate-600 dark:text-slate-300 truncate">{delivery.to}</span>
                     </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs">
                     <span className="text-slate-500">{delivery.itemCount} Items</span>
                     <span className="font-bold text-slate-700 dark:text-slate-200">{delivery.eta}</span>
                  </div>
                  {delivery.status === 'PENDING' && (
                     <Button size="sm" variant="outline" className="w-full mt-3 text-xs">Assign Driver</Button>
                  )}
               </Card>
            ))}
         </div>
      </div>

      <Card className="p-6">
         <h3 className="font-bold mb-4">Warehouse Inventory</h3>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="text-xs uppercase text-slate-500 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <tr>
                     <th className="p-3">Item Category</th>
                     <th className="p-3">Stock Level</th>
                     <th className="p-3">Status</th>
                     <th className="p-3">Last Updated</th>
                     <th className="p-3">Action</th>
                  </tr>
               </thead>
               <tbody className="text-sm">
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                     <td className="p-3 font-medium">Medical Kits</td>
                     <td className="p-3">1,250 units</td>
                     <td className="p-3"><Badge variant="success">Healthy</Badge></td>
                     <td className="p-3 text-slate-500">2h ago</td>
                     <td className="p-3"><button className="text-primary-600 hover:underline">Manage</button></td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                     <td className="p-3 font-medium">Blankets</td>
                     <td className="p-3 text-red-500 font-bold">45 units</td>
                     <td className="p-3"><Badge variant="danger">Low Stock</Badge></td>
                     <td className="p-3 text-slate-500">1d ago</td>
                     <td className="p-3"><button className="text-primary-600 hover:underline">Restock</button></td>
                  </tr>
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );
};