import React, { useState } from 'react';
import { X, Check, BookOpen, Globe, Cpu, Award } from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApply: () => void;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({
  isOpen,
  onClose,
  onOpenApply,
}) => {
  const [activeTab, setActiveTab] = useState<'early' | 'primary' | 'secondary'>('primary');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="bg-[#6B1724] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SchoolCrest size="sm" lightMode={true} showText={false} />
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold">
                Academic Curriculum & Pathways
              </h2>
              <p className="text-xs text-[#FAF7F2]/80">
                Sealed Nectar Ambassadors Academy · Dual Curriculum Framework
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#FAF7F2] px-6 py-3 border-b border-[#E8DFD5] flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('early')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'early'
                ? 'bg-[#6B1724] text-white shadow-xs'
                : 'bg-white text-[#57534E] hover:bg-[#F4EFEB] border border-[#E8DFD5]'
            }`}
          >
            Early Years (Crèche, KG, Nursery)
          </button>
          <button
            onClick={() => setActiveTab('primary')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'primary'
                ? 'bg-[#6B1724] text-white shadow-xs'
                : 'bg-white text-[#57534E] hover:bg-[#F4EFEB] border border-[#E8DFD5]'
            }`}
          >
            Basic Education (Primary 1 - 6)
          </button>
          <button
            onClick={() => setActiveTab('secondary')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'secondary'
                ? 'bg-[#6B1724] text-white shadow-xs'
                : 'bg-white text-[#57534E] hover:bg-[#F4EFEB] border border-[#E8DFD5]'
            }`}
          >
            Junior Secondary (JSS 1 & JSS 2)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6">
          {activeTab === 'early' && (
            <div className="space-y-4">
              <div className="aspect-[21/9] rounded-xl overflow-hidden border border-[#E8DFD5] relative bg-white">
                <img
                  src="/images/children_sealed.jpg"
                  alt="Sealed Nectar Early Years pupils"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1724]">
                  Early Childhood Community
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#221F1F]">
                Early Years Foundation Stage (Ages 0 to 5)
              </h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Our early childhood pedagogy integrates sensory development with phonics readiness, gentle social guidance, and active play. We foster curiosity and high communicative self-confidence from the earliest stages.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Sensory & motor coordination workshops',
                  'Jolly phonics & early literacy readiness',
                  'Numeracy through tangible manipulatives',
                  'Foundational moral etiquette & respectful habits',
                  'Introduction to basic conversational Arabic',
                  'Music, art and educational toy exploration',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#221F1F] bg-white p-3 rounded-lg border border-[#E8DFD5]">
                    <Check className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'primary' && (
            <div className="space-y-4">
              <div className="aspect-[21/9] rounded-xl overflow-hidden border border-[#E8DFD5] relative bg-white">
                <img
                  src="/images/chinese_training_student.jpg"
                  alt="Primary and Mandarin Chinese training"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1724]">
                  Primary & Global Languages
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#221F1F]">
                Primary Education (Primary 1 to Primary 6)
              </h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                A thorough grounding across core national curriculum subjects amplified by global language immersion and practical technology.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Mathematics, Quantitative & Verbal Reasoning',
                  'English Language, Grammar, Reading & Diction',
                  'Basic Science & Agricultural Technology',
                  'Mandarin Chinese & Arabic Language Tracks',
                  'Computer Studies, Coding & Basic Robotics',
                  'Islamic Religious Studies / Moral Upbringing',
                  'Vocational Crafts & Practical Entrepreneurship',
                  'Physical Education & Karate Club Training',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#221F1F] bg-white p-3 rounded-lg border border-[#E8DFD5]">
                    <Check className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'secondary' && (
            <div className="space-y-4">
              <div className="aspect-[21/9] rounded-xl overflow-hidden border border-[#E8DFD5] relative bg-white">
                <img
                  src="/images/marching_children_sealed.jpg"
                  alt="Junior secondary marching drills and leadership"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1724]">
                  Secondary Leadership & Drills
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#221F1F]">
                Junior Secondary School (JSS 1 & JSS 2)
              </h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Guided by the College Motto: "Empowering Minds, Shaping the Future". Secondary learners engage in advanced analytical rigor, pre-vocational discovery and civic leadership.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Integrated Basic Science & Technology',
                  'Foundational Mathematics & Data Literacy',
                  'English Literature & Advanced Composition',
                  'Intermediate Arabic & Mandarin Chinese',
                  'Digital ICT, Applied Robotics & Web Concepts',
                  'Social Studies, Civic Education & Ethics',
                  'Pre-vocational Studies & Business Studies',
                  'Physical Health, Athletics & Karate Kata Discipline',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#221F1F] bg-white p-3 rounded-lg border border-[#E8DFD5]">
                    <Check className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special highlights banner */}
          <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-[#6B1724] uppercase tracking-wider mb-1">
                Have Specific Curriculum Questions?
              </h4>
              <p className="text-xs text-[#57534E]">
                Our academic coordinators can discuss your child's placement and subject syllabi in detail.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenApply();
              }}
              className="px-4 py-2 rounded-lg bg-[#6B1724] text-white text-xs font-semibold hover:bg-[#52111B] whitespace-nowrap"
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F4EFEB] px-6 py-4 border-t border-[#E8DFD5] flex items-center justify-between">
          <span className="text-xs text-[#57534E]">
            SNAA Dual Curriculum Framework
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white border border-[#E8DFD5] text-xs font-semibold text-[#221F1F] hover:bg-[#FAF7F2]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
