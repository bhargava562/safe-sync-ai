import { useNavigate } from "react-router-dom";
import { Shield, Smartphone, Monitor, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const flows = [
    {
      title: "Guest Mobile App",
      description: "Splash → Home → Emergency → Evacuation Map",
      icon: Smartphone,
      color: "bg-safesync-blue",
      path: "/guest/splash",
      screens: "5 screens · Light theme",
    },
    {
      title: "Staff Mobile App",
      description: "Login → Home → Amber Alert → Full Emergency",
      icon: Users,
      color: "bg-safesync-green",
      path: "/staff/login",
      screens: "4 screens · Dark theme",
    },
    {
      title: "Management Dashboard",
      description: "Normal → Amber → Emergency → Simulator → Report",
      icon: Monitor,
      color: "bg-safesync-purple",
      path: "/dashboard",
      screens: "5 screens · Dark theme",
    },
  ];

  return (
    <div className="min-h-screen bg-safesync-dark flex flex-col items-center justify-center p-8"
      style={{ background: "radial-gradient(circle at center, rgba(26,86,176,0.1) 0%, #0F172A 70%)" }}>
      <Shield className="w-16 h-16 text-safesync-blue mb-4" />
      <h1 className="text-4xl font-bold text-white mb-2">SafeSync AI</h1>
      <p className="text-safesync-slate text-[15px] mb-2">Crisis Intelligence for Hospitality</p>
      <p className="text-safesync-muted-text text-[13px] mb-12">14 Screens · 3 User Flows · Full Animation Spec</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] w-full">
        {flows.map((flow) => (
          <button
            key={flow.title}
            onClick={() => navigate(flow.path)}
            className="bg-safesync-dark-card border border-safesync-dark-border rounded-card p-6 text-left hover:border-safesync-blue/50 transition-colors group"
          >
            <div className={`w-12 h-12 ${flow.color} rounded-xl flex items-center justify-center mb-4`}>
              <flow.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-[18px] font-bold text-white mb-1 group-hover:text-safesync-blue transition-colors">{flow.title}</h2>
            <p className="text-[13px] text-safesync-slate mb-3">{flow.description}</p>
            <span className="text-[11px] text-safesync-muted-text">{flow.screens}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Index;
