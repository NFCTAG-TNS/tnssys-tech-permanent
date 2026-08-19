import React, { useState } from 'react';
import { Search, Menu, X, Terminal, ArrowRight, Shield } from 'lucide-react';
import Logo from './Logo';
import { NavTab } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  onOpenProjectModal: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onChangeTab,
  onOpenProjectModal,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'insight', label: 'Insight' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onChangeTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#051424]/60 backdrop-blur-lg border-b border-[#1c2b3c]/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="text-left bg-transparent border-none cursor-pointer p-0"
        >
          <Logo />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#22d3ee] font-semibold'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
                id={`desktop-nav-${link.id}`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#22d3ee] shadow-[0_0_8px_#22d3ee]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Search Button (Desktop) */}
          <button
            onClick={onOpenSearch}
            className="hidden md:flex w-10 h-10 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] hover:border-[#22d3ee]/60 text-[#94a3b8] hover:text-[#22d3ee] items-center justify-center transition-all cursor-pointer"
            title="Search Solutions & Docs"
            aria-label="Search"
            id="global-search-btn"
          >
            <Search className="w-4 h-4" />
          </button>


          {/* Start a Project Primary CTA Button (Desktop) */}
          <button
            onClick={onOpenProjectModal}
            className="hidden md:inline-flex items-center gap-2 bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-200 cursor-pointer active:scale-95"
            id="header-start-project-btn"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger (matches screen.png with clean 3 lines) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#22d3ee] transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#051424]/98 border-b border-[#1c2b3c] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-2 font-mono text-sm uppercase tracking-wider">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === link.id
                    ? 'bg-[#122131] text-[#22d3ee] font-semibold border-l-2 border-[#22d3ee]'
                    : 'text-[#94a3b8] hover:text-white hover:bg-[#0d1c2d]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1c2b3c] space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="w-full bg-[#22d3ee] text-[#00363e] font-mono text-xs font-bold uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#64748b] pt-2">
              <Shield className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>ISO 27001 & SOC-2 Architecture</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
