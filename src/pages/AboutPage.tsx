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
import {
  SCHOOL_IMAGES,
  SCHOOL_INFO,
  SCHOOL_VALUES,
  TOTAL_CHILD_AREAS,
  PHILOSOPHY_POINTS,
  WHY_PARENTS_TRUST
} from '../data/schoolData';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  // Official message from proprietress (editable by school management)
  const [proprietressMessage, setProprietressMessage] = useState(
    'At Sealed Nectar Ambassadors Academy, our vision is built upon the timeless conviction that knowledge and moral integrity must always walk hand in hand. Every child who enters our gates is embraced with empathy, structured instruction, and an Islamic upbringing that fosters self-worth and lifelong discipline.'
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* 1. About Us Hero */}
      <section className="relative py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                  About Our Institution
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
                Building strong foundations through knowledge, character and practical learning.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#57534E] pb-4 border-b border-[#E8DFD5] w-full">
                <div className="flex items-center gap-1.5 font-medium text-[#6B1724]">
                  <GraduationCap className="w-4 h-4 text-[#C88A1A]" />
                  <span>Motto: {SCHOOL_INFO.tagline}</span>
                </div>
                <span className="text-[#E8DFD5]">|</span>
                <div className="flex items-center gap-1.5 font-medium text-[#57534E]">
                  <Calendar className="w-4 h-4 text-[#C88A1A]" />
                  <span>Makun, Sagamu, Ogun State</span>
                </div>
              </div>
            </div>

            {/* School Photograph with girls in neat hijabs */}
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
                    Nurturing Young Minds with Care
                  </span>
                  <span className="text-[11px] text-[#57534E]">
                    Conducive, secure and dignified Islamic learning environment.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Timeline */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Our Journey
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              The Story of Sealed Nectar
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2">
              A private educational institution established to give children a strong foundation in academics, morals, and personal confidence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:-ml-px before:bg-[#E8DFD5]">
              {/* Milestone 1: 2015 */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="flex items-center sm:w-1/2 sm:justify-end sm:pr-8 pl-10 sm:pl-0 mb-2 sm:mb-0">
                  <div className="text-left sm:text-right">
                    <span className="inline-block px-3 py-1 rounded-md bg-[#6B1724] text-white text-xs font-bold font-mono tracking-wider mb-1">
                      2015
                    </span>
                    <h3 className="font-display text-base font-bold text-[#221F1F]">
                      School Established
                    </h3>
                  </div>
                </div>

                <div className="absolute left-2.5 sm:left-1/2 -ml-2.5 w-5 h-5 rounded-full border-4 border-white bg-[#C88A1A] shadow-xs" />

                <div className="sm:w-1/2 sm:pl-8 pl-10">
                  <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      Sealed Nectar Ambassadors Academy, also known as SNAA, was founded on <strong className="text-[#221F1F]">5 January 2015</strong> in a conducive learning environment in Ewu-Oliwo, Makun, Sagamu, Ogun State. The school was created with the aim of providing children with a strong educational foundation while supporting their academic, moral, social and intellectual development.
                    </p>
                  </div>
                </div>
              </div>

              {/* Milestone 2: Growth */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="flex items-center sm:w-1/2 sm:justify-end sm:pr-8 pl-10 sm:pl-0 mb-2 sm:mb-0 order-1 sm:order-2">
                  <div className="text-left">
                    <span className="inline-block px-3 py-1 rounded-md bg-[#C88A1A] text-white text-xs font-bold tracking-wider mb-1">
                      Growth
                    </span>
                    <h3 className="font-display text-base font-bold text-[#221F1F]">
                      Curriculum Expansion
                    </h3>
                  </div>
                </div>

                <div className="absolute left-2.5 sm:left-1/2 -ml-2.5 w-5 h-5 rounded-full border-4 border-white bg-[#6B1724] shadow-xs" />

                <div className="sm:w-1/2 sm:pr-8 pl-10 sm:pl-0 order-2 sm:order-1">
                  <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-4 sm:p-5 sm:text-right">
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      The school has continued to grow through its commitment to children's educational development, caring teaching and measurable learning techniques. Development of enriched academic and learning programmes introduced languages like Arabic and Mandarin Chinese alongside modern ICT and coding.
                    </p>
                  </div>
                </div>
              </div>

              {/* Milestone 3: Today */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="flex items-center sm:w-1/2 sm:justify-end sm:pr-8 pl-10 sm:pl-0 mb-2 sm:mb-0">
                  <div className="text-left sm:text-right">
                    <span className="inline-block px-3 py-1 rounded-md bg-[#1B4332] text-white text-xs font-bold tracking-wider mb-1">
                      Today
                    </span>
                    <h3 className="font-display text-base font-bold text-[#221F1F]">
                      Serving Early Years to Secondary
                    </h3>
                  </div>
                </div>

                <div className="absolute left-2.5 sm:left-1/2 -ml-2.5 w-5 h-5 rounded-full border-4 border-white bg-[#1B4332] shadow-xs" />

                <div className="sm:w-1/2 sm:pl-8 pl-10">
                  <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      Today, Sealed Nectar Ambassadors Academy is a vibrant learning community serving children across Early Years, Basic Education and Junior Secondary education, preparing confident learners with high moral values for future leadership.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-white border-t-4 border-[#6B1724] border-x border-b border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#6B1724]/10 text-[#6B1724] flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#221F1F] mb-3">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  To raise confident, knowledgeable and responsible learners who are prepared to contribute positively to their communities and the wider world.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F4EFEB] flex items-center gap-2 text-xs font-semibold text-[#6B1724]">
                <span>Guiding principles for tomorrow's leaders</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white border-t-4 border-[#C88A1A] border-x border-b border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#C88A1A]/10 text-[#C88A1A] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#221F1F] mb-3">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  To provide quality education in a safe and supportive environment while developing the academic ability, character, creativity, confidence and practical skills of every learner.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F4EFEB] flex items-center gap-2 text-xs font-semibold text-[#C88A1A]">
                <span>Dedicated service to each learner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Philosophy: Education Beyond the Classroom */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Educational Ethos
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Education Beyond the Classroom
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2">
              Education should not only prepare children to pass examinations. Our philosophy aims to nurture meaningful human qualities that endure for a lifetime.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PHILOSOPHY_POINTS.map((point, index) => (
              <div
                key={index}
                className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-4 flex flex-col justify-between hover:border-[#C88A1A] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] mb-3 font-mono font-bold text-xs">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#221F1F] leading-snug">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core Values (8 Cards) */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Foundational Standards
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2">
              Eight upright principles governing our classrooms, teachers, and daily school interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SCHOOL_VALUES.map((val) => (
              <div
                key={val.title}
                className="bg-white border border-[#E8DFD5] rounded-xl p-5 hover:border-[#C88A1A] transition-all hover:shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#6B1724]" />
                </div>
                <h3 className="font-display text-base font-bold text-[#221F1F] mb-1.5">
                  {val.title}
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Total Child Development (7 Cards) */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Holistic Formation
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Developing the Whole Child
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2">
              We look beyond academic scorecards to cultivate the full intellectual, physical, and moral dimensions of every learner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TOTAL_CHILD_AREAS.map((area, idx) => (
              <div
                key={area.id}
                className={`bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-5 flex flex-col justify-between hover:border-[#C88A1A] transition-all ${
                  idx === 6 ? 'sm:col-span-2 lg:col-span-3 xl:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C88A1A]">
                      Pillar {idx + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#6B1724]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#221F1F] mb-2">
                    {area.title} Development
                  </h3>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Proprietress Profile */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Portrait */}
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#F4EFEB] border border-[#E8DFD5]">
                  <ImageWithFallback
                    src={SCHOOL_INFO.leadership.proprietress.image}
                    alt={SCHOOL_INFO.leadership.proprietress.name}
                    className="w-full h-full object-cover object-top"
                    fallbackText={SCHOOL_INFO.leadership.proprietress.name}
                  />
                </div>
                <h3 className="font-display text-sm font-bold text-[#221F1F] mt-3 text-center">
                  {SCHOOL_INFO.leadership.proprietress.name}
                </h3>
                <span className="text-xs text-[#C88A1A] font-semibold">
                  {SCHOOL_INFO.leadership.proprietress.title}
                </span>
              </div>

              {/* Biography and Philosophy */}
              <div className="md:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                      School Leadership
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-[#221F1F] mb-4">
                    Message from the Proprietress
                  </h2>

                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                    Mrs. Muritala F.A. (Nee Adeosun) is the proprietor of Sealed Nectar Ambassadors Academy. Her vision for the school is centred on providing children with a strong educational foundation while supporting their academic growth, character development and personal confidence.
                  </p>

                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                    Through her patient dedication and educational oversight, she maintains a school environment where learners are encouraged to ask thoughtful questions, cultivate upright habits, and acquire practical capabilities for life.
                  </p>

                  {/* Official Message Block */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border-l-4 border-[#6B1724] relative">
                    <Quote className="w-5 h-5 text-[#C88A1A] mb-2" />
                    <p className="text-xs sm:text-sm italic text-[#221F1F] font-serif leading-relaxed">
                      "{proprietressMessage}"
                    </p>
                    <span className="text-[11px] font-semibold text-[#6B1724] block mt-2">
                      — {SCHOOL_INFO.leadership.proprietress.name}, Proprietress & Owner
                    </span>
                  </div>

                  {/* Authentic Award of Excellence Frame */}
                  <div className="mt-5 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFD5] flex items-center gap-3">
                    <div className="w-14 h-20 rounded-lg overflow-hidden shrink-0 border border-[#E8DFD5] bg-white">
                      <img
                        src="/images/excellent_frame.jpg"
                        alt="Award of Educational Excellence"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A] block">
                        Institutional Distinction
                      </span>
                      <h4 className="text-xs font-bold text-[#221F1F]">
                        Academic Excellence & Merit Honors
                      </h4>
                      <p className="text-[11px] text-[#57534E] leading-relaxed">
                        Recognizing scholastic distinction, character development and consistent effort across all school classes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Staff Ethos & Real Teaching Faculty */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Teaching Faculty & Leadership
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Our Teachers & Academic Staff
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-3 leading-relaxed max-w-xl mx-auto">
              Our teachers play an important role in creating meaningful learning experiences. We value educators who understand the needs of children, encourage questions and help learners develop both knowledge and character.
            </p>
          </div>

          {/* Real Authentic Staff & Teacher Photographs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl overflow-hidden shadow-xs">
              <div className="aspect-[4/3] overflow-hidden bg-[#F4EFEB]">
                <ImageWithFallback
                  src="/images/staff_of_sealed_nectar.jpg"
                  alt="Staff and administrative faculty of Sealed Nectar Ambassadors Academy"
                  className="w-full h-full object-cover"
                  fallbackText="Staff of Sealed Nectar Ambassadors Academy"
                />
              </div>
              <div className="p-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A] block mb-1">
                  School Leadership & Faculty
                </span>
                <h3 className="font-display text-sm font-bold text-[#221F1F]">
                  Faculty & Administrative Team
                </h3>
                <p className="text-[11px] text-[#57534E] mt-1">
                  Dedicated professionals ensuring smooth academic excellence and moral guidance.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl overflow-hidden shadow-xs">
              <div className="aspect-[4/3] overflow-hidden bg-[#F4EFEB]">
                <ImageWithFallback
                  src="/images/real_teacher_sealed.jpg"
                  alt="Dedicated teacher in the classroom at Sealed Nectar"
                  className="w-full h-full object-cover"
                  fallbackText="Classroom Educator at SNAA"
                />
              </div>
              <div className="p-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B1724] block mb-1">
                  Classroom Instruction
                </span>
                <h3 className="font-display text-sm font-bold text-[#221F1F]">
                  Certified Mentors & Educators
                </h3>
                <p className="text-[11px] text-[#57534E] mt-1">
                  Inspiring young learners with patient teaching and individual attention.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl overflow-hidden shadow-xs">
              <div className="aspect-[4/3] overflow-hidden bg-[#F4EFEB]">
                <ImageWithFallback
                  src="/images/teachers_sealed.jpg"
                  alt="Academic instructors of Sealed Nectar Ambassadors Academy"
                  className="w-full h-full object-cover"
                  fallbackText="Teachers of Sealed Nectar"
                />
              </div>
              <div className="p-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] block mb-1">
                  Teaching Excellence
                </span>
                <h3 className="font-display text-sm font-bold text-[#221F1F]">
                  Passionate Teaching Staff
                </h3>
                <p className="text-[11px] text-[#57534E] mt-1">
                  Nurturing intellectual curiosity, good conduct, and academic readiness.
                </p>
              </div>
            </div>
          </div>

          {/* Qualified Staff Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] mx-auto mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#221F1F] mb-1">
                Qualified & Empathetic
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Trained educators who understand early child psychology and employ measurable teaching techniques.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#C88A1A] mx-auto mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#221F1F] mb-1">
                Mentoring & Guidance
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Encouraging curiosity and respectful dialogue in every lesson to inspire active learner participation.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#1B4332] mx-auto mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#221F1F] mb-1">
                Moral Role Models
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Instilling honesty, punctuality and Islamic good manners through positive personal example.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Why Parents Trust Our Approach (8 Points) */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Community Confidence
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Why Parents Trust Our Approach
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2">
              We cultivate close, transparent partnerships with families to support each child’s educational and moral journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_PARENTS_TRUST.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-[#E8DFD5] rounded-xl p-5 hover:border-[#C88A1A] transition-all hover:shadow-xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-[#221F1F] leading-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed pl-8">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentic Photo Gallery of School Life & Community */}
      <AuthenticSchoolGallery
        title="Moments of Growth & School Life"
        subtitle="Explore our authentic learning community, dedicated teaching team, and proud student ambassadors."
      />

      {/* 10. About Page CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#6B1724] rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-sm">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D49A24] block mb-2">
                Join Our School Family
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 text-balance">
                Ready to Begin Your Child's Journey?
              </h2>
              <p className="text-sm sm:text-base text-[#FAF7F2]/85 mb-8">
                Explore our academic programmes or begin the admission process today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onNavigate('/academics')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-[#6B1724] bg-white hover:bg-[#FAF7F2] transition-colors shadow-xs"
                >
                  <span>Explore Academics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/admissions')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#C88A1A] hover:bg-[#B57A12] transition-colors shadow-xs"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
