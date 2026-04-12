import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Siren, Send, CheckCircle2 } from "lucide-react";

const DashboardEmergency = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [evacProgress, setEvacProgress] = useState<number[]>([0, 0, 0, 0, 5, 0, 0]);
  const [allClear, setAllClear] = useState(false);
  const [broadcast, setBroadcast] = useState("");

  useEffect(() => {
    const t = setInterval(() => setTimer((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setEvacProgress((prev) => prev.map((p) => Math.min(p + Math.random() * 8, 100)));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const floors = ["B1", "G", "1", "2", "3", "4", "5"];
  const staff = [
    { name: "Priya S.", role: "Floor 4 Warden", status: "RESPONDING", color: "bg-safesync-green" },
    { name: "Raj K.", role: "Security", status: "EN ROUTE", color: "bg-safesync-amber" },
    { name: "Amit T.", role: "Floor 2 Warden", status: "EVACUATING", color: "bg-safesync-amber" },
    { name: "Manager", role: "Operations", status: "CONFIRMED", color: "bg-safesync-blue" },
    { name: "Sarah M.", role: "Floor 6 Warden", status: "CONFIRMED CLEAR", color: "bg-safesync-green" },
    { name: "ERSS", role: "Emergency", status: "DISPATCHED", color: "bg-safesync-red" },
  ];

  return (
    <div className="flex h-screen text-white overflow-hidden" style={{ background: "#0F0000" }}>
      {/* Collapsed sidebar */}
      <div className="w-[64px] bg-safesync-dark flex flex-col items-center border-r border-red-900/30 shrink-0 py-4">
        <Shield className="w-6 h-6 text-safesync-red mb-6" />
        {["📊", "🗺️", "📡", "⚠️", "👥", "⚙️"].map((icon, i) => (
          <div key={i} className="w-10 h-10 flex items-center justify-center text-[16px] rounded-lg hover:bg-white/5 mb-1 cursor-pointer">
            {icon}
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Emergency Header */}
        <div className="h-[80px] flex items-center justify-between px-6 shrink-0" style={{ background: "#7F1D1D" }}>
          <div className="flex items-center gap-3">
            <Siren className="w-6 h-6 text-white animate-siren" />
            <span className="text-[18px] font-bold text-white">FULL EMERGENCY — Kitchen Fire Detected</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-pill bg-safesync-green/20 text-safesync-green text-[12px] font-medium">
              ERSS-112 NOTIFIED ✓
            </span>
            <span className="text-[14px] font-mono text-white/80">{formatTime(timer)}</span>
          </div>
        </div>

        {/* 3 Column Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Column 1 - Building Map */}
          <div className="w-[400px] p-5 overflow-y-auto border-r border-red-900/20 shrink-0">
            <h3 className="text-[15px] font-medium text-white mb-4">Live Building Map</h3>
            <div className="flex flex-col gap-1.5">
              {floors.map((f, i) => (
                <div key={f} className="flex items-center gap-2">
                  <span className={`text-[11px] font-mono w-5 ${f === "4" ? "text-safesync-red font-bold" : "text-safesync-slate"}`}>{f}</span>
                  <div className={`flex-1 h-10 rounded relative overflow-hidden ${
                    f === "4" ? "bg-safesync-red/30" : "bg-safesync-amber/10"
                  }`}>
                    {/* Evacuation arrows */}
                    <div className="absolute inset-0 flex items-center justify-end px-3">
                      <span className="text-safesync-green text-[14px] animate-pulse">→ →</span>
                    </div>
                    {/* People count */}
                    <div className="absolute left-2 inset-y-0 flex items-center">
                      <span className="text-[10px] font-mono text-white/50">{Math.round(evacProgress[i] / 100 * 40)}</span>
                    </div>
                    {/* Elevator block */}
                    <div className="absolute left-1/2 inset-y-0 flex items-center">
                      <span className="text-safesync-red text-[8px]">✕ ELV</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Assembly points */}
            <div className="mt-4 flex gap-2">
              <div className="px-3 py-1.5 bg-safesync-green/20 rounded-pill text-safesync-green text-[11px] font-medium animate-pulse">
                🏁 Assembly Point A
              </div>
              <div className="px-3 py-1.5 bg-safesync-green/20 rounded-pill text-safesync-green text-[11px] font-medium animate-pulse">
                🏁 Assembly Point B
              </div>
            </div>
          </div>

          {/* Column 2 - Incident Command */}
          <div className="flex-1 p-5 overflow-y-auto border-r border-red-900/20">
            <h3 className="text-[15px] font-medium text-white mb-4">Incident Overview</h3>
            
            {/* Incident type */}
            <div className="bg-white/5 rounded-card p-4 border border-red-900/20 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[16px]">🔥</span>
                <span className="text-[16px] font-bold text-red-300">Kitchen Fire</span>
              </div>
              
              {/* Signal timeline */}
              <div className="flex flex-col gap-2 ml-2 border-l-2 border-red-900/30 pl-4">
                {[
                  { time: "3:44:02", event: "MQ2 Smoke spike — 847 ppm" },
                  { time: "3:44:20", event: "Sound anomaly — 91% confidence" },
                  { time: "3:44:38", event: "Temperature spike — Full Emergency" },
                ].map((e, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-safesync-red mt-1.5 shrink-0" />
                    <div>
                      <span className="text-[11px] font-mono text-safesync-slate">{e.time}</span>
                      <p className="text-[13px] text-white/70">{e.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ERSS dispatch */}
            <div className="bg-safesync-green/10 rounded-card p-4 border border-safesync-green/20 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-safesync-green" />
                <span className="text-[13px] font-medium text-safesync-green">Emergency services dispatched at 3:45:12 PM</span>
              </div>
              <p className="text-[11px] text-safesync-green/60 ml-6">Location + Incident type + Property details sent</p>
            </div>

            {/* Evacuation progress */}
            <h4 className="text-[13px] font-medium text-red-300 mb-2">Evacuation Progress</h4>
            <div className="flex flex-col gap-2">
              {floors.map((f, i) => (
                <div key={f} className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-safesync-slate w-5">{f}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-safesync-green rounded-full"
                      animate={{ width: `${evacProgress[i]}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-safesync-slate w-8">{Math.round(evacProgress[i])}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 - Staff Command */}
          <div className="w-[300px] p-5 overflow-y-auto shrink-0">
            <h3 className="text-[15px] font-medium text-white mb-3">Staff Command</h3>
            <div className="flex flex-col gap-2 mb-4">
              {staff.map((s) => (
                <div key={s.name} className="bg-white/5 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-7 h-7 rounded-full ${s.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                      {s.name === "ERSS" ? "🚨" : s.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] text-white truncate">{s.name}</p>
                      <p className="text-[10px] text-white/40">{s.role}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold ${
                    s.status === "RESPONDING" ? "text-safesync-green" :
                    s.status === "EN ROUTE" || s.status === "EVACUATING" ? "text-safesync-amber" :
                    s.status === "DISPATCHED" ? "text-safesync-red" : "text-safesync-blue"
                  }`}>{s.status}</span>
                </div>
              ))}
            </div>

            {/* Broadcast */}
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  value={broadcast}
                  onChange={(e) => setBroadcast(e.target.value)}
                  placeholder="Broadcast message..."
                  className="flex-1 h-9 px-3 bg-white/5 border border-white/10 rounded-button text-[13px] text-white placeholder:text-white/30 outline-none"
                />
                <button className="w-9 h-9 bg-safesync-blue rounded-button flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* All Clear */}
            <button
              onClick={() => {
                setAllClear(true);
                setTimeout(() => navigate("/dashboard/report"), 1000);
              }}
              disabled={evacProgress.some((p) => p < 80)}
              className={`w-full h-[48px] rounded-button font-medium text-[14px] transition-colors ${
                allClear
                  ? "bg-safesync-green text-white"
                  : evacProgress.every((p) => p >= 80)
                    ? "bg-safesync-green text-white cursor-pointer"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              {allClear ? "ALL CLEAR DECLARED ✓" : "DECLARE ALL CLEAR"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmergency;
