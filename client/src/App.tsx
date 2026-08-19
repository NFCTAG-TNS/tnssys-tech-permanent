/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ExpertiseSection from './components/ExpertiseSection';
import SolutionsMatrix from './components/SolutionsMatrix';
import InsightHub from './components/InsightHub';
import ContactView from './components/ContactView';
import ProjectModal from './components/ProjectModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import SearchModal from './components/SearchModal';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import AppointmentAgentEmbed from './components/AppointmentAgentEmbed';

import { SERVICES_DATA } from './data/servicesData';
import { NavTab, ServiceDetail } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectModalInitialType, setProjectModalInitialType] = useState('IT Support');
  
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Scroll to top when changing tabs
  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProjectModal = (initialType?: string) => {
    if (initialType) {
      setProjectModalInitialType(initialType);
    } else {
      setProjectModalInitialType('IT Support');
    }
    setIsProjectModalOpen(true);
  };

  const handleExploreService = (service: ServiceDetail) => {
    setSelectedService(service);
  };

  const handleScrollToExpertise = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('expertise-section');
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById('expertise-section');
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#051424] text-[#d4e4fa] flex flex-col selection:bg-[#22d3ee] selection:text-[#051424] pb-16 md:pb-0 font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onChangeTab={handleTabChange}
        onOpenProjectModal={() => handleOpenProjectModal()}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Body based on Active Tab */}
      <main className="flex-grow pt-20">
        {activeTab === 'home' && (
          <>
            <Hero
              onExploreClick={handleScrollToExpertise}
              onStartProject={() => handleOpenProjectModal('Full Infrastructure Audit')}
            />

            <AppointmentAgentEmbed />

            <ExpertiseSection
              services={SERVICES_DATA}
              onSelectService={handleExploreService}
              onStartProject={(type) => handleOpenProjectModal(type)}
              onViewAllSolutions={() => handleTabChange('solutions')}
            />
          </>
        )}

        {activeTab === 'solutions' && (
          <SolutionsMatrix
            services={SERVICES_DATA}
            onStartProject={(type) => handleOpenProjectModal(type)}
          />
        )}

        {activeTab === 'insight' && (
          <InsightHub
            onStartProject={(type) => handleOpenProjectModal(type)}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView
            onOpenProjectModal={() => handleOpenProjectModal()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleTabChange}
        onOpenProjectModal={(type) => handleOpenProjectModal(type)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={handleTabChange}
      />

      {/* "Start a Project" Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        initialType={projectModalInitialType}
      />

      {/* Detailed Architecture Service Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onStartProject={(type) => {
          setSelectedService(null);
          handleOpenProjectModal(type);
        }}
      />

      {/* Quick Search Palette Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        services={SERVICES_DATA}
        onSelectService={handleExploreService}
        onNavigate={handleTabChange}
      />
    </div>
  );
};

export default App;
