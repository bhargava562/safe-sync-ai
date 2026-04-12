import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, DoorOpen, X, WifiOff } from "lucide-react";
import { motion } from "framer-motion";
import MobileFrame from "@/components/MobileFrame";

const floors = ["B2", "B1", "G", "1", "2", "3", "4", "5"];

const GuestEvacuation = () => {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState(6); // index for "4"

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        {/* Emergency Banner */}
        <div className="bg-safesync-red px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[13px] font-bold text-white">EVACUATE NOW · Use Stairwell B</span>
          </div>
          <button onClick={() => navigate(-1)}>
            <X className="w-4 h-4 text-white/70" />
          </button>
        </div>

        {/* Map Area */}
        <div className="relative flex-1 bg-[#F1F5F9] overflow-hidden">
          {/* Simplified floor plan SVG */}
          <svg viewBox="0 0 390 420" className="w-full h-full">
            {/* Walls */}
            <rect x="30" y="30" width="330" height="360" rx="4" fill="none" stroke="#94A3B8" strokeWidth="2" />
            
            {/* Corridor */}
            <rect x="30" y="180" width="330" height="60" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            
            {/* Rooms - top row */}
            {[0,1,2,3].map((i) => (
              <g key={`top-${i}`}>
                <rect x={40 + i * 80} y={40} width={70} height={130} rx="2" fill="#E2E8F0" stroke="#CBD5E1" />
                <text x={75 + i * 80} y={110} textAnchor="middle" fill="#64748B" fontSize="10">
                  {401 + i}
                </text>
              </g>
            ))}

            {/* Rooms - bottom row */}
            {[0,1,2,3].map((i) => (
              <g key={`bot-${i}`}>
                <rect x={40 + i * 80} y={250} width={70} height={130} rx="2" fill="#E2E8F0" stroke="#CBD5E1" />
                <text x={75 + i * 80} y={320} textAnchor="middle" fill="#64748B" fontSize="10">
                  {405 + i}
                </text>
              </g>
            ))}

            {/* Room 407 highlighted */}
            <rect x={200} y={250} width={70} height={130} rx="2" fill="#DBEAFE" stroke="#1A56B0" strokeWidth="2" />

            {/* User location - blue dot */}
            <circle cx="235" cy="315" r="8" fill="#1A56B0">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="235" cy="315" r="5" fill="#1A56B0" />

            {/* Evacuation route - dashed green */}
            <path
              d="M 235 280 L 235 210 L 340 210 L 340 100 L 360 60"
              fill="none"
              stroke="#16A34A"
              strokeWidth="3"
              strokeDasharray="8 4"
              strokeLinecap="round"
            >
              <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="1.2s" fill="freeze" />
            </path>

            {/* Blocked elevator */}
            <line x1="170" y1="195" x2="170" y2="225" stroke="#DC2626" strokeWidth="2" strokeDasharray="4 2" />
            <text x="148" y="240" fill="#DC2626" fontSize="7" fontWeight="bold">
              DO NOT USE
            </text>
            <circle cx="170" cy="210" r="8" fill="#FEE2E2" stroke="#DC2626" />
            <text x="166" y="213" fill="#DC2626" fontSize="8" fontWeight="bold">✕</text>

            {/* Stairwell B exit */}
            <circle cx="355" cy="55" r="14" fill="#16A34A">
              <animate attributeName="r" values="14;17;14" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.7;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <text x="348" y="60" fill="white" fontSize="12" fontWeight="bold">→</text>
            <text x="328" y="40" fill="#16A34A" fontSize="8" fontWeight="600">EXIT</text>

            {/* Sensor nodes */}
            {[[80, 210], [195, 175], [300, 210], [195, 245]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#16A34A" />
            ))}
            {/* Triggered sensor */}
            <circle cx="290" cy="175" r="4" fill="#DC2626">
              <animate attributeName="r" values="4;8;4" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Mesh badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-safesync-purple text-white px-3 py-1 rounded-pill text-[11px] font-medium">
            <WifiOff className="w-3 h-3" />
            MESH ACTIVE
          </div>
        </div>

        {/* Floor selector */}
        <div className="flex gap-1.5 px-3 py-3 bg-white border-t border-[#E2E8F0] overflow-x-auto">
          {floors.map((f, i) => (
            <button
              key={f}
              onClick={() => setSelectedFloor(i)}
              className={`px-3 py-1.5 rounded-pill text-[12px] font-medium shrink-0 transition-colors ${
                i === selectedFloor
                  ? "bg-safesync-blue text-white"
                  : "bg-[#F1F5F9] text-safesync-muted-text"
              }`}
            >
              {f}{i === 6 ? " (YOU)" : ""}
            </button>
          ))}
        </div>

        {/* Route Instructions */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-white border-t border-[#E2E8F0] px-5 py-4 pb-8"
        >
          <div className="w-9 h-1 bg-[#CBD5E1] rounded-full mx-auto mb-3" />
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-[17px] font-bold text-safesync-dark">Evacuation Route</h3>
            <span className="text-[13px] text-safesync-muted-text">Est. 2 minutes</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-4 h-4 text-safesync-blue mt-0.5 shrink-0" />
              <span className="text-[15px] text-safesync-dark">Turn right out of Room 407</span>
            </div>
            <div className="flex items-start gap-3">
              <DoorOpen className="w-4 h-4 text-safesync-blue mt-0.5 shrink-0" />
              <span className="text-[15px] text-safesync-dark">Take Stairwell B on your left — Floor 4 West Wing</span>
            </div>
            <div className="flex items-start gap-3">
              <DoorOpen className="w-4 h-4 text-safesync-blue mt-0.5 shrink-0" />
              <span className="text-[15px] text-safesync-dark">Exit through Ground Floor North Door</span>
            </div>
          </div>
          <div className="mt-3 px-3 py-2 bg-safesync-green/10 rounded-pill inline-flex items-center gap-2">
            <span className="text-[12px] text-safesync-green font-medium">Assembly Point A — Car Park East</span>
          </div>
        </motion.div>
      </div>
    </MobileFrame>
  );
};

export default GuestEvacuation;
