import React from 'react';
import {
  BookOpen,
  Languages,
  Cpu,
  Palette,
  Activity,
  Award,
  Users,
  Smile,
  ShieldCheck
} from 'lucide-react';

export const DayAtSNAASection: React.FC = () => {
  const activities = [
    {
      title: 'Academic Learning',
      category: 'Core Curriculum',
      description: 'Engaging classroom instruction in mathematics, sciences, literacy, and inquiry-based discovery.',
      icon: BookOpen,
    },
    {
      title: 'Islamic Learning',
      category: 'Spiritual Growth',
      description: 'Understanding prophetic morals, Tajweed recitation, Islamic studies, and respectful daily Adab.',
      icon: ShieldCheck,
    },
    {
      title: 'Arabic & Global Languages',
      category: 'Languages',
      description: 'Daily immersion in Arabic language fluency and conversational Mandarin Chinese lessons.',
      icon: Languages,
    },
    {
      title: 'Technology & STEM',
      category: 'Digital Skills',
      description: 'Hands-on exposure to computer literacy, coding fundamentals, typing, and introductory robotics.',
      icon: Cpu,
    },
    {
      title: 'Creative & Vocational Activities',
      category: 'Practical Skills',
      description: 'Crafts, fine art, constructive projects, and vocational skills developing self-reliance.',
      icon: Palette,
    },
    {
      title: 'Sports & Karate Club',
      category: 'Physical Discipline',
      description: 'Calisthenics, athletic games, martial arts kata drills, and student ceremonial marching parades.',
      icon: Activity,
    },
    {
      title: 'Leadership & Social Development',
      category: 'Character',
      description: 'Group collaborations, class presentations, community responsibilities, and mentorship.',
      icon: Users,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              A Day at SNAA
            </span>
            <span className="w-8 h-px bg-[#6B1724]" />
            <span className="text-xs font-semibold text-[#C88A1A]">
              Enriching Experiences
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F] mb-3">
            Learning Beyond the Classroom
          </h2>

          <p className="text-base sm:text-lg text-[#57534E]">
            A glimpse into the varied, balanced, and purposeful school day our students experience across academics, character, languages, and physical vigor.
          </p>
        </div>

        {/* Activities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-5 hover:border-[#C88A1A] transition-all hover:shadow-xs group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B1724]">
                      {act.category}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] flex items-center justify-center text-[#C88A1A] group-hover:bg-[#6B1724] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-display text-base font-bold text-[#221F1F] mb-1.5">
                    {act.title}
                  </h3>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-[#E8DFD5]/60 text-[11px] font-medium text-[#1B4332]">
                  Holistic Student Experience
                </div>
              </div>
            );
          })}

          {/* Educational Philosophy Card */}
          <div className="bg-[#6B1724] text-white rounded-xl p-5 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D49A24] block mb-2">
                Our Educational Vision
              </span>
              <h3 className="font-display text-base font-bold text-white mb-2">
                Morality and Knowledge
              </h3>
              <p className="text-xs text-white/85 leading-relaxed">
                Every moment of the day is intentional, guiding our learners to grow with confidence, dignity, respect and joy.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-white/20 text-xs font-serif italic text-[#D49A24]">
              "Empowering Minds, Shaping the Future"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
