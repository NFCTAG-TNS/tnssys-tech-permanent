import React from 'react';
import { Calendar, Bot, ExternalLink, Sparkles } from 'lucide-react';

interface AppointmentButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'hero' | 'header';
}

export const AppointmentButton: React.FC<AppointmentButtonProps> = ({ 
  className = '',
  variant = 'primary' 
}) => {
  const handleOpenAppointmentAgent = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const parentURL = encodeURIComponent(
        typeof window !== 'undefined' && window.top ? window.top.location.href : window.location.href
      );
      const url = `https://agent.jotform.com/01a00e933ac870008d5d2f2d9162c8e5bac5/voice?embedMode=popup&parentURL=${parentURL}`;
      const width = 700;
      const height = 500;
      const top = Math.max(0, (window.outerHeight || window.innerHeight) / 2 - height / 2);
      const left = Math.max(0, (window.outerWidth || window.innerWidth) / 2 - width / 2);

      window.open(
        url,
        'appointment_agent_popup',
        `scrollbars=yes,toolbar=no,width=${width},height=${height},top=${top},left=${left}`
      );
    } catch {
      window.open(
        'https://agent.jotform.com/01a00e933ac870008d5d2f2d9162c8e5bac5/voice',
        '_blank'
      );
    }
  };

  if (variant === 'header') {
    return (
      <a
        href="javascript:void(0)"
        onClick={handleOpenAppointmentAgent}
        className={`inline-flex items-center gap-1.5 bg-[#0075E3] hover:bg-[#0062c4] text-white font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg shadow-[0_0_15px_rgba(0,117,227,0.4)] hover:shadow-[0_0_20px_rgba(0,117,227,0.6)] transition-all duration-200 cursor-pointer active:scale-95 text-decoration-none ${className}`}
        id="header-appointment-agent-btn"
        title="Open TNSSYS.TECH Appointment Request Agent"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Appointment Agent</span>
        <span className="sm:hidden">Book</span>
      </a>
    );
  }

  if (variant === 'hero') {
    return (
      <a
        href="javascript:void(0)"
        onClick={handleOpenAppointmentAgent}
        className={`group relative inline-flex items-center justify-center gap-2 bg-[#0075E3] hover:bg-[#0062c4] text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-6 py-3 rounded-xl border border-[#3894ff] shadow-[0_0_20px_rgba(0,117,227,0.4)] hover:shadow-[0_0_30px_rgba(0,117,227,0.7)] transition-all duration-300 cursor-pointer active:scale-95 text-decoration-none ${className}`}
        id="hero-appointment-agent-link"
      >
        <Bot className="w-4 h-4 text-[#8aebff]" />
        <span>Appointment Request Agent</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
      </a>
    );
  }

  return (
    <a
      href="javascript:void(0)"
      onClick={handleOpenAppointmentAgent}
      style={{
        textTransform: 'uppercase',
        fontSize: '14px',
        cursor: 'pointer',
        padding: '12px 18px',
        fontFamily: 'inherit',
        backgroundColor: '#0075E3',
        border: '1px solid #0075E3',
        color: '#FFFFFF',
        borderRadius: '4px',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}
      className={`hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(0,117,227,0.35)] ${className}`}
      id="appointment-request-agent-cta"
    >
      <Calendar className="w-4 h-4" />
      <span>TNSSYS.TECH: Appointment Request Agent</span>
    </a>
  );
};

export default AppointmentButton;
