
import React, { useState } from 'react';
import { useApp } from '../context';
import { Card, Badge, Button, ProgressBar, Modal, Tabs, Input, Select } from '../components/UI';
import { MOCK_CAMPAIGNS, MOCK_DONATIONS } from '../data';
import { RequestType, Campaign } from '../types';
import { Plus, Filter, Search, MapPin, Calendar, CreditCard, Truck, Upload, Edit, BarChart, TrendingUp, Users, DollarSign, Clock, ArrowUpRight, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const Campaigns = () => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState<Campaign | null>(null);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState<Campaign | null>(null);
  const [donationStep, setDonationStep] = useState(1); // 1: Amount/Items, 2: Payment/Schedule, 3: Success

  // Create Request State
  const [newRequest, setNewRequest] = useState({
    type: 'MONETARY' as RequestType,
    title: '',
    target: '',
    description: '',
  });

  const handleDonate = (campaign: Campaign) => {
    setShowDonateModal(campaign);
    setDonationStep(1);
  };

  const handleShowAnalytics = (campaign: Campaign) => {
    setShowAnalyticsModal(campaign);
  };

  const filteredCampaigns = activeTab === 'All' 
    ? MOCK_CAMPAIGNS 
    : MOCK_CAMPAIGNS.filter(c => c.type === activeTab.toUpperCase() || c.category === activeTab);

  // Mock Data Generators for Analytics
  const getAnalyticsData = (campaign: Campaign | null) => {
    if (!campaign) return { dailyData: [], sourceData: [] };
    
    const dailyData = [
      { name: 'Mon', amount: campaign.raised * 0.1 },
      { name: 'Tue', amount: campaign.raised * 0.15 },
      { name: 'Wed', amount: campaign.raised * 0.12 },
      { name: 'Thu', amount: campaign.raised * 0.25 },
      { name: 'Fri', amount: campaign.raised * 0.20 },
      { name: 'Sat', amount: campaign.raised * 0.18 },
      { name: 'Sun', amount: campaign.raised * 0.30 }, // Accumulative logic simplified for demo
    ];

    const sourceData = [
      { name: 'Direct', value: 45 },
      { name: 'Social', value: 30 },
      { name: 'Email', value: 15 },
      { name: 'Referral', value: 10 },
    ];

    return { dailyData, sourceData };
  };

  const analyticsData = getAnalyticsData(showAnalyticsModal);
  const campaignDonations = MOCK_DONATIONS.filter(d => d.campaignId === showAnalyticsModal?.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Campaigns & Requests</h1>
          <p className="text-slate-500 dark:text-slate-400">
            {user?.role === 'ORGANIZATION' ? 'Manage your initiatives and monitor progress.' : 'Support causes that matter or create your own request.'}
          </p>
        </div>
        {(user?.role === 'ORGANIZATION' || user?.role === 'ADMIN') && (
          <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
            <Plus size={18} /> Create Request
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 outline-none"
            />
         </div>
         <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Disaster', 'Education', 'Health', 'Welfare'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                   activeTab === tab 
                     ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900' 
                     : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                 }`}
               >
                 {tab}
               </button>
            ))}
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="flex flex-col h-full group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={campaign.image} 
                alt={campaign.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              {campaign.urgent && (
                <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg animate-pulse">
                  URGENT
                </span>
              )}
              <span className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 dark:text-slate-200">
                 {campaign.type}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col">
               <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">{campaign.title}</h3>
               </div>
               <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">by {campaign.organizer}</p>
               <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 flex-1">{campaign.description}</p>

               <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                     <span>{campaign.raised} {campaign.unit} raised</span>
                     <span>{Math.round((campaign.raised / campaign.target) * 100)}%</span>
                  </div>
                  <ProgressBar value={campaign.raised} max={campaign.target} />
                  <p className="text-xs text-slate-400 text-right">Goal: {campaign.target} {campaign.unit}</p>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center text-xs text-slate-500">
                     <MapPin size={14} className="mr-1" />
                     {campaign.location.address.split(',')[0]}
                  </div>
                  
                  {/* Role Based Actions */}
                  {user?.role === 'INDIVIDUAL' && (
                      <Button size="sm" onClick={() => handleDonate(campaign)}>
                        {campaign.type === 'VOLUNTEER' ? 'Volunteer' : 'Donate'}
                      </Button>
                  )}
                  {(user?.role === 'ORGANIZATION' || user?.role === 'ADMIN') && (
                      <div className="flex gap-2">
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Edit">
                           <Edit size={18} />
                        </button>
                        <button 
                            onClick={() => handleShowAnalytics(campaign)}
                            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" 
                            title="Analytics"
                        >
                           <BarChart size={18} />
                        </button>
                      </div>
                  )}
               </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Request Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Request">
         <div className="space-y-4">
            <Select 
              label="Request Type" 
              value={newRequest.type} 
              onChange={(e) => setNewRequest({...newRequest, type: e.target.value as RequestType})}
            >
               <option value="MONETARY">Monetary Fundraiser</option>
               <option value="MATERIAL">Material Donation Drive</option>
               <option value="VOLUNTEER">Call for Volunteers</option>
               <option value="BLOOD">Blood Donation Camp</option>
            </Select>
            <Input 
              label="Campaign Title" 
              placeholder="e.g. Help Flood Victims"
              value={newRequest.title}
              onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
               <Input 
                 label="Target Amount/Units" 
                 type="number" 
                 placeholder="5000"
                 value={newRequest.target}
                 onChange={(e) => setNewRequest({...newRequest, target: e.target.value})}
               />
               <Select label="Unit">
                  <option>USD</option>
                  <option>Items</option>
                  <option>Volunteers</option>
                  <option>Pints</option>
               </Select>
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
               <textarea 
                 className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none h-24 resize-none"
                 placeholder="Describe the need..."
                 value={newRequest.description}
                 onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
               ></textarea>
            </div>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
               <Upload className="mx-auto text-slate-400 mb-2" />
               <p className="text-sm text-slate-500">Upload Verification Docs & Images</p>
            </div>
            <Button className="w-full" onClick={() => { setShowCreateModal(false); alert('Request Created! Pending Verification.'); }}>
               Submit for Review
            </Button>
         </div>
      </Modal>

      {/* Analytics Modal */}
      <Modal isOpen={!!showAnalyticsModal} onClose={() => setShowAnalyticsModal(null)} title="Campaign Analytics">
         {showAnalyticsModal && (
            <div className="space-y-6">
               {/* Stats Header */}
               <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                     <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Users size={14} />
                        <span className="text-xs font-bold uppercase">Donors</span>
                     </div>
                     <p className="text-2xl font-bold text-slate-800 dark:text-white">124</p>
                     <p className="text-xs text-emerald-500 flex items-center mt-1"><ArrowUpRight size={12} /> +12% this week</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                     <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <DollarSign size={14} />
                        <span className="text-xs font-bold uppercase">Avg. Donation</span>
                     </div>
                     <p className="text-2xl font-bold text-slate-800 dark:text-white">$45</p>
                     <p className="text-xs text-emerald-500 flex items-center mt-1"><ArrowUpRight size={12} /> +5% this week</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                     <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Clock size={14} />
                        <span className="text-xs font-bold uppercase">Days Left</span>
                     </div>
                     <p className="text-2xl font-bold text-slate-800 dark:text-white">14</p>
                     <p className="text-xs text-slate-400 mt-1">Ends on {showAnalyticsModal.deadline}</p>
                  </div>
               </div>

               {/* Chart Section */}
               <div className="h-64 w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Donation Trend (Last 7 Days)</h4>
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={analyticsData.dailyData}>
                        <defs>
                           <linearGradient id="colorAnalytics" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="amount" stroke="#0d9488" strokeWidth={2} fill="url(#colorAnalytics)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>

               {/* Recent Transactions */}
               <div>
                  <div className="flex justify-between items-center mb-3">
                     <h4 className="font-bold text-slate-800 dark:text-white">Recent Activity</h4>
                     <button className="text-primary-600 text-xs font-medium hover:underline flex items-center gap-1">
                        <Download size={12} /> Export CSV
                     </button>
                  </div>
                  <div className="space-y-2">
                     {campaignDonations.length > 0 ? campaignDonations.map((donation) => (
                        <div key={donation.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs">
                                 {donation.donorName[0]}
                              </div>
                              <div>
                                 <p className="text-sm font-medium text-slate-800 dark:text-white">{donation.donorName}</p>
                                 <p className="text-xs text-slate-500">{donation.date}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="font-bold text-slate-800 dark:text-white">
                                 {donation.type === 'MONEY' ? `$${donation.amount}` : `${donation.amount} Items`}
                              </p>
                              <Badge variant="success">Completed</Badge>
                           </div>
                        </div>
                     )) : (
                        <p className="text-center text-slate-400 py-4">No recent transactions found.</p>
                     )}
                  </div>
               </div>
            </div>
         )}
      </Modal>

      {/* Donation Modal */}
      <Modal isOpen={!!showDonateModal} onClose={() => setShowDonateModal(null)} title={`Donate to ${showDonateModal?.title}`}>
         {donationStep === 1 && (
            <div className="space-y-4">
               <p className="text-slate-500 text-sm">{showDonateModal?.description}</p>
               
               {showDonateModal?.type === 'MONETARY' ? (
                 <div className="grid grid-cols-3 gap-2 mb-4">
                    {['10', '50', '100'].map(amt => (
                       <button key={amt} className="py-2 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">${amt}</button>
                    ))}
                 </div>
               ) : (
                 <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm mb-4">
                    Listing items required: Jackets, Blankets, Canned Food.
                 </div>
               )}

               <Input 
                 label={showDonateModal?.type === 'MONETARY' ? 'Custom Amount' : 'Description of Items'}
                 type={showDonateModal?.type === 'MONETARY' ? 'number' : 'text'} 
                 placeholder={showDonateModal?.type === 'MONETARY' ? '$' : 'e.g. 2 Boxes of Winter Clothes'}
               />

               <Button className="w-full" onClick={() => setDonationStep(2)}>Continue</Button>
            </div>
         )}

         {donationStep === 2 && (
            <div className="space-y-6 text-center">
               {showDonateModal?.type === 'MONETARY' ? (
                  <>
                     <CreditCard size={48} className="mx-auto text-primary-500 mb-4" />
                     <h3 className="font-bold text-lg">Payment Gateway</h3>
                     <p className="text-sm text-slate-500 mb-4">Mocking secure payment processing...</p>
                  </>
               ) : (
                  <>
                     <Truck size={48} className="mx-auto text-primary-500 mb-4" />
                     <h3 className="font-bold text-lg">Schedule Pickup</h3>
                     <Input type="date" label="Pickup Date" />
                     <Input type="time" label="Pickup Time" />
                     <Input label="Pickup Address" placeholder="Your address" />
                  </>
               )}
               <Button className="w-full" onClick={() => setDonationStep(3)}>
                  {showDonateModal?.type === 'MONETARY' ? 'Process Payment' : 'Confirm Pickup'}
               </Button>
            </div>
         )}

         {donationStep === 3 && (
            <div className="text-center py-6">
               <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
               </div>
               <h3 className="font-bold text-xl text-slate-800 dark:text-white">Thank You!</h3>
               <p className="text-slate-500 mt-2 mb-6">Your contribution has been recorded.</p>
               <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => alert('Downloading Receipt...')}>Download Receipt</Button>
                  <Button className="flex-1" onClick={() => setShowDonateModal(null)}>Close</Button>
               </div>
            </div>
         )}
      </Modal>
    </div>
  );
};
