import React, { useState } from 'react';
import { ArrowRight, Compass, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL, WHATSAPP_PHONE } from '../common/WhatsAppFloatingCTA';

interface HeroSectionProps {
  onOpenApply: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenApply, onExplore }) => {
  const [imgSrc, setImgSrc] = useState('/sealednectarbillboard.png');

  return (
    <section
      id="hero"
      aria-label="Welcome to SEALED NECTAR AMBASSADORS SCHOOL"
      className="relative w-full overflow-hidden bg-[#160B0E] flex flex-col justify-center items-center min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] xl:min-h-[760px]"
    >
      {/* Full-bleed school background image filling EVERY corner without leaving ANY blank space */}
      <img
        src={imgSrc}
        onError={() => setImgSrc('/images/sealednectarbillboard.png')}
        alt="SEALED NECTAR AMBASSADORS SCHOOL campus featuring Islamic architectural entrance, golden central dome with crescent moon, minarets, and classrooms"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-[center_22%] sm:object-center select-none pointer-events-none opacity-90 transition-opacity duration-300"
      />

      {/* Balanced translucent overlay: protects text readability while keeping the architecture, dome, and campus vivid */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/60 sm:bg-gradient-to-b sm:from-black/65 sm:via-black/45 sm:to-black/80 pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero Content Container directly on the background image */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center flex flex-col items-center">
        
        {/* Frosted translucent container: gives the background adjusted opacity for the text area so text is 100% visible and clear */}
        <div className="w-full bg-[#160B0E]/60 backdrop-blur-md p-6 sm:p-10 lg:p-12 rounded-3xl border border-white/20 shadow-2xl shadow-black/70 flex flex-col items-center">
          
          {/* Eyebrow: Bold and prominent institutional name */}
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#6B1724] border-2 border-[#FFD566] shadow-xl mb-4 sm:mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD566] shrink-0 animate-pulse ring-2 ring-[#FFD566]/40" />
            <span className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wider text-[#FFD566] drop-shadow-sm">
              SEALED NECTAR AMBASSADORS SCHOOL
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.18] mb-4 sm:mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-3xl text-balance">
            Islamic Education. Academic Excellence. Character Development.
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#FAF7F2] font-semibold leading-relaxed max-w-2xl sm:max-w-3xl mb-8 sm:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            From Early Years to Senior Secondary, we nurture knowledgeable, confident and God-conscious learners through a balanced combination of Islamic and Western education.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto">
            {/* Primary CTA */}
            <button
              onClick={onOpenApply}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-black uppercase tracking-wider text-white bg-[#6B1724] hover:bg-[#831D2D] active:bg-[#52111B] shadow-2xl border-2 border-[#FFD566]/60 transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD566]"
            >
              <span>ENROL NOW</span>
              <ArrowRight className="w-4 h-4 text-[#FFD566]" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onExplore}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-sm sm:text-base font-black uppercase tracking-wider text-[#6B1724] bg-white hover:bg-[#FAF7F2] active:bg-[#ECE5D8] border-2 border-white shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD566]"
            >
              <Compass className="w-4 h-4 text-[#C88A1A]" />
              <span>EXPLORE OUR SCHOOL</span>
            </button>

            {/* Direct WhatsApp Enquiry CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-sm sm:text-base font-black uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa51] border-2 border-white/30 shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>CHAT ON WHATSAPP ({WHATSAPP_PHONE})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
