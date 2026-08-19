import React from 'react';
import { Home, TrendingUp, Sparkles, AtSign } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'solutions',
      label: 'Solutions',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: 'insight',
      label: 'Insight',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <AtSign className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#020b14]/95 backdrop-blur-xl border-t border-[#122232] px-4 py-2">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#22d3ee]'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              }`}
              id={`bottom-nav-${item.id}`}
            >
              <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                {item.icon}
              </div>
              <span className={`font-mono text-[11px] tracking-wide ${isActive ? 'font-bold text-[#22d3ee]' : 'font-medium text-[#64748b]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
