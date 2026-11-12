import React, { useState, useMemo } from 'react';
import { useContent } from '../context/ContentContext';
import { PhotoFrame } from '../types';
import { Camera, MapPin, Search, LayoutGrid, Rows } from 'lucide-react';

interface PortfolioPageProps {
  onOpenLightbox: (photos: PhotoFrame[], index: number) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenLightbox }) => {
  const { content } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Frames');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'masonry' | 'plates'>('masonry');

  // Categories list
  const categories = content.categories;

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    return content.photos.filter((photo) => {
      const matchesCategory =
        selectedCategory === 'All Frames' || photo.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (photo.location && photo.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (photo.cameraInfo && photo.cameraInfo.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [content.photos, selectedCategory, searchQuery]);

  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-6 w-full">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-12 space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#A9A77A] font-tech block">
          Photography Portfolio · Monograph
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#071A12] dark:text-[#F1EBDD] font-normal tracking-tight">
          All Frames & Visual Notes
        </h1>
        <p className="text-sm sm:text-base text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed max-w-2xl">
          Captured between the morning mist of Rajshahi, the salt spray of the Bay of Bengal, and the quiet unnoticed moments of everyday student life. Preserving raw aspect ratios, natural light, and unscripted dignity.
        </p>
      </div>

      {/* Filter Bar & Search & View Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 mb-10 border-b border-[#344A3B]">
        {/* Interactive Filter Tabs (Segmented control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none text-xs font-tech">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === 'All Frames'
                ? content.photos.length
                : content.photos.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-sm transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#A9A77A] text-[#071A12] font-semibold shadow-sm'
                    : 'text-[#435547] dark:text-[#B7BDAF] hover:text-[#071A12] dark:hover:text-[#F1EBDD] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] ${isSelected ? 'text-[#071A12]/80' : 'text-[#A9A77A]'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input & View switcher */}
        <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
          <div className="relative flex-1 lg:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A9A77A]" />
            <input
              type="text"
              placeholder="Search frames, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F1EBDD] dark:bg-[#10291D] border border-[#344A3B] text-xs text-[#071A12] dark:text-[#F1EBDD] pl-8 pr-3 py-1.5 rounded-sm focus:outline-none focus:border-[#A9A77A] placeholder:text-[#B7BDAF]/60 font-tech"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#F1EBDD] dark:bg-[#10291D] p-1 border border-[#344A3B] rounded-sm">
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-1 rounded-sm transition-colors cursor-pointer ${
                viewMode === 'masonry'
                  ? 'bg-[#A9A77A] text-[#071A12]'
                  : 'text-[#435547] dark:text-[#B7BDAF] hover:text-[#071A12] dark:hover:text-[#F1EBDD]'
              }`}
              title="Masonry Gallery"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('plates')}
              className={`p-1 rounded-sm transition-colors cursor-pointer ${
                viewMode === 'plates'
                  ? 'bg-[#A9A77A] text-[#071A12]'
                  : 'text-[#435547] dark:text-[#B7BDAF] hover:text-[#071A12] dark:hover:text-[#F1EBDD]'
              }`}
              title="Monograph Large Plates"
            >
              <Rows className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Photo Count Status */}
      <div className="flex items-center justify-between mb-6 text-xs text-[#A9A77A] font-tech">
        <span>
          Displaying {filteredPhotos.length} of {content.photos.length} frames
        </span>
        <span className="hidden sm:inline">Click any frame to inspect in full-screen Lightbox</span>
      </div>

      {/* No Results Fallback */}
      {filteredPhotos.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-[#344A3B] rounded-sm">
          <Camera className="w-8 h-8 text-[#A9A77A] mx-auto mb-3 opacity-60" />
          <p className="font-editorial text-2xl text-[#071A12] dark:text-[#F1EBDD] mb-1">No frames found</p>
          <p className="text-xs text-[#435547] dark:text-[#B7BDAF] font-tech">
            Try selecting another category or clear your search query.
          </p>
        </div>
      ) : viewMode === 'masonry' ? (
        /* Masonry-Style Image Gallery */
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(filteredPhotos, index)}
              className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-sm bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B]/40 dark:border-[#344A3B] transition-all duration-300 hover:border-[#A9A77A] hover:shadow-2xl"
            >
              {/* Preserves original aspect ratio without distortion */}
              <div className="relative overflow-hidden w-full">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A12]/95 via-[#071A12]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#A9A77A] font-tech mb-1">
                    <span>{photo.category}</span>
                    <span>EXP {String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[#F1EBDD] mb-1 font-normal leading-snug">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#B7BDAF] line-clamp-2 font-light mb-3">
                    {photo.caption}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#A9A77A] font-tech pt-2 border-t border-white/10">
                    {photo.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[120px]">{photo.location}</span>
                      </div>
                    )}
                    {photo.cameraInfo && (
                      <div className="flex items-center gap-1 ml-auto text-white/80">
                        <Camera className="w-3 h-3" />
                        <span className="truncate max-w-[140px]">{photo.cameraInfo}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Minimal caption below frame */}
              <div className="p-3.5 flex items-center justify-between text-xs bg-[#EBE2CF] dark:bg-[#10291D] border-t border-[#344A3B]">
                <span className="truncate font-editorial text-sm text-[#071A12] dark:text-[#F1EBDD] font-medium">
                  {photo.title}
                </span>
                <span className="text-[10px] font-tech text-[#A9A77A] shrink-0 ml-2">
                  {photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Monograph Large Plates View (Editorial Book Spread) */
        <div className="space-y-16 max-w-4xl mx-auto">
          {filteredPhotos.map((photo, index) => (
            <article
              key={photo.id}
              onClick={() => onOpenLightbox(filteredPhotos, index)}
              className="group cursor-pointer bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B]/40 dark:border-[#344A3B] p-6 sm:p-8 rounded-sm shadow-xl space-y-6 hover:border-[#A9A77A] transition-all duration-300"
            >
              <div className="flex items-center justify-between text-xs font-tech text-[#A9A77A] border-b border-[#344A3B] pb-3">
                <span className="uppercase tracking-widest">Plate Nº {String(index + 1).padStart(2, '0')} · {photo.category}</span>
                <span>{photo.date || 'Bengal Archive'}</span>
              </div>

              <div className="relative overflow-hidden rounded-sm bg-[#071A12]/30">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
                <div className="space-y-2 max-w-2xl">
                  <h2 className="font-editorial text-2xl sm:text-3xl text-[#071A12] dark:text-[#F1EBDD]">
                    {photo.title}
                  </h2>
                  <p className="text-sm text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed">
                    {photo.caption}
                  </p>
                </div>

                <div className="text-xs font-tech text-[#A9A77A] space-y-1 text-left md:text-right shrink-0">
                  {photo.location && <div>{photo.location}</div>}
                  {photo.cameraInfo && <div className="text-[#071A12] dark:text-white/80">{photo.cameraInfo}</div>}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
