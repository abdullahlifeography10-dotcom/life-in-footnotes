import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ArrowUpRight, Camera, Compass, BookOpen, MapPin, Calendar, Volume2, VolumeX, Sparkles, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { PhotoFrame, TravelDestination, DiaryEntry } from '../types';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onOpenLightbox: (photos: PhotoFrame[], index: number) => void;
  onSelectDestination: (dest: TravelDestination) => void;
  onSelectDiaryEntry: (entry: DiaryEntry) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onOpenLightbox,
  onSelectDestination,
  onSelectDiaryEntry
}) => {
  const { content, openStudio } = useContent();
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Hero background selection state
  const heroScenes = [
    {
      id: 'padma',
      name: 'Padma Riverbank · Dusk',
      url: '/src/assets/images/hero_cinematic_landscape_1794416270443.jpg',
      location: 'Rajshahi, Bangladesh'
    },
    {
      id: 'sreemangal',
      name: 'Misty Tea Terraces · Dawn',
      url: '/src/assets/images/sreemangal_misty_tea_estate_1794422948952.jpg',
      location: 'Sreemangal, Sylhet'
    },
    {
      id: 'saintmartin',
      name: 'Coral Outpost · Afternoon',
      url: '/src/assets/images/saint_martin_island_1794416271307.jpg',
      location: 'Saint Martin Island'
    }
  ];

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const activeHero = heroScenes[activeHeroIdx];

  const featuredFrames = content.photos.filter((p) => p.featuredOnHome).slice(0, 6);
  const featuredTravels = content.destinations.slice(0, 3);
  const featuredDiary = content.diaryEntries.filter((d) => d.featuredOnHome).slice(0, 3);

  // Soft ambient river breeze using Web Audio API
  const toggleAmbientSound = () => {
    if (ambientPlaying) {
      if (audioContext) {
        audioContext.close();
        setAudioContext(null);
      }
      setAmbientPlaying(false);
    } else {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 0.15;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start(0);

        setAudioContext(ctx);
        setAmbientPlaying(true);
      } catch (err) {
        console.warn('AudioContext not supported or allowed', err);
      }
    }
  };

  return (
    <div className="w-full film-grain">
      {/* 1. CINEMATIC IMMERSIVE HERO SECTION */}
      <section className="relative w-full min-h-[94vh] flex items-end justify-start overflow-hidden">
        {/* Full-width Background Landscape Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeHero.url}
            alt={activeHero.name}
            className="w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.08] transition-all duration-1000 ease-out"
          />
          {/* Measured Deep Forest Editorial Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A12] via-[#071A12]/60 to-black/30" />
        </div>

        {/* Top Magazine Masthead Ribbon */}
        <div className="absolute top-6 left-6 right-6 z-20 hidden md:flex items-center justify-between text-[11px] font-tech uppercase tracking-[0.2em] text-[#F1EBDD]/75 border-b border-[#344A3B]/40 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-[#A9A77A]">Issue Nº 04</span>
            <span aria-hidden="true" className="text-[#344A3B]">·</span>
            <span>Independent Photography Magazine</span>
            <span aria-hidden="true" className="text-[#344A3B]">·</span>
            <span>Rajshahi, Bangladesh</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleAmbientSound}
              className="flex items-center gap-1.5 text-[#A9A77A] hover:text-[#F1EBDD] transition-colors cursor-pointer"
              title="Toggle subtle ambient river breeze"
            >
              {ambientPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#A9A77A]" />
                  <span className="text-[#A9A77A]">River Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#B7BDAF]" />
                  <span className="text-[#B7BDAF]">River Sound Off</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-36 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#A9A77A] font-tech">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Photography · Places · Personal Stories</span>
            </div>

            <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F1EBDD] font-normal tracking-tight leading-[0.92] text-balance">
              {content.profile.heroHeadline}
            </h1>

            <p className="font-editorial italic text-2xl sm:text-3xl text-[#F1EBDD]/90 font-light leading-snug">
              “{content.profile.heroSubtitle}”
            </p>

            <p className="text-sm sm:text-base text-[#B7BDAF] max-w-xl font-light leading-relaxed">
              {content.profile.heroSupportingText}
            </p>

            {/* Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setActiveTab('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-[#A9A77A] hover:bg-[#b8b688] text-[#071A12] font-semibold text-xs tracking-wider uppercase rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-2 group shadow-xl"
              >
                <span>Explore My World</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('diary');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-[#183526]/80 hover:bg-[#183526] text-[#F1EBDD] border border-[#344A3B] font-medium text-xs tracking-wider uppercase rounded-sm transition-all duration-200 cursor-pointer backdrop-blur-sm"
              >
                Read My Stories
              </button>
            </div>
          </div>
        </div>

        {/* Hero Scene Switcher Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-[#071A12]/80 backdrop-blur-md p-1.5 rounded-sm border border-[#344A3B] text-xs font-tech">
          {heroScenes.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setActiveHeroIdx(idx)}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                activeHeroIdx === idx
                  ? 'bg-[#A9A77A] text-[#071A12] font-semibold'
                  : 'text-[#B7BDAF] hover:text-[#F1EBDD]'
              }`}
            >
              0{idx + 1}
            </button>
          ))}
          <span className="hidden sm:inline text-[11px] text-[#A9A77A] pl-1 pr-2">
            {activeHero.name}
          </span>
        </div>
      </section>

      {/* Marquee Filmstrip Ticker Ribbon */}
      <div className="w-full bg-[#071A12] border-y border-[#344A3B] py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-xs font-tech uppercase tracking-[0.25em] text-[#A9A77A]/80 flex gap-8">
          <span>Padma Riverbank at Twilight</span>
          <span>·</span>
          <span>Saint Martin Coral Outpost</span>
          <span>·</span>
          <span>Cox’s Bazar Shoreline</span>
          <span>·</span>
          <span>Sreemangal Tea Terraces</span>
          <span>·</span>
          <span>35mm Kodak Portra Grain</span>
          <span>·</span>
          <span>Unnoticed Footnotes of Everyday Life</span>
          <span>·</span>
          <span>Padma Riverbank at Twilight</span>
          <span>·</span>
          <span>Saint Martin Coral Outpost</span>
          <span>·</span>
          <span>Cox’s Bazar Shoreline</span>
          <span>·</span>
          <span>Sreemangal Tea Terraces</span>
          <span>·</span>
          <span>35mm Kodak Portra Grain</span>
          <span>·</span>
          <span>Unnoticed Footnotes of Everyday Life</span>
        </div>
      </div>

      {/* 2. FEATURED PHOTOGRAPHY (Asymmetric Monograph Grid) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#344A3B]/30 dark:border-[#344A3B] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-tech text-[#A9A77A] uppercase tracking-widest mb-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>Chapter I · Visual Gallery</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#071A12] dark:text-[#F1EBDD] font-normal tracking-wide">
              Featured Photography
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs uppercase tracking-wider text-[#A9A77A] hover:text-[#071A12] dark:hover:text-[#F1EBDD] font-tech flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View All Frames ({content.photos.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Lead Photo (7 cols) */}
          {featuredFrames[0] && (
            <div
              onClick={() => onOpenLightbox(featuredFrames, 0)}
              className="md:col-span-7 group cursor-pointer relative overflow-hidden rounded-sm bg-[#10291D] border border-[#344A3B] shadow-xl hover:border-[#A9A77A] transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={featuredFrames[0].imageUrl}
                  alt={featuredFrames[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A12]/95 via-[#071A12]/35 to-transparent opacity-90 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#A9A77A] font-tech mb-1">
                    <span>{featuredFrames[0].category} · {featuredFrames[0].location}</span>
                    <span>EXP 01</span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#F1EBDD] mb-1">
                    {featuredFrames[0].title}
                  </h3>
                  <p className="text-xs text-[#B7BDAF] line-clamp-2 font-light">
                    {featuredFrames[0].caption}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Photo Stack (5 cols) */}
          {featuredFrames[1] && (
            <div
              onClick={() => onOpenLightbox(featuredFrames, 1)}
              className="md:col-span-5 group cursor-pointer relative overflow-hidden rounded-sm bg-[#10291D] border border-[#344A3B] flex flex-col justify-end shadow-xl hover:border-[#A9A77A] transition-all duration-300"
            >
              <div className="relative aspect-[4/3] md:h-full overflow-hidden">
                <img
                  src={featuredFrames[1].imageUrl}
                  alt={featuredFrames[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A12]/95 via-[#071A12]/35 to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#A9A77A] font-tech mb-1">
                    <span>{featuredFrames[1].category} · {featuredFrames[1].location}</span>
                    <span>EXP 02</span>
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[#F1EBDD] mb-1">
                    {featuredFrames[1].title}
                  </h3>
                  <p className="text-xs text-[#B7BDAF] line-clamp-2 font-light">
                    {featuredFrames[1].caption}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom 3 Asymmetric Column Strip */}
          {featuredFrames.slice(2, 5).map((frame, idx) => (
            <div
              key={frame.id}
              onClick={() => onOpenLightbox(featuredFrames, idx + 2)}
              className="md:col-span-4 group cursor-pointer relative overflow-hidden rounded-sm bg-[#10291D] border border-[#344A3B] shadow-md hover:border-[#A9A77A] transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={frame.imageUrl}
                  alt={frame.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A12]/95 via-[#071A12]/30 to-transparent opacity-85" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#A9A77A] font-tech mb-0.5">
                    <span>{frame.category}</span>
                    <span>EXP 0{idx + 3}</span>
                  </div>
                  <h4 className="font-editorial text-lg text-[#F1EBDD]">
                    {frame.title}
                  </h4>
                  <p className="text-[11px] text-[#B7BDAF] truncate font-light">
                    {frame.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ALTERNATING EDITORIAL MONOGRAPH SPREAD (Image & Text Section) */}
      <section className="py-20 bg-[#F1EBDD] dark:bg-[#10291D] border-y border-[#344A3B]/30 dark:border-[#344A3B] transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Atmospheric Monograph Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-sm bg-[#183526] border border-[#344A3B] shadow-2xl">
              <img
                src="/src/assets/images/everyday_quiet_life_1794416273610.jpg"
                alt="Study desk, tea, and rangefinder camera"
                className="w-full h-auto object-cover max-h-[540px]"
              />
              <div className="p-4 bg-[#183526] text-[#F1EBDD] flex items-center justify-between text-xs font-tech border-t border-[#344A3B]">
                <span>Vodra, Rajshahi · Rainy Morning</span>
                <span className="text-[#A9A77A]">28mm f/2 · ISO 320</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophical Essay */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#A9A77A] font-tech block">
              Curator's Monograph · Marginal Notes
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#071A12] dark:text-[#F1EBDD] leading-tight">
              On Finding Sacred Weight in Ordinary Things
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#344A3B] dark:text-[#B7BDAF] font-light leading-relaxed">
              <p className="editorial-dropcap">
                When I first began taking photographs around Rajshahi University, I felt an urge to chase dramatic spectacles. I thought art had to scream to be heard. It took three years of quiet photo walks along the Padma embankments to understand that life is never lived in milestones; it is lived in the small marginal notes.
              </p>
              <p>
                A chipped clay cup of tea cooling by an open notebook, the rhythmic squeak of a rickshaw pedal in the monsoon rain, the amber reflection of banyan leaves across a colonial wall—these are the footnotes that survive long after our ambitions have faded.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  setActiveTab('diary');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-[#A9A77A] hover:bg-[#b8b688] text-[#071A12] font-semibold text-xs tracking-wider uppercase rounded-sm transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>Read Full Essay</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-tech text-[#A9A77A]">4 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECENT TRAVEL STORIES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#344A3B]/30 dark:border-[#344A3B] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-tech text-[#A9A77A] uppercase tracking-widest mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Chapter II · Expeditions</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#071A12] dark:text-[#F1EBDD] font-normal tracking-wide">
              Recent Travel Stories
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab('travels');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs uppercase tracking-wider text-[#A9A77A] hover:text-[#071A12] dark:hover:text-[#F1EBDD] font-tech flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Explore All Destinations ({content.destinations.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Travel Destinations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTravels.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="group cursor-pointer bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B]/30 dark:border-[#344A3B] rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:border-[#A9A77A] hover:shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={dest.coverImage}
                  alt={dest.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#071A12]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-tech text-[#F1EBDD] rounded-sm border border-[#344A3B]">
                  {dest.status} · {dest.travelDate}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#A9A77A] font-tech mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.location}, {dest.country}</span>
                  </div>

                  <h3 className="font-editorial text-2xl text-[#071A12] dark:text-[#F1EBDD] group-hover:text-[#A9A77A] transition-colors leading-tight mb-2">
                    {dest.title}
                  </h3>

                  <p className="text-xs text-[#344A3B] dark:text-[#B7BDAF] font-light leading-relaxed line-clamp-3">
                    {dest.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#344A3B]/30 dark:border-[#344A3B] flex items-center justify-between text-xs text-[#A9A77A] font-tech">
                  <span>Read Field Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PERSONAL JOURNAL / LATEST NOTES */}
      <section className="py-24 bg-[#F1EBDD] dark:bg-[#10291D] border-y border-[#344A3B]/30 dark:border-[#344A3B] transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#344A3B]/30 dark:border-[#344A3B] pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-tech text-[#A9A77A] uppercase tracking-widest mb-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Chapter III · Reflections</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#071A12] dark:text-[#F1EBDD] font-normal tracking-wide">
                Personal Journal & Latest Notes
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveTab('diary');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs uppercase tracking-wider text-[#A9A77A] hover:text-[#071A12] dark:hover:text-[#F1EBDD] font-tech flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>Read All Notes ({content.diaryEntries.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Diary Articles List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDiary.map((entry) => (
              <article
                key={entry.id}
                onClick={() => onSelectDiaryEntry(entry)}
                className="group cursor-pointer bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B]/30 dark:border-[#344A3B] p-6 sm:p-8 rounded-sm flex flex-col justify-between transition-all duration-300 hover:border-[#A9A77A] hover:shadow-xl"
              >
                <div className="space-y-4">
                  {entry.coverImage && (
                    <div className="aspect-[16/9] overflow-hidden rounded-sm bg-black/40">
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

                  <h3 className="font-editorial text-2xl text-[#071A12] dark:text-[#F1EBDD] group-hover:text-[#A9A77A] transition-colors leading-snug">
                    {entry.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#344A3B] dark:text-[#B7BDAF] font-light leading-relaxed line-clamp-3">
                    {entry.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#344A3B]/30 dark:border-[#344A3B] flex items-center justify-between text-xs text-[#A9A77A] font-tech">
                  <span>Read Full Essay</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXPLORE MORE CURATED CHAPTERS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#A9A77A] font-tech block">
            Navigation Index
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#071A12] dark:text-[#F1EBDD]">
            Explore More of Life in Footnotes
          </h2>
          <p className="text-xs sm:text-sm text-[#344A3B] dark:text-[#B7BDAF] font-light leading-relaxed">
            Delve deeper into the visual catalog, read long-form travelogues, or curate new content.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => {
              setActiveTab('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-6 bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B]/30 dark:border-[#344A3B] rounded-sm text-left hover:border-[#A9A77A] transition-all group cursor-pointer shadow-xs"
          >
            <Camera className="w-5 h-5 text-[#A9A77A] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-editorial text-xl text-[#071A12] dark:text-[#F1EBDD] mb-1">
              All Photography Frames
            </h3>
            <p className="text-xs text-[#344A3B] dark:text-[#B7BDAF] font-light">
              Filter by Nature, Street, Architecture, Portraits, and 35mm film tones.
            </p>
          </button>

          <button
            onClick={() => {
              setActiveTab('travels');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-6 bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B]/30 dark:border-[#344A3B] rounded-sm text-left hover:border-[#A9A77A] transition-all group cursor-pointer shadow-xs"
          >
            <Compass className="w-5 h-5 text-[#A9A77A] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-editorial text-xl text-[#071A12] dark:text-[#F1EBDD] mb-1">
              Bengal Route & Map
            </h3>
            <p className="text-xs text-[#344A3B] dark:text-[#B7BDAF] font-light">
              Interactive map pins from Saint Martin to Cox’s Bazar and Sreemangal.
            </p>
          </button>

          <button
            onClick={() => {
              setActiveTab('diary');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-6 bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B]/30 dark:border-[#344A3B] rounded-sm text-left hover:border-[#A9A77A] transition-all group cursor-pointer shadow-xs"
          >
            <BookOpen className="w-5 h-5 text-[#A9A77A] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-editorial text-xl text-[#071A12] dark:text-[#F1EBDD] mb-1">
              Notes & Thoughts
            </h3>
            <p className="text-xs text-[#344A3B] dark:text-[#B7BDAF] font-light">
              Introspective essays on youth, fleeting time, and uncaptured beauty.
            </p>
          </button>

          <button
            onClick={() => {
              openStudio();
            }}
            className="p-6 bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B]/30 dark:border-[#344A3B] rounded-sm text-left hover:border-[#A9A77A] transition-all group cursor-pointer shadow-xs"
          >
            <SlidersHorizontal className="w-5 h-5 text-[#A9A77A] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-editorial text-xl text-[#071A12] dark:text-[#F1EBDD] mb-1">
              Curator Studio CMS
            </h3>
            <p className="text-xs text-[#344A3B] dark:text-[#B7BDAF] font-light">
              Add photographs, edit stories, and export your updated JSON content.
            </p>
          </button>
        </div>
      </section>

      {/* 7. Minimalist Closing Invitation */}
      <section className="py-24 text-center bg-[#F1EBDD] dark:bg-[#10291D] border-t border-[#344A3B]/30 dark:border-[#344A3B] px-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="font-editorial text-3xl sm:text-4xl italic text-[#071A12] dark:text-[#F1EBDD] font-light">
            “Stay a little. Explore a little. Find your own footnotes.”
          </p>
          <p className="text-xs tracking-widest uppercase text-[#A9A77A] font-tech">
            A permanent home for fleeting moments · Rajshahi, Bangladesh
          </p>
        </div>
      </section>
    </div>
  );
};
