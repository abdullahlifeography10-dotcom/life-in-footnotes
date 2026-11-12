/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ContentProvider, useContent } from './context/ContentContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Lightbox } from './components/Lightbox';
import { CuratorStudioModal } from './components/CuratorStudioModal';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { TravelPage } from './pages/TravelPage';
import { DiaryPage } from './pages/DiaryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PhotoFrame, TravelDestination, DiaryEntry } from './types';

const AppInner: React.FC = () => {
  const { theme } = useContent();
  const [activeTab, setActiveTab] = useState<string>('home');

  // Lightbox State
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    photos: PhotoFrame[];
    currentIndex: number;
  }>({
    isOpen: false,
    photos: [],
    currentIndex: 0
  });

  // Selected details state
  const [selectedDestination, setSelectedDestination] = useState<TravelDestination | null>(null);
  const [selectedDiaryEntry, setSelectedDiaryEntry] = useState<DiaryEntry | null>(null);

  const handleOpenLightbox = (photos: PhotoFrame[], index: number) => {
    setLightboxState({
      isOpen: true,
      photos,
      currentIndex: index
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleNavigateLightbox = (index: number) => {
    setLightboxState((prev) => ({ ...prev, currentIndex: index }));
  };

  const handleSelectDestination = (dest: TravelDestination | null) => {
    setSelectedDestination(dest);
    if (dest && activeTab !== 'travels') {
      setActiveTab('travels');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectDiaryEntry = (entry: DiaryEntry | null) => {
    setSelectedDiaryEntry(entry);
    if (entry && activeTab !== 'diary') {
      setActiveTab('diary');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#071A12] text-[#F1EBDD]'
          : 'bg-[#F1EBDD] text-[#071A12]'
      }`}
    >
      {/* Top Bar Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onOpenLightbox={handleOpenLightbox}
            onSelectDestination={handleSelectDestination}
            onSelectDiaryEntry={handleSelectDiaryEntry}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioPage onOpenLightbox={handleOpenLightbox} />
        )}

        {activeTab === 'travels' && (
          <TravelPage
            onOpenLightbox={handleOpenLightbox}
            selectedDestination={selectedDestination}
            onSelectDestination={setSelectedDestination}
          />
        )}

        {activeTab === 'diary' && (
          <DiaryPage
            selectedEntry={selectedDiaryEntry}
            onSelectEntry={setSelectedDiaryEntry}
          />
        )}

        {activeTab === 'about' && <AboutPage />}

        {activeTab === 'contact' && <ContactPage />}
      </main>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        photos={lightboxState.photos}
        currentIndex={lightboxState.currentIndex}
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
      />

      {/* Lightweight Content Management Studio Modal */}
      <CuratorStudioModal />

      {/* Editorial Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default function App() {
  return (
    <ContentProvider>
      <AppInner />
    </ContentProvider>
  );
}
