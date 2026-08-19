import React from 'react';
import { ShieldCheck, Activity, ArrowUp, ArrowRight, Terminal } from 'lucide-react';
import Logo from './Logo';
import { NavTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  onOpenProjectModal: (initialType?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenProjectModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#010f1f] border-t border-[#1c2b3c] text-[#94a3b8] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Logo />
            <p className="text-xs sm:text-sm font-sans text-[#bbc9cd] leading-relaxed max-w-sm">
              We engineer mission-critical systems that prevent downtime and bespoke AI architectures that capitalize on enterprise opportunities before they vanish.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-[#64748b] pt-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </span>
              <span>•</span>
              <span>Sydney / Global Edge</span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="text-white uppercase tracking-wider font-bold">Solutions Matrix</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="hover:text-[#22d3ee] transition-colors cursor-pointer text-left"
                >
                  › Managed IT Infrastructure
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="hover:text-[#22d3ee] transition-colors cursor-pointer text-left"
                >
                  › AI Implementation (Core Focus)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solutions')}
                  className="hover:text-[#22d3ee] transition-colors cursor-pointer text-left"
                >
                  › Corporate Technical Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('insight')}
                  className="hover:text-[#22d3ee] transition-colors cursor-pointer text-left"
                >
                  › AI Readiness Diagnostic Audit
                </button>
              </li>
            </ul>
          </div>

          {/* Scoping CTA Col */}
          <div className="md:col-span-4 bg-[#0d1c2d] border border-[#1c2b3c] p-6 rounded-xl space-y-3">
            <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#22d3ee]" />
              Start an Architecture Review
            </h4>
            <p className="text-xs text-[#94a3b8]">
              Receive a comprehensive infrastructure assessment and AI integration timeline tailored to your enterprise.
            </p>
            <button
              onClick={() => onOpenProjectModal()}
              className="w-full bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Launch Project Scoper</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1c2b3c]/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#64748b]">
          <div>
            © {new Date().getFullYear()} Titanium Solutions (TNSSYS.TECH). All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="hover:text-[#22d3ee] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
