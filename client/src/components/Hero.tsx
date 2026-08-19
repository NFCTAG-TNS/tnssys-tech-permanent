import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Shield, Activity, Sparkles, Cpu } from 'lucide-react';
import HeroBackground from './HeroBackground';

interface HeroProps {
  onExploreClick: () => void;
  onStartProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background with Sydney Harbour Bridge & Ambient Cyber Layer */}
      <HeroBackground />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Main Display Headline (matches screen.png) */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase drop-shadow-[0_0_25px_rgba(34,211,238,0.25)] mb-3 sm:mb-4"
        >
          TNSSYS.TECH
        </motion.h1>

        {/* Subtitle with centered bullets (matches screen.png) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-sans text-base sm:text-xl md:text-2xl font-normal text-[#d4e4fa] tracking-wide mb-8 flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
        >
          <span>IT Support</span>
          <span className="text-[#94a3b8] text-sm">•</span>
          <span>AI Integration</span>
          <span className="text-[#94a3b8] text-sm">•</span>
          <span>Training</span>
        </motion.p>

        {/* Hero CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="relative flex flex-col items-center gap-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={onExploreClick}
              className="group relative inline-flex items-center justify-center gap-2 bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-sans font-semibold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] transition-all duration-300 cursor-pointer active:scale-95"
              id="hero-explore-solutions-btn"
            >
              <span>Explore Solutions</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

          </div>

          {/* Glowing subtle light bar under button */}
          <div className="w-48 sm:w-64 h-[2px] bg-gradient-to-r from-transparent via-[#22d3ee]/60 to-transparent mt-1 blur-[0.5px]" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
