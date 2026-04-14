import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, Ticket, QrCode, CreditCard, Users, Settings, Bell, TrendingUp, TrendingDown, Maximize } from 'lucide-react';
import { revenueData, ticketTierData } from '../data/mockData';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [checkInMode, setCheckInMode] = useState(false);
  const [kpiData, setKpiData] = useState(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => setKpiData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 flex max-w-[1400px] mx-auto px-6 gap-8">
      {/* Sidebar Nav */}
      <aside className="w-64 shrink-0 hidden lg:block sticky top-32 self-start">
        <nav className="space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <SidebarItem icon={Ticket} label="Events & Tickets" active={activeTab === 'Events & Tickets'} onClick={() => setActiveTab('Events & Tickets')} />
          <SidebarItem icon={CreditCard} label="Revenue & Payouts" active={activeTab === 'Revenue & Payouts'} onClick={() => setActiveTab('Revenue & Payouts')} />
          <SidebarItem icon={Users} label="Attendees" active={activeTab === 'Attendees'} onClick={() => setActiveTab('Attendees')} />
          <SidebarItem icon={QrCode} label="Check-in Mode" badge="New" onClick={() => setCheckInMode(true)} />
          <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">Dashboard</h1>
            <p className="text-textSecondary">Welcome back. Here's what's happening with your events.</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accentViolet"></span>
          </button>
        </div>

        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {kpiData && kpiData.revenue !== undefined ? (
                <>
                  <KPICard title="Total Revenue" value={`$${kpiData.revenue.toLocaleString()}`} change={kpiData.revenueChange} />
                  <KPICard title="Tickets Sold" value={kpiData.ticketsSold.toLocaleString()} change={kpiData.ticketsChange} />
                  <KPICard title="Check-ins Today" value={kpiData.checkIns.toLocaleString()} change={kpiData.checkInsChange} />
                  <KPICard title="Conversion Rate" value={`${kpiData.conversionRate}%`} change={kpiData.conversionChange} />
                </>
              ) : (
                <div className="col-span-1 md:col-span-2 xl:col-span-4 flex justify-center py-6">
                  <div className="w-8 h-8 border-2 border-white/10 border-t-accentCyan rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-card border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-heading font-bold text-lg">Revenue Overview</h3>
                  <select className="bg-background border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8a2be2" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8a2be2" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#a0a0ab" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#a0a0ab" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#0d0d12', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#8a2be2" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card border border-white/10 rounded-2xl p-6 flex flex-col">
                <h3 className="font-heading font-bold text-lg mb-6">Sales by Tier</h3>
                <div className="flex-1 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={ticketTierData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {ticketTierData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#8a2be2', '#00ffff', '#ffd700'][index % 3]} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ backgroundColor: '#0d0d12', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {ticketTierData.map((tier, i) => (
                    <div key={tier.name} className="flex items-center gap-2 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ['#8a2be2', '#00ffff', '#ffd700'][i % 3] }} />
                      <span className="text-textSecondary">{tier.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h3 className="font-heading font-bold text-lg">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-textSecondary uppercase bg-white/5">
                    <tr>
                      <th className="px-6 py-4 font-medium">Order ID</th>
                      <th className="px-6 py-4 font-medium">Customer</th>
                      <th className="px-6 py-4 font-medium">Event</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { id: '#ORD-7821', name: 'Alex Johnson', event: 'Neon Nights Festival', amount: 300, status: 'Confirmed' },
                      { id: '#ORD-7820', name: 'Samantha Lee', event: 'Future Tech Summit', amount: 899, status: 'Confirmed' },
                      { id: '#ORD-7819', name: 'Michael Chen', event: 'Neon Nights Festival', amount: 150, status: 'Pending' },
                      { id: '#ORD-7818', name: 'Sarah Davis', event: 'Midnight Jazz Cruise', amount: 160, status: 'Confirmed' },
                      { id: '#ORD-7817', name: 'James Wilson', event: 'Extreme Bouldering Comp', amount: 90, status: 'Refunded' },
                    ].map((order, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-mono text-textSecondary">{order.id}</td>
                        <td className="px-6 py-4 font-medium text-white">{order.name}</td>
                        <td className="px-6 py-4 text-textSecondary">{order.event}</td>
                        <td className="px-6 py-4 font-medium text-white">${order.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                            order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                            'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Events & Tickets' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[50vh]">
            <Ticket size={48} className="text-accentCyan mb-4 opacity-50" />
            <h3 className="text-2xl font-heading font-bold text-white mb-2">Events & Tickets Management</h3>
            <p className="text-textSecondary max-w-md mx-auto mb-8">Create new events, manage ticket inventory, setup promo codes, and process refunds all from this unified dashboard.</p>
            <button className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Create New Event
            </button>
          </motion.div>
        )}

        {activeTab === 'Revenue & Payouts' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[50vh]">
            <CreditCard size={48} className="text-accentViolet mb-4 opacity-50" />
            <h3 className="text-2xl font-heading font-bold text-white mb-2">Revenue & Payout Center</h3>
            <p className="text-textSecondary max-w-md mx-auto">Track your gross volume, manage your connected Stripe account, generate tax documents, and setup automated daily payouts.</p>
          </motion.div>
        )}

        {activeTab === 'Attendees' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[50vh]">
            <Users size={48} className="text-accentCyan mb-4 opacity-50" />
            <h3 className="text-2xl font-heading font-bold text-white mb-2">Guest List CRM</h3>
            <p className="text-textSecondary max-w-md mx-auto mt-2">Export attendee CSVs, send global announcements to ticketholders, block abusive buyers, and manage seating charts natively.</p>
          </motion.div>
        )}

        {activeTab === 'Settings' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[50vh]">
            <Settings size={48} className="text-accentViolet mb-4 opacity-50" />
            <h3 className="text-2xl font-heading font-bold text-white mb-2">Platform Preferences</h3>
            <p className="text-textSecondary max-w-md mx-auto mt-2">Configure webhooks, customize your organizer profile branding, invite team members, and manage billing methods.</p>
          </motion.div>
        )}
      </div>

      {/* QR Check-in Mock Modal */}
      <AnimatePresence>
        {checkInMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            <button 
              onClick={() => setCheckInMode(false)}
              className="absolute top-8 right-8 px-4 py-2 bg-white/10 rounded-full text-white font-medium hover:bg-white/20 transition-colors"
            >
              Exit Scanner
            </button>
            
            <div className="w-full max-w-md bg-black rounded-3xl overflow-hidden border border-white/20 relative shadow-[0_0_50px_rgba(138,43,226,0.3)]">
              {/* Fake camera feed */}
              <div className="aspect-[3/4] bg-[url('https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=1506&auto=format&fit=crop')] bg-cover bg-center opacity-60">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="w-full rounded-3xl border-[3px] border-accentCyan/70 aspect-square relative box-border">
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 w-full h-1 bg-accentCyan shadow-[0_0_15px_rgba(0,255,255,1)]"
                    />
                    {/* Scanner corners */}
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-accentCyan" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-accentCyan" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-accentCyan" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-accentCyan" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center bg-surface absolute bottom-0 w-full border-t border-white/10">
                <Maximize size={24} className="mx-auto mb-2 text-textSecondary" />
                <h3 className="font-bold text-white mb-1">Align QR Code</h3>
                <p className="text-sm text-textSecondary">Scanning attendee ticket...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, badge, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-accentViolet/20 text-white font-medium border border-accentViolet/30' 
          : 'text-textSecondary hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={active ? 'text-accentViolet' : ''} />
        <span>{label}</span>
      </div>
      {badge && (
        <span className="px-2 py-0.5 rounded-full bg-accentCyan/20 text-accentCyan text-[10px] font-bold uppercase tracking-wider">{badge}</span>
      )}
    </button>
  );
}

function KPICard({ title, value, change }) {
  const isPositive = change > 0;
  return (
    <div className="glass-card border border-white/10 rounded-2xl p-6">
      <h4 className="text-sm text-textSecondary font-medium mb-4">{title}</h4>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-heading font-bold text-white">{value}</span>
        <div className={`flex items-center gap-1 text-xs font-bold rounded-full px-2 py-1 ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(change)}%
        </div>
      </div>
    </div>
  );
}
