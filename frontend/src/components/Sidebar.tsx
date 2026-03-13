"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, UploadCloud, MonitorSmartphone, Settings, Zap } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/", icon: Activity },
    { name: "Upload Bill", path: "/upload", icon: UploadCloud },
    { name: "Devices", path: "/devices", icon: MonitorSmartphone },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-[rgba(255,255,255,0.05)] h-full flex flex-col z-20">
      <div className="p-6 flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)]">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Zap className="text-primary w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">EcoSense AI</h1>
          <p className="text-xs text-foreground/50">Energy Tracker</p>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-[rgba(255,255,255,0.05)]">
        <div className="glass rounded-xl p-4 text-sm text-center">
          <p className="text-foreground/80 mb-2 font-medium">System Status</p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-green-500 font-medium tracking-wide text-xs uppercase">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
