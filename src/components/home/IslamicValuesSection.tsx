import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Heart,
  Users,
  Smile,
  Sparkles,
  BookOpen,
  Compass
} from 'lucide-react';
import { ISLAMIC_MORAL_VALUES } from '../../data/schoolData';

export const IslamicValuesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              Character & Conduct
            </span>
            <span className="w-8 h-px bg-[#6B1724]" />
            <span className="text-xs font-semibold text-[#C88A1A]">
              Faith-Based Values
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F] mb-3">
            Character Is Part of Education
          </h2>

          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            At Sealed Nectar Ambassadors Academy, knowledge without good character is incomplete. We instil practical values that guide children at school, at home, and in society.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ISLAMIC_MORAL_VALUES.map((val) => (
            <div
              key={val.title}
              className="bg-white border border-[#E8DFD5] rounded-xl p-5 hover:border-[#C88A1A] transition-all hover:shadow-xs group flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] mb-3 group-hover:bg-[#6B1724] group-hover:text-white transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-display text-base font-bold text-[#221F1F] mb-1.5">
                  {val.title}
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {val.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#FAF7F2] flex items-center gap-1.5 text-[10px] font-bold text-[#1B4332] uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Good Character</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
