import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Server, Brain, GraduationCap } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { ServiceDetail } from '../types';

interface ExpertiseSectionProps {
  services: ServiceDetail[];
  onSelectService: (service: ServiceDetail) => void;
  onStartProject: (serviceTitle: string) => void;
  onViewAllSolutions: () => void;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({
  services,
  onSelectService,
  onStartProject,
  onViewAllSolutions,
}) => {
  return (
    <section id="expertise-section" className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* 3 Main Cards Stack (matches screen.png) */}
      <div className="space-y-4 sm:space-y-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={onSelectService}
            onStartProject={onStartProject}
          />
        ))}
      </div>

      {/* Embedded Desktop Perspective Frame (as shown at the bottom of screen.png) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-[#091523]/95 border border-[#1c2b3c] p-5 sm:p-6 shadow-xl shadow-[#020b14]"
      >
        {/* Frame Top Header & Link */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white tracking-tight">
              Expertise built for the <span className="text-[#22d3ee]">next era.</span>
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#94a3b8] font-sans max-w-xl leading-relaxed">
              We don't just solve problems; we engineer systems that prevent them and AI that capitalizes on opportunities before they vanish.
            </p>
          </div>

          <button
            onClick={onViewAllSolutions}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#64748b] hover:text-[#22d3ee] transition-colors cursor-pointer shrink-0 self-start"
          >
            <span>Explore Full Solutions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Mini Horizontal Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Mini Card 1: Managed IT */}
          <div 
            onClick={() => onSelectService(services[0])}
            className="p-3.5 rounded-xl bg-[#0d1c2d]/70 border border-[#1c2b3c] hover:border-[#273b50] transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#122438] flex items-center justify-center text-[#22d3ee] mb-2.5">
              <Server className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-white mb-1 font-heading">Managed IT</div>
            <div className="text-[10px] text-[#94a3b8] line-clamp-2 leading-relaxed mb-2.5">
              Comprehensive infrastructure support, security, and cloud management.
            </div>
            <div className="space-y-1 text-[9px] text-[#bbc9cd]">
              <div className="flex items-center gap-1.5">
                <Check className="w-2.5 h-2.5 text-[#22d3ee]" />
                <span>Cybersecurity Hardening</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-2.5 h-2.5 text-[#22d3ee]" />
                <span>Cloud Infrastructure</span>
              </div>
            </div>
          </div>

          {/* Mini Card 2: AI Implementation (CORE FOCUS) */}
          <div 
            onClick={() => onSelectService(services[1])}
            className="p-3.5 rounded-xl bg-[#0a1827] border border-[#22d3ee]/60 shadow-[0_0_12px_rgba(34,211,238,0.15)] transition-colors cursor-pointer relative"
          >
            <div className="absolute top-3 right-3 text-[8px] font-mono font-bold bg-[#22d3ee] text-[#00363e] px-1.5 py-0.5 rounded">
              CORE FOCUS
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#122438] flex items-center justify-center text-[#22d3ee] mb-2.5">
              <Brain className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-white mb-1 font-heading">AI Implementation</div>
            <div className="text-[10px] text-[#94a3b8] line-clamp-2 leading-relaxed mb-2.5">
              Bespoke neural networks and machine learning models tailored to data.
            </div>
            <div className="space-y-1 text-[9px] text-[#bbc9cd]">
              <div className="flex items-center gap-1.5">
                <Check className="w-2.5 h-2.5 text-[#22d3ee]" />
                <span>Generative AI Strategy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-2.5 h-2.5 text-[#22d3ee]" />
                <span>Custom Model Tuning</span>
              </div>
            </div>
          </div>

          {/* Mini Card 3: Corporate Training */}
          <div 
            onClick={() => onSelectService(services[2])}
            className="p-3.5 rounded-xl bg-[#0d1c2d]/70 border border-[#1c2b3c] hover:border-[#273b50] transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#122438] flex items-center justify-center text-[#22d3ee] mb-2.5">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-white mb-1 font-heading">Corporate Training</div>
            <div className="text-[10px] text-[#94a3b8] line-clamp-2 leading-relaxed mb-2.5">
              Upskill your workforce with advanced technical seminars and workshops.
            </div>
            <div className="space-y-1 text-[9px] text-[#bbc9cd]">
              <div className="flex items-center gap-1.5">
                <Check className="w-2.5 h-2.5 text-[#22d3ee]" />
                <span>AI Literacy Workshops</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-2.5 h-2.5 text-[#22d3ee]" />
                <span>Prompt Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExpertiseSection;
