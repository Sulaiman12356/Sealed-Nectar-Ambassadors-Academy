import React, { useState } from 'react';
import {
  Baby,
  Shapes,
  BookOpen,
  PencilRuler,
  GraduationCap,
  Globe,
  Cpu,
  Wrench,
  Award,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Compass,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Languages
} from 'lucide-react';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { AuthenticSchoolGallery } from '../components/home/AuthenticSchoolGallery';
import { AcademicIslamicBalance } from '../components/home/AcademicIslamicBalance';
import { IslamicEducationSection } from '../components/home/IslamicEducationSection';
import {
  ACADEMIC_LEVELS,
  ACADEMIC_PILLARS,
  CORE_LEARNING_AREAS,
  ACADEMIC_JOURNEY,
  ACADEMICS_FAQ,
  SCHOOL_IMAGES
} from '../data/schoolData';
import { IslamicPatternBorder } from '../components/common/IslamicPatternBorder';

interface AcademicsPageProps {
  onNavigate: (path: string) => void;
  onOpenContact: () => void;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({ onNavigate, onOpenContact }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getLevelIcon = (id: string) => {
    switch (id) {
      case 'creche':
        return Baby;
      case 'kindergarten':
        return Shapes;
      case 'nursery':
        return BookOpen;
      case 'primary':
        return PencilRuler;
      default:
        return GraduationCap;
    }
  };

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'globe':
        return Globe;
      case 'laptop':
        return Cpu;
      case 'wrench':
        return Wrench;
      default:
        return Award;
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* 1. Academics Hero */}
      <section className="relative py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                Curriculum & Instruction
              </span>
              <span className="w-8 h-px bg-[#6B1724]" />
              <span className="text-xs font-semibold text-[#C88A1A]">
                Islamic & Western Balance
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#221F1F] leading-tight mb-4 text-balance">
              From Early Years to Senior Secondary
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-8 max-w-2xl font-body">
              Our learning journey grows with every child, providing a structured pathway from early childhood education through primary, junior secondary and senior secondary education.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('/admissions')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#6B1724] hover:bg-[#52111B] shadow-xs transition-colors"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#6B1724] bg-white border border-[#E8DFD5] hover:bg-[#F4EFEB] transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#C88A1A]" />
                <span>Contact Academics Desk</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Academic Journey Progression */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Academic Progression
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F]">
              The Structured Pathway
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-2">
              Early Years → Basic Education → Junior Secondary School → Senior Secondary School
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {ACADEMIC_JOURNEY.map((step, idx) => (
              <div
                key={step.step}
                className="relative bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-bold text-2xl text-[#C88A1A]">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-[#E8DFD5] text-[#6B1724]">
                      Stage {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#221F1F] mb-1">
                    {step.stage}
                  </h3>
                  <span className="text-xs font-semibold text-[#6B1724] block mb-3">
                    {step.subtitle}
                  </span>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8DFD5]/60 flex items-center gap-1.5 text-xs font-semibold text-[#1B4332]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Structured progression</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Detailed Academic Levels */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              All Education Levels
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Comprehensive Learning Stages
            </h2>
            <p className="text-sm text-[#57534E] mt-2">
              Every level is staffed by qualified educators dedicated to intellectual clarity, moral upbringing, and emotional security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMIC_LEVELS.map((level) => {
              const Icon = getLevelIcon(level.id);
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

                    <h3 className="font-display text-xl font-bold text-[#221F1F] mb-1">
                      {level.title}
                    </h3>

                    <span className="text-xs font-semibold text-[#C88A1A] block mb-3">
                      {level.ageRange}
                    </span>

                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                      {level.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#FAF7F2] text-xs">
                    <strong className="text-[#6B1724] block mb-1">Instructional Focus:</strong>
                    <span className="text-[#57534E] leading-relaxed block">{level.focus}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Dedicated Secondary School Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Sealed Nectar College
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Secondary Education
            </h2>
            <div className="mt-2 text-sm font-serif italic text-[#C88A1A]">
              "Empowering Minds, Shaping the Future"
            </div>
            <p className="text-sm sm:text-base text-[#57534E] mt-3">
              Our secondary school programme builds on the foundation developed during the early and primary years. Students are guided through academic learning, Islamic education, technology, practical skills, character development and preparation for their next stage of life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Junior Secondary */}
            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] px-3 py-1 rounded-md bg-white border border-[#E8DFD5]">
                    Basic 7 - 9
                  </span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded text-xs font-bold bg-[#6B1724] text-white">JSS 1</span>
                    <span className="px-2 py-1 rounded text-xs font-bold bg-[#6B1724] text-white">JSS 2</span>
                    <span className="px-2 py-1 rounded text-xs font-bold bg-[#6B1724] text-white">JSS 3</span>
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#221F1F] mb-3">
                  Junior Secondary School
                </h3>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                  Providing pre-vocational discovery, STEM mastery, critical thinking, global languages, and Islamic moral discipline to ensure seamless preparation for senior studies.
                </p>

                <div className="space-y-2.5 text-xs text-[#221F1F]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                    <span>Basic Sciences &amp; Applied Technology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                    <span>Languages: English, Arabic and Mandarin Chinese</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                    <span>Computer Studies &amp; Introductory Robotics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                    <span>Islamic Studies, Morality and Civic Responsibility</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8DFD5] text-xs font-semibold text-[#6B1724]">
                Foundational Secondary Track
              </div>
            </div>

            {/* Senior Secondary: Preparing Students for the Future */}
            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C88A1A] px-3 py-1 rounded-md bg-white border border-[#E8DFD5]">
                    Senior College Track
                  </span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded text-xs font-bold bg-[#C88A1A] text-white">SS 1</span>
                    <span className="px-2 py-1 rounded text-xs font-bold bg-[#C88A1A] text-white">SS 2</span>
                    <span className="px-2 py-1 rounded text-xs font-bold bg-[#C88A1A] text-white">SS 3</span>
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#221F1F] mb-3">
                  Preparing Students for the Future
                </h3>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                  Senior secondary students are prepared for higher education, career clarity, independent inquiry and responsible adulthood. We emphasize academic depth, critical problem solving, technology and Islamic values.
                </p>

                <div className="space-y-2.5 text-xs text-[#221F1F]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C88A1A]" />
                    <span>Academic development &amp; independent thinking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C88A1A]" />
                    <span>Leadership, career awareness &amp; communication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C88A1A]" />
                    <span>Technology, digital skills &amp; problem solving</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C88A1A]" />
                    <span>Character, Islamic ethics &amp; personal responsibility</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8DFD5] text-xs font-semibold text-[#C88A1A]">
                Higher Education &amp; Adulthood Preparation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Islamic & Academic Balance component */}
      <AcademicIslamicBalance onExploreAcademics={() => {}} />

      {/* 6. Major Islamic Education Programmes */}
      <IslamicEducationSection />

      {/* 7. 4 Academic Pillars Grid */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Key Instructional Pillars
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F]">
              Beyond Traditional Classrooms
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-2">
              Preparing learners with modern digital skills, multilingual expression, and self-reliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACADEMIC_PILLARS.map((pillar) => {
              const Icon = getPillarIcon(pillar.iconName);
              return (
                <div
                  key={pillar.id}
                  className="bg-white border border-[#E8DFD5] rounded-2xl p-6 flex flex-col justify-between hover:border-[#C88A1A] transition-all hover:shadow-xs group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] mb-4 group-hover:bg-[#6B1724] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A] block mb-1">
                      {pillar.subtitle}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#221F1F] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#FAF7F2] text-[11px] font-semibold text-[#1B4332]">
                    Verified Academy Competency
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#E8DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Common Questions
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-2">
              Everything parents want to know about our classes, dual curriculum, languages and admission policies.
            </p>
          </div>

          <div className="space-y-3">
            {ACADEMICS_FAQ.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-[#221F1F] hover:text-[#6B1724] transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#C88A1A] shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#57534E] shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#57534E] leading-relaxed border-t border-[#E8DFD5]/40 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Authentic School Photography Gallery */}
      <AuthenticSchoolGallery
        title="Scholastic Moments & Achievements"
        subtitle="Glimpses of daily classroom concentration, language instruction, and academic milestones."
      />
    </div>
  );
};
