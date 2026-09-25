import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

interface MuslimFamilySectionProps {
  onOpenApply: () => void;
  onOpenContact: () => void;
}

export const MuslimFamilySection: React.FC<MuslimFamilySectionProps> = ({
  onOpenApply,
  onOpenContact,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E8DFD5] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xs relative overflow-hidden">
          {/* Subtle decorative background tint */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C88A1A]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                A Dedicated Learning Community
              </span>
              <span className="w-8 h-px bg-[#6B1724]" />
              <span className="text-xs font-semibold text-[#1B4332]">
                For Discerning Families
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F] mb-4 leading-tight">
              An Education That Nurtures Both Mind and Character
            </h2>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-6">
              For families looking for an environment where children can pursue academic knowledge while growing with Islamic values, Sealed Nectar Ambassadors Academy provides a learning community built around knowledge, character and responsibility.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#221F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Respectful, modest school atmosphere where Islamic values are lived and celebrated</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#221F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Rigorous national curriculum ensuring children thrive in modern intellectual pursuits</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#221F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span>Nurturing educators who act as compassionate mentors and moral role models</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenApply}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#6B1724] hover:bg-[#52111B] transition-colors shadow-xs"
              >
                <span>Enroll Your Child</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-[#6B1724] bg-[#FAF7F2] border border-[#E8DFD5] hover:bg-[#F4EFEB] transition-colors"
              >
                <span>Speak With Admissions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
