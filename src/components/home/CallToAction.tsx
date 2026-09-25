import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface CallToActionProps {
  onOpenApply: () => void;
  onOpenContact: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  onOpenApply,
  onOpenContact,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#6B1724] rounded-3xl p-8 sm:p-12 lg:p-16 text-white text-center relative overflow-hidden shadow-md">
          {/* Subtle decorative background ring */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-[#D49A24]/30 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border border-[#D49A24]/20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D49A24] block mb-3">
              Enrollment For The Academic Session
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Give Your Child a Stronger Start
            </h2>

            <p className="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed mb-8 max-w-xl mx-auto">
              Join a learning community where knowledge, character and practical skills grow together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenApply}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-sm sm:text-base font-semibold text-[#6B1724] bg-white hover:bg-[#FAF7F2] transition-colors shadow-xs"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-sm sm:text-base font-semibold text-white border border-white/40 hover:bg-white/10 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#D49A24]" />
                <span>Contact the School</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
