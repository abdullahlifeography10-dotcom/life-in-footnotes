import React, { useEffect, useCallback, useState } from 'react';
import { PhotoFrame } from '../types';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Calendar, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxProps {
  photos: PhotoFrame[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const currentPhoto = photos[currentIndex];

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0); // loop
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(photos.length - 1); // loop
    }
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentPhoto.title}
      className="fixed inset-0 z-50 bg-[#071A12]/98 backdrop-blur-xl flex flex-col justify-between p-4 md:p-6 animate-in fade-in duration-200"
    >
      {/* Top Bar: Title, Index & Close */}
      <div className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-[#A9A77A] font-tech">
            Plate {currentIndex + 1} of {photos.length}
          </span>
          <span className="text-[#344A3B]" aria-hidden="true">·</span>
          <span className="text-xs text-[#B7BDAF]">{currentPhoto.category}</span>
          <span className="hidden lg:inline text-[11px] text-[#A9A77A]/60 font-tech">
            (Use ← → keys or drag to navigate)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 text-[#B7BDAF] hover:text-[#F1EBDD] transition-colors rounded-full hover:bg-[#183526] cursor-pointer"
            title={isZoomed ? 'Zoom Out' : 'Zoom In'}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>
          <a
            href={currentPhoto.imageUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-[#B7BDAF] hover:text-[#F1EBDD] transition-colors rounded-full hover:bg-[#183526]"
            title="Open full resolution in new tab"
          >
            <Maximize2 className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="p-2 text-[#B7BDAF] hover:text-[#F1EBDD] transition-colors rounded-full hover:bg-[#183526] cursor-pointer ml-2"
            aria-label="Close Lightbox (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image View Area */}
      <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-6 z-20 p-3 rounded-full bg-[#071A12]/80 text-[#F1EBDD] hover:bg-[#183526] hover:text-[#A9A77A] hover:scale-105 transition-all cursor-pointer border border-[#344A3B]"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* The Frame Container */}
        <div
          className={`max-w-5xl max-h-[72vh] flex items-center justify-center relative cursor-pointer transition-transform duration-300 ${
            isZoomed ? 'scale-125' : 'scale-100'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={currentPhoto.imageUrl}
            alt={currentPhoto.title}
            referrerPolicy="no-referrer"
            className="max-h-[72vh] max-w-full w-auto h-auto object-contain shadow-2xl rounded-sm transition-all duration-300"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 md:right-6 z-20 p-3 rounded-full bg-[#071A12]/80 text-[#F1EBDD] hover:bg-[#183526] hover:text-[#A9A77A] hover:scale-105 transition-all cursor-pointer border border-[#344A3B]"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Metadata & Caption Area */}
      <div className="w-full max-w-5xl mx-auto border-t border-[#344A3B] pt-3 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <h2 className="font-editorial text-2xl md:text-3xl text-[#F1EBDD] tracking-wide font-normal">
            {currentPhoto.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#B7BDAF] font-light leading-relaxed">
            {currentPhoto.caption}
          </p>
        </div>

        {/* Technical Data (EXIF / Notes) */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#A9A77A] font-tech shrink-0">
          {currentPhoto.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#A9A77A]" />
              <span>{currentPhoto.location}</span>
            </div>
          )}
          {currentPhoto.date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#A9A77A]" />
              <span>{currentPhoto.date}</span>
            </div>
          )}
          {currentPhoto.cameraInfo && (
            <div className="flex items-center gap-1.5 bg-[#183526] px-2.5 py-1 rounded-sm border border-[#344A3B] text-[#F1EBDD]">
              <Camera className="w-3 h-3 text-[#A9A77A]" />
              <span>{currentPhoto.cameraInfo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
