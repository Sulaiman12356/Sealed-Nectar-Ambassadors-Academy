import React from 'react';
import { BookOpen, Languages, Shield, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { ISLAMIC_PROGRAMME_AREAS } from '../../data/schoolData';
import { IslamicPatternBorder } from '../common/IslamicPatternBorder';

export const IslamicEducationSection: React.FC = () => {
  const getAreaIcon = (id: string) => {
    switch (id) {
      case 'quranic-studies':
        return BookOpen;
      case 'arabic-language':
        return Languages;
      case 'islamic-studies':
        return Shield;
      case 'islamic-morals':
        return Heart;
      case 'daily-supplications':
      default:
        return Sparkles;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              Islamic Learning & Values
            </span>
            <span className="w-8 h-px bg-[#6B1724]" />
            <span className="text-xs font-semibold text-[#1B4332]">
              Faith & Adab
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F] mb-3">
            Growing With Islamic Knowledge
          </h2>

          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            "Education is not only about what a child knows. It is also about the values that guide how that knowledge is used."
          </p>
        </div>

        {/* 5 Programme Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ISLAMIC_PROGRAMME_AREAS.map((area) => {
            const Icon = getAreaIcon(area.id);
            return (
              <div
                key={area.id}
                className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-6 hover:border-[#C88A1A] transition-all hover:shadow-xs group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A] px-2.5 py-1 rounded bg-white border border-[#E8DFD5]">
                      {area.kicker}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] group-hover:bg-[#6B1724] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#221F1F] mb-2">
                    {area.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8DFD5]/60 flex items-center gap-2 text-xs font-semibold text-[#1B4332]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Nurtured with care and patient guidance</span>
                </div>
              </div>
            );
          })}

          {/* Complementary Callout Card */}
          <div className="bg-[#1B4332] text-white border border-[#143326] rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D49A24] block mb-2">
                Core Institutional Ethos
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                Faith and Knowledge in Practice
              </h3>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                We believe that children thrive when their academic ambition is anchored in sound morals, polite manners, and a warm sense of accountability to God and their community.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/20 text-xs font-serif italic text-[#D49A24]">
              "Morality and Knowledge"
            </div>
          </div>
        </div>

        <IslamicPatternBorder className="mt-12" />
      </div>
    </section>
  );
};
