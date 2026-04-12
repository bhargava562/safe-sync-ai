import { useNavigate } from "react-router-dom";
import { Shield, Download, Share2, Mail, CheckCircle2 } from "lucide-react";

const DashboardReport = () => {
  const navigate = useNavigate();

  const timeline = [
    { time: "3:44:02 PM", event: "Smoke sensor triggered (MQ2 spike to 847 ppm)", color: "bg-safesync-amber" },
    { time: "3:44:20 PM", event: "Sound anomaly detected (91% confidence)", color: "bg-safesync-amber" },
    { time: "3:44:22 PM", event: "Amber alert sent to staff", color: "bg-safesync-amber" },
    { time: "3:44:25 PM", event: "Floor warden Priya S. acknowledged", color: "bg-safesync-blue" },
    { time: "3:44:38 PM", event: "Temperature spike — Full Emergency triggered", color: "bg-safesync-red" },
    { time: "3:44:40 PM", event: "ERSS-112 notified (structured signal + location sent)", color: "bg-safesync-red" },
    { time: "3:44:52 PM", event: "Guest evacuation guidance activated on all guest apps", color: "bg-safesync-red" },
    { time: "3:58:34 PM", event: "All zones confirmed clear", color: "bg-safesync-green" },
    { time: "3:59:12 PM", event: "ERSS units arrived on-site", color: "bg-safesync-green" },
  ];

  const metrics = [
    { label: "Time to Detection", value: "0 seconds", note: "AI auto-detected, no manual trigger" },
    { label: "Time to ERSS Notification", value: "38 seconds", note: "" },
    { label: "Guests Evacuated", value: "284 / 284", note: "" },
    { label: "False Alarms", value: "0", note: "Fusion filter suppressed 1 false positive earlier" },
  ];

  const sensors = [
    { id: "MQ2-4W-C", location: "Floor 4 West Corridor", time: "3:44:02", value: "847 ppm", confidence: "99.2%" },
    { id: "SND-4W-D", location: "Floor 4 West Door", time: "3:44:20", value: "91 dB anomaly", confidence: "91.0%" },
    { id: "TMP-4W-A", location: "Floor 4 West Kitchen", time: "3:44:38", value: "89°C", confidence: "99.8%" },
  ];

  return (
    <div className="h-screen bg-safesync-dark text-white flex flex-col overflow-y-auto">
      <div className="max-w-[1000px] mx-auto w-full p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-bold text-white">Incident Report — Auto-Generated</h1>
            <p className="text-[15px] text-safesync-slate mt-1">Kitchen Fire · The Grand Horizon Hotel · April 12, 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-pill bg-safesync-green/20 text-safesync-green text-[12px] font-bold">RESOLVED</span>
            <span className="text-[13px] text-safesync-slate font-mono">Duration: 14m 32s</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-safesync-dark-card rounded-card p-6 border border-safesync-dark-border mb-6">
          <h2 className="text-[16px] font-bold text-white mb-4">Event Timeline</h2>
          <div className="flex flex-col gap-0 ml-3 border-l-2 border-safesync-dark-border">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-4 pb-4 pl-5 relative">
                <div className={`absolute left-[-5px] w-2 h-2 rounded-full ${t.color} mt-1.5`} />
                <span className="text-[12px] font-mono text-safesync-slate shrink-0 w-[100px]">{t.time}</span>
                <p className="text-[14px] text-white/80">{t.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {metrics.map((m) => (
            <div key={m.label} className="bg-safesync-dark-card rounded-card p-4 border border-safesync-dark-border">
              <p className="text-[12px] text-safesync-muted-text mb-1">{m.label}</p>
              <p className="text-[24px] font-bold text-white">{m.value}</p>
              {m.note && <p className="text-[11px] text-safesync-slate mt-1">{m.note}</p>}
            </div>
          ))}
        </div>

        {/* Sensor Table */}
        <div className="bg-safesync-dark-card rounded-card p-6 border border-safesync-dark-border mb-6">
          <h2 className="text-[16px] font-bold text-white mb-4">Sensor Performance</h2>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-safesync-dark-border text-safesync-slate text-left">
                <th className="pb-2 font-medium">Sensor ID</th>
                <th className="pb-2 font-medium">Location</th>
                <th className="pb-2 font-medium">Trigger Time</th>
                <th className="pb-2 font-medium">Value</th>
                <th className="pb-2 font-medium">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {sensors.map((s) => (
                <tr key={s.id} className="border-b border-safesync-dark-border/50">
                  <td className="py-2.5 font-mono text-safesync-blue">{s.id}</td>
                  <td className="py-2.5 text-white/70">{s.location}</td>
                  <td className="py-2.5 font-mono text-safesync-slate">{s.time}</td>
                  <td className="py-2.5 text-white">{s.value}</td>
                  <td className="py-2.5 text-safesync-green">{s.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export */}
        <div className="flex gap-3 mb-8">
          <button className="px-5 py-2.5 bg-safesync-blue rounded-button flex items-center gap-2 text-white text-[14px] font-medium">
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
          <button className="px-5 py-2.5 border border-safesync-dark-border rounded-button flex items-center gap-2 text-safesync-slate text-[14px]">
            <Share2 className="w-4 h-4" /> Share with ERSS
          </button>
          <button className="px-5 py-2.5 border border-safesync-dark-border rounded-button flex items-center gap-2 text-safesync-slate text-[14px]">
            <Mail className="w-4 h-4" /> Email to Management
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="ml-auto px-5 py-2.5 bg-white/5 rounded-button text-safesync-slate text-[14px]"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardReport;
