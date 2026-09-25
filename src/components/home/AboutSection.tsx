import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SCHOOL_IMAGES } from '../../data/schoolData';

interface AboutSectionProps {
  onLearnMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                About Our Institution
              </span>
              <span className="w-6 h-px bg-[#6B1724]" />
              <span className="text-xs font-semibold text-[#C88A1A]">
                Est. 5 January 2015
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F] mb-6 leading-tight">
              A Muslim Educational Institution Committed to the <span className="text-[#6B1724]">Whole Child</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#57534E] leading-relaxed mb-6">
              <p>
                Sealed Nectar Ambassadors Academy is a Muslim educational institution committed to developing children through a balanced combination of Islamic and Western education.
              </p>
              <p>
                Established on <strong className="text-[#221F1F]">5 January 2015</strong>, the school provides a conducive learning environment where children can develop academically, morally, socially, intellectually and spiritually.
              </p>
              <p>
                Our approach is centred on the belief that knowledge should go hand in hand with good character. We therefore provide learners with academic knowledge while also nurturing Islamic values, discipline, respect, responsibility and a strong sense of purpose.
              </p>
            </div>

            {/* Proof points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#221F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Balanced Islamic & Western curriculum</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#221F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Early Years through Senior Secondary (SS 3)</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#221F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Arabic, English & Mandarin Chinese languages</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#221F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Moral discipline & God consciousness</span>
              </div>
            </div>

            <button
              onClick={onLearnMore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#6B1724] hover:bg-[#52111B] active:bg-[#3E0A12] shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#6B1724]"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* School Pupils and Campus Life Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD5] bg-white p-2">
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#F4EFEB]">
                <ImageWithFallback
                  src={SCHOOL_IMAGES.childrenGroup}
                  alt="Sealed Nectar Ambassadors Academy pupils on campus in Sagamu"
                  className="w-full h-full object-cover"
                  fallbackText="Sealed Nectar Ambassadors Academy students smiling on campus"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1724] shadow-sm backdrop-blur-xs">
                    Our Learning Community
                  </span>
                </div>
              </div>
              <div className="p-3 text-left">
                <p className="text-xs font-semibold text-[#6B1724] font-display">
                  SNAA Pupils & Learning Community
                </p>
                <p className="text-[11px] text-[#57534E]">
                  4, Azeez Lamidi Street, Behind Loto Ewu-Oliwo, Makun, Sagamu
                </p>
              </div>
            </div>

            {/* Two Foundations Highlight Card */}
            <div className="mt-4 p-4 rounded-xl bg-white border border-[#E8DFD5] shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C88A1A] block mb-1">
                Two Foundations. One Complete Education.
              </span>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Western education gives our learners academic knowledge, critical thinking and practical skills to participate in the modern world. Islamic education helps them develop faith, moral values, discipline, good manners and responsibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
