import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Printer, AlertCircle } from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';

interface AdmissionApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionApplicationModal: React.FC<AdmissionApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    gender: 'male',
    level: 'Primary 1',
    previousSchool: '',
    guardianName: '',
    relationship: 'Father',
    phone: '',
    email: '',
    address: '',
    payLaterInterest: 'no',
    notes: '',
  });

  const [applicationRef, setApplicationRef] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.studentName.trim() || !formData.dateOfBirth) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!formData.guardianName.trim() || !formData.phone.trim()) return;
      const refNumber = `SNAA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setApplicationRef(refNumber);

      // Save to localStorage for persistence
      try {
        const existing = JSON.parse(localStorage.getItem('snaa_applications') || '[]');
        existing.push({
          ...formData,
          refNumber,
          date: new Date().toISOString(),
        });
        localStorage.setItem('snaa_applications', JSON.stringify(existing));
      } catch (err) {
        console.error('Storage error', err);
      }

      setStep(3);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl my-8">
        {/* Header */}
        <div className="bg-[#6B1724] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SchoolCrest size="sm" lightMode={true} showText={false} />
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold">
                Online Admission Application
              </h2>
              <p className="text-xs text-[#FAF7F2]/80">
                Sealed Nectar Ambassadors Academy · Sagamu, Ogun State
              </p>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#FAF7F2] px-6 py-3 border-b border-[#E8DFD5] flex items-center justify-between text-xs font-semibold text-[#57534E]">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 1 ? 'bg-[#6B1724] text-white' : 'bg-[#E8DFD5] text-[#57534E]'
              }`}
            >
              1
            </span>
            <span>Child Details</span>
          </div>
          <div className="w-8 h-px bg-[#E8DFD5]" />
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 2 ? 'bg-[#6B1724] text-white' : 'bg-[#E8DFD5] text-[#57534E]'
              }`}
            >
              2
            </span>
            <span>Parent & Contact</span>
          </div>
          <div className="w-8 h-px bg-[#E8DFD5]" />
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step === 3 ? 'bg-[#1B4332] text-white' : 'bg-[#E8DFD5] text-[#57534E]'
              }`}
            >
              3
            </span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E8DFD5] mb-2 shadow-xs">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#E8DFD5] bg-[#FAF7F2]">
                  <img
                    src="/images/boy_and_girl_sealed.jpg"
                    alt="Sealed Nectar Pupils"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A] block">
                    Student Enrollment Form
                  </span>
                  <p className="text-xs font-bold text-[#221F1F]">
                    Student Bio-Data & Level Registration
                  </p>
                  <p className="text-[11px] text-[#57534E] leading-tight">
                    Open for Crèche, Kindergarten, Primary 1–6, and Junior Secondary (JSS 1 & 2).
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                  Child's Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ibrahim Adeyemi"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                />
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
                    Gender
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                    Class / Level Applying For *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                  >
                    <option value="Crèche">Crèche (0 - 2 years)</option>
                    <option value="Kindergarten">Kindergarten (3 - 5 years)</option>
                    <option value="Nursery">Nursery (3 - 5 years)</option>
                    <option value="Primary 1">Primary 1</option>
                    <option value="Primary 2">Primary 2</option>
                    <option value="Primary 3">Primary 3</option>
                    <option value="Primary 4">Primary 4</option>
                    <option value="Primary 5">Primary 5</option>
                    <option value="Primary 6">Primary 6</option>
                    <option value="JSS 1">JSS 1 (Junior Secondary)</option>
                    <option value="JSS 2">JSS 2 (Junior Secondary)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                    Previous School Attended (If any)
                  </label>
                  <input
                    type="text"
                    placeholder="Name of last school"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#6B1724] text-white font-semibold text-sm hover:bg-[#52111B] transition-colors"
                >
                  <span>Continue to Parent Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                    Parent / Guardian Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. K. Adeyemi"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                    Relationship to Child
                  </label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian / Relative</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                    Active Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="parent@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                  Residential Address (Sagamu / Ogun State)
                </label>
                <input
                  type="text"
                  placeholder="Street name, landmark, area"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-sm text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                />
              </div>

              {/* Pay Later Option */}
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD5]">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="payLater"
                    checked={formData.payLaterInterest === 'yes'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        payLaterInterest: e.target.checked ? 'yes' : 'no',
                      })
                    }
                    className="mt-1 w-4 h-4 text-[#6B1724] rounded-sm focus:ring-[#6B1724]"
                  />
                  <label htmlFor="payLater" className="text-xs text-[#221F1F]">
                    <span className="font-bold text-[#6B1724] block">
                      Inquire about our Flexible Pay Later Plan
                    </span>
                    Check this if you would like the administration to provide the structured fee installment arrangement for this academic session.
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#57534E] hover:text-[#221F1F]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#6B1724] text-white font-semibold text-sm hover:bg-[#52111B] transition-colors"
                >
                  <span>Submit Application</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-[#221F1F]">
                  Application Received Successfully
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] mt-1 max-w-md mx-auto">
                  Thank you for applying to Sealed Nectar Ambassadors Academy. Your child's enrollment file has been recorded.
                </p>
              </div>

              {/* Reference Slip Box */}
              <div className="bg-white border-2 border-dashed border-[#C88A1A] rounded-xl p-5 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-2">
                  <span className="text-xs text-[#57534E]">Application Reference</span>
                  <span className="text-base font-bold font-mono text-[#6B1724] tabular-nums">
                    {applicationRef}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#57534E]">Student Name:</span>
                  <span className="font-semibold text-[#221F1F]">{formData.studentName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#57534E]">Level Applied:</span>
                  <span className="font-semibold text-[#221F1F]">{formData.level}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#57534E]">Contact Phone:</span>
                  <span className="font-semibold text-[#221F1F]">{formData.phone}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#57534E]">Payment Option:</span>
                  <span className="font-semibold text-[#1B4332]">
                    {formData.payLaterInterest === 'yes' ? 'Pay Later Plan Requested' : 'Standard'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#F4EFEB] rounded-xl text-xs text-[#57534E] max-w-md mx-auto flex items-start gap-2 text-left">
                <AlertCircle className="w-4 h-4 text-[#C88A1A] shrink-0 mt-0.5" />
                <span>
                  Our admissions office will reach out to schedule the student's introductory assessment at 4, Azeez Lamidi Street, Makun, Sagamu.
                </span>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E8DFD5] bg-white text-xs font-semibold text-[#221F1F] hover:bg-[#FAF7F2]"
                >
                  <Printer className="w-4 h-4 text-[#C88A1A]" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-lg bg-[#6B1724] text-white font-semibold text-xs hover:bg-[#52111B]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
