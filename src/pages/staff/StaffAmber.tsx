import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Siren, ChevronDown, ChevronUp } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";

const StaffAmber = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(74);
  const [timer, setTimer] = useState(23);
  const [checklist, setChecklist] = useState([false, false, false, false]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 0) {
          clearInterval(t);
          navigate("/staff/emergency");
          return 0;
        }
        return c - 1;
      });
      setTimer((s) => s + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [navigate]);

  const formatCountdown = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const toggleCheck = (i: number) => {
    const next = [...checklist];
    next[i] = !next[i];
    setChecklist(next);
  };

  return (
    <MobileFrame dark className="!bg-[#1C1200]">
      <div className="flex flex-col h-full">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3" style={{ background: "#1C1200" }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-safesync-amber animate-pulse" />
            <span className="text-[13px] font-bold text-yellow-300">STAFF ALERT</span>
          </div>
          <span className="text-[13px] font-mono text-yellow-300">+0:{timer.toString().padStart(2, "0")}</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {/* Alert Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#292200] rounded-card p-5 border-l-4 border-safesync-amber mt-4"
          >
            <h2 className="text-[18px] font-bold text-yellow-300 mb-1">Smoke + Sound Detected</h2>
            <p className="text-[15px] text-safesync-amber mb-4">Zone B · Corridor 4W · 2 signals in 18 seconds</p>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between bg-white/5 rounded-button px-3 py-2">
                <span className="text-[13px] text-white/70">MQ2 Smoke — Zone B</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-white font-mono">847 ppm</span>
                  <span className="px-2 py-0.5 rounded-pill bg-safesync-amber/20 text-safesync-amber text-[11px] font-medium">TRIGGERED</span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white/5 rounded-button px-3 py-2">
                <span className="text-[13px] text-white/70">Sound Anomaly — 4W</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-white font-mono">91%</span>
                  <span className="px-2 py-0.5 rounded-pill bg-safesync-amber/20 text-safesync-amber text-[11px] font-medium">TRIGGERED</span>
                </div>
              </div>
            </div>

            {/* Audio waveform placeholder */}
            <div className="mt-3 flex items-center gap-2 bg-white/5 rounded-button px-3 py-2">
              <div className="w-6 h-6 rounded-full bg-safesync-amber/30 flex items-center justify-center">
                <span className="text-safesync-amber text-[10px]">▶</span>
              </div>
              <div className="flex-1 flex items-center gap-0.5 h-5">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-safesync-amber/40 rounded-full"
                    style={{ height: `${20 + Math.sin(i * 0.5) * 60 + Math.random() * 20}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Countdown */}
          <div className="mt-6 flex flex-col items-center">
            <div className="relative w-[100px] h-[100px]">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#292200" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="44"
                  fill="none" stroke="#D97706" strokeWidth="6"
                  strokeDasharray={`${(countdown / 90) * 276.5} 276.5`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[32px] font-bold text-yellow-300 font-mono">{formatCountdown(countdown)}</span>
              </div>
            </div>
            <p className="text-[13px] text-safesync-amber/70 mt-2 text-center">Auto-escalates to Full Emergency if not reviewed</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => navigate("/staff/emergency")}
              className="w-full h-[52px] bg-safesync-red rounded-button flex items-center justify-center gap-2 shadow-elevated"
            >
              <Siren className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-[15px]">ESCALATE — Trigger Full Emergency</span>
            </button>
            <button
              onClick={() => navigate("/staff/home")}
              className="w-full h-[44px] border border-safesync-red/50 rounded-button text-safesync-red text-[14px] font-medium"
            >
              Dismiss — False Alarm
            </button>
          </div>

          {/* Investigation Checklist */}
          <div className="mt-5 bg-white/5 rounded-card border border-white/10 overflow-hidden">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between px-4 py-3"
            >
              <span className="text-[14px] font-medium text-white">Investigation steps</span>
              {expanded ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
            </button>
            {expanded && (
              <div className="px-4 pb-4 flex flex-col gap-3">
                {[
                  "Visually confirmed smoke or fire",
                  "Checked corridor 4W",
                  "Contacted Floor Manager",
                  "Verified sensor calibration",
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => toggleCheck(i)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                        checklist[i] ? "bg-safesync-green border-safesync-green" : "border-white/30"
                      }`}
                    >
                      {checklist[i] && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <span className="text-[13px] text-white/70">{item}</span>
                  </label>
                ))}
                {checklist.every(Boolean) && (
                  <button
                    onClick={() => navigate("/staff/home")}
                    className="mt-2 h-10 bg-safesync-green/20 border border-safesync-green/50 rounded-button text-safesync-green text-[13px] font-medium"
                  >
                    Mark as Investigated — No Emergency
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default StaffAmber;
