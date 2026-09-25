import React from 'react';
import { Globe, Laptop, Wrench, Award } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ACADEMIC_HIGHLIGHTS, SCHOOL_IMAGES } from '../../data/schoolData';

export const AcademicHighlights: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'globe':
        return Globe;
      case 'laptop':
        return Laptop;
      case 'wrench':
        return Wrench;
      case 'award':
      default:
        return Award;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              Distinctive Curricula
            </span>
            <span className="w-6 h-px bg-[#6B1724]" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
            Our Academic Pillars
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] mt-1">
            Learning Today, Leading Tomorrow
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 4 Feature Cards in 2x2 Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ACADEMIC_HIGHLIGHTS.map((item) => {
              const Icon = getIcon(item.iconName);
              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#E8DFD5] rounded-xl p-5 hover:border-[#C88A1A] transition-all hover:shadow-xs group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] mb-3 group-hover:bg-[#6B1724] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-base font-bold text-[#221F1F] mb-1">
                    {item.title}
                  </h3>

                  <span className="block text-xs font-semibold text-[#C88A1A] mb-2">
                    {item.subtitle}
                  </span>

                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: High Quality Photography of Student engaged in Mandarin Chinese & Global Languages */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD5] bg-white p-2">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#F4EFEB]">
                <ImageWithFallback
                  src={SCHOOL_IMAGES.chineseTraining}
                  alt="Sealed Nectar Ambassadors Academy student during Mandarin Chinese training"
                  className="w-full h-full object-cover"
                  fallbackText="Student participating in Mandarin Chinese program at SNAA"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1724] shadow-sm backdrop-blur-xs">
                    Mandarin Chinese Immersion
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#6B1724] font-display">
                    Global Language Training
                  </span>
                  <span className="text-[11px] font-medium text-[#1B4332]">
                    Authentic Classroom
                  </span>
                </div>
                <p className="text-[11px] text-[#57534E] mt-1">
                  Students gaining early international language proficiency through dedicated Mandarin Chinese and Arabic sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
