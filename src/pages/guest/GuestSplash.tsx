import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Bell, Map, X } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";

const GuestSplash = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setShowOnboarding(true);
          return 100;
        }
        return p + 100 / 48; // ~2.4s
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <MobileFrame dark>
      <div className="relative flex flex-col items-center justify-center h-full"
        style={{ background: "radial-gradient(circle at center, rgba(26,86,176,0.15) 0%, #0F172A 70%)" }}>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-[72px] h-[72px] flex items-center justify-center">
            <Shield className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">SafeSync</h1>
          <p className="text-[15px] text-safesync-slate">Crisis Intelligence for Hospitality</p>
        </motion.div>

        <div className="mt-7 flex flex-col items-center gap-2">
          <div className="w-[200px] h-1 bg-safesync-dark-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-safesync-blue rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[13px] text-safesync-muted-text">Securing your stay...</p>
        </div>

        {/* Onboarding Overlay */}
        <AnimatePresence>
          {showOnboarding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-end z-20"
            >
              <motion.div
                initial={{ y: 400 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white w-full rounded-t-[24px] p-6 pb-10"
              >
                <h2 className="text-[22px] font-bold text-safesync-dark mb-6">Your safety, always on.</h2>
                
                <div className="flex flex-col gap-5 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-safesync-blue/10 flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5 text-safesync-blue" />
                    </div>
                    <p className="text-[15px] text-safesync-dark">Emergency alerts reach you even offline</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-safesync-blue/10 flex items-center justify-center shrink-0">
                      <Map className="w-5 h-5 text-safesync-blue" />
                    </div>
                    <p className="text-[15px] text-safesync-dark">Instant evacuation route to the nearest exit</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-safesync-blue/10 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-safesync-blue" />
                    </div>
                    <p className="text-[15px] text-safesync-dark">One tap connects hotel staff and emergency services</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/guest/home")}
                  className="w-full h-[52px] bg-safesync-blue text-white font-medium rounded-button text-[15px]"
                >
                  Allow Notifications
                </button>
                <button
                  onClick={() => navigate("/guest/home")}
                  className="w-full mt-3 text-[14px] text-safesync-slate underline"
                >
                  Skip for now
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileFrame>
  );
};

export default GuestSplash;
