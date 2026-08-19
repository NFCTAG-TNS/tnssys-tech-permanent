import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Server, Brain, GraduationCap, ArrowRight, BookOpen } from 'lucide-react';
import { ServiceDetail, InsightItem, NavTab } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceDetail[];
  onSelectService: (service: ServiceDetail) => void;
  onNavigate: (tab: NavTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  services,
  onSelectService,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
    s.features.some((f) => f.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#051424]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          className="relative w-full max-w-xl bg-[#0d1c2d] border border-[#1c2b3c] rounded-2xl shadow-2xl shadow-[#010f1f] overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-[#1c2b3c] bg-[#122131]">
            <Search className="w-5 h-5 text-[#22d3ee] shrink-0 mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, AI models, training curricula, or specs..."
              className="w-full bg-transparent text-white placeholder-[#64748b] text-sm focus:outline-none font-sans"
              id="global-search-input"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-[#64748b] hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-4 space-y-2">
            <div className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider px-2 mb-1">
              Core Capabilities & Architecture
            </div>

            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    onSelectService(service);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl bg-[#122131]/60 hover:bg-[#1c2b3c] border border-transparent hover:border-[#22d3ee]/40 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#22d3ee]/10 text-[#22d3ee] flex items-center justify-center shrink-0">
                      {service.category === 'managed_it' && <Server className="w-4 h-4" />}
                      {service.category === 'ai_implementation' && <Brain className="w-4 h-4" />}
                      {service.category === 'corporate_training' && <GraduationCap className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-sm text-white group-hover:text-[#22d3ee] transition-colors">
                        {service.title}
                      </div>
                      <div className="text-xs text-[#94a3b8] line-clamp-1">
                        {service.shortDesc}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#64748b] group-hover:text-[#22d3ee] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-xs font-mono text-[#64748b]">
                No matching systems found for "{query}".
              </div>
            )}

            <div className="pt-2 border-t border-[#1c2b3c] mt-4 flex items-center justify-between text-xs font-mono text-[#64748b] px-2">
              <span>Quick jump:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onNavigate('solutions');
                    onClose();
                  }}
                  className="hover:text-[#22d3ee] transition-colors cursor-pointer"
                >
                  [Solutions]
                </button>
                <button
                  onClick={() => {
                    onNavigate('insight');
                    onClose();
                  }}
                  className="hover:text-[#22d3ee] transition-colors cursor-pointer"
                >
                  [Insight Hub]
                </button>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    onClose();
                  }}
                  className="hover:text-[#22d3ee] transition-colors cursor-pointer"
                >
                  [Contact]
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
