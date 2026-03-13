"use client";

import { Activity, AlertTriangle, Zap, ArrowDown, ArrowUp, ZapOff } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockEnergyData = [
  { time: '00:00', kwh: 1.2 },
  { time: '04:00', kwh: 0.8 },
  { time: '08:00', kwh: 2.5 },
  { time: '12:00', kwh: 3.4 },
  { time: '16:00', kwh: 4.8 },
  { time: '20:00', kwh: 5.2 },
  { time: '23:59', kwh: 2.1 },
];

const mockDeviceData = [
  { name: 'Air Conditioner', usage: 45 },
  { name: 'Refrigerator', usage: 25 },
  { name: 'Water Heater', usage: 15 },
  { name: 'Lighting', usage: 10 },
  { name: 'Other', usage: 5 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header className="mb-8 pl-10 md:pl-0">
        <h1 className="text-3xl font-bold tracking-tight text-foreground shadow-sm">Energy Overview</h1>
        <p className="text-foreground/60 mt-2">Real-time tracking and AI-powered anomaly detection</p>
      </header>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Usage (Today)" 
          value="24.8 kWh" 
          trend="+5.2%" 
          trendUp={true} 
          icon={<Zap className="w-5 h-5 text-yellow-400" />} 
        />
        <MetricCard 
          title="Current Draw" 
          value="1.2 kW" 
          trend="-2.1%" 
          trendUp={false} 
          icon={<Activity className="w-5 h-5 text-blue-400" />} 
        />
        <MetricCard 
          title="Active Devices" 
          value="8" 
          trend="0" 
          trendUp={null} 
          icon={<ZapOff className="w-5 h-5 text-purple-400" />} 
        />
        <div className="glass rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-sm font-medium text-foreground/70">AI Alerts</h3>
            <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-2xl font-semibold mb-1 text-red-400">1 Anomaly</p>
            <p className="text-xs text-foreground/60">Air Conditioner spike detected</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">Real-Time Consumption (24h)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockEnergyData}>
                <defs>
                  <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="kwh" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorKwh)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">Device Usage</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockDeviceData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.6)" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="usage" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, trendUp, icon }: { title: string, value: string, trend: string, trendUp: boolean | null, icon: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-foreground/70">{title}</h3>
        <div className="p-2 bg-secondary rounded-lg border border-[rgba(255,255,255,0.05)]">
          {icon}
        </div>
      </div>
      <div className="flex items-end gap-3">
        <p className="text-3xl font-bold">{value}</p>
        {trendUp !== null && (
          <span className={`flex items-center text-xs font-medium mb-1 ${trendUp ? 'text-red-400' : 'text-green-400'}`}>
            {trendUp ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
