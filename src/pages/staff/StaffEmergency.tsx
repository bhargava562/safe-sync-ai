import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Siren, CheckCircle2, Loader2 } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";

const StaffEmergency = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [zoneCleared, setZoneCleared] = useState(false);
  const [evacProgress, setEvacProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTimer((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setEvacProgress((p) => Math.min(p + Math.random() * 5, 85));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) => `+${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const staff = [
    { name: "Priya S.", role: "Floor 4 Warden", status: "RESPONDING", color: "text-safesync-green" },
    { name: "Raj K.", role: "Security", status: "EN ROUTE", color: "text-safesync-amber" },
    { name: "Manager", role: "Operations", status: "CONFIRMED", color: "text-safesync-blue" },
    { name: "ERSS", role: "Emergency Services", status: "DISPATCHED", color: "text-safesync-red" },
  ];

  const initials = (name: string) => name.split(" ").map(n => n[0]).join("");

  return (
    <MobileFrame dark className="!bg-[#1C0000]">
      <div className="relative flex flex-col h-full">
        {/* Red vignette */}
        <div className="absolute inset-0 pointer-events-none animate-pulse-emergency"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(220,38,38,0.3) 100%)" }} />

        {/* Top Status */}
        <div className="relative z-10 flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-safesync-red animate-pulse" />
            <span className="text-[13px] font-bold text-red-300">FULL EMERGENCY</span>
            <span className="text-[13px] font-mono text-red-300">{formatTime(timer)}</span>
          </div>
          <span className="px-2 py-0.5 rounded-pill bg-safesync-green/20 text-safesync-green text-[11px] font-medium">ERSS-112 NOTIFIED</span>
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-4">
          {/* Incident Command Card */}
          <div className="bg-[#2D0000] rounded-card p-4 border border-red-900/30 mt-2">
            <h3 className="text-[17px] font-bold text-white mb-1">Incident Command</h3>
            <p className="text-[18px] text-red-300 font-medium">Kitchen Fire — Suspected</p>
            <p className="text-[13px] text-white/40 mt-1">Originating: Floor 4 West Wing → spreading indicators</p>
            
            {/* Floor indicators */}
            <div className="flex gap-1 mt-3">
              {["B1", "G", "1", "2", "3", "4", "5", "6"].map((f) => (
                <span
                  key={f}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    f === "4" ? "bg-safesync-red text-white font-bold" : "bg-white/10 text-white/40"
                  }`}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Team Status */}
          <h3 className="text-[14px] font-medium text-red-300 mt-4 mb-2">Team Status</h3>
          <div className="grid grid-cols-2 gap-2">
            {staff.map((s) => (
              <div key={s.name} className="bg-white/5 rounded-card p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white ${
                    s.status === "DISPATCHED" ? "bg-safesync-red" :
                    s.status === "RESPONDING" ? "bg-safesync-green" :
                    s.status === "EN ROUTE" ? "bg-safesync-amber" : "bg-safesync-blue"
                  }`}>
                    {s.status === "DISPATCHED" ? (
                      <Siren className="w-4 h-4" />
                    ) : initials(s.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] text-white font-medium truncate">{s.name}</p>
                    <p className="text-[10px] text-white/40 truncate">{s.role}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold ${s.color}`}>{s.status}</span>
              </div>
            ))}
          </div>

          {/* Evacuation Progress */}
          <div className="mt-4 bg-[#2D0000] rounded-card p-4 border border-red-900/30">
            <h3 className="text-[14px] font-medium text-white mb-2">Floor 4 Evacuation</h3>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-safesync-green rounded-full"
                animate={{ width: `${evacProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-[13px] text-white/60">
              {Math.round(evacProgress / 100 * 23)} / 23 guests confirmed safe
            </p>
          </div>

          {/* My Action */}
          <button
            onClick={() => setZoneCleared(true)}
            className={`mt-4 w-full h-[56px] rounded-button font-medium text-[15px] transition-colors ${
              zoneCleared
                ? "bg-safesync-green text-white"
                : "bg-white text-[#1C0000]"
            }`}
          >
            {zoneCleared ? "ZONE CLEAR ✓" : "CONFIRM MY ZONE CLEAR"}
          </button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default StaffEmergency;
