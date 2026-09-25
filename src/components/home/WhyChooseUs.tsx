import React from 'react';
import { BookCheck, HeartHandshake, Cpu, Globe, Activity, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_PILLARS } from '../../data/schoolData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'bookCheck':
        return BookCheck;
      case 'heartHandshake':
        return HeartHandshake;
      case 'cpu':
        return Cpu;
      case 'languages':
        return Globe;
      case 'activity':
        return Activity;
      case 'sparkles':
      default:
        return Sparkles;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#4F101A] text-white relative overflow-hidden">
      {/* Subtle background ambient element */}
      <div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#D49A24_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D49A24]">
              Distinctive Value
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            Why Choose Sealed Nectar?
          </h2>
          <p className="text-sm sm:text-base text-[#FAF7F2]/80">
            We believe that education should develop both the mind and the character. Our learners receive a balanced education that combines Western academic learning with Islamic education, moral values and practical skills.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_PILLARS.map((pillar) => {
            const Icon = getIcon(pillar.iconName);
            return (
              <div
                key={pillar.id}
                className="bg-[#5C1320] border border-[#801E2E] rounded-xl p-6 flex flex-col items-start text-left transition-transform hover:-translate-y-1 duration-200 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#4F101A] border border-[#D49A24]/60 flex items-center justify-center text-[#D49A24] mb-4 group-hover:bg-[#D49A24] group-hover:text-[#4F101A] transition-colors shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D49A24] mb-1">
                  {pillar.tagline}
                </span>

                <h3 className="font-display text-lg font-bold text-white mb-2 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
