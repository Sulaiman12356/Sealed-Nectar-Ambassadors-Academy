import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Printer,
  Download,
  AlertCircle,
  FileText,
  Upload,
  Clock,
  Shield,
  Search,
  Check
} from 'lucide-react';
import { AVAILABLE_CLASSES } from '../data/schoolData';

interface AdmissionsPageProps {
  onNavigate: (path: string) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onNavigate }) => {
  // Public admission statistics fetched from real backend
  const [admissionStats, setAdmissionStats] = useState<{
    applicationsReceived: number;
    activeSession: string;
    isOpen: boolean;
    deadline?: string;
  } | null>(null);

  // Form step: 1 (Student), 2 (Parent), 3 (Additional), 4 (Documents), 5 (Review), 6 (Success)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedAccuracy, setConfirmedAccuracy] = useState<boolean>(false);

  // Success state
  const [submittedApplication, setSubmittedApplication] = useState<{
    referenceNumber: string;
    studentFullName: string;
    classAppliedFor: string;
    submissionDate: string;
    status: string;
    sessionName: string;
  } | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    // Step 1: Student
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'male',
    nationality: 'Nigerian',
    stateOfOrigin: 'Ogun State',
    lga: 'Sagamu',
    homeAddress: '',
    classAppliedFor: 'Primary 1',
    previousSchool: '',
    previousClass: '',
    // Step 2: Parent/Guardian
    guardianFullName: '',
    guardianRelationship: 'Father',
    guardianPhone: '',
    guardianAltPhone: '',
    guardianEmail: '',
    guardianAddress: '',
    // Step 3: Additional
    hasPreviousExperience: 'Yes',
    previousSchoolName: '',
    reasonForLeaving: '',
    additionalNotes: '',
    payLaterRequested: false,
    // Step 4: Documents
    documents: [
      { id: 'birth_cert', name: 'Birth Certificate', required: true, attached: false, fileName: '' },
      { id: 'passport_photo', name: 'Recent Passport Photograph', required: true, attached: false, fileName: '' },
      { id: 'previous_result', name: 'Previous School Result / Report Sheet', required: false, attached: false, fileName: '' },
    ],
  });

  // Fetch real database count
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/public/admission-stats');
      if (res.ok) {
        const data = await res.json();
        setAdmissionStats(data);
      }
    } catch (err) {
      console.error('Failed to load admission stats', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleDocumentAttach = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        documents: prev.documents.map((d) =>
          d.id === docId ? { ...d, attached: true, fileName: file.name } : d
        ),
      }));
    }
  };

  const validateStep = (step: number) => {
    setErrorMessage(null);
    if (step === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setErrorMessage('Please provide student First Name and Last Name.');
        return false;
      }
      if (!formData.dateOfBirth) {
        setErrorMessage('Please provide the student’s Date of Birth.');
        return false;
      }
      if (!formData.homeAddress.trim()) {
        setErrorMessage('Please provide the student’s Home Residential Address.');
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (!formData.guardianFullName.trim()) {
        setErrorMessage('Please provide Parent or Guardian Full Name.');
        return false;
      }
      if (!formData.guardianPhone.trim()) {
        setErrorMessage('Please provide an active Phone Number.');
        return false;
      }
      // Simple phone length check
      if (formData.guardianPhone.replace(/\D/g, '').length < 8) {
        setErrorMessage('Please enter a valid telephone number.');
        return false;
      }
      return true;
    }

    if (step === 4) {
      // Check required documents
      const missingRequired = formData.documents.find((d) => d.required && !d.attached);
      if (missingRequired) {
        setErrorMessage(`Please upload or attach the required document: ${missingRequired.name}.`);
        return false;
      }
      return true;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setErrorMessage(null);
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Submit to real database endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedAccuracy) {
      setErrorMessage('You must confirm that the information provided is accurate to the best of your knowledge.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: formData.nationality,
        stateOfOrigin: formData.stateOfOrigin,
        lga: formData.lga,
        homeAddress: formData.homeAddress,
        classAppliedFor: formData.classAppliedFor,
        previousSchool: formData.previousSchool || formData.previousSchoolName,
        previousClass: formData.previousClass,
        guardianFullName: formData.guardianFullName,
        guardianRelationship: formData.guardianRelationship,
        guardianPhone: formData.guardianPhone,
        guardianAltPhone: formData.guardianAltPhone,
        guardianEmail: formData.guardianEmail,
        guardianAddress: formData.guardianAddress || formData.homeAddress,
        hasPreviousExperience: formData.hasPreviousExperience,
        reasonForLeaving: formData.reasonForLeaving,
        additionalNotes: formData.additionalNotes,
        payLaterRequested: formData.payLaterRequested,
        documents: formData.documents.map((d) => ({ name: d.name, fileName: d.fileName, attached: d.attached })),
      };

      const res = await fetch('/api/admissions/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application. Please check your inputs.');
      }

      setSubmittedApplication(data.application);
      setCurrentStep(6); // Success step
      fetchStats(); // Update live counter
    } catch (err: any) {
      setErrorMessage(err.message || 'Server error. Please verify your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* 1. Admission Hero */}
      <section className="relative py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                  Official Admission Portal
                </span>
                <span className="w-8 h-px bg-[#6B1724]" />
                <span className="text-xs font-semibold text-[#C88A1A]">
                  Academic Session {admissionStats?.activeSession || '2026/2027'}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#221F1F] leading-tight mb-4 text-balance">
                Admissions Are Open
              </h1>

              <p className="text-lg sm:text-xl font-serif italic text-[#6B1724] mb-3">
                "Give your child an education that develops both knowledge and character."
              </p>

              <p className="text-base text-[#57534E] leading-relaxed mb-6 font-body">
                Sealed Nectar Ambassadors Academy provides a balanced educational experience combining Western academic learning, Islamic education, moral development and practical skills.
              </p>

              {/* Levels Banner */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase bg-white border border-[#E8DFD5] text-[#6B1724]">
                  Early Years
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase bg-white border border-[#E8DFD5] text-[#6B1724]">
                  Basic Education
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase bg-white border border-[#E8DFD5] text-[#6B1724]">
                  Junior Secondary
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase bg-white border border-[#E8DFD5] text-[#C88A1A]">
                  Senior Secondary
                </span>
              </div>

              {/* Public Real Database Admission Counter */}
              <div className="inline-flex flex-wrap items-center gap-4 p-3 bg-white border border-[#E8DFD5] rounded-xl text-xs sm:text-sm shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] animate-pulse" />
                  <span className="text-[#57534E]">Applications Received:</span>
                  <strong className="text-[#6B1724] font-mono text-sm sm:text-base tabular-nums">
                    {admissionStats ? admissionStats.applicationsReceived : '0'}
                  </strong>
                </div>
                <span className="text-[#E8DFD5] hidden sm:inline">|</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#57534E]">Status:</span>
                  <span className="font-semibold text-[#1B4332]">
                    {admissionStats?.isOpen !== false ? 'Admissions Open' : 'Closed'}
                  </span>
                </div>
                <span className="text-[#E8DFD5] hidden sm:inline">|</span>
                <button
                  onClick={() => onNavigate('/admissions/status')}
                  className="text-[#6B1724] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Track Existing Application</span>
                </button>
              </div>
            </div>

            {/* Right Photo Column: Official Uniform Standard */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD5] bg-white p-2">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#F4EFEB]">
                  <img
                    src="/images/boy_and_girl_sealed.jpg"
                    alt="Sealed Nectar pupils in official academy uniform"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1724] shadow-sm backdrop-blur-xs">
                      Official Academy Uniform
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#6B1724] font-display">
                    Sealed Nectar Ambassadors in Uniform
                  </p>
                  <p className="text-[11px] text-[#57534E] mt-0.5">
                    Admissions currently ongoing for Crèche, Kindergarten, Primary & Junior Secondary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Multi-Step Form Container */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Screen */}
          {currentStep === 6 && submittedApplication ? (
            <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-10 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block mb-1">
                Official Submission Confirmed
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F] mb-2">
                Application Submitted Successfully
              </h2>

              <p className="text-xs sm:text-sm text-[#57534E] max-w-lg mx-auto mb-6 leading-relaxed">
                Please keep your application reference number for future enquiries. Our admissions board has received this official record and will communicate with you shortly regarding evaluation dates.
              </p>

              {/* Reference Card */}
              <div className="bg-[#FAF7F2] border-2 border-dashed border-[#C88A1A] rounded-xl p-6 max-w-md mx-auto text-left mb-8 space-y-3">
                <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-3">
                  <span className="text-xs text-[#57534E]">Application Reference:</span>
                  <span className="font-mono text-lg font-bold text-[#6B1724] tabular-nums">
                    {submittedApplication.referenceNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#57534E]">Student Name:</span>
                  <span className="font-semibold text-[#221F1F]">
                    {submittedApplication.studentFullName}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#57534E]">Class Applied For:</span>
                  <span className="font-semibold text-[#221F1F]">
                    {submittedApplication.classAppliedFor}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#57534E]">Academic Session:</span>
                  <span className="font-semibold text-[#221F1F]">
                    {submittedApplication.sessionName}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#57534E]">Submission Date:</span>
                  <span className="font-medium text-[#57534E]">
                    {new Date(submittedApplication.submissionDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-[#E8DFD5]">
                  <span className="text-[#57534E]">Current Status:</span>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#6B1724] text-white text-xs font-semibold">
                    {submittedApplication.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-xs sm:text-sm font-semibold text-[#221F1F] hover:bg-[#FAF7F2] transition-colors shadow-xs"
                >
                  <Printer className="w-4 h-4 text-[#C88A1A]" />
                  <span>Print Application</span>
                </button>

                <button
                  onClick={() => onNavigate('/admissions/status')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-xs sm:text-sm font-semibold text-[#6B1724] hover:bg-[#FAF7F2] transition-colors shadow-xs"
                >
                  <Search className="w-4 h-4 text-[#6B1724]" />
                  <span>Check Status Later</span>
                </button>

                <button
                  onClick={() => onNavigate('/')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#6B1724] text-white text-xs sm:text-sm font-semibold hover:bg-[#52111B] transition-colors shadow-xs"
                >
                  <span>Return Home</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#E8DFD5] rounded-2xl shadow-sm overflow-hidden">
              {/* Step Progress Indicators */}
              <div className="bg-[#FAF7F2] px-4 sm:px-8 py-4 border-b border-[#E8DFD5]">
                <div className="flex items-center justify-between overflow-x-auto pb-1 text-xs font-semibold text-[#57534E]">
                  {[
                    { num: 1, label: 'Student' },
                    { num: 2, label: 'Parent' },
                    { num: 3, label: 'Background' },
                    { num: 4, label: 'Documents' },
                    { num: 5, label: 'Review' },
                  ].map((s, idx) => (
                    <React.Fragment key={s.num}>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                            currentStep === s.num
                              ? 'bg-[#6B1724] text-white shadow-xs'
                              : currentStep > s.num
                              ? 'bg-[#1B4332] text-white'
                              : 'bg-[#E8DFD5] text-[#57534E]'
                          }`}
                        >
                          {currentStep > s.num ? '✓' : s.num}
                        </span>
                        <span className={currentStep === s.num ? 'text-[#6B1724] font-bold' : ''}>
                          {s.label}
                        </span>
                      </div>
                      {idx < 4 && <div className="w-6 sm:w-12 h-px bg-[#E8DFD5] shrink-0 mx-1" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Error Alert Box */}
              {errorMessage && (
                <div className="m-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form Content Steps */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                {/* STEP 1: Student Information */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#221F1F]">
                        Step 1: Student Information
                      </h3>
                      <p className="text-xs text-[#57534E] mt-0.5">
                        Please provide the legal personal details of the prospective learner.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ibrahim"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          placeholder="Optional"
                          value={formData.middleName}
                          onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Last Name (Surname) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Adeyemi"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Gender *
                        </label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Nationality
                        </label>
                        <input
                          type="text"
                          value={formData.nationality}
                          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          State of Origin
                        </label>
                        <input
                          type="text"
                          value={formData.stateOfOrigin}
                          onChange={(e) => setFormData({ ...formData, stateOfOrigin: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Local Government Area (LGA)
                        </label>
                        <input
                          type="text"
                          value={formData.lga}
                          onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                        Home Residential Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Street number, street name, area, town"
                        value={formData.homeAddress}
                        onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#6B1724] uppercase tracking-wider mb-1">
                          Class Applying For *
                        </label>
                        <select
                          value={formData.classAppliedFor}
                          onChange={(e) => setFormData({ ...formData, classAppliedFor: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#6B1724] bg-white text-sm font-semibold text-[#221F1F] focus:outline-none"
                        >
                          {AVAILABLE_CLASSES.map((cls) => (
                            <option key={cls} value={cls}>
                              {cls}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Previous School Attended (If Any)
                        </label>
                        <input
                          type="text"
                          placeholder="Name of last school attended"
                          value={formData.previousSchool}
                          onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6B1724] text-white text-sm font-semibold hover:bg-[#52111B] transition-colors"
                      >
                        <span>Continue to Parent Information</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Parent or Guardian Information */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#221F1F]">
                        Step 2: Parent or Guardian Information
                      </h3>
                      <p className="text-xs text-[#57534E] mt-0.5">
                        Contact details of the primary caregiver responsible for communications and student care.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Parent / Guardian Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alhaji M. Adeyemi"
                          value={formData.guardianFullName}
                          onChange={(e) => setFormData({ ...formData, guardianFullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Relationship to Student *
                        </label>
                        <select
                          value={formData.guardianRelationship}
                          onChange={(e) => setFormData({ ...formData, guardianRelationship: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        >
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Guardian">Guardian</option>
                          <option value="Relative">Relative</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Primary Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+234 800 000 0000"
                          value={formData.guardianPhone}
                          onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Alternative Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="Secondary phone"
                          value={formData.guardianAltPhone}
                          onChange={(e) => setFormData({ ...formData, guardianAltPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="parent@example.com"
                          value={formData.guardianEmail}
                          onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                          Residential Address (If different from student)
                        </label>
                        <input
                          type="text"
                          placeholder="Leave blank if same as student"
                          value={formData.guardianAddress}
                          onChange={(e) => setFormData({ ...formData, guardianAddress: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#57534E] hover:text-[#221F1F]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6B1724] text-white text-sm font-semibold hover:bg-[#52111B] transition-colors"
                      >
                        <span>Continue to Additional Background</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Additional Information */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#221F1F]">
                        Step 3: Background & Educational Experience
                      </h3>
                      <p className="text-xs text-[#57534E] mt-0.5">
                        Information to help teachers understand your child’s educational background.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                        Does the child have any previous educational experience?
                      </label>
                      <select
                        value={formData.hasPreviousExperience}
                        onChange={(e) => setFormData({ ...formData, hasPreviousExperience: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                      >
                        <option value="Yes">Yes, has attended school previously</option>
                        <option value="No">No, entering school for the first time</option>
                      </select>
                    </div>

                    {formData.hasPreviousExperience === 'Yes' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                            Previous School Name
                          </label>
                          <input
                            type="text"
                            placeholder="Name of last school attended"
                            value={formData.previousSchoolName}
                            onChange={(e) => setFormData({ ...formData, previousSchoolName: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                            Reason for Leaving Previous School
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Relocation, seeking stronger academic foundation"
                            value={formData.reasonForLeaving}
                            onChange={(e) => setFormData({ ...formData, reasonForLeaving: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                        General Additional Notes / Special Learning Considerations
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Any dietary needs, allergies, medical notes or specific learning strengths you would like teachers to know..."
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                      />
                    </div>

                    {/* Pay Later Plan Preference */}
                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="payLaterRequested"
                          checked={formData.payLaterRequested}
                          onChange={(e) => setFormData({ ...formData, payLaterRequested: e.target.checked })}
                          className="mt-1 w-4 h-4 text-[#6B1724] rounded-sm focus:ring-[#6B1724]"
                        />
                        <label htmlFor="payLaterRequested" className="text-xs text-[#221F1F]">
                          <span className="font-bold text-[#6B1724] block">
                            Inquire about our Flexible Pay Later Plan
                          </span>
                          Check this box if you would like the school accounts office to discuss our structured installment fee schedule for this academic session.
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#57534E] hover:text-[#221F1F]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6B1724] text-white text-sm font-semibold hover:bg-[#52111B] transition-colors"
                      >
                        <span>Continue to Document Attachments</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Documents */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#221F1F]">
                        Step 4: Admission Documents
                      </h3>
                      <p className="text-xs text-[#57534E] mt-0.5">
                        Please upload or attach required documents. Documents can also be submitted physically during assessment.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {formData.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-4 rounded-xl border border-[#E8DFD5] bg-[#FAF7F2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-white border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-xs text-[#221F1F]">
                                  {doc.name}
                                </span>
                                {doc.required ? (
                                  <span className="text-[10px] font-bold uppercase text-[#6B1724] bg-red-100/80 px-1.5 py-0.5 rounded-sm">
                                    Required
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-[#57534E] bg-gray-200/80 px-1.5 py-0.5 rounded-sm">
                                    Optional
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#57534E] block mt-0.5">
                                {doc.attached ? `Attached: ${doc.fileName}` : 'PNG, JPG, PDF up to 5MB'}
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#E8DFD5] text-xs font-semibold text-[#221F1F] hover:bg-[#F4EFEB] transition-colors shadow-xs">
                              <Upload className="w-3.5 h-3.5 text-[#C88A1A]" />
                              <span>{doc.attached ? 'Replace File' : 'Choose File'}</span>
                              <input
                                type="file"
                                accept="image/*,application/pdf"
                                onChange={(e) => handleDocumentAttach(doc.id, e)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-white border border-[#E8DFD5] rounded-xl text-xs text-[#57534E]">
                      <strong>Note: </strong> If digital copies are currently unavailable, you may present original physical certificates to our admissions office at 4, Azeez Lamidi Street, Makun, Sagamu on your assessment day.
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#57534E] hover:text-[#221F1F]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6B1724] text-white text-sm font-semibold hover:bg-[#52111B] transition-colors"
                      >
                        <span>Review Application Summary</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: Review & Submit */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#221F1F]">
                        Step 5: Review & Submit Application
                      </h3>
                      <p className="text-xs text-[#57534E] mt-0.5">
                        Please verify all details carefully before submitting to the school database.
                      </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Student Details Summary */}
                      <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-2">
                          <strong className="text-[#6B1724] uppercase tracking-wider text-[11px]">
                            Student Information
                          </strong>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="text-[#C88A1A] font-semibold hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#57534E]">Full Name:</span>
                          <span className="font-semibold text-[#221F1F]">
                            {formData.firstName} {formData.middleName} {formData.lastName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#57534E]">Date of Birth:</span>
                          <span>{formData.dateOfBirth}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#57534E]">Gender:</span>
                          <span className="capitalize">{formData.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#57534E]">Class Applied:</span>
                          <strong className="text-[#6B1724]">{formData.classAppliedFor}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#57534E]">Address:</span>
                          <span className="truncate max-w-[180px]">{formData.homeAddress}</span>
                        </div>
                      </div>

                      {/* Parent Details Summary */}
                      <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-2">
                          <strong className="text-[#6B1724] uppercase tracking-wider text-[11px]">
                            Parent / Guardian
                          </strong>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="text-[#C88A1A] font-semibold hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#57534E]">Guardian Name:</span>
                          <span className="font-semibold text-[#221F1F]">
                            {formData.guardianFullName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#57534E]">Relationship:</span>
                          <span>{formData.guardianRelationship}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#57534E]">Phone Number:</span>
                          <span className="font-mono">{formData.guardianPhone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#57534E]">Email:</span>
                          <span>{formData.guardianEmail || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#57534E]">Pay Later Plan:</span>
                          <span className="font-semibold text-[#1B4332]">
                            {formData.payLaterRequested ? 'Requested' : 'Standard'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="p-4 rounded-xl bg-white border-2 border-[#6B1724]/30">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="confirmAccuracy"
                          required
                          checked={confirmedAccuracy}
                          onChange={(e) => setConfirmedAccuracy(e.target.checked)}
                          className="mt-1 w-4 h-4 text-[#6B1724] rounded-sm focus:ring-[#6B1724]"
                        />
                        <label htmlFor="confirmAccuracy" className="text-xs sm:text-sm text-[#221F1F]">
                          <strong className="block text-[#6B1724] mb-0.5">
                            Accuracy Confirmation *
                          </strong>
                          I confirm that the information provided is accurate to the best of my knowledge.
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#57534E] hover:text-[#221F1F]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#6B1724] text-white text-sm font-semibold shadow-xs transition-colors ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#52111B]'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Saving to Database...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Confirm & Submit Application</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
