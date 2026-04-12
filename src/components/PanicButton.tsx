import { useState, useRef, useCallback } from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

interface PanicButtonProps {
  onActivate: () => void;
}

const PanicButton = ({ onActivate }: PanicButtonProps) => {
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startPress = useCallback(() => {
    setPressing(true);
    setProgress(0);
    const start = Date.now();
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / 2000, 1);
      setProgress(pct);
      if (pct >= 1) {
        clearInterval(intervalRef.current!);
        onActivate();
      }
    }, 50);
  }, [onActivate]);

  const endPress = useCallback(() => {
    setPressing(false);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-safesync-muted-text">Emergency?</p>
      <div className="relative flex items-center justify-center">
        {/* Pulse rings */}
        <div className="absolute w-[120px] h-[120px] rounded-full bg-safesync-red/30 animate-pulse-ring" />
        <div className="absolute w-[120px] h-[120px] rounded-full bg-safesync-red/30 animate-pulse-ring-delay-1" />
        <div className="absolute w-[120px] h-[120px] rounded-full bg-safesync-red/30 animate-pulse-ring-delay-2" />

        {/* Progress ring */}
        {pressing && (
          <svg className="absolute w-[140px] h-[140px] -rotate-90" viewBox="0 0 140 140">
            <circle
              cx="70" cy="70" r="64"
              fill="none"
              stroke="#DC2626"
              strokeWidth="4"
              strokeDasharray={`${progress * 402} 402`}
              strokeLinecap="round"
              opacity={0.8}
            />
          </svg>
        )}

        <motion.button
          className="relative z-10 w-[120px] h-[120px] rounded-full bg-safesync-red flex items-center justify-center shadow-elevated cursor-pointer select-none"
          whileTap={{ scale: 0.92 }}
          onMouseDown={startPress}
          onMouseUp={endPress}
          onMouseLeave={endPress}
          onTouchStart={startPress}
          onTouchEnd={endPress}
        >
          <Shield className="w-10 h-10 text-white" />
        </motion.button>
      </div>
      <p className="text-xs text-safesync-slate">Hold 2 seconds for emergency</p>
    </div>
  );
};

export default PanicButton;
