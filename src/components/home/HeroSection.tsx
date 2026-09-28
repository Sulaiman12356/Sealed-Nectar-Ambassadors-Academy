import React, { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';

interface HeroSectionProps {
  onOpenApply: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenApply, onExplore }) => {
  const [imgSrc, setImgSrc] = useState('/sealednectarbillboard.png');

  return (
    <section
      id="hero"
      aria-label="Welcome to Sealed Nectar Ambassadors School & College"
      className="relative w-full overflow-hidden min-h-[540px] sm:min-h-[620px] lg:min-h-[660px] xl:min-h-[720px] flex flex-col justify-end"
    >
      {/* Edge-to-edge full-width School Banner Image */}
      <img
        src={imgSrc}
        onError={() => setImgSrc('/images/sealednectarbillboard.png')}
        alt="Sealed Nectar Ambassadors School and College building campus featuring Islamic architectural entrance, golden central dome with crescent moon, minarets, and classrooms"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] sm:object-[center_34%] lg:object-center select-none pointer-events-none"
      />

      {/* Subtle controlled gradient scrim to ensure text legibility while keeping the building unblurred and architecture bright */}
      {/* On desktop: A soft directional gradient from the left and bottom so the central golden dome, minarets, and right wing stay in natural daylight */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#14080B]/95 via-[#14080B]/60 to-transparent lg:bg-gradient-to-r lg:from-[#14080B]/90 lg:via-[#14080B]/55 lg:via-45% lg:to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-12 lg:pb-16 flex flex-col justify-end">
        <div className="max-w-xl lg:max-w-2xl text-left">
          {/* Small Eyebrow */}
          <div className="mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#D49A24] drop-shadow-xs">
              SEALED NECTAR AMBASSADORS SCHOOL & COLLEGE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.18] sm:leading-[1.16] mb-4 drop-shadow-sm text-balance">
            Islamic Education. Academic Excellence. Character Development.
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base lg:text-lg text-[#F7F4EF]/90 leading-relaxed font-body mb-6 sm:mb-8 max-w-xl drop-shadow-xs">
            From Early Years to Senior Secondary, we nurture knowledgeable, confident and God-conscious learners through a balanced combination of Islamic and Western education.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <button
              onClick={onOpenApply}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-[#6B1724] hover:bg-[#52111B] active:bg-[#3D0C13] shadow-lg shadow-[#6B1724]/25 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D49A24]"
            >
              <span>ENROL NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onExplore}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm sm:text-base font-bold uppercase tracking-wider text-[#221F1F] bg-[#FAF7F2] hover:bg-white active:bg-[#ECE5D8] border border-white/80 shadow-md transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D49A24]"
            >
              <Compass className="w-4 h-4 text-[#C88A1A]" />
              <span>EXPLORE OUR SCHOOL</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
