import React from 'react';
import { BookOpen, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';

interface AcademicIslamicBalanceProps {
  onExploreAcademics: () => void;
}

export const AcademicIslamicBalance: React.FC<AcademicIslamicBalanceProps> = ({ onExploreAcademics }) => {
  const westernPoints = [
    'Academic knowledge & discovery',
    'Mathematics & Quantitative Reasoning',
    'English Language & Communication',
    'Science & Nature Studies',
    'ICT, Coding & Digital Readiness',
    'Critical thinking & analytical skills',
    'Creative & Vocational Learning',
    'National examination preparation',
  ];

  const islamicPoints = [
    'Islamic Studies (Tawheed & Ibadah)',
    'Arabic Language literacy & fluency',
    "Qur'anic learning & Tajweed recitation",
    'Good manners, modesty & Adab',
    'Moral values & ethical discipline',
    'Faith-based character development',
    'Daily supplications (Dua) & conduct',
    'Respect for parents, elders & teachers',
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              Two Foundations · One Complete Education
            </span>
            <span className="w-8 h-px bg-[#6B1724]" />
            <span className="text-xs font-semibold text-[#C88A1A]">
              Balanced Curriculum
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F] mb-3">
            Western Academic Rigor & Islamic Moral Upbringing
          </h2>

          <p className="text-base sm:text-lg text-[#57534E]">
            At Sealed Nectar Ambassadors Academy, academic knowledge and sound character work hand in hand to nurture well-rounded, capable leaders.
          </p>
        </div>

        {/* Visual Combination Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Western Education */}
          <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#6B1724] text-white flex items-center justify-center shadow-xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A] block">
                    Intellectual Foundation
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#221F1F]">
                    Western Education
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#57534E] mb-6 leading-relaxed">
                Provides our learners with academic knowledge, critical thinking, STEM competencies and practical skills to participate confidently in the modern world.
              </p>

              <div className="space-y-2.5">
                {westernPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#221F1F]">
                    <CheckCircle2 className="w-4 h-4 text-[#6B1724] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E8DFD5] text-xs font-semibold text-[#6B1724]">
              Academic Excellence Pathway
            </div>
          </div>

          {/* Center Connector Pillar */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border-2 border-[#C88A1A] flex items-center justify-center shadow-sm mb-3">
              <span className="font-display font-bold text-xs text-[#6B1724] text-center leading-tight">
                &amp;<br />
                Plus
              </span>
            </div>
            <span className="font-display font-bold text-sm text-[#221F1F] block mb-1">
              Knowledge and Character
            </span>
            <span className="text-[11px] text-[#57534E] max-w-xs block mb-4">
              Two complementary parts of one complete education
            </span>
            <button
              onClick={onExploreAcademics}
              className="px-3.5 py-1.5 rounded-lg bg-[#C88A1A] text-white text-xs font-semibold hover:bg-[#B57A12] transition-colors"
            >
              Explore Details
            </button>
          </div>

          {/* Column 2: Islamic Education */}
          <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shadow-xs">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] block">
                    Moral & Spiritual Foundation
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#221F1F]">
                    Islamic Education
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#57534E] mb-6 leading-relaxed">
                Nurtures faith, moral values, discipline, good manners, respect, and a deep, uplifting sense of personal accountability.
              </p>

              <div className="space-y-2.5">
                {islamicPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#221F1F]">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E8DFD5] text-xs font-semibold text-[#1B4332]">
              Upright Moral Upbringing Pathway
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
