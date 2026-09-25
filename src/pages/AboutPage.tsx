import React, { useState } from 'react';
import {
  Calendar,
  Compass,
  CheckCircle2,
  Quote,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Sparkles,
  HeartHandshake,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { AuthenticSchoolGallery } from '../components/home/AuthenticSchoolGallery';
import { AcademicIslamicBalance } from '../components/home/AcademicIslamicBalance';
import { IslamicValuesSection } from '../components/home/IslamicValuesSection';
import {
  SCHOOL_IMAGES,
  SCHOOL_INFO,
  PHILOSOPHY_POINTS,
  WHY_PARENTS_TRUST
} from '../data/schoolData';
import { IslamicPatternBorder } from '../components/common/IslamicPatternBorder';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* 1. About Us Hero */}
      <section className="relative py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                  A Muslim Educational Institution
                </span>
                <span className="w-8 h-px bg-[#6B1724]" />
                <span className="text-xs font-semibold text-[#C88A1A]">
                  Est. 5 January 2015
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#221F1F] leading-tight mb-4 text-balance">
                About Sealed Nectar Ambassadors Academy
              </h1>

              <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-6 max-w-2xl font-body">
                Sealed Nectar Ambassadors Academy is a Muslim educational institution committed to developing children through a balanced combination of Islamic and Western education.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#57534E] pb-4 border-b border-[#E8DFD5] w-full">
                <div className="flex items-center gap-1.5 font-medium text-[#6B1724]">
                  <GraduationCap className="w-4 h-4 text-[#C88A1A]" />
                  <span>Motto: "{SCHOOL_INFO.tagline}"</span>
                </div>
                <span className="text-[#E8DFD5]">|</span>
                <div className="flex items-center gap-1.5 font-medium text-[#57534E]">
                  <Calendar className="w-4 h-4 text-[#C88A1A]" />
                  <span>Makun, Sagamu, Ogun State</span>
                </div>
              </div>
            </div>

            {/* School Photograph */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD5] bg-white p-2">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#F4EFEB]">
                  <ImageWithFallback
                    src={SCHOOL_IMAGES.classroomStudents}
                    alt="Sealed Nectar Ambassadors Academy students engaged in class"
                    className="w-full h-full object-cover"
                    fallbackText="Students studying at Sealed Nectar Ambassadors Academy"
                  />
                </div>
                <div className="p-3 text-left">
                  <span className="text-xs font-semibold text-[#6B1724] font-display block">
                    Nurturing Knowledge and Good Character
                  </span>
                  <span className="text-[11px] text-[#57534E]">
                    Conducive, secure and dignified Muslim school environment in Makun, Sagamu.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Educational Philosophy */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
            Educational Philosophy
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F] mb-6">
            Developing Both the Mind and the Character
          </h2>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] text-left sm:text-center text-sm sm:text-base text-[#57534E] leading-relaxed shadow-xs space-y-4">
            <p className="font-serif italic text-base sm:text-lg text-[#6B1724]">
              "At Sealed Nectar Ambassadors Academy, we believe that education should develop both the mind and the character. Our learners receive a balanced education that combines Western academic learning with Islamic education, moral values and practical skills."
            </p>
            <p>
              Established on <strong className="text-[#221F1F]">5 January 2015</strong>, the school provides a conducive learning environment where children can develop academically, morally, socially, intellectually and spiritually.
            </p>
            <p>
              The school does not only prepare students for examinations. It also aims to nurture good character, discipline, respect, responsibility, confidence, Islamic values, academic ability, critical thinking, creativity, leadership, and digital and practical skills.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Two Foundations. One Complete Education. */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Integrated Learning
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Two Foundations. One Complete Education.
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-3">
              How Western academic rigor and Islamic upbringing complement each other in every child's daily growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#6B1724] text-white flex items-center justify-center mb-4 shadow-xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#221F1F] mb-3">
                  Western Academic Education
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                  Western education gives our learners the academic knowledge, critical thinking and practical skills needed to participate confidently in the modern world.
                </p>
                <div className="space-y-2 text-xs text-[#221F1F]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6B1724]" />
                    <span>Rigorous national curriculum in sciences &amp; mathematics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6B1724]" />
                    <span>ICT literacy, Coding, Robotics &amp; digital skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6B1724]" />
                    <span>English and conversational Mandarin Chinese fluency</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-[#FAF7F2] text-xs font-semibold text-[#6B1724]">
                Modern Intellectual Capability
              </div>
            </div>

            <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1B4332] text-white flex items-center justify-center mb-4 shadow-xs">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#221F1F] mb-3">
                  Islamic Moral Education
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                  Islamic education helps them develop faith, moral values, discipline, good manners and a strong sense of responsibility.
                </p>
                <div className="space-y-2 text-xs text-[#221F1F]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                    <span>Sound Islamic studies, Tawheed, and prophetic history</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                    <span>Arabic language reading, writing and Tajweed recitation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                    <span>Modesty, truthfulness, respectful Adab and daily Dua</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-[#FAF7F2] text-xs font-semibold text-[#1B4332]">
                Moral Integrity &amp; Faith
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Character Is Part of Education (Values Section) */}
      <IslamicValuesSection />

      {/* 5. Leadership With Purpose: Proprietress */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-1">
              Leadership With Purpose
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Founding Leadership
            </h2>
          </div>

          <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start shadow-xs">
            <div className="w-full md:w-64 shrink-0 flex flex-col items-center">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#E8DFD5]">
                <ImageWithFallback
                  src={SCHOOL_INFO.leadership.proprietress.image}
                  alt={SCHOOL_INFO.leadership.proprietress.name}
                  className="w-full h-full object-cover object-top"
                  fallbackText={SCHOOL_INFO.leadership.proprietress.name}
                />
              </div>
              <span className="mt-3 text-xs font-semibold text-[#6B1724] font-display text-center">
                {SCHOOL_INFO.leadership.proprietress.name}
              </span>
              <span className="text-[11px] text-[#57534E]">
                {SCHOOL_INFO.leadership.proprietress.title}
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#221F1F] mb-1">
                  Mrs. Muritala F.A. (Nee Adeosun)
                </h3>
                <p className="text-xs font-bold text-[#C88A1A] uppercase tracking-wider mb-4">
                  Proprietress / Owner
                </p>

                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed mb-6">
                  Under the leadership of Mrs. Muritala F.A. (Nee Adeosun), Sealed Nectar Ambassadors Academy continues to pursue an educational vision centred on knowledge, character development and the total development of every child.
                </p>

                <div className="p-5 rounded-xl bg-white border border-[#E8DFD5] text-xs sm:text-sm text-[#221F1F] font-serif italic mb-6">
                  "{SCHOOL_INFO.leadership.proprietress.quote}"
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#1B4332] pt-4 border-t border-[#E8DFD5]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Est. 5 January 2015</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>"Morality and Knowledge"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Parents Choose Sealed Nectar */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-1">
              Trusted by Families
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F]">
              Why Parents Choose Our Academy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHY_PARENTS_TRUST.map((point, index) => (
              <div
                key={index}
                className="bg-white border border-[#E8DFD5] rounded-xl p-4 flex items-start gap-3 shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-[#221F1F] leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('/admissions')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#6B1724] hover:bg-[#52111B] shadow-xs transition-colors"
            >
              <span>Apply for 2026/2027 Admission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Gallery */}
      <AuthenticSchoolGallery
        title="Authentic School Moments & Community"
        subtitle="True photographs of our learners, educators, awards and campus life in Makun, Sagamu."
      />
    </div>
  );
};
