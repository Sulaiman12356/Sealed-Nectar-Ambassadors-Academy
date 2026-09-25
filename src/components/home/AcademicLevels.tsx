import React from 'react';
import { Baby, Shapes, BookOpen, PencilRuler, GraduationCap, ArrowRight } from 'lucide-react';
import { ACADEMIC_LEVELS } from '../../data/schoolData';

interface AcademicLevelsProps {
  onViewCurriculum: () => void;
}

export const AcademicLevels: React.FC<AcademicLevelsProps> = ({ onViewCurriculum }) => {
  const getLevelIcon = (iconName: string) => {
    switch (iconName) {
      case 'baby':
        return Baby;
      case 'shapes':
        return Shapes;
      case 'bookOpen':
        return BookOpen;
      case 'pencilRuler':
        return PencilRuler;
      case 'graduationCap':
      default:
        return GraduationCap;
    }
  };

  return (
    <section id="academics" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                Educational Pathway
              </span>
              <span className="w-8 h-px bg-[#6B1724]" />
              <span className="text-xs font-semibold text-[#C88A1A]">
                Comprehensive Growth
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              From Early Years to Senior Secondary
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-1 max-w-2xl">
              From early childhood discovery to senior secondary graduation, we provide a complete, supportive pathway combining Western academic rigor and Islamic education.
            </p>
          </div>

          <button
            onClick={onViewCurriculum}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#221F1F] bg-[#C88A1A] hover:bg-[#B57A12] active:bg-[#9B670D] transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-[#C88A1A] whitespace-nowrap"
          >
            <span>View All Academic Levels</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Academic Levels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACADEMIC_LEVELS.map((level) => {
            const Icon = getLevelIcon(level.iconName);
            return (
              <div
                key={level.id}
                className="bg-white border border-[#E8DFD5] rounded-2xl p-6 flex flex-col justify-between hover:border-[#C88A1A] transition-all hover:shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B1724] px-2.5 py-1 rounded bg-[#FAF7F2] border border-[#E8DFD5]">
                      {level.levelType}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] group-hover:bg-[#6B1724] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#221F1F] mb-1">
                    {level.title}
                  </h3>

                  <span className="text-xs font-semibold text-[#C88A1A] block mb-3">
                    {level.ageRange}
                  </span>

                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                    {level.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#FAF7F2] text-xs text-[#221F1F]">
                  <strong className="text-[#6B1724] font-medium block mb-0.5">Focus:</strong>
                  <span className="text-[#57534E] text-[11px] leading-snug block">{level.focus}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
