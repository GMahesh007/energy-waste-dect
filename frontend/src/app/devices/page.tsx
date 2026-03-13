"use client";

import { Activity, Power, Settings2, Zap, ZapOff } from "lucide-react";

const devices = [
  { id: 1, name: "Air Conditioner", type: "Cooling", power: 1200, status: "active", health: "Warning" },
  { id: 2, name: "Refrigerator", type: "Appliance", power: 150, status: "active", health: "Good" },
  { id: 3, name: "Water Heater", type: "Heating", power: 4500, status: "inactive", health: "Good" },
  { id: 4, name: "Living Room Lights", type: "Lighting", power: 45, status: "active", health: "Good" },
  { id: 5, name: "Washing Machine", type: "Appliance", power: 500, status: "inactive", health: "Good" },
];

export default function DevicesPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Device Management</h1>
        <p className="text-foreground/60 mt-2">Monitor all connected devices and their real-time power draw</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {devices.map(device => (
          <div key={device.id} className="glass rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl ${device.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-secondary text-foreground/50'}`}>
                {device.status === 'active' ? <Zap className="w-6 h-6" /> : <ZapOff className="w-6 h-6" />}
              </div>
              <button className="text-foreground/40 hover:text-foreground transition-colors">
                <Settings2 className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-lg font-semibold mb-1 truncate">{device.name}</h3>
            <p className="text-xs text-foreground/50 mb-6">{device.type}</p>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-foreground/50 mb-1">Current Draw</p>
                <p className={`text-2xl font-bold ${device.status === 'active' ? 'text-foreground' : 'text-foreground/30'}`}>
                  {device.status === 'active' ? `${device.power} W` : '0 W'}
                </p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  device.health === 'Warning' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                }`}>
                  {device.health}
                </span>
              </div>
            </div>
            
            {device.status === 'active' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[rgba(255,255,255,0.05)]">
                <div 
                  className={`h-full ${device.health === 'Warning' ? 'bg-red-500' : 'bg-primary'}`} 
                  style={{ width: `${Math.min((device.power / 2000) * 100, 100)}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
