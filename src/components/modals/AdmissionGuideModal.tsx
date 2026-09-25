import React from 'react';
import { X, Download, Printer, CheckCircle, FileText, Phone } from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';
import { SCHOOL_INFO } from '../../data/schoolData';

interface AdmissionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOnlineForm: () => void;
}

export const AdmissionGuideModal: React.FC<AdmissionGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenOnlineForm,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl my-8">
        {/* Modal Top */}
        <div className="bg-[#6B1724] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SchoolCrest size="sm" lightMode={true} showText={false} />
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold">
                Admission Guide & Prospectus
              </h2>
              <p className="text-xs text-[#FAF7F2]/80">
                Sealed Nectar Ambassadors Academy · Academic Enrollment Guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Authentic Uniform Standard Visual */}
          <div className="flex items-center gap-4 p-3.5 bg-white rounded-xl border border-[#E8DFD5] shadow-xs">
            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#E8DFD5] bg-[#FAF7F2]">
              <img
                src="/images/boy_and_girl_sealed.jpg"
                alt="Approved Academy Uniform"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A] block">
                Standard School Uniform
              </span>
              <h4 className="text-xs font-bold text-[#221F1F]">
                Approved Academy Uniform & Attire
              </h4>
              <p className="text-[11px] text-[#57534E] mt-0.5 leading-snug">
                Official uniform sample for male and female pupils admitted to Sealed Nectar Ambassadors Academy.
              </p>
            </div>
          </div>

          {/* Official Document Banner */}
          <div className="bg-white border border-[#E8DFD5] rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-3 mb-3">
              <div>
                <span className="text-[11px] font-bold text-[#C88A1A] uppercase tracking-wider block">
                  Official Admission Procedure
                </span>
                <h3 className="font-display text-base font-bold text-[#221F1F]">
                  Steps to Enroll Your Child at SNAA
                </h3>
              </div>
              <span className="text-xs text-[#57534E] font-medium">Session 2025/2026</span>
            </div>

            <ol className="space-y-3 text-xs sm:text-sm text-[#57534E]">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#6B1724] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-[#221F1F]">Form Collection or Online Registration: </strong>
                  Fill out the digital form on this website or obtain the printed application directly at our Makun campus.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#6B1724] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-[#221F1F]">Document Submission: </strong>
                  Provide child's birth certificate, 2 recent passport photographs, and previous term report card (for Primary & JSS applicants).
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#6B1724] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-[#221F1F]">Informal Evaluation / Assessment: </strong>
                  A warm, welcoming diagnostic assessment to ascertain child placement and foundational reading/math readiness.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#6B1724] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-[#221F1F]">Offer Letter & Flexible Payment Options: </strong>
                  Receive official admission letter with options for standard settlement or the SNAA Pay Later flexible installment schedule.
                </div>
              </li>
            </ol>
          </div>

          {/* Pay Later Plan Detail */}
          <div className="bg-[#FAF7F2] border-l-4 border-[#C88A1A] p-4 rounded-r-xl">
            <h4 className="text-xs font-bold text-[#6B1724] uppercase tracking-wider mb-1">
              About the Pay Later Plan
            </h4>
            <p className="text-xs text-[#57534E] leading-relaxed">
              We understand that families experience periodic cashflow cycles. The SNAA Pay Later plan allows initial enrollment registration with structured, predictable fee instalments spread across the academic term, ensuring child learning is uninterrupted.
            </p>
          </div>

          {/* Contact Helpline */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl border border-[#E8DFD5] text-xs gap-3">
            <div className="flex items-center gap-2 text-[#57534E]">
              <Phone className="w-4 h-4 text-[#6B1724]" />
              <span>Admissions Inquiries: <strong>{SCHOOL_INFO.contact.primaryPhone}</strong></span>
            </div>
            <div className="text-[#57534E]">
              Campus: <strong>Behind Loto Ewu-Oliwo, Makun, Sagamu</strong>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F4EFEB] px-6 py-4 border-t border-[#E8DFD5] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E8DFD5] bg-white text-xs font-semibold text-[#221F1F] hover:bg-[#FAF7F2] transition-colors"
          >
            <Printer className="w-4 h-4 text-[#C88A1A]" />
            <span>Print Guide</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenOnlineForm();
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#6B1724] text-white text-xs font-semibold hover:bg-[#52111B] transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Fill Online Application</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
