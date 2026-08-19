import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`} id="titanium-logo">
      {/* Cybernetic Isometric Cube / Shield Icon */}
      <div 
        className="relative flex items-center justify-center rounded-lg bg-[#0a1827]/90 border border-[#22d3ee]/60 p-1.5 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300"
        style={{ width: 38, height: 38 }}
      >
        <img
          src="/manus-storage/tnssys-symbol_f27e8990.png"
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
          className="h-6 w-6 object-contain"
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="font-heading font-extrabold tracking-wider text-[11px] sm:text-xs text-white leading-tight">
          TITANIUM SOLUTIONS
        </span>
        <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-[#22d3ee] font-semibold">
          TNSSYS.TECH
        </span>
      </div>
    </div>
  );
};

export default Logo;
