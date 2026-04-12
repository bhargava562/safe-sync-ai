import { useNavigate } from "react-router-dom";
import { Shield, Map, Bell, Phone, Building2, CheckCircle2, Wifi, Home, AlertTriangle, Settings } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";
import PanicButton from "@/components/PanicButton";

const GuestHome = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-safesync-dark-border/20">
          <span className="text-[17px] font-bold text-safesync-dark">SafeSync</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-safesync-green" />
            <span className="text-[13px] text-safesync-green font-medium">Protected</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {/* Hotel Context Card */}
          <div className="mt-4 bg-white rounded-card shadow-card border border-[#E2E8F0] p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-safesync-blue/10 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-safesync-blue" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[16px] font-bold text-safesync-dark truncate">The Grand Horizon Hotel</p>
              <p className="text-[13px] text-safesync-muted-text">Room 407 · Floor 4 · Check-in: Today</p>
            </div>
            <span className="px-2.5 py-1 rounded-pill bg-safesync-green/10 text-safesync-green text-[12px] font-medium">SAFE</span>
          </div>

          {/* Panic Button */}
          <div className="mt-8 flex justify-center">
            <PanicButton onActivate={() => navigate("/guest/emergency")} />
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="flex gap-3 overflow-x-auto pb-2">
              <button
                onClick={() => navigate("/guest/evacuation")}
                className="flex flex-col items-center justify-center w-[100px] h-[80px] rounded-button bg-safesync-blue/10 shrink-0"
              >
                <Map className="w-6 h-6 text-safesync-blue mb-1" />
                <span className="text-[12px] text-safesync-blue font-medium">Exit Map</span>
              </button>
              <button className="flex flex-col items-center justify-center w-[100px] h-[80px] rounded-button bg-safesync-amber/10 shrink-0">
                <Bell className="w-6 h-6 text-safesync-amber mb-1" />
                <span className="text-[12px] text-safesync-amber font-medium">Alert Staff</span>
              </button>
              <button className="flex flex-col items-center justify-center w-[100px] h-[80px] rounded-button bg-safesync-green/10 shrink-0">
                <Phone className="w-6 h-6 text-safesync-green mb-1" />
                <span className="text-[12px] text-safesync-green font-medium">Call Front Desk</span>
              </button>
            </div>
          </div>

          {/* Building Status */}
          <div className="mt-6 bg-white rounded-card shadow-card border border-[#E2E8F0] p-4">
            <h3 className="text-[15px] font-medium text-safesync-dark mb-3">Building Status</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Smoke Sensors", status: "All clear" },
                { label: "Fire Exits", status: "8 exits available" },
                { label: "Network", status: "Online" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-safesync-green" />
                    <span className="text-[14px] text-safesync-dark">{item.label}</span>
                  </div>
                  <span className="text-[13px] text-safesync-muted-text">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="flex items-center justify-around border-t border-[#E2E8F0] bg-white px-4 pb-6 pt-2">
          {[
            { icon: Home, label: "Home", active: true },
            { icon: Map, label: "Exits", active: false, to: "/guest/evacuation" },
            { icon: Bell, label: "Alerts", active: false },
            { icon: Settings, label: "Settings", active: false },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => tab.to && navigate(tab.to)}
              className={`flex flex-col items-center gap-0.5 ${tab.active ? "text-safesync-blue" : "text-safesync-muted-text"}`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[11px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
};

export default GuestHome;
