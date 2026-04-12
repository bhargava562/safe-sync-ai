import { useNavigate } from "react-router-dom";
import { CheckCircle2, Bell, AlertTriangle, MapPin, Users, ArrowRightLeft, Info } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";

const StaffHome = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame dark>
      <div className="flex flex-col h-full">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-safesync-dark">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-safesync-green" />
            <span className="text-[13px] font-bold text-safesync-green">ALL CLEAR</span>
          </div>
          <span className="text-[17px] font-bold text-white">Floor 4 — East Wing</span>
          <Bell className="w-5 h-5 text-white/60" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {/* Zone Status Card */}
          <div className="mt-4 bg-safesync-dark-card rounded-card p-5 border border-safesync-dark-border">
            <h3 className="text-[15px] font-medium text-safesync-slate mb-3">Zone Status</h3>
            <div className="flex flex-col items-center mb-4">
              <span className="text-[40px] font-bold text-white">23</span>
              <span className="text-[14px] text-safesync-muted-text">people in your zone</span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: "Sound", status: "Normal" },
                { label: "Smoke", status: "Normal" },
                { label: "Motion", status: "Normal" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-1.5 border-t border-safesync-dark-border">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-safesync-green" />
                    <span className="text-[14px] text-white">{s.label}</span>
                  </div>
                  <span className="text-[13px] text-safesync-green">{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Building Map */}
          <div className="mt-4 bg-safesync-dark-card rounded-card p-4 border border-safesync-dark-border">
            <div className="flex flex-col gap-1">
              {[6, 5, 4, 3, 2, 1, "G"].map((floor, i) => (
                <div
                  key={String(floor)}
                  className={`h-5 rounded-sm flex items-center px-2 text-[10px] font-mono ${
                    floor === 4 ? "bg-safesync-blue/30 text-safesync-blue border border-safesync-blue/50" : "bg-white/5 text-white/40"
                  }`}
                >
                  F{floor}
                  <div className="flex gap-1 ml-auto">
                    {[0, 1, 2].map((j) => (
                      <div key={j} className="w-1.5 h-1.5 rounded-full bg-safesync-green" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-safesync-muted-text mt-2 text-center">Tap to expand</p>
          </div>

          {/* Recent Activity */}
          <div className="mt-4 bg-safesync-dark-card rounded-card p-4 border border-safesync-dark-border">
            <h3 className="text-[15px] font-medium text-white mb-3">Recent Activity</h3>
            {[
              { time: "09:42", icon: CheckCircle2, text: "Smoke sensor #4F recalibrated", color: "text-safesync-green" },
              { time: "09:15", icon: Info, text: "Guest check-in: Room 403", color: "text-safesync-blue" },
              { time: "08:50", icon: CheckCircle2, text: "Morning sensor sweep complete", color: "text-safesync-green" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-t border-safesync-dark-border first:border-0">
                <span className="text-[12px] font-mono text-safesync-slate shrink-0 w-10">{item.time}</span>
                <item.icon className={`w-4 h-4 ${item.color} shrink-0 mt-0.5`} />
                <span className="text-[14px] text-white/80">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Quick Actions 2x2 */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/staff/amber")}
              className="h-[72px] bg-safesync-red/20 border border-safesync-red/30 rounded-card flex flex-col items-center justify-center gap-1"
            >
              <AlertTriangle className="w-5 h-5 text-safesync-red" />
              <span className="text-[12px] text-safesync-red font-medium">Raise Alert</span>
            </button>
            <button className="h-[72px] bg-safesync-amber/20 border border-safesync-amber/30 rounded-card flex flex-col items-center justify-center gap-1">
              <MapPin className="w-5 h-5 text-safesync-amber" />
              <span className="text-[12px] text-safesync-amber font-medium">Mark Exit Blocked</span>
            </button>
            <button className="h-[72px] bg-safesync-blue/20 border border-safesync-blue/30 rounded-card flex flex-col items-center justify-center gap-1">
              <Users className="w-5 h-5 text-safesync-blue" />
              <span className="text-[12px] text-safesync-blue font-medium">Guest Assist</span>
            </button>
            <button className="h-[72px] bg-white/5 border border-white/10 rounded-card flex flex-col items-center justify-center gap-1">
              <ArrowRightLeft className="w-5 h-5 text-safesync-slate" />
              <span className="text-[12px] text-safesync-slate font-medium">Handoff</span>
            </button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default StaffHome;
