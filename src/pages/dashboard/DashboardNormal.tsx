import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield, Bell, Clock, Users, Activity, Zap, Settings, Map,
  LayoutDashboard, Radio, AlertTriangle, ChevronRight, TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";

const DashboardNormal = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: Map, label: "Live Map" },
    { icon: Activity, label: "Sensors" },
    { icon: AlertTriangle, label: "Incidents" },
    { icon: Users, label: "Staff" },
    { icon: Settings, label: "Settings" },
  ];

  const metrics = [
    { label: "Guests In Building", value: "284", trend: "+12 since 2PM", trendColor: "text-safesync-green" },
    { label: "Active Sensors", value: "47 / 48", trend: "1 offline", trendColor: "text-safesync-amber" },
    { label: "Open Incidents", value: "0", trend: "All clear", trendColor: "text-safesync-green" },
    { label: "Response Readiness", value: "98%", trend: "Staff on duty: 12", trendColor: "text-white/40" },
  ];

  const sensorFeed = [
    { name: "Sound Sensor 4B", value: "22 dB", time: "3:47:18 PM", color: "bg-safesync-green" },
    { name: "Smoke Sensor 4W", value: "42 ppm", time: "3:47:15 PM", color: "bg-safesync-green" },
    { name: "Occupancy Zone 4E", value: "23 ppl", time: "3:47:12 PM", color: "bg-safesync-green" },
    { name: "Temperature 4W", value: "23°C", time: "3:47:08 PM", color: "bg-safesync-green" },
    { name: "Motion Corridor 4E", value: "Active", time: "3:46:55 PM", color: "bg-safesync-green" },
  ];

  const staffOnDuty = [
    { name: "Priya S.", zone: "Floor 4", role: "Warden", color: "bg-safesync-green" },
    { name: "Raj K.", zone: "Lobby", role: "Security", color: "bg-safesync-blue" },
    { name: "Amit T.", zone: "Floor 2", role: "Warden", color: "bg-safesync-green" },
    { name: "Sarah M.", zone: "Floor 6", role: "Warden", color: "bg-safesync-green" },
  ];

  return (
    <div className="flex h-screen bg-safesync-dark text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-[240px] bg-safesync-dark flex flex-col border-r border-safesync-dark-border shrink-0">
        <div className="p-5 flex items-center gap-2">
          <Shield className="w-6 h-6 text-safesync-blue" />
          <span className="text-[14px] font-bold">SafeSync</span>
        </div>
        <nav className="flex-1 px-3">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] mb-0.5 transition-colors ${
                item.active ? "bg-safesync-blue/20 text-safesync-blue" : "text-safesync-slate hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mesh indicator */}
        <div className="p-5 border-t border-safesync-dark-border">
          <div className="flex items-center justify-center gap-2">
            <div className="relative w-16 h-12">
              {[[8, 6], [28, 28], [48, 6], [38, 24]].map(([x, y], i) => (
                <div key={i}>
                  <div className="absolute w-2 h-2 rounded-full bg-safesync-purple/60" style={{ left: x, top: y }} />
                </div>
              ))}
              <svg className="absolute inset-0 w-16 h-12">
                <line x1="12" y1="10" x2="32" y2="32" stroke="#7C3AED" strokeWidth="1" opacity="0.3" />
                <line x1="32" y1="32" x2="52" y2="10" stroke="#7C3AED" strokeWidth="1" opacity="0.3" />
                <line x1="12" y1="10" x2="42" y2="28" stroke="#7C3AED" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>
          </div>
          <p className="text-[12px] text-safesync-purple text-center mt-1">Mesh Ready</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-[60px] bg-safesync-dark-card border-b border-safesync-dark-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[16px] text-safesync-slate">The Grand Horizon Hotel</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-safesync-green" />
            <span className="text-[14px] font-bold text-safesync-green">ALL SYSTEMS NORMAL</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-mono text-white">
              {time.toLocaleTimeString()}
            </span>
            <Bell className="w-5 h-5 text-safesync-slate" />
            <div className="w-8 h-8 rounded-full bg-safesync-blue flex items-center justify-center text-[12px] font-bold">
              MG
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main area */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {metrics.map((m) => (
                <div key={m.label} className="bg-safesync-dark-card rounded-card p-5 border border-safesync-dark-border">
                  <p className="text-[13px] text-safesync-muted-text mb-2">{m.label}</p>
                  <p className="text-[36px] font-bold text-white leading-tight">{m.value}</p>
                  <p className={`text-[12px] mt-1 ${m.trendColor}`}>{m.trend}</p>
                </div>
              ))}
            </div>

            {/* Building Heatmap */}
            <div className="bg-safesync-dark-card rounded-card p-5 border border-safesync-dark-border mb-6">
              <h3 className="text-[15px] font-medium text-white mb-4">Building Overview</h3>
              <div className="flex flex-col gap-1.5">
                {[
                  { floor: "6", count: 18, pct: 15 },
                  { floor: "5", count: 32, pct: 25 },
                  { floor: "4", count: 67, pct: 50 },
                  { floor: "3", count: 45, pct: 35 },
                  { floor: "2", count: 52, pct: 40 },
                  { floor: "1", count: 38, pct: 30 },
                  { floor: "G", count: 32, pct: 25 },
                ].map((f) => (
                  <div key={f.floor} className="flex items-center gap-3">
                    <span className="text-[12px] font-mono text-safesync-slate w-6">F{f.floor}</span>
                    <div className="flex-1 h-10 rounded bg-safesync-blue/5 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-safesync-blue/20 rounded"
                        style={{ width: `${f.pct}%` }}
                      />
                      {/* Sensor dots */}
                      <div className="absolute inset-0 flex items-center gap-8 px-4">
                        {[0, 1, 2].map((j) => (
                          <div key={j} className="w-2 h-2 rounded-full bg-safesync-green" />
                        ))}
                      </div>
                      {/* Count */}
                      <div className="absolute right-3 inset-y-0 flex items-center">
                        <span className="text-[11px] font-mono text-white/40">{f.count}</span>
                      </div>
                    </div>
                    {/* Exit markers */}
                    <div className="text-safesync-green text-[10px]">→</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Staff */}
              <div className="bg-safesync-dark-card rounded-card p-5 border border-safesync-dark-border">
                <h3 className="text-[14px] font-medium text-white mb-3">Staff On Duty</h3>
                {staffOnDuty.map((s) => (
                  <div key={s.name} className="flex items-center gap-3 py-2 border-t border-safesync-dark-border first:border-0">
                    <div className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center text-[11px] font-bold text-white`}>
                      {s.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-white">{s.name}</p>
                      <p className="text-[11px] text-safesync-muted-text">{s.role} · {s.zone}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-safesync-green" />
                  </div>
                ))}
              </div>

              {/* Recent Incidents */}
              <div className="bg-safesync-dark-card rounded-card p-5 border border-safesync-dark-border">
                <h3 className="text-[14px] font-medium text-white mb-3">Recent Incidents</h3>
                <div className="flex flex-col items-center justify-center h-[120px] text-safesync-muted-text">
                  <AlertTriangle className="w-8 h-8 mb-2 opacity-30" />
                  <p className="text-[14px]">No incidents in the past 30 days</p>
                </div>
              </div>
            </div>

            {/* Navigation to other dashboard states */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate("/dashboard/amber")}
                className="px-4 py-2 bg-safesync-amber/20 border border-safesync-amber/30 rounded-button text-safesync-amber text-[13px] font-medium"
              >
                Demo: Trigger Amber Alert →
              </button>
              <button
                onClick={() => navigate("/dashboard/simulator")}
                className="px-4 py-2 bg-safesync-purple/20 border border-safesync-purple/30 rounded-button text-safesync-purple text-[13px] font-medium"
              >
                Open Sensor Simulator →
              </button>
            </div>
          </div>

          {/* Right Panel - Sensor Feed */}
          <div className="w-[280px] bg-safesync-dark border-l border-safesync-dark-border p-4 overflow-y-auto shrink-0">
            <h3 className="text-[14px] font-medium text-safesync-slate mb-3">Live Sensor Feed</h3>
            <div className="flex flex-col gap-1">
              {sensorFeed.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-white/5 border-l-4 border-safesync-green/50"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${s.color} mt-1.5 shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-white truncate">{s.name}</p>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[11px] font-mono text-safesync-slate">{s.value}</span>
                      <span className="text-[10px] font-mono text-safesync-muted-text">{s.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNormal;
