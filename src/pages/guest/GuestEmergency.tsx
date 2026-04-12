import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, MapPin, Mic, Loader2, Phone, Shield, ChevronRight } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";

const GuestEmergency = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [timer, setTimer] = useState(0);
  const [selectedType, setSelectedType] = useState("Other");
  const [audioToggle, setAudioToggle] = useState(false);
  const [responseSteps, setResponseSteps] = useState([false, false, false]);

  useEffect(() => {
    const t = setInterval(() => setTimer((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setShowConfirmation(false), 3000);
    const t2 = setTimeout(() => setResponseSteps([true, false, false]), 500);
    const t3 = setTimeout(() => setResponseSteps([true, true, false]), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `+${m}:${sec.toString().padStart(2, "0")}`;
  };

  const types = ["Fire", "Medical", "Security", "Other"];

  return (
    <MobileFrame dark className="!bg-[#1C0A0A]">
      <div className="relative flex flex-col h-full">
        {/* Red vignette */}
        <div className="absolute inset-0 pointer-events-none animate-pulse-emergency"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(220,38,38,0.3) 100%)" }} />

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between px-5 py-3">
          <button onClick={() => navigate("/guest/home")} className="text-white/60">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-safesync-red animate-pulse" />
            <span className="text-[13px] font-bold text-red-300">EMERGENCY ACTIVE</span>
            <span className="text-[13px] font-mono text-red-300">{formatTime(timer)}</span>
          </div>
          <span className="text-[13px] text-white/40 font-mono">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-4">
          {/* Confirmation state */}
          <AnimatePresence>
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.1, 1] }}
                  transition={{ type: "spring", duration: 0.4 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-safesync-green" />
                </motion.div>
                <h2 className="text-[22px] font-bold text-white mt-4">Emergency Alert Sent</h2>
                <p className="text-[15px] text-red-300 mt-2 text-center">Staff have been notified. Help is on the way.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main emergency state */}
          {!showConfirmation && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
              {/* Emergency type selector */}
              <div className="flex gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`flex-1 h-9 rounded-button text-[13px] font-medium transition-colors ${
                      selectedType === type
                        ? "bg-safesync-amber text-white border-2 border-white/30"
                        : "bg-white/10 text-white/60 border border-white/10"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Location card */}
              <div className="bg-white/10 rounded-card p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-300" />
                  <div>
                    <p className="text-[15px] text-white font-medium">Room 407, Floor 4, Wing B</p>
                    <p className="text-[12px] text-white/40">Detected automatically</p>
                  </div>
                </div>
              </div>

              {/* Audio toggle */}
              <div className="flex items-center justify-between bg-white/5 rounded-card p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-[14px] text-white">Send 10s audio clip to staff</p>
                    <p className="text-[12px] text-white/30">Helps staff assess the situation</p>
                  </div>
                </div>
                <button
                  onClick={() => setAudioToggle(!audioToggle)}
                  className={`w-11 h-6 rounded-full transition-colors ${audioToggle ? "bg-safesync-blue" : "bg-white/20"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${audioToggle ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>

              {/* Response status */}
              <div className="bg-[#2D0E0E] rounded-card p-4 border border-red-900/30">
                <h3 className="text-[14px] font-medium text-red-300 mb-3">Response Status</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Alert sent to staff", done: responseSteps[0] },
                    { label: "Floor warden notified", done: responseSteps[1] },
                    { label: "Emergency services on standby", done: responseSteps[2] },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex items-center gap-3"
                    >
                      {step.done ? (
                        <CheckCircle2 className="w-4 h-4 text-safesync-green shrink-0" />
                      ) : (
                        <Loader2 className="w-4 h-4 text-white/30 animate-spin shrink-0" />
                      )}
                      <span className={`text-[14px] ${step.done ? "text-white" : "text-white/40"}`}>{step.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ERSS Button */}
              <button className="w-full h-[56px] bg-safesync-red rounded-button flex items-center justify-center gap-3 shadow-elevated">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-safesync-red font-bold text-[12px]">112</span>
                </div>
                <span className="text-white font-medium text-[15px]">112 — Call Emergency Services</span>
              </button>
              <p className="text-[12px] text-white/30 text-center">This will dispatch police, fire, or ambulance</p>

              {/* View evacuation route */}
              <button
                onClick={() => navigate("/guest/evacuation")}
                className="w-full h-[48px] border border-safesync-green/50 rounded-button flex items-center justify-center gap-2 text-safesync-green"
              >
                <span className="text-[14px] font-medium">View Evacuation Route</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Cancel */}
              <button
                onClick={() => navigate("/guest/home")}
                className="text-[13px] text-safesync-muted-text underline text-center mt-2"
              >
                False alarm? Cancel this alert
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </MobileFrame>
  );
};

export default GuestEmergency;
