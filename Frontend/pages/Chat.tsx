import React, { useState } from 'react';
import { Card, Input } from '../components/UI';
import { MOCK_MESSAGES } from '../data';
import { Send, Search, MoreVertical } from 'lucide-react';

export const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('m1');
  const [message, setMessage] = useState('');

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
       {/* Sidebar List */}
       <Card className="w-full md:w-1/3 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700">
             <h2 className="font-bold text-lg mb-3">Messages</h2>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm outline-none" placeholder="Search conversations..." />
             </div>
          </div>
          <div className="flex-1 overflow-y-auto">
             {MOCK_MESSAGES.map((msg) => (
                <div 
                  key={msg.id} 
                  onClick={() => setSelectedChat(msg.id)}
                  className={`p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${selectedChat === msg.id ? 'bg-primary-50 dark:bg-slate-700 border-r-4 border-primary-500' : ''}`}
                >
                   <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      {msg.senderName[0]}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                         <span className="font-semibold text-slate-800 dark:text-white truncate">{msg.senderName}</span>
                         <span className="text-xs text-slate-400 whitespace-nowrap">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{msg.text}</p>
                   </div>
                </div>
             ))}
          </div>
       </Card>

       {/* Chat Window */}
       <Card className="hidden md:flex flex-1 flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div>
                   <h3 className="font-bold">Global Relief Foundation</h3>
                   <span className="text-xs text-green-500 flex items-center gap-1">● Online</span>
                </div>
             </div>
             <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={20}/></button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-900/50">
             <div className="flex justify-end">
                <div className="bg-primary-600 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-xs shadow-sm">
                   <p className="text-sm">Hi! I just made a donation to the Earthquake Relief fund.</p>
                </div>
             </div>
             <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-2 rounded-2xl rounded-tl-none max-w-xs shadow-sm">
                   <p className="text-sm text-slate-700 dark:text-slate-200">Thank you so much for your generosity! We will send you a receipt shortly.</p>
                </div>
             </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
             <div className="flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <button className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                   <Send size={18} />
                </button>
             </div>
          </div>
       </Card>
    </div>
  );
};