import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  HeartHandshake,
  Brain,
  Compass,
  CheckCircle,
  Sparkles,
  Palette
} from 'lucide-react';
import { SCHOOL_VALUES } from '../../data/schoolData';

export const SchoolValues: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return TrendingUp;
      case 1:
        return ShieldCheck;
      case 2:
        return HeartHandshake;
      case 3:
        return Brain;
      case 4:
        return Compass;
      case 5:
        return CheckCircle;
      case 6:
        return Sparkles;
      case 7:
      default:
        return Palette;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              Character & Excellence
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F] mb-3">
            Growing More Than Students
          </h2>
          <p className="text-sm sm:text-base text-[#57534E]">
            Our commitment to total child development nurtures the mind, heart, and character in harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SCHOOL_VALUES.map((val, idx) => {
            const Icon = getIcon(idx);
            return (
              <div
                key={val.title}
                className="bg-white border border-[#E8DFD5] rounded-xl p-5 hover:border-[#C88A1A] transition-all hover:shadow-xs group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] mb-3 group-hover:bg-[#6B1724] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-bold text-[#221F1F] mb-1.5">
                  {val.title}
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
