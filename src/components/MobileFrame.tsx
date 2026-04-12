import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}

const MobileFrame = ({ children, dark = false, className = "" }: MobileFrameProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-safesync-dark p-4">
      <div
        className={`relative w-[390px] h-[844px] rounded-[40px] overflow-hidden shadow-elevated border-2 border-safesync-dark-border ${
          dark ? "bg-safesync-dark" : "bg-safesync-light"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileFrame;
