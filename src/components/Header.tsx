import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Sun, Moon, SlidersHorizontal, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { content, theme, toggleTheme, openStudio } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'travels', label: 'Travels' },
    { id: 'diary', label: 'Notes & Thoughts' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F1EBDD]/95 dark:bg-[#071A12]/95 border-b border-[#344A3B]/30 dark:border-[#344A3B] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer shrink-0 focus-visible:outline-none"
        >
          <span className="font-editorial text-2xl md:text-3xl tracking-tight text-[#071A12] dark:text-[#F1EBDD] transition-colors">
            {content.profile.name}
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`cursor-pointer whitespace-nowrap transition-colors relative py-1 text-sm ${
                  isActive
                    ? 'text-[#071A12] dark:text-[#F1EBDD] font-semibold'
                    : 'text-[#344A3B] dark:text-[#B7BDAF] hover:text-[#071A12] dark:hover:text-[#F1EBDD]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#A9A77A]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action & theme switch */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-full text-[#344A3B] dark:text-[#B7BDAF] hover:text-[#071A12] dark:hover:text-[#F1EBDD] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Switch to Warm Ivory' : 'Switch to Deep Forest'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#A9A77A]" /> : <Moon className="w-4 h-4 text-[#344A3B]" />}
          </button>

          <button
            onClick={openStudio}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs tracking-wider uppercase font-medium text-[#F1EBDD] bg-[#183526] hover:bg-[#204532] border border-[#344A3B] rounded-sm transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            title="Open Content Management Studio"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#A9A77A]" />
            <span>Curator Studio</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#071A12] dark:text-[#F1EBDD] hover:text-[#A9A77A] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#344A3B]/30 dark:border-[#344A3B] bg-[#F1EBDD] dark:bg-[#071A12] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base py-1.5 transition-colors ${
                  activeTab === link.id
                    ? 'text-[#071A12] dark:text-[#F1EBDD] font-semibold'
                    : 'text-[#344A3B] dark:text-[#B7BDAF] hover:text-[#071A12] dark:hover:text-[#F1EBDD]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#344A3B]/30 dark:border-[#344A3B] flex items-center justify-between">
            <span className="text-xs text-[#344A3B] dark:text-[#B7BDAF] font-tech">Rajshahi · Bangladesh</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openStudio();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#F1EBDD] bg-[#183526] hover:bg-[#204532] border border-[#344A3B] rounded-sm"
            >
              <SlidersHorizontal className="w-3 h-3 text-[#A9A77A]" />
              <span>Curator Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
