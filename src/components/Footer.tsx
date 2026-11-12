import React from 'react';
import { useContent } from '../context/ContentContext';
import { Instagram, Facebook, Mail, MessageCircle, SlidersHorizontal, ArrowUp } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { content, openStudio } = useContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#F1EBDD] dark:bg-[#10291D] text-[#071A12] dark:text-[#F1EBDD] border-t border-[#344A3B]/30 dark:border-[#344A3B] pt-20 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Minimalist Invitation */}
        <div className="text-center max-w-2xl mx-auto pb-16 border-b border-[#344A3B]/30 dark:border-[#344A3B]">
          <p className="font-editorial text-2xl md:text-3xl lg:text-4xl italic text-[#071A12]/90 dark:text-[#F1EBDD]/90 font-light mb-4">
            “Stay a little. Explore a little. Find your own footnotes.”
          </p>
          <p className="text-xs tracking-widest uppercase text-[#A9A77A] font-tech">
            {content.profile.tagline}
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16">
          {/* Brand & Location */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-editorial text-2xl tracking-wide text-[#071A12] dark:text-[#F1EBDD]">
              {content.profile.name}
            </h3>
            <p className="text-sm text-[#344A3B] dark:text-[#B7BDAF] max-w-sm leading-relaxed font-light">
              {content.profile.description}
            </p>
            <div className="pt-2 text-xs text-[#A9A77A] font-tech space-y-1">
              <div>Based in Rajshahi, Bangladesh</div>
              <div>{content.profile.location}</div>
            </div>
          </div>

          {/* Quick Sections */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#A9A77A] font-medium font-tech">
              Journal Chapters
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-[#344A3B] dark:text-[#B7BDAF]">
              <button
                onClick={() => {
                  setActiveTab('portfolio');
                  scrollToTop();
                }}
                className="text-left hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors cursor-pointer"
              >
                Photography Portfolio (All Frames)
              </button>
              <button
                onClick={() => {
                  setActiveTab('travels');
                  scrollToTop();
                }}
                className="text-left hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors cursor-pointer"
              >
                Travel Journal (Saint Martin, Cox’s Bazar, Sreemangal, Rajshahi)
              </button>
              <button
                onClick={() => {
                  setActiveTab('diary');
                  scrollToTop();
                }}
                className="text-left hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors cursor-pointer"
              >
                Notes & Thoughts (Essays & Reflections)
              </button>
              <button
                onClick={() => {
                  setActiveTab('about');
                  scrollToTop();
                }}
                className="text-left hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors cursor-pointer"
              >
                Behind the Frames (About the Creator)
              </button>
            </div>
          </div>

          {/* Connect & Creator Studio */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#A9A77A] font-medium font-tech">
              Connect
            </h4>
            <div className="flex items-center gap-4 text-[#344A3B] dark:text-[#B7BDAF]">
              <a
                href={`https://instagram.com/${content.profile.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors p-2 rounded-full hover:bg-black/5 dark:hover:bg-[#183526]"
                aria-label="Instagram profile"
                title={`@${content.profile.instagram}`}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors p-2 rounded-full hover:bg-black/5 dark:hover:bg-[#183526]"
                aria-label="Facebook page"
                title={content.profile.facebook}
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${content.profile.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors p-2 rounded-full hover:bg-black/5 dark:hover:bg-[#183526]"
                aria-label="WhatsApp contact"
                title="WhatsApp message"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${content.profile.email}`}
                className="hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors p-2 rounded-full hover:bg-black/5 dark:hover:bg-[#183526]"
                aria-label="Email"
                title={content.profile.email}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={openStudio}
                className="inline-flex items-center gap-2 text-xs text-[#344A3B] dark:text-[#B7BDAF] hover:text-[#071A12] dark:hover:text-[#F1EBDD] border border-[#344A3B] px-3.5 py-1.5 rounded-sm hover:border-[#A9A77A] dark:hover:border-[#A9A77A] transition-colors cursor-pointer bg-[#183526]/30 dark:bg-[#183526]/50"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#A9A77A]" />
                <span>Curator Studio (Manage Content)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#344A3B]/30 dark:border-[#344A3B] flex flex-col sm:flex-row items-center justify-between text-xs text-[#344A3B] dark:text-[#B7BDAF] gap-4 font-tech">
          <div>
            © {new Date().getFullYear()} {content.profile.name}. All frames & stories by{' '}
            <span className="text-[#071A12] dark:text-[#F1EBDD] font-medium">{content.profile.creator}</span>.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors cursor-pointer text-[#A9A77A]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
