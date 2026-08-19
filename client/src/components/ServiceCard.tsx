import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Brain, 
  GraduationCap, 
  Check, 
  Cpu
} from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServiceCardProps {
  service: ServiceDetail;
  onSelect: (service: ServiceDetail) => void;
  onStartProject: (categoryName: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
}) => {
  const isCoreFocus = service.isCoreFocus;

  // Custom Dual Drive Server Icon for Managed IT matching screenshot
  const renderIcon = () => {
    if (service.category === 'managed_it') {
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="8" x="2" y="3" rx="2" />
          <rect width="20" height="8" x="2" y="13" rx="2" />
          <line x1="6" x2="6.01" y1="7" y2="7" strokeWidth="3" />
          <line x1="6" x2="6.01" y1="17" y2="17" strokeWidth="3" />
        </svg>
      );
    }
    if (service.category === 'ai_implementation') {
      return (
        <div className="text-[#22d3ee] font-mono text-base font-bold flex items-center justify-center">
          <Brain className="w-5 h-5 text-[#22d3ee]" />
        </div>
      );
    }
    return <GraduationCap className="w-5 h-5 text-[#22d3ee]" />;
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(service)}
      className={`relative flex flex-col justify-start rounded-2xl p-6 sm:p-7 transition-all duration-300 cursor-pointer ${
        isCoreFocus
          ? 'bg-[#0a1827] border-2 border-[#22d3ee] shadow-[0_0_25px_rgba(34,211,238,0.22)]'
          : 'bg-[#0d1c2d] border border-[#1c2b3c] hover:border-[#273b50]'
      }`}
      id={`service-card-${service.id}`}
    >
      {/* Top Tag (CORE FOCUS) - Pill badge as shown in screenshot */}
      {isCoreFocus && (
        <div className="absolute top-5 right-5">
          <span className="inline-block bg-[#22d3ee] text-[#00363e] text-[10px] font-mono font-extrabold px-3 py-1 rounded-md tracking-wider uppercase">
            CORE FOCUS
          </span>
        </div>
      )}

      {/* Top Squircle Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#122438] border border-[#1c3249] flex items-center justify-center mb-5 shrink-0">
        {renderIcon()}
      </div>

      {/* Card Title */}
      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
        {service.title}
      </h3>

      {/* Card Description */}
      <p className="font-sans text-sm sm:text-base text-[#94a3b8] leading-relaxed mb-4">
        {service.shortDesc}
      </p>

      {/* Feature Checkmarks (displayed on AI card as shown in screen.png) */}
      {isCoreFocus ? (
        <div className="space-y-2.5 mt-2 pt-2">
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 text-[#22d3ee] stroke-[2.5] shrink-0" />
            <span className="text-sm font-sans font-medium text-white">
              Predictive Analytics
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 text-[#22d3ee] stroke-[2.5] shrink-0" />
            <span className="text-sm font-sans font-medium text-white">
              Process Automation
            </span>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
};

export default ServiceCard;
