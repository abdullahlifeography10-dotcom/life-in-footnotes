import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { TravelDestination, PhotoFrame } from '../types';
import { MapPin, Calendar, Compass, ArrowUpRight, CheckCircle2, X } from 'lucide-react';

interface TravelPageProps {
  onOpenLightbox: (photos: PhotoFrame[], index: number) => void;
  selectedDestination: TravelDestination | null;
  onSelectDestination: (dest: TravelDestination | null) => void;
}

export const TravelPage: React.FC<TravelPageProps> = ({
  onOpenLightbox,
  selectedDestination,
  onSelectDestination
}) => {
  const { content, openStudio } = useContent();
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  // Visited places stats
  const visitedCount = content.destinations.filter((d) => d.status === 'Visited').length;

  const handlePinClick = (destTitleKeyword: string) => {
    const dest = content.destinations.find((d) =>
      d.title.toLowerCase().includes(destTitleKeyword.toLowerCase())
    );
    if (dest) {
      onSelectDestination(dest);
    }
  };

  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-6 w-full space-y-16">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#A9A77A] font-tech block">
          Travel Photography Magazine · Monograph
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#071A12] dark:text-[#F1EBDD] font-normal tracking-tight">
          Expeditions & Footsteps
        </h1>
        <p className="text-sm sm:text-base text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed max-w-2xl">
          Visual chronicles across Bangladesh and beyond. Beyond tourist cliches: documenting coastal fishermen at dusk, ancient terracotta riverbanks, and island solitudes where the noise of modernity softens into silence.
        </p>
      </div>

      {/* Visual Map-Style Presentation of Visited Places */}
      <section className="bg-[#F1EBDD] dark:bg-[#10291D] border border-[#344A3B] rounded-sm p-6 md:p-8 space-y-6 shadow-xl transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#344A3B] gap-4">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#A9A77A]" />
            <div>
              <h2 className="font-editorial text-2xl text-[#071A12] dark:text-[#F1EBDD]">
                Visited Places & Bengal Route Map
              </h2>
              <span className="text-xs text-[#435547] dark:text-[#B7BDAF] font-tech">
                {visitedCount} Documented Expeditions across Bangladesh
              </span>
            </div>
          </div>
          <button
            onClick={openStudio}
            className="text-xs font-tech text-[#A9A77A] hover:text-[#071A12] dark:hover:text-[#F1EBDD] border border-[#344A3B] hover:border-[#A9A77A] px-3.5 py-1.5 rounded-sm transition-colors cursor-pointer self-start sm:self-auto bg-[#EBE2CF] dark:bg-[#183526]"
          >
            + Add Destination in Studio
          </button>
        </div>

        {/* Visual Map Canvas / Graphical Route Schematic */}
        <div className="relative w-full h-84 md:h-96 rounded-sm bg-[#071A12] border border-[#344A3B] overflow-hidden flex items-center justify-center">
          {/* Subtle geographical grid lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="travelGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#344A3B" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#travelGrid)" />
            </svg>
          </div>

          {/* Bangladesh Stylized Geographical Silhouette & Bay of Bengal water */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <svg viewBox="0 0 600 500" className="w-full h-full max-w-lg stroke-[#A9A77A] fill-none">
              <path
                d="M 180 80 Q 280 60 380 90 Q 420 180 430 250 Q 490 320 460 410 Q 380 450 300 420 Q 210 390 190 310 Q 150 220 180 80 Z"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <path
                d="M 210 180 Q 260 250 320 300 Q 360 370 380 420"
                stroke="#A9A77A"
                strokeWidth="1.5"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Pin 1: Rajshahi (Northwest) */}
          <div
            className="absolute top-[28%] left-[24%] sm:left-[28%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
            onClick={() => handlePinClick('Rajshahi')}
            onMouseEnter={() => setHoveredPin('Rajshahi')}
            onMouseLeave={() => setHoveredPin(null)}
          >
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#183526] text-[#A9A77A] flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform border-2 border-[#A9A77A]">
                <MapPin className="w-4 h-4 fill-current" />
              </div>
              <span className="mt-1 px-2 py-0.5 bg-[#071A12]/95 border border-[#344A3B] text-[10px] font-tech text-[#F1EBDD] rounded-sm whitespace-nowrap shadow-md">
                Rajshahi (Home Base)
              </span>
            </div>
          </div>

          {/* Pin 2: Sreemangal (Northeast Sylhet Division) */}
          <div
            className="absolute top-[34%] left-[64%] sm:left-[62%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
            onClick={() => handlePinClick('Sreemangal')}
            onMouseEnter={() => setHoveredPin('Sreemangal')}
            onMouseLeave={() => setHoveredPin(null)}
          >
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#183526] text-[#A9A77A] flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform border-2 border-[#A9A77A]">
                <MapPin className="w-4 h-4 fill-current" />
              </div>
              <span className="mt-1 px-2 py-0.5 bg-[#071A12]/95 border border-[#344A3B] text-[10px] font-tech text-[#F1EBDD] rounded-sm whitespace-nowrap shadow-md">
                Sreemangal Tea Valleys
              </span>
            </div>
          </div>

          {/* Pin 3: Cox's Bazar (Southeast Coast) */}
          <div
            className="absolute top-[72%] left-[68%] sm:left-[66%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
            onClick={() => handlePinClick('Cox’s')}
            onMouseEnter={() => setHoveredPin('Cox’s')}
            onMouseLeave={() => setHoveredPin(null)}
          >
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#183526] text-[#A9A77A] flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform border-2 border-[#A9A77A]">
                <MapPin className="w-4 h-4 fill-current" />
              </div>
              <span className="mt-1 px-2 py-0.5 bg-[#071A12]/95 border border-[#344A3B] text-[10px] font-tech text-[#F1EBDD] rounded-sm whitespace-nowrap shadow-md">
                Cox’s Bazar Coast
              </span>
            </div>
          </div>

          {/* Pin 4: Saint Martin Island (Southern Coral Outpost) */}
          <div
            className="absolute top-[85%] left-[78%] sm:left-[74%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
            onClick={() => handlePinClick('Saint Martin')}
            onMouseEnter={() => setHoveredPin('Saint Martin')}
            onMouseLeave={() => setHoveredPin(null)}
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#A9A77A] text-[#071A12] flex items-center justify-center shadow-xl group-hover:scale-125 transition-transform border-2 border-[#F1EBDD] animate-bounce">
                <MapPin className="w-4 h-4 fill-current" />
              </div>
              <span className="mt-1 px-2 py-0.5 bg-[#071A12]/95 border border-[#A9A77A] text-[10px] font-tech text-[#F1EBDD] rounded-sm whitespace-nowrap shadow-md font-semibold">
                Saint Martin Island
              </span>
            </div>
          </div>

          {/* Watermark in corner */}
          <div className="absolute bottom-3 left-3 text-[11px] font-tech text-[#B7BDAF]/60 pointer-events-none">
            20°37'N 92°19'E · Bay of Bengal / Padma Basin · Click any pin to read chronicle
          </div>
        </div>

        {/* Pin shortcuts strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-tech">
          {content.destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="p-3 bg-[#EBE2CF] dark:bg-[#183526] hover:bg-[#A9A77A]/20 border border-[#344A3B] rounded-sm text-left transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A9A77A] shrink-0" />
                <span className="text-[#071A12] dark:text-[#F1EBDD] truncate">{dest.title}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A9A77A] shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* Travel Stories Editorial Collection */}
      <div className="space-y-12">
        <div className="border-b border-[#344A3B] pb-4">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#071A12] dark:text-[#F1EBDD]">
            The Travel Chronicles
          </h2>
          <p className="text-xs text-[#435547] dark:text-[#B7BDAF] font-tech mt-1">
            In-depth personal essays, photo records, and field notes from each destination
          </p>
        </div>

        <div className="space-y-16">
          {content.destinations.map((dest) => (
            <article
              key={dest.id}
              className="bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B]/40 dark:border-[#344A3B] rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300 hover:border-[#A9A77A] shadow-xl"
            >
              {/* Left Column: Big Cover Photograph */}
              <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full overflow-hidden">
                <img
                  src={dest.coverImage}
                  alt={dest.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-4 bg-[#071A12]/90 backdrop-blur-md px-3 py-1 text-xs font-tech text-[#F1EBDD] rounded-sm border border-[#344A3B]">
                  {dest.status} · {dest.travelDate}
                </div>
              </div>

              {/* Right Column: Editorial Article & Notes */}
              <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-tech text-[#A9A77A]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.location}, {dest.country}</span>
                    <span aria-hidden="true">·</span>
                    <span>{dest.coordinates.lat}°N, {dest.coordinates.lng}°E</span>
                  </div>

                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#071A12] dark:text-[#F1EBDD] font-normal leading-tight">
                    {dest.title}
                  </h3>

                  <p className="font-editorial italic text-lg sm:text-xl text-[#071A12]/90 dark:text-[#F1EBDD]/90 font-light border-l-2 border-[#A9A77A] pl-4 py-1">
                    “{dest.summary}”
                  </p>

                  <div className="space-y-3 pt-2 text-sm text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed">
                    {dest.personalExperience.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Photo Gallery Thumbnail Strip */}
                {dest.photoGallery && dest.photoGallery.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-[#344A3B]">
                    <span className="text-[11px] font-tech uppercase tracking-wider text-[#A9A77A]">
                      Visual Field Logs ({dest.photoGallery.length} frames)
                    </span>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {dest.photoGallery.map((imgItem, idx) => (
                        <div
                          key={idx}
                          onClick={() =>
                            onOpenLightbox(
                              dest.photoGallery.map((g, gIdx) => ({
                                id: `${dest.id}-g-${gIdx}`,
                                title: `${dest.title} Frame`,
                                category: 'Travel',
                                imageUrl: g.url,
                                caption: g.caption,
                                location: dest.location
                              })),
                              idx
                            )
                          }
                          className="w-24 h-16 sm:w-32 sm:h-20 shrink-0 rounded-sm overflow-hidden relative cursor-pointer group border border-[#344A3B] hover:border-[#A9A77A] transition-colors"
                        >
                          <img
                            src={imgItem.url}
                            alt={imgItem.caption}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Travel Notes & Memorable Closing Thought */}
                <div className="pt-4 border-t border-[#344A3B] space-y-4">
                  {dest.travelNotes && dest.travelNotes.length > 0 && (
                    <div className="bg-[#EBE2CF] dark:bg-[#10291D] p-4 rounded-sm border border-[#344A3B] space-y-2">
                      <span className="text-xs uppercase tracking-wider text-[#A9A77A] font-tech block">
                        Traveler's Footnotes & Tips
                      </span>
                      <ul className="space-y-1 text-xs text-[#435547] dark:text-[#B7BDAF] font-light">
                        {dest.travelNotes.map((note, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#A9A77A] mt-0.5 font-bold">·</span>
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {dest.closingThought && (
                    <p className="font-editorial italic text-base text-[#071A12]/90 dark:text-[#F1EBDD]/90 text-right">
                      — “{dest.closingThought}”
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Destination Detail Modal (if selected via pin) */}
      {selectedDestination && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#071A12]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-[#F1EBDD] dark:bg-[#10291D] border border-[#344A3B] max-w-3xl w-full rounded-sm max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 text-[#071A12] dark:text-[#F1EBDD] shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-[#A9A77A] font-tech uppercase tracking-widest">
                  {selectedDestination.location}, {selectedDestination.country}
                </span>
                <h2 className="font-editorial text-3xl md:text-4xl text-[#071A12] dark:text-[#F1EBDD]">
                  {selectedDestination.title}
                </h2>
              </div>
              <button
                onClick={() => onSelectDestination(null)}
                className="p-1 text-[#435547] dark:text-[#B7BDAF] hover:text-[#071A12] dark:hover:text-[#F1EBDD] cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <img
              src={selectedDestination.coverImage}
              alt={selectedDestination.title}
              className="w-full h-64 sm:h-80 object-cover rounded-sm border border-[#344A3B]"
            />

            <p className="font-editorial italic text-xl text-[#071A12]/90 dark:text-[#F1EBDD]/90 border-l-2 border-[#A9A77A] pl-4">
              “{selectedDestination.summary}”
            </p>

            <div className="space-y-3 text-sm text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed">
              {selectedDestination.personalExperience.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="bg-[#EBE2CF] dark:bg-[#183526] p-4 rounded-sm border border-[#344A3B] space-y-2">
              <span className="text-xs text-[#A9A77A] font-tech uppercase">Field Notes</span>
              <ul className="text-xs text-[#435547] dark:text-[#B7BDAF] space-y-1">
                {selectedDestination.travelNotes.map((n, idx) => (
                  <li key={idx}>· {n}</li>
                ))}
              </ul>
            </div>

            <p className="font-editorial italic text-base text-right text-[#071A12]/90 dark:text-[#F1EBDD]/90">
              — “{selectedDestination.closingThought}”
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
