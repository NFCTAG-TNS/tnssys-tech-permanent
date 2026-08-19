import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Shield, Cpu, Activity, Sparkles, Terminal } from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onStartProject: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onStartProject,
}) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#051424]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0d1c2d] border border-[#1c2b3c] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#010f1f]/90 z-10 my-auto text-[#d4e4fa]"
        >
          {/* Top Bar */}
          <div className="flex items-start justify-between pb-4 border-b border-[#1c2b3c] mb-6">
            <div>
              {service.isCoreFocus && (
                <span className="inline-flex items-center gap-1 bg-[#22d3ee] text-[#00363e] text-[10px] font-mono font-bold px-2 py-0.5 rounded tracking-wider uppercase mb-2">
                  <Sparkles className="w-3 h-3 fill-current" />
                  CORE FOCUS PILLAR
                </span>
              )}
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {service.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#94a3b8] hover:text-white p-1 rounded-lg hover:bg-[#1c2b3c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Description */}
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed mb-6 font-sans">
            {service.fullDesc}
          </p>

          {/* Metrics row */}
          {service.metrics && service.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {service.metrics.map((m, idx) => (
                <div key={idx} className="bg-[#122131] border border-[#1c2b3c] p-3 rounded-lg">
                  <div className="text-[10px] font-mono text-[#64748b] uppercase">{m.label}</div>
                  <div className="text-base font-bold font-heading text-[#22d3ee] mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Architectural Deliverables */}
          <div className="mb-8">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#d4e4fa] mb-3 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#22d3ee]" />
              Enterprise Deliverables & Stack
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#bbc9cd] bg-[#122131]/60 px-3 py-2 rounded-lg border border-[#1c2b3c]/50">
                  <Check className="w-4 h-4 text-[#22d3ee] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1c2b3c]">
            <div className="text-xs font-mono text-[#64748b] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>Full SLA & Compliance Guarantee Included</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onStartProject(service.title);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-pointer"
            >
              <span>Scope This Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
