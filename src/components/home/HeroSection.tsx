import React from 'react';
import { ArrowRight, GraduationCap, Calendar, Compass } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SCHOOL_IMAGES, SCHOOL_INFO } from '../../data/schoolData';

interface HeroSectionProps {
  onOpenApply: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenApply, onExplore }) => {
  return (
    <section id="hero" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Educational Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C88A1A]">
                Welcome to
              </span>
              <span className="w-8 h-px bg-[#C88A1A]" />
              <span className="text-xs font-semibold text-[#57534E]">
                Sagamu, Ogun State
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#221F1F] leading-[1.18] mb-4 text-balance">
              Building Strong Foundations for a <span className="text-[#6B1724]">Bright Future</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-6 max-w-2xl font-body">
              At Sealed Nectar Ambassadors Academy, we nurture children academically, morally, socially and intellectually, helping them grow into confident and responsible future leaders.
            </p>

            {/* School Motto & Established Pill-free Metadata */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#57534E] mb-8 pb-4 border-b border-[#E8DFD5] w-full max-w-xl">
              <div className="inline-flex items-center gap-2 font-medium text-[#6B1724]">
                <GraduationCap className="w-4 h-4 text-[#C88A1A] shrink-0" />
                <span>{SCHOOL_INFO.tagline}</span>
              </div>
              <span className="text-[#E8DFD5] hidden sm:inline" aria-hidden="true">|</span>
              <div className="inline-flex items-center gap-2 font-medium text-[#57534E]">
                <Calendar className="w-4 h-4 text-[#C88A1A] shrink-0" />
                <span>{SCHOOL_INFO.establishedFormatted}</span>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenApply}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm sm:text-base font-semibold text-white bg-[#6B1724] hover:bg-[#52111B] active:bg-[#3E0A12] shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B1724]"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm sm:text-base font-semibold text-[#6B1724] bg-white border border-[#E8DFD5] hover:bg-[#F4EFEB] hover:border-[#D49A24]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#6B1724]"
              >
                <Compass className="w-4 h-4 text-[#C88A1A]" />
                <span>Explore Our School</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity School Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-sm border-2 border-white bg-white p-2">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#F4EFEB]">
                <ImageWithFallback
                  src={SCHOOL_IMAGES.heroStudents}
                  alt="Sealed Nectar Ambassadors Academy pupils in official uniform"
                  className="w-full h-full object-cover object-top"
                  containerClassName="w-full h-full"
                  fallbackText="Sealed Nectar Ambassadors Academy students smiling in official school uniform"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1724] shadow-sm backdrop-blur-xs">
                    Official Academy Uniform
                  </span>
                </div>
              </div>

              {/* Subdued corner badge */}
              <div className="pt-3 pb-1 px-2 flex items-center justify-between text-xs text-[#57534E]">
                <span className="font-semibold text-[#6B1724] font-display">
                  Sealed Nectar Ambassadors Academy
                </span>
                <span className="text-[11px] font-medium text-[#C88A1A] tabular-nums">
                  Sagamu, Ogun State
                </span>
              </div>
            </div>

            {/* Subtle amber accent geometry in background */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border-2 border-[#C88A1A]/30 -z-10 pointer-events-none hidden sm:block"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
