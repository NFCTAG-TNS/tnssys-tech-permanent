import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Brain, 
  GraduationCap, 
  ShieldCheck, 
  Cpu, 
  Check, 
  ArrowRight, 
  Layers, 
  Sliders, 
  Sparkles,
  Database,
  Cloud,
  Lock,
  Workflow
} from 'lucide-react';
import { ServiceDetail } from '../types';

interface SolutionsMatrixProps {
  services: ServiceDetail[];
  onStartProject: (initialType: string) => void;
}

export const SolutionsMatrix: React.FC<SolutionsMatrixProps> = ({
  services,
  onStartProject,
}) => {
  // Estimator state
  const [infrastructureType, setInfrastructureType] = useState<'cloud' | 'hybrid' | 'on-prem'>('cloud');
  const [aiCapability, setAiCapability] = useState<'rag' | 'finetuned' | 'automation' | 'vision'>('rag');
  const [teamSize, setTeamSize] = useState<number>(25);

  const getEstimatedTimeline = () => {
    let weeks = 2;
    if (infrastructureType === 'hybrid') weeks += 1;
    if (infrastructureType === 'on-prem') weeks += 2;
    if (aiCapability === 'finetuned') weeks += 3;
    if (aiCapability === 'automation') weeks += 2;
    return `${weeks} - ${weeks + 2} Weeks`;
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22d3ee] tracking-widest uppercase mb-3 bg-[#0d1c2d] px-3.5 py-1.5 rounded-full border border-[#1c2b3c]">
          <Layers className="w-3.5 h-3.5" />
          <span>Enterprise Technical Matrix</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Engineered for <span className="text-[#22d3ee]">Absolute Precision.</span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#94a3b8] leading-relaxed">
          Explore our end-to-end technical ecosystems—from proactive Zero-Trust IT maintenance to sovereign enterprise AI deployments and high-impact workforce training.
        </p>
      </div>

      {/* Deep-Dive Service Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className={`rounded-xl bg-[#0d1c2d] p-6 sm:p-8 flex flex-col justify-between ${
              service.isCoreFocus
                ? 'border-2 border-[#22d3ee] shadow-[0_0_25px_rgba(34,211,238,0.2)]'
                : 'border border-[#1c2b3c]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#22d3ee]/10 border border-[#22d3ee]/30 flex items-center justify-center text-[#22d3ee]">
                  {service.category === 'managed_it' && <Server className="w-5 h-5" />}
                  {service.category === 'ai_implementation' && <Brain className="w-5 h-5" />}
                  {service.category === 'corporate_training' && <GraduationCap className="w-5 h-5" />}
                </div>
                {service.isCoreFocus && (
                  <span className="bg-[#22d3ee] text-[#00363e] font-mono text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                    CORE FOCUS
                  </span>
                )}
              </div>

              <h2 className="font-heading text-2xl font-bold text-white mb-2">
                {service.title}
              </h2>
              <p className="font-sans text-sm text-[#94a3b8] leading-relaxed mb-6">
                {service.fullDesc}
              </p>

              <div className="border-t border-[#1c2b3c] pt-4 mb-6">
                <h4 className="font-mono text-xs text-[#22d3ee] uppercase tracking-wider mb-3">
                  Technical Specifications
                </h4>
                <div className="space-y-2">
                  {service.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#bbc9cd]">
                      <span className="text-[#22d3ee] font-bold">›</span>
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => onStartProject(service.title)}
              className="w-full bg-[#122131] hover:bg-[#22d3ee] hover:text-[#00363e] text-white font-mono text-xs uppercase tracking-wider py-3 rounded-lg border border-[#1c2b3c] hover:border-[#22d3ee] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Initiate {service.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Architecture & Scope Estimator */}
      <div className="bg-[#0d1c2d] border border-[#1c2b3c] rounded-2xl p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-mono text-[#22d3ee] tracking-widest uppercase mb-2">
          <Sliders className="w-4 h-4" />
          <span>Interactive Architecture Scoper</span>
        </div>

        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
          Calculate Your Deployment Roadmap
        </h3>
        <p className="font-sans text-sm text-[#94a3b8] mb-8 max-w-2xl">
          Customize your target enterprise parameters to simulate estimated deployment cadence and technical requirements.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Cloud Infra Parameter */}
          <div className="bg-[#122131] border border-[#1c2b3c] p-5 rounded-xl">
            <label className="block text-xs font-mono text-[#94a3b8] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cloud className="w-4 h-4 text-[#22d3ee]" />
              Cloud Environment
            </label>
            <div className="space-y-2">
              {(['cloud', 'hybrid', 'on-prem'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setInfrastructureType(mode)}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-mono uppercase tracking-wide transition-all ${
                    infrastructureType === mode
                      ? 'bg-[#22d3ee] text-[#00363e] font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                      : 'bg-[#0d1c2d] text-[#bbc9cd] hover:text-white'
                  }`}
                >
                  {mode === 'cloud' && 'Cloud Native (AWS / GCP / Azure)'}
                  {mode === 'hybrid' && 'Hybrid Multi-Cloud'}
                  {mode === 'on-prem' && 'Air-Gapped Sovereign On-Prem'}
                </button>
              ))}
            </div>
          </div>

          {/* AI Capability Parameter */}
          <div className="bg-[#122131] border border-[#1c2b3c] p-5 rounded-xl">
            <label className="block text-xs font-mono text-[#94a3b8] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#22d3ee]" />
              Target AI Model Scope
            </label>
            <div className="space-y-2">
              {(['rag', 'finetuned', 'automation', 'vision'] as const).map((ai) => (
                <button
                  key={ai}
                  onClick={() => setAiCapability(ai)}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-mono uppercase tracking-wide transition-all ${
                    aiCapability === ai
                      ? 'bg-[#22d3ee] text-[#00363e] font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                      : 'bg-[#0d1c2d] text-[#bbc9cd] hover:text-white'
                  }`}
                >
                  {ai === 'rag' && 'Enterprise RAG Search'}
                  {ai === 'finetuned' && 'Fine-Tuned Domain LLM'}
                  {ai === 'automation' && 'Autonomous Process Agents'}
                  {ai === 'vision' && 'Predictive Analytics Engine'}
                </button>
              ))}
            </div>
          </div>

          {/* Team Upskill Scale */}
          <div className="bg-[#122131] border border-[#1c2b3c] p-5 rounded-xl flex flex-col justify-between">
            <div>
              <label className="block text-xs font-mono text-[#94a3b8] uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#22d3ee]" />
                Workforce Training Size
              </label>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#bbc9cd]">Engineers & Staff</span>
                <span className="text-[#22d3ee] font-bold text-sm">{teamSize} Persons</span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-[#22d3ee] cursor-pointer bg-[#0d1c2d]"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-[#1c2b3c] font-mono text-[11px] text-[#64748b]">
              Includes hands-on Prompt Engineering labs and AI Safety governance certificate.
            </div>
          </div>
        </div>

        {/* Calculated Scope Output Bar */}
        <div className="bg-[#051424] border border-[#1c2b3c] rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-mono text-[#64748b] uppercase tracking-wider">
              Calculated Deployment Cadence
            </div>
            <div className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-[#22d3ee]">{getEstimatedTimeline()}</span>
              <span className="text-xs font-mono text-[#bbc9cd] font-normal">to Production SLA</span>
            </div>
          </div>

          <button
            onClick={() => onStartProject(`Custom ${aiCapability.toUpperCase()} + ${infrastructureType.toUpperCase()} Deployment`)}
            className="bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            <span>Lock In Architecture Scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionsMatrix;
