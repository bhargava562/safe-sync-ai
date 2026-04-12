import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Flame, WifiOff, AlertTriangle, RotateCcw } from "lucide-react";

interface EventLog {
  time: string;
  source: string;
  value: string;
  state: string;
}

const DashboardSimulator = () => {
  const navigate = useNavigate();
  const [sensor, setSensor] = useState("Smoke");
  const [zone, setZone] = useState("Zone 4W");
  const [intensity, setIntensity] = useState(1);
  const [events, setEvents] = useState<EventLog[]>([]);
  const [currentState, setCurrentState] = useState("NORMAL");

  const addEvent = (source: string, value: string, state: string) => {
    setEvents((prev) => [
      { time: new Date().toLocaleTimeString(), source, value, state },
      ...prev,
    ]);
    setCurrentState(state);
  };

  const fireKitchenScenario = () => {
    addEvent("MQ2 Smoke 4W-C", "847 ppm", "MONITORING");
    setTimeout(() => addEvent("Sound 4W-D", "91% conf", "STAFF ALERT"), 2000);
    setTimeout(() => {
      addEvent("Temp 4W-A", "89°C", "FULL EMERGENCY");
      setTimeout(() => navigate("/dashboard/emergency"), 1000);
    }, 4000);
  };

  const stateColors: Record<string, string> = {
    NORMAL: "bg-safesync-green",
    MONITORING: "bg-safesync-slate",
    "STAFF ALERT": "bg-safesync-amber",
    "FULL EMERGENCY": "bg-safesync-red",
  };

  return (
    <div className="h-screen bg-safesync-dark text-white flex flex-col">
      {/* Banner */}
      <div className="h-12 bg-safesync-amber/20 border-b border-safesync-amber/30 flex items-center justify-center gap-2 shrink-0">
        <span className="text-[14px] font-bold text-safesync-amber">DEMO MODE — Sensor Simulator</span>
        <span className="text-[12px] text-safesync-amber/50 ml-2">This panel is hidden in production</span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main panel */}
        <div className="flex-1 flex items-start justify-center p-8">
          <div className="w-[800px]">
            <h2 className="text-[20px] font-bold text-white mb-6">Inject Sensor Event</h2>

            <div className="bg-safesync-dark-card rounded-card p-6 border border-safesync-dark-border mb-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-[12px] text-safesync-slate mb-1 block">Sensor Type</label>
                  <select
                    value={sensor}
                    onChange={(e) => setSensor(e.target.value)}
                    className="w-full h-10 bg-white/5 border border-white/10 rounded-button px-3 text-[14px] text-white outline-none"
                  >
                    {["Sound Anomaly", "Smoke", "Temperature Spike", "Panic Button", "Manual"].map((s) => (
                      <option key={s} value={s} className="bg-safesync-dark">{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] text-safesync-slate mb-1 block">Zone</label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full h-10 bg-white/5 border border-white/10 rounded-button px-3 text-[14px] text-white outline-none"
                  >
                    {["Zone 4W", "Zone 4E", "Zone G (Lobby)", "Parking"].map((z) => (
                      <option key={z} value={z} className="bg-safesync-dark">{z}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] text-safesync-slate mb-1 block">Intensity</label>
                  <div className="flex gap-2">
                    {["Low", "Medium", "High"].map((l, i) => (
                      <button
                        key={l}
                        onClick={() => setIntensity(i)}
                        className={`flex-1 h-10 rounded-button text-[13px] font-medium ${
                          intensity === i ? "bg-safesync-blue text-white" : "bg-white/5 text-white/50"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => addEvent(`${sensor} ${zone}`, intensity === 2 ? "HIGH" : intensity === 1 ? "MED" : "LOW", "MONITORING")}
                className="w-full h-12 bg-safesync-blue rounded-button text-white font-medium"
              >
                Inject Signal
              </button>
            </div>

            {/* Pre-built scenarios */}
            <h3 className="text-[16px] font-bold text-white mb-4">Pre-built Scenarios</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={fireKitchenScenario}
                className="h-[72px] bg-safesync-red/20 border border-safesync-red/30 rounded-card flex items-center gap-3 px-5"
              >
                <Flame className="w-6 h-6 text-safesync-red" />
                <div className="text-left">
                  <p className="text-[14px] font-medium text-safesync-red">Kitchen Fire Scenario</p>
                  <p className="text-[11px] text-safesync-red/50">3 events → Normal → Amber → Emergency</p>
                </div>
              </button>
              <button className="h-[72px] bg-safesync-purple/20 border border-safesync-purple/30 rounded-card flex items-center gap-3 px-5">
                <WifiOff className="w-6 h-6 text-safesync-purple" />
                <div className="text-left">
                  <p className="text-[14px] font-medium text-safesync-purple">Offline Mesh Demo</p>
                  <p className="text-[11px] text-safesync-purple/50">Activates mesh on all apps</p>
                </div>
              </button>
              <button
                onClick={() => addEvent("Panic Button", "Room 407", "STAFF ALERT")}
                className="h-[72px] bg-safesync-amber/20 border border-safesync-amber/30 rounded-card flex items-center gap-3 px-5"
              >
                <AlertTriangle className="w-6 h-6 text-safesync-amber" />
                <div className="text-left">
                  <p className="text-[14px] font-medium text-safesync-amber">Guest Panic Button</p>
                  <p className="text-[11px] text-safesync-amber/50">Simulates panic from Room 407</p>
                </div>
              </button>
              <button
                onClick={() => { setCurrentState("NORMAL"); setEvents([]); navigate("/dashboard"); }}
                className="h-[72px] bg-safesync-green/20 border border-safesync-green/30 rounded-card flex items-center gap-3 px-5"
              >
                <RotateCcw className="w-6 h-6 text-safesync-green" />
                <div className="text-left">
                  <p className="text-[14px] font-medium text-safesync-green">All Clear</p>
                  <p className="text-[11px] text-safesync-green/50">Reset all states to normal</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Event Log */}
        <div className="w-[400px] bg-safesync-dark-card border-l border-safesync-dark-border p-5 overflow-y-auto shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-medium text-safesync-slate">Live Event Log</h3>
            <div className={`px-3 py-1 rounded-pill text-[11px] font-bold text-white ${stateColors[currentState]}`}>
              {currentState}
            </div>
          </div>
          {events.length === 0 ? (
            <p className="text-[13px] text-safesync-muted-text text-center mt-10">No events yet. Inject a signal to begin.</p>
          ) : (
            <div className="flex flex-col gap-1">
              {events.map((e, i) => (
                <div key={i} className="p-2.5 bg-white/5 rounded-lg text-[12px]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-mono text-safesync-slate">{e.time}</span>
                    <span className={`px-2 py-0.5 rounded-pill text-[9px] font-bold text-white ${stateColors[e.state]}`}>{e.state}</span>
                  </div>
                  <p className="text-white/70">{e.source} — {e.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSimulator;
