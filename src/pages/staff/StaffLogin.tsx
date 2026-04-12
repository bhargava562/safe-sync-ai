import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import MobileFrame from "@/components/MobileFrame";

const StaffLogin = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("Floor Warden");
  const [staffId, setStaffId] = useState("");
  const [pin, setPin] = useState("");

  const roles = ["Floor Warden", "Security", "Manager"];

  return (
    <MobileFrame dark>
      <div className="flex flex-col h-full px-6 pt-16">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Shield className="w-10 h-10 text-white mb-2" />
          <span className="text-[13px] text-safesync-muted-text">Staff Portal</span>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-card p-6 shadow-elevated">
          <h2 className="text-[20px] font-bold text-safesync-dark mb-5">Sign in to your post</h2>

          {/* Role selector */}
          <div className="flex gap-2 mb-5">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`flex-1 h-9 rounded-pill text-[12px] font-medium transition-colors ${
                  selectedRole === role
                    ? "bg-safesync-blue text-white"
                    : "bg-[#F1F5F9] text-safesync-muted-text"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Staff ID */}
          <input
            type="text"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            placeholder="Staff ID (e.g. SS-2047)"
            className="w-full h-9 px-3 border border-[#E2E8F0] rounded-button text-[14px] text-safesync-dark placeholder:text-safesync-slate mb-4 outline-none focus:border-safesync-blue"
          />

          {/* PIN */}
          <div className="mb-4">
            <div className="flex gap-3 justify-center mb-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i < pin.length ? "bg-safesync-blue" : "bg-[#E2E8F0]"
                  }`}
                />
              ))}
            </div>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit PIN"
              className="w-full h-9 px-3 border border-[#E2E8F0] rounded-button text-[14px] text-safesync-dark text-center tracking-[8px] placeholder:tracking-normal outline-none focus:border-safesync-blue"
            />
            <button className="text-[13px] text-safesync-blue mt-2 block mx-auto">Use biometrics instead</button>
          </div>

          {/* Sign In */}
          <button
            onClick={() => navigate("/staff/home")}
            className="w-full h-[52px] bg-safesync-blue text-white font-medium rounded-button text-[15px]"
          >
            Sign In
          </button>
        </div>

        {/* Emergency Override */}
        <button className="mt-6 text-[14px] text-safesync-red underline text-center">
          Emergency access?
        </button>
      </div>
    </MobileFrame>
  );
};

export default StaffLogin;
