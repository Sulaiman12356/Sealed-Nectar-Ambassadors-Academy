import React from 'react';
import { ArrowRight, Download, CheckCircle2, HelpCircle } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SCHOOL_IMAGES } from '../../data/schoolData';

interface AdmissionsPreviewProps {
  onStartAdmission: () => void;
  onDownloadGuide: () => void;
  onOpenAdmissionInfo: () => void;
}

export const AdmissionsPreview: React.FC<AdmissionsPreviewProps> = ({
  onStartAdmission,
  onDownloadGuide,
  onOpenAdmissionInfo,
}) => {
  return (
    <section id="admissions" className="py-16 sm:py-20 bg-white border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              Enrollment
            </span>
            <span className="w-6 h-px bg-[#6B1724]" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
            Admissions Are Open
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] mt-1 max-w-2xl">
            Give your child a strong foundation for academic success, character development and future opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left/Middle Card: Photo + Entry Info + Pay Later + Start CTA */}
          <div className="lg:col-span-8 bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
            {/* Student Photo */}
            <div className="w-full md:w-52 shrink-0">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#F4EFEB] border border-[#E8DFD5]">
                <ImageWithFallback
                  src={SCHOOL_IMAGES.heroStudents}
                  alt="Students at Sealed Nectar Ambassadors Academy"
                  className="w-full h-full object-cover"
                  fallbackText="Enrolling students at SNAA"
                />
              </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 w-full space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#6B1724] uppercase tracking-wide mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#C88A1A]" />
                  <span>Entry Levels Accepted</span>
                </div>
                <p className="text-xs sm:text-sm text-[#221F1F] font-medium pl-6">
                  Early Years & Basic Levels · Primary 1–6 · JSS 1 & JSS 2 (Current Target)
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332] uppercase tracking-wide mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                  <span>Scholarship Opportunities</span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] pl-6">
                  Merit-based scholarships may be available for exceptionally performing candidates during entrance evaluations.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#6B1724] uppercase tracking-wide mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#C88A1A]" />
                  <span>Flexible Pay Later Plan</span>
                </div>
                <p className="text-xs sm:text-sm text-[#57534E] pl-6">
                  Initial registration with structured, flexible fee payments designed to assist families through temporary financial challenges.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onStartAdmission}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#6B1724] hover:bg-[#52111B] active:bg-[#3E0A12] shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#6B1724]"
                >
                  <span>Start Admission Process</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenAdmissionInfo}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-xs font-semibold text-[#57534E] hover:text-[#6B1724] transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-[#C88A1A]" />
                  <span>Admission Information</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Card: Download Admission Form (PDF) matching Prototype */}
          <div className="lg:col-span-4 bg-[#FDFBF7] border border-[#E8DFD5] rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#6B1724]/10 text-[#6B1724] flex items-center justify-center mb-4">
                <Download className="w-6 h-6" />
              </div>

              <h3 className="font-display text-xl font-bold text-[#221F1F] mb-2">
                Download Admission Form
              </h3>

              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                Prefer to fill the application by hand? Get the official physical registration form and step-by-step prospectus guide.
              </p>

              <div className="bg-[#FAF7F2] rounded-xl p-3.5 border border-[#E8DFD5] mb-6 text-xs text-[#57534E] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#221F1F]">Application Package</span>
                  <span className="text-[11px] text-[#1B4332] font-semibold">PDF Guide</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>Requirements & Checklist</span>
                  <span>Included</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>Pay Later Request Form</span>
                  <span>Included</span>
                </div>
              </div>
            </div>

            <button
              onClick={onDownloadGuide}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-[#6B1724] hover:bg-[#52111B] active:bg-[#3E0A12] transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Form (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
