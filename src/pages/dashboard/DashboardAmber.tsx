import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Bell, Activity, Siren } from "lucide-react";

const DashboardAmber = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(64);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 0) { navigate("/dashboard/emergency"); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [navigate]);

  const formatCountdown = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex h-screen bg-safesync-dark text-white overflow-hidden">
      {/* Collapsed sidebar */}
      <div className="w-[240px] bg-safesync-dark flex flex-col border-r border-safesync-dark-border shrink-0">
        <div className="p-5 flex items-center gap-2">
          <Shield className="w-6 h-6 text-safesync-blue" />
          <span className="text-[14px] font-bold">SafeSync</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar - Amber */}
        <div className="h-[60px] border-b border-safesync-amber/30 flex items-center justify-between px-6 shrink-0" style={{ background: "#1C1200" }}>
          <span className="text-[16px] text-safesync-slate">The Grand Horizon Hotel</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-safesync-amber animate-pulse" />
            <span className="text-[14px] font-bold text-safesync-amber">STAFF ALERT — Zone 4W</span>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-safesync-slate" />
            <div className="w-8 h-8 rounded-full bg-safesync-blue flex items-center justify-center text-[12px] font-bold">MG</div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main area */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: "Guests In Building", value: "284", trend: "+12 since 2PM", color: "text-safesync-green" },
                { label: "Active Sensors", value: "47 / 48", trend: "1 offline", color: "text-safesync-amber" },
                { label: "Open Incidents", value: "1", trend: "Active alert", color: "text-safesync-amber", highlight: true },
                { label: "Response Readiness", value: "98%", trend: "Staff on duty: 12", color: "text-white/40" },
              ].map((m) => (
                <div key={m.label} className={`rounded-card p-5 border ${
                  m.highlight ? "bg-safesync-amber/10 border-safesync-amber/30" : "bg-safesync-dark-card border-safesync-dark-border"
                }`}>
                  <p className="text-[13px] text-safesync-muted-text mb-2">{m.label}</p>
                  <p className={`text-[36px] font-bold leading-tight ${m.highlight ? "text-safesync-amber" : "text-white"}`}>{m.value}</p>
                  <p className={`text-[12px] mt-1 ${m.color}`}>{m.trend}</p>
                </div>
              ))}
            </div>

            {/* Building Heatmap with amber highlight */}
            <div className="bg-safesync-dark-card rounded-card p-5 border border-safesync-dark-border">
              <h3 className="text-[15px] font-medium text-white mb-4">Building Overview</h3>
              <div className="flex flex-col gap-1.5">
                {[
                  { floor: "6", pct: 15 },
                  { floor: "5", pct: 25 },
                  { floor: "4", pct: 50, alert: true },
                  { floor: "3", pct: 35 },
                  { floor: "2", pct: 40 },
                  { floor: "1", pct: 30 },
                  { floor: "G", pct: 25 },
                ].map((f) => (
                  <div key={f.floor} className="flex items-center gap-3">
                    <span className={`text-[12px] font-mono w-6 ${f.alert ? "text-safesync-amber font-bold" : "text-safesync-slate"}`}>F{f.floor}</span>
                    <div className={`flex-1 h-10 rounded relative overflow-hidden ${f.alert ? "bg-safesync-amber/10 animate-pulse-emergency" : "bg-safesync-blue/5"}`}>
                      <div className={`absolute inset-y-0 left-0 rounded ${f.alert ? "bg-safesync-amber/30" : "bg-safesync-blue/20"}`} style={{ width: `${f.pct}%` }} />
                      <div className="absolute inset-0 flex items-center gap-8 px-4">
                        {[0, 1, 2].map((j) => (
                          <div key={j} className={`w-2 h-2 rounded-full ${f.alert && j === 1 ? "bg-safesync-amber animate-pulse" : "bg-safesync-green"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alert Panel */}
          <div className="w-[400px] border-l border-safesync-amber/30 p-5 overflow-y-auto shrink-0" style={{ background: "#1C1200" }}>
            <p className="text-[13px] font-bold text-safesync-amber mb-4">ACTIVE ALERT</p>

            <div className="bg-white/5 rounded-card p-4 border-l-4 border-safesync-amber mb-5">
              <h3 className="text-[16px] font-bold text-yellow-300 mb-1">Multi-Signal Trigger — Zone 4W</h3>
              <p className="text-[13px] text-safesync-amber/70 mb-3">2 signals detected in 18 seconds:</p>
              <div className="flex flex-col gap-2 text-[13px]">
                <div className="flex justify-between text-white/70">
                  <span>Smoke Sensor 4W-C</span>
                  <span className="font-mono">847 ppm at 3:44:02</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Sound Anomaly 4W-D</span>
                  <span className="font-mono">91% at 3:44:20</span>
                </div>
              </div>
              <p className="text-[12px] text-safesync-amber/50 mt-3">2 of 3 required signals. 1 more will trigger Full Emergency.</p>
            </div>

            {/* Countdown */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-[80px] h-[80px]">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#292200" strokeWidth="5" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#D97706" strokeWidth="5"
                    strokeDasharray={`${(countdown / 90) * 213.6} 213.6`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[24px] font-bold text-yellow-300 font-mono">{formatCountdown(countdown)}</span>
                </div>
              </div>
              <p className="text-[11px] text-safesync-amber/50 mt-2">Auto-escalates if not reviewed</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/dashboard/emergency")}
                className="w-full h-[48px] bg-safesync-red rounded-button flex items-center justify-center gap-2"
              >
                <Siren className="w-5 h-5 text-white" />
                <span className="text-white font-medium">ESCALATE</span>
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full h-[40px] border border-safesync-red/50 rounded-button text-safesync-red text-[14px]"
              >
                DISMISS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAmber;
