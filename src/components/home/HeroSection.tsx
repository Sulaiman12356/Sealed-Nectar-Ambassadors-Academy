import React from 'react';
import { ArrowRight, Compass, ShieldCheck, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SCHOOL_IMAGES, SCHOOL_INFO } from '../../data/schoolData';
import { IslamicPatternBorder } from '../common/IslamicPatternBorder';

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
            {/* Institution Badge / Kicker */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                A Muslim Educational Institution
              </span>
              <span className="w-8 h-px bg-[#C88A1A]" />
              <span className="text-xs font-semibold text-[#57534E]">
                Makun, Sagamu
              </span>
            </div>

            {/* School Display Motto */}
            <div className="mb-2">
              <span className="font-display italic text-sm sm:text-base font-bold text-[#C88A1A] tracking-wide">
                "{SCHOOL_INFO.tagline}"
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#221F1F] leading-[1.18] mb-4 text-balance">
              Raising Knowledgeable, Confident and <span className="text-[#6B1724]">God Conscious Learners</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-4 max-w-2xl font-body">
              At Sealed Nectar Ambassadors Academy, we combine quality Western education with Islamic learning, moral development and practical skills to prepare children for a changing world.
            </p>

            {/* Secondary Supporting Line */}
            <p className="text-xs sm:text-sm font-semibold text-[#1B4332] uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1B4332]" />
              <span>Islamic Education · Academic Excellence · Character Development</span>
            </p>

            {/* School Metadata */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#57534E] mb-8 pb-4 border-b border-[#E8DFD5] w-full max-w-xl">
              <div className="inline-flex items-center gap-2 font-medium text-[#6B1724]">
                <BookOpen className="w-4 h-4 text-[#C88A1A] shrink-0" />
                <span>Early Years · Basic · Junior & Senior Secondary</span>
              </div>
              <span className="text-[#E8DFD5] hidden sm:inline" aria-hidden="true">|</span>
              <div className="inline-flex items-center gap-2 font-medium text-[#57534E]">
                <ShieldCheck className="w-4 h-4 text-[#1B4332] shrink-0" />
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
                  alt="Sealed Nectar Ambassadors Academy pupils in official school uniform and modest hijab"
                  className="w-full h-full object-cover object-top"
                  containerClassName="w-full h-full"
                  fallbackText="Sealed Nectar Ambassadors Academy students smiling in official school uniform and hijab"
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
                  Sealed Nectar Ambassadors School & College
                </span>
                <span className="text-[11px] font-medium text-[#C88A1A] tabular-nums">
                  Makun, Sagamu
                </span>
              </div>
            </div>

            {/* Subtle decorative geometric badge */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-3 shadow-md max-w-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#6B1724] text-[#D49A24] flex items-center justify-center font-serif text-sm font-bold">
                  SNAA
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#221F1F] block">Balanced Islamic Education</span>
                  <span className="text-[10px] text-[#57534E]">Western Curriculum · Arabic · Moral Adab</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <IslamicPatternBorder className="mt-12" />
      </div>
    </section>
  );
};
