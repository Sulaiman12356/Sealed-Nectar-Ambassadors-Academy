import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Shield,
  HelpCircle,
  Phone
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface ApplicationStatusPageProps {
  onNavigate: (path: string) => void;
}

export const ApplicationStatusPage: React.FC<ApplicationStatusPageProps> = ({ onNavigate }) => {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [verificationInput, setVerificationInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [statusResult, setStatusResult] = useState<{
    referenceNumber: string;
    studentName: string;
    classAppliedFor: string;
    sessionName: string;
    status: string;
    submissionDate: string;
    lastUpdatedDate: string;
  } | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceNumber.trim() || !verificationInput.trim()) {
      setErrorMessage('Please provide both the Application Reference Number and the registered phone number or email.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setStatusResult(null);

    try {
      const res = await fetch('/api/admissions/status-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceNumber: referenceNumber.trim(),
          verification: verificationInput.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to verify application. Please check your reference and contact details.');
      }

      setStatusResult(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to retrieve status at this time.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Accepted':
      case 'Enrolled':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Interview':
      case 'Shortlisted':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Declined':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Submitted':
      default:
        return 'bg-[#FAF7F2] text-[#6B1724] border-[#6B1724]/40';
    }
  };

  const getStatusExplanation = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'Your application has been received and stored in our database. Our admissions officers are currently reviewing documents in sequence.';
      case 'Under Review':
        return 'Our admissions board is reviewing your child’s educational details. You will receive a phone call or SMS with scheduling instructions.';
      case 'Shortlisted':
      case 'Interview':
        return 'Your child has been scheduled for the introductory classroom placement assessment at 4, Azeez Lamidi Street, Makun, Sagamu.';
      case 'Accepted':
        return 'Congratulations! Your child has been offered admission to Sealed Nectar Ambassadors Academy. Please contact the administration office for enrollment clearance.';
      case 'Enrolled':
        return 'Enrollment complete. Welcome to the Sealed Nectar family!';
      case 'Declined':
        return 'We are unable to offer admission for the selected class at this time due to class capacity.';
      default:
        return 'Application is active in the school admissions system.';
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-14 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              Admission Tracker
            </span>
            <span className="w-8 h-px bg-[#6B1724]" />
            <span className="text-xs font-semibold text-[#C88A1A]">
              Secure Inquiry
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#221F1F] mb-3">
            Track Application Status
          </h1>

          <p className="text-xs sm:text-sm text-[#57534E] max-w-lg mx-auto">
            Enter your official Application Reference Number and registered phone number or email to view the current verified status.
          </p>
        </div>

        {/* Verification Form Card */}
        <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center gap-3 pb-5 mb-5 border-b border-[#E8DFD5]">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#E8DFD5]">
              <img
                src="/images/boy_and_girl_sealed.jpg"
                alt="Sealed Nectar Ambassador"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A] block">
                Official Admissions Desk
              </span>
              <h2 className="font-display text-sm font-bold text-[#221F1F]">
                Sealed Nectar Ambassadors Academy Verification
              </h2>
            </div>
          </div>

          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1.5">
                Application Reference Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SNAA-2026-000001"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E8DFD5] font-mono text-sm uppercase text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1.5">
                Registered Parent Phone Number or Email *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 08012345678 or parent@gmail.com"
                value={verificationInput}
                onChange={(e) => setVerificationInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E8DFD5] text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
              />
            </div>

            <div className="text-[11px] text-[#57534E] flex items-center gap-1.5 pt-1">
              <Shield className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>We authenticate contact credentials to protect student privacy.</span>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#6B1724] text-white text-sm font-semibold hover:bg-[#52111B] transition-colors shadow-xs"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Record...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Check Application Status</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Status Result Card */}
        {statusResult && (
          <div className="bg-white border-2 border-[#6B1724] rounded-2xl p-6 sm:p-8 shadow-sm space-y-5 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DFD5] pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#C88A1A] uppercase tracking-wider block">
                  Application Verified
                </span>
                <h3 className="font-mono text-lg font-bold text-[#6B1724]">
                  {statusResult.referenceNumber}
                </h3>
              </div>

              <div>
                <span className={`inline-block px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider ${getStatusBadge(statusResult.status)}`}>
                  {statusResult.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-[#57534E] block">Student Name:</span>
                <strong className="text-[#221F1F] font-display text-base">
                  {statusResult.studentName}
                </strong>
              </div>

              <div>
                <span className="text-[#57534E] block">Class Applied For:</span>
                <strong className="text-[#6B1724]">
                  {statusResult.classAppliedFor}
                </strong>
              </div>

              <div>
                <span className="text-[#57534E] block">Academic Session:</span>
                <span className="font-medium text-[#221F1F]">
                  {statusResult.sessionName}
                </span>
              </div>

              <div>
                <span className="text-[#57534E] block">Submission Date:</span>
                <span className="text-[#57534E]">
                  {new Date(statusResult.submissionDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Explanation of Status */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs leading-relaxed text-[#57534E]">
              <strong className="text-[#221F1F] block mb-1">
                Current Next Step:
              </strong>
              {getStatusExplanation(statusResult.status)}
            </div>

            {/* Help & Contact */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#57534E] pt-3 border-t border-[#E8DFD5] gap-3">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C88A1A]" />
                <span>Admissions Desk: {SCHOOL_INFO.contact.primaryPhone}</span>
              </div>

              <button
                onClick={() => onNavigate('/admissions')}
                className="text-[#6B1724] font-semibold hover:underline"
              >
                Submit Another Application →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
