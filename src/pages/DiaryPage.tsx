import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { DiaryEntry } from '../types';
import { BookOpen, Calendar, Clock, ChevronLeft, ChevronRight, ArrowLeft, Share2, Check, Type } from 'lucide-react';

interface DiaryPageProps {
  selectedEntry: DiaryEntry | null;
  onSelectEntry: (entry: DiaryEntry | null) => void;
}

export const DiaryPage: React.FC<DiaryPageProps> = ({ selectedEntry, onSelectEntry }) => {
  const { content } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [largerType, setLargerType] = useState(false);

  const categories = [
    'All',
    'Life Notes',
    'Reflections',
    'Memories',
    'Random Thoughts',
    'Letters to Time',
    'Everyday Stories'
  ];

  // Filtered entries
  const filteredEntries =
    selectedCategory === 'All'
      ? content.diaryEntries
      : content.diaryEntries.filter((e) => e.category === selectedCategory);

  // Reading progress tracker for selected entry
  useEffect(() => {
    if (!selectedEntry) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedEntry]);

  // Current entry index and adjacent navigation
  const currentIndex = selectedEntry
    ? content.diaryEntries.findIndex((e) => e.id === selectedEntry.id)
    : -1;
  const prevEntry = currentIndex > 0 ? content.diaryEntries[currentIndex - 1] : null;
  const nextEntry =
    currentIndex >= 0 && currentIndex < content.diaryEntries.length - 1
      ? content.diaryEntries[currentIndex + 1]
      : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // If reading a specific long-form article
  if (selectedEntry) {
    return (
      <div className="w-full">
        {/* Subtle Reading Progress Bar pinned at top */}
        <div
          className="fixed top-20 left-0 h-[2.5px] bg-[#A9A77A] z-40 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <article className="max-w-3xl mx-auto px-6 py-12 md:py-20 space-y-10">
          {/* Back Navigation Bar with Reading Tools */}
          <div className="flex items-center justify-between border-b border-[#344A3B] pb-4 text-xs font-tech text-[#A9A77A]">
            <button
              onClick={() => {
                onSelectEntry(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Notes & Thoughts</span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setLargerType(!largerType)}
                className="flex items-center gap-1 hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors cursor-pointer"
                title="Toggle Reading Font Size"
              >
                <Type className="w-3.5 h-3.5" />
                <span>{largerType ? 'Standard Text' : 'Larger Type'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-[#071A12] dark:hover:text-[#F1EBDD] transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Article Header */}
          <header className="space-y-6 pt-4">
            <div className="flex items-center gap-2 text-xs font-tech text-[#A9A77A]">
              <span className="uppercase tracking-widest">{selectedEntry.category}</span>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{selectedEntry.date}</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{selectedEntry.readTime}</span>
              </div>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#071A12] dark:text-[#F1EBDD] font-normal leading-[1.02] tracking-tight text-balance">
              {selectedEntry.title}
            </h1>

            <p className="font-editorial italic text-xl sm:text-2xl text-[#071A12]/85 dark:text-[#F1EBDD]/85 font-light leading-relaxed border-l-2 border-[#A9A77A] pl-4 py-1">
              “{selectedEntry.excerpt}”
            </p>
          </header>

          {/* Optional Cover Image */}
          {selectedEntry.coverImage && (
            <div className="my-8 rounded-sm overflow-hidden border border-[#344A3B] shadow-xl">
              <img
                src={selectedEntry.coverImage}
                alt={selectedEntry.title}
                className="w-full h-auto max-h-[520px] object-cover"
              />
            </div>
          )}

          {/* Long-Form Article Prose with Editorial Dropcap */}
          <div className={`space-y-6 font-light leading-relaxed font-sans text-[#071A12] dark:text-[#F1EBDD]/90 ${largerType ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
            {selectedEntry.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? 'editorial-dropcap' : ''}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Closing Epilogue Quote */}
          {selectedEntry.closingQuote && (
            <div className="my-12 py-8 border-y border-[#344A3B] text-center space-y-2">
              <p className="font-editorial italic text-2xl sm:text-3xl text-[#071A12] dark:text-[#F1EBDD] font-light">
                “{selectedEntry.closingQuote}”
              </p>
              <span className="text-xs font-tech text-[#A9A77A] uppercase tracking-widest block">
                — Life in Footnotes · Rajshahi
              </span>
            </div>
          )}

          {/* Previous and Next Navigation */}
          <nav className="pt-8 border-t border-[#344A3B] grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevEntry ? (
              <button
                onClick={() => {
                  onSelectEntry(prevEntry);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 bg-[#F1EBDD] dark:bg-[#183526] hover:bg-[#EBE2CF] dark:hover:bg-[#10291D] border border-[#344A3B] rounded-sm text-left transition-colors cursor-pointer group space-y-1 shadow-sm"
              >
                <div className="flex items-center gap-1 text-xs font-tech text-[#A9A77A]">
                  <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>Previous Entry</span>
                </div>
                <div className="font-editorial text-lg text-[#071A12] dark:text-[#F1EBDD] line-clamp-1 group-hover:text-[#A9A77A] transition-colors">
                  {prevEntry.title}
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextEntry ? (
              <button
                onClick={() => {
                  onSelectEntry(nextEntry);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 bg-[#F1EBDD] dark:bg-[#183526] hover:bg-[#EBE2CF] dark:hover:bg-[#10291D] border border-[#344A3B] rounded-sm text-right transition-colors cursor-pointer group space-y-1 shadow-sm"
              >
                <div className="flex items-center justify-end gap-1 text-xs font-tech text-[#A9A77A]">
                  <span>Next Entry</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="font-editorial text-lg text-[#071A12] dark:text-[#F1EBDD] line-clamp-1 group-hover:text-[#A9A77A] transition-colors">
                  {nextEntry.title}
                </div>
              </button>
            ) : (
              <div />
            )}
          </nav>

          {/* Related Articles from the Journal */}
          <div className="pt-10 border-t border-[#344A3B] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-2xl text-[#071A12] dark:text-[#F1EBDD]">
                Related Journal Notes
              </h3>
              <button
                onClick={() => {
                  onSelectEntry(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-tech text-[#A9A77A] hover:underline cursor-pointer"
              >
                View All Entries
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.diaryEntries
                .filter((e) => e.id !== selectedEntry.id)
                .slice(0, 2)
                .map((related) => (
                  <article
                    key={related.id}
                    onClick={() => {
                      onSelectEntry(related);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-5 bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B] rounded-sm hover:border-[#A9A77A] transition-all cursor-pointer group shadow-xs space-y-2"
                  >
                    <div className="text-[11px] font-tech text-[#A9A77A]">
                      {related.category} · {related.readTime}
                    </div>
                    <h4 className="font-editorial text-xl text-[#071A12] dark:text-[#F1EBDD] group-hover:text-[#A9A77A] transition-colors leading-snug">
                      {related.title}
                    </h4>
                    <p className="text-xs text-[#435547] dark:text-[#B7BDAF] line-clamp-2 font-light">
                      {related.excerpt}
                    </p>
                  </article>
                ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Otherwise, Catalog View of all Notes & Thoughts
  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-6 w-full space-y-12">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#A9A77A] font-tech block">
          Personal Diary · Essays & Fragments
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#071A12] dark:text-[#F1EBDD] font-normal tracking-tight">
          Notes & Thoughts
        </h1>
        <p className="text-sm sm:text-base text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed max-w-2xl">
          The introspective and emotional heart of Life in Footnotes. Philosophical reflections on passing youth, the things I intentionally choose not to photograph, and memories gathered in the margins.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[#344A3B] scrollbar-none text-xs font-tech">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-[#A9A77A] text-[#071A12] font-semibold shadow-sm'
                  : 'text-[#435547] dark:text-[#B7BDAF] hover:text-[#071A12] dark:hover:text-[#F1EBDD] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEntries.map((entry) => (
          <article
            key={entry.id}
            onClick={() => {
              onSelectEntry(entry);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group cursor-pointer bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B]/40 dark:border-[#344A3B] p-6 md:p-8 rounded-sm flex flex-col justify-between transition-all duration-300 hover:border-[#A9A77A] hover:shadow-2xl"
          >
            <div className="space-y-4">
              {entry.coverImage && (
                <div className="aspect-[16/10] overflow-hidden rounded-sm bg-[#071A12]/40">
                  <img
                    src={entry.coverImage}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-[#A9A77A] font-tech">
                <span>{entry.category}</span>
                <span aria-hidden="true">·</span>
                <span>{entry.date}</span>
                <span aria-hidden="true">·</span>
                <span>{entry.readTime}</span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl text-[#071A12] dark:text-[#F1EBDD] group-hover:text-[#A9A77A] transition-colors leading-snug">
                {entry.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed line-clamp-3">
                {entry.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#344A3B] flex items-center justify-between text-xs text-[#A9A77A] font-tech">
              <span>Read Full Essay</span>
              <BookOpen className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
