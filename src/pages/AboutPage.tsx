import React from 'react';
import { useContent } from '../context/ContentContext';
import { MapPin, Sparkles, Instagram, Facebook } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { content } = useContent();

  const photographyInterests = [
    {
      title: 'Documentary & Street Life',
      description:
        'Unstaged moments in old Rajshahi bazaars, rickshaw pullers in the rain, and the timeless rhythm of everyday Bangladesh.'
    },
    {
      title: 'Water & Riverbanks',
      description:
        'The shifting moods of the Padma river at sunrise and dusk, wooden fishing dinghies, and the open waters of the Bay of Bengal.'
    },
    {
      title: 'Film Emulation & Natural Light',
      description:
        'Warm Portra tones, intentional 35mm grain, gentle shadows, and prioritizing the poetry of available light over artificial flash.'
    },
    {
      title: 'Marginalia & Quiet Stillness',
      description:
        'Steaming clay tea cups, study desks with handwritten notebooks, solitary train windows, and the beauty people walk past.'
    }
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-6 w-full space-y-20">
      {/* 1. Header & Lead Introduction */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Bio & Core Quote */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-tech text-[#A9A77A] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Behind the Frames</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#071A12] dark:text-[#F1EBDD] font-normal tracking-tight">
            Capturing the world in its unscripted footnotes.
          </h1>

          <div className="p-6 bg-[#F1EBDD] dark:bg-[#183526] border-l-2 border-[#A9A77A] rounded-r-sm space-y-2 shadow-sm border border-[#344A3B]/40">
            <p className="font-editorial italic text-lg sm:text-xl text-[#071A12]/90 dark:text-[#F1EBDD]/90 font-light leading-relaxed">
              “I am a university student with a passion for photography, travelling, and storytelling. I find inspiration in ordinary moments, quiet landscapes, unfamiliar streets, and the little details of everyday life.”
            </p>
            <p className="font-editorial italic text-lg sm:text-xl text-[#071A12]/90 dark:text-[#F1EBDD]/90 font-light leading-relaxed">
              “Life in Footnotes is my personal creative space — a place where photographs become memories, journeys become stories, and passing moments find a permanent home.”
            </p>
            <span className="text-xs font-tech text-[#A9A77A] block pt-2">
              — {content.profile.creator}, Rajshahi, Bangladesh
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed">
            {content.profile.aboutBio.slice(2).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-tech text-[#A9A77A]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{content.profile.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5" />
              <a
                href={`https://instagram.com/${content.profile.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#071A12] dark:hover:text-[#F1EBDD] underline underline-offset-4"
              >
                @{content.profile.instagram}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Facebook className="w-3.5 h-3.5" />
              <span>{content.profile.facebook}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Personal Photograph / Profile Artwork */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md bg-[#F1EBDD] dark:bg-[#183526] p-4 border border-[#344A3B] rounded-sm shadow-2xl">
            {/* The uploaded profile artwork & avatar frame */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#071A12]">
              <img
                src="/public/assets/aistudio/ChatGPT_Image_Nov_11__2026__10_56_37_PM_ef015c1e.jpg"
                alt="Creator Profile & Life in Footnotes Artwork"
                className="w-full h-full object-cover object-top filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A12]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-xs uppercase tracking-widest text-[#A9A77A] font-tech block">
                  Visual Storyteller & Student
                </span>
                <span className="font-editorial text-2xl text-[#F1EBDD]">
                  {content.profile.creator}
                </span>
              </div>
            </div>

            <div className="p-3 text-center text-xs font-tech text-[#435547] dark:text-[#B7BDAF] border-t border-[#344A3B] mt-3">
              “Photography is not about seeing what is there; it is about feeling what was there.”
            </div>
          </div>
        </div>
      </section>

      {/* 2. Photography Interests & Curatorial Focus */}
      <section className="space-y-8 border-t border-[#344A3B] pt-16">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#A9A77A] font-tech block mb-1">
            Visual Curiosities
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#071A12] dark:text-[#F1EBDD]">
            Photography Interests
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {photographyInterests.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B] rounded-sm space-y-3 hover:border-[#A9A77A] transition-colors shadow-sm"
            >
              <div className="text-xs font-tech text-[#A9A77A]">0{idx + 1}.</div>
              <h3 className="font-editorial text-xl text-[#071A12] dark:text-[#F1EBDD]">{item.title}</h3>
              <p className="text-xs text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Creative Philosophy */}
      <section className="space-y-8 border-t border-[#344A3B] pt-16">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#A9A77A] font-tech block mb-1">
            Ethos & Discipline
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#071A12] dark:text-[#F1EBDD]">
            Creative Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.profile.creativePhilosophy.map((phil, idx) => {
            const [boldPart, ...rest] = phil.split(':');
            return (
              <div
                key={idx}
                className="p-6 bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B] rounded-sm space-y-2 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-[#10291D] border border-[#344A3B] text-[#A9A77A] flex items-center justify-center text-xs font-tech mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-editorial text-2xl text-[#071A12] dark:text-[#F1EBDD]">
                  {boldPart}
                </h3>
                <p className="text-xs sm:text-sm text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed">
                  {rest.join(':').trim()}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Timeline of My Journey */}
      <section className="space-y-8 border-t border-[#344A3B] pt-16">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#A9A77A] font-tech block mb-1">
            The Trajectory
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#071A12] dark:text-[#F1EBDD]">
            Timeline of My Journey
          </h2>
        </div>

        <div className="space-y-6 max-w-3xl">
          {content.profile.timeline.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-6 p-4 rounded-sm bg-[#F1EBDD] dark:bg-[#183526] border border-[#344A3B] shadow-sm"
            >
              <div className="font-tech text-lg text-[#A9A77A] font-semibold shrink-0 pt-0.5">
                {step.year}
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-xl text-[#071A12] dark:text-[#F1EBDD]">{step.title}</h3>
                <p className="text-xs sm:text-sm text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
