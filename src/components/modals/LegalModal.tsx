import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        <div className="bg-[#6B1724] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SchoolCrest size="sm" lightMode={true} showText={false} />
            <div>
              <h2 className="font-display text-lg font-bold">
                {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms of Educational Service'}
              </h2>
              <p className="text-xs text-[#FAF7F2]/80">
                Sealed Nectar Ambassadors Academy · Governance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-[#57534E] leading-relaxed">
          {isPrivacy ? (
            <>
              <p className="font-medium text-[#221F1F]">
                Sealed Nectar Ambassadors Academy (SNAA) is committed to safeguarding the personal privacy of our pupils, parents, and website visitors.
              </p>
              <h3 className="font-bold text-[#6B1724] uppercase tracking-wider text-xs pt-2">
                1. Information We Collect
              </h3>
              <p>
                We only gather details necessary for educational administration, including student names, birth dates, guardian phone numbers, email addresses, and residential proximity for admissions evaluations.
              </p>
              <h3 className="font-bold text-[#6B1724] uppercase tracking-wider text-xs pt-2">
                2. Use of Information
              </h3>
              <p>
                Submitted information is utilized solely for school communication, entrance scheduling, report preparation, and academic record-keeping. We do not sell or lease parent details to commercial third parties.
              </p>
              <h3 className="font-bold text-[#6B1724] uppercase tracking-wider text-xs pt-2">
                3. Student Safeguarding & Media
              </h3>
              <p>
                Photographs and academic project showcases are displayed strictly for educational celebration and community updates with parental consent.
              </p>
            </>
          ) : (
            <>
              <p className="font-medium text-[#221F1F]">
                By accessing this portal and submitting applications to Sealed Nectar Ambassadors Academy, parents and guardians agree to our institutional policies.
              </p>
              <h3 className="font-bold text-[#6B1724] uppercase tracking-wider text-xs pt-2">
                1. Admissions Integrity
              </h3>
              <p>
                All student details and previous academic documentation provided must be truthful and accurate to ensure appropriate classroom placement.
              </p>
              <h3 className="font-bold text-[#6B1724] uppercase tracking-wider text-xs pt-2">
                2. Pay Later Arrangement
              </h3>
              <p>
                Participation in our flexible fee installment plan requires adherence to agreed milestone dates agreed upon with school finance officers.
              </p>
              <h3 className="font-bold text-[#6B1724] uppercase tracking-wider text-xs pt-2">
                3. School Conduct & Ethos
              </h3>
              <p>
                SNAA upholds a zero-tolerance policy towards bullying, indiscipline, and disrespect, in keeping with our motto "Morality and Knowledge".
              </p>
            </>
          )}
        </div>

        <div className="bg-[#F4EFEB] px-6 py-3.5 border-t border-[#E8DFD5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#6B1724] text-white text-xs font-semibold hover:bg-[#52111B]"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
