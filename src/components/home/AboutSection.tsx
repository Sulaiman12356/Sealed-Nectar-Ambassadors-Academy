import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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
                About Our School
              </span>
              <span className="w-6 h-px bg-[#6B1724]" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F] mb-6 leading-tight">
              Building a Strong Foundation for a <span className="text-[#6B1724]">Bright Future</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#57534E] leading-relaxed mb-6">
              <p>
                Sealed Nectar Ambassadors Academy, also known as <strong className="text-[#221F1F]">SNAA</strong>, is a private educational institution established on <strong className="text-[#221F1F]">5 January 2015</strong> in a conducive learning environment in Ewu-Oliwo, Makun, Sagamu.
              </p>
              <p>
                Our primary objective is to prepare each learner for success in a rapidly changing world. Since its establishment, the school has experienced meaningful growth through empathy for children’s educational development, measurable teaching techniques and an unwavering commitment to quality education.
              </p>
              <p>
                We believe that professional teachers are a foundation of effective learning, and we are committed to creating an environment where every child can learn, grow and develop with confidence.
              </p>
            </div>

            {/* Quiet institutional proof points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#221F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Empathetic, verified teaching faculty</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#221F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Conducive, secure Makun campus</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#221F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Dual academic & moral curriculum</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#221F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Supportive parent-school partnership</span>
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
                    Our School Community
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
          </div>
        </div>
      </div>
    </section>
  );
};
