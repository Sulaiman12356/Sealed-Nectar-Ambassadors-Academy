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
  PhoneCall
} from 'lucide-react';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { AuthenticSchoolGallery } from '../components/home/AuthenticSchoolGallery';
import {
  ACADEMIC_LEVELS,
  ACADEMIC_PILLARS,
  CORE_LEARNING_AREAS,
  ACADEMIC_JOURNEY,
  ACADEMICS_FAQ,
  SCHOOL_IMAGES
} from '../data/schoolData';

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
                Crèche to Junior Secondary
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#221F1F] leading-tight mb-4 text-balance">
              Learning Today. Leading Tomorrow.
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-8 max-w-2xl font-body">
              From Early Years to Junior Secondary education, we provide learning experiences designed to build knowledge, confidence, character and practical skills.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('/admissions')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#6B1724] hover:bg-[#52111B] shadow-xs transition-colors"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#6B1724] bg-white border border-[#E8DFD5] hover:bg-[#F4EFEB] transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#C88A1A]" />
                <span>Contact the School</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Academic Levels (6 Levels) */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Class Progression
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Academic Levels
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2">
              Carefully structured learning environments catering to each developmental phase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMIC_LEVELS.map((level, idx) => {
              const Icon = getLevelIcon(level.id);
              return (
                <div
                  key={level.id}
                  className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-6 flex flex-col justify-between hover:border-[#C88A1A] transition-all hover:shadow-xs group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-white border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] group-hover:bg-[#6B1724] group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C88A1A]">
                        Level {idx + 1}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#221F1F] mb-1">
                      {level.title}
                    </h3>
                    <span className="text-xs font-semibold text-[#6B1724] block mb-3">
                      {level.ageRange}
                    </span>

                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                      {level.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8DFD5] text-xs text-[#221F1F]">
                    <strong className="text-[#6B1724]">Focus: </strong>
                    <span className="text-[#57534E]">{level.focus}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Academic Pillars (4 Major Pillars) */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Our Academic Distinctives
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Academic Pillars
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2">
              Four fundamental strengths that enrich the SNAA educational experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACADEMIC_PILLARS.map((pillar) => {
              const Icon = getPillarIcon(pillar.iconName);
              return (
                <div
                  key={pillar.id}
                  className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 hover:border-[#C88A1A] transition-all hover:shadow-xs group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] mb-4 group-hover:bg-[#6B1724] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#C88A1A] block mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#221F1F] mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Core Learning Areas */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Curriculum Breadth
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Core Learning Areas
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-2">
              Broad foundational subject areas that cultivate balanced literacy, scientific inquiry and moral discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_LEARNING_AREAS.map((area, index) => (
              <div
                key={index}
                className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-5 hover:border-[#C88A1A] transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#6B1724]/10 text-[#6B1724] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-[#221F1F]">
                    {area.title}
                  </h3>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed pl-8">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Classroom Learning and Foundational Innovation */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
                Classroom Environment
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F] mb-4">
                Focused Minds, Active Learners
              </h2>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed mb-6">
                Inside our classrooms, each pupil receives dedicated attention and structured instruction. We combine core academic rigor with digital literacy, moral ethics, and joyful discovery.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-[#57534E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span>Interactive teaching promoting active participation and clear reasoning.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span>Foundational phonics, quantitative aptitude, and structured writing habits.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span>Introduction to ICT, coding logic and practical problem-solving.</span>
                </div>
              </div>
            </div>

            {/* Photo of sitting children in uniform */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD5] bg-white p-2">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#F4EFEB]">
                  <ImageWithFallback
                    src={SCHOOL_IMAGES.sittingStudents}
                    alt="Sealed Nectar pupils learning attentively in classroom"
                    className="w-full h-full object-cover"
                    fallbackText="Pupils studying at Sealed Nectar Ambassadors Academy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1724] shadow-sm backdrop-blur-xs">
                      Active Classroom
                    </span>
                  </div>
                </div>
                <div className="p-3 text-left">
                  <span className="text-xs font-semibold text-[#6B1724] font-display block">
                    Attentive Academic Engagement
                  </span>
                  <span className="text-[11px] text-[#57534E]">
                    Learners participating in focused morning coursework at Sealed Nectar.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Languages, Vocational Skills, Karate & Leadership Grid with Authentic Photos */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Holistic Growth
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Beyond the Textbook
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-3">
              Equipping children with global communication, vocational dexterity, physical discipline and moral courage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Languages with Chinese Training Photo */}
            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#C88A1A] transition-all">
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-white border border-[#E8DFD5] relative">
                  <img
                    src="/images/chinese_training_student.jpg"
                    alt="Student during Mandarin Chinese training session"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#6B1724]">
                    Mandarin Training
                  </span>
                </div>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] mb-3">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#221F1F] mb-2">
                  Global Languages Immersion
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                  Students are exposed to English alongside Mandarin Chinese and Arabic programmes. Language exposure helps learners develop communication skills and broader cultural awareness.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-3 py-1 rounded-md bg-white border border-[#E8DFD5] text-[#221F1F]">English</span>
                <span className="px-3 py-1 rounded-md bg-white border border-[#E8DFD5] text-[#6B1724]">Mandarin Chinese</span>
                <span className="px-3 py-1 rounded-md bg-white border border-[#E8DFD5] text-[#C88A1A]">Arabic</span>
              </div>
            </div>

            {/* Parade & Physical Discipline with Marching Children Photo */}
            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#C88A1A] transition-all">
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-white border border-[#E8DFD5] relative">
                  <img
                    src="/images/marching_children_sealed.jpg"
                    alt="Sealed Nectar pupils in marching parade"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#1B4332]">
                    Annual Parade & Drills
                  </span>
                </div>
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E8DFD5] flex items-center justify-center text-[#1B4332] mb-3">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#221F1F] mb-2">
                  Discipline, Sports & Marching
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                  Students participate in Karate, athletics, and ceremonial marching parades. These activities promote physical fitness, focus, poise, and teamwork.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-3 py-1 rounded-md bg-white border border-[#E8DFD5] text-[#1B4332]">Marching Drills</span>
                <span className="px-3 py-1 rounded-md bg-white border border-[#E8DFD5] text-[#6B1724]">Karate Club</span>
                <span className="px-3 py-1 rounded-md bg-white border border-[#E8DFD5] text-[#221F1F]">Athletics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence & Recognition Showcase */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex justify-center">
                <div className="w-48 sm:w-56 rounded-xl overflow-hidden border-2 border-[#E8DFD5] shadow-sm bg-[#FAF7F2] p-1.5">
                  <img
                    src="/images/excellent_frame.jpg"
                    alt="Certificate of Academic Excellence"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <div className="pt-2 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A]">
                      Award of Excellence
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-8">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                    Scholastic Recognition
                  </span>
                  <span className="w-6 h-px bg-[#6B1724]" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F] mb-3">
                  Rewarding Diligence and Moral Integrity
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                  At Sealed Nectar Ambassadors Academy, academic achievement goes hand-in-hand with upright moral character. We actively reward pupils who demonstrate perseverance, intellectual curiosity, punctuality, and exemplary behaviour.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#221F1F]">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5]">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span>Annual Academic Merit Honors</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5]">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span>Islamic Morals & Etiquette Prizes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Academic Journey Pathway */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Educational Progression
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              The Academic Journey
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2">
              A smooth and coherent four-stage pathway designed for continuous developmental growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {ACADEMIC_JOURNEY.map((item, idx) => (
              <div
                key={item.step}
                className="bg-white border border-[#E8DFD5] rounded-xl p-5 flex flex-col justify-between relative hover:border-[#C88A1A] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-mono font-bold text-[#6B1724]">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-semibold text-[#C88A1A]">
                      Stage {idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#221F1F] mb-1">
                    {item.stage}
                  </h3>
                  <span className="text-xs font-medium text-[#6B1724] block mb-3">
                    {item.subtitle}
                  </span>

                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentic Learning & Campus Moments Gallery */}
      <AuthenticSchoolGallery
        title="Scholastic & Student Life in Pictures"
        subtitle="Real glimpses into our classrooms, Mandarin Chinese sessions, marching drills and academic ceremonies."
      />

      {/* 8. Parent Information FAQ */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Parent Guidance
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2">
              Answers to common parent questions regarding our curriculum, languages and admission offerings.
            </p>
          </div>

          <div className="space-y-3">
            {ACADEMICS_FAQ.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-[#221F1F]">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#6B1724] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#57534E] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#57534E] leading-relaxed border-t border-[#E8DFD5]/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Academics CTA */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#6B1724] rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-sm">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D49A24] block mb-2">
                Enrollment Open
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 text-balance">
                Give Your Child a Strong Foundation
              </h2>
              <p className="text-sm sm:text-base text-[#FAF7F2]/85 mb-8">
                Start the application process today or schedule an introductory consultation with our admissions desk.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onNavigate('/admissions')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-[#6B1724] bg-white hover:bg-[#FAF7F2] transition-colors shadow-xs"
                >
                  <span>Start Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white/40 hover:bg-white/10 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#D49A24]" />
                  <span>Speak With The School</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
