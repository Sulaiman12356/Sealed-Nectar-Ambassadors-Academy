import React, { useState } from 'react';
import { X, Send, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';
import { SCHOOL_INFO } from '../../data/schoolData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    purpose: 'Admission Inquiry',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName.trim() || !formData.phone.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="bg-[#6B1724] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SchoolCrest size="sm" lightMode={true} showText={false} />
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold">
                Contact & Campus Visit
              </h2>
              <p className="text-xs text-[#FAF7F2]/80">
                Sealed Nectar Ambassadors Academy · Administration Office
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {!submitted ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Contact Cards */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-white p-4 rounded-xl border border-[#E8DFD5]">
                  <span className="text-[11px] font-bold uppercase text-[#C88A1A] block mb-1">
                    Call Admissions
                  </span>
                  <p className="text-xs font-semibold text-[#221F1F]">
                    {SCHOOL_INFO.contact.primaryPhone}
                  </p>
                  <p className="text-xs text-[#57534E] mt-0.5">
                    {SCHOOL_INFO.contact.secondaryPhone}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8DFD5]">
                  <span className="text-[11px] font-bold uppercase text-[#C88A1A] block mb-1">
                    Email Desk
                  </span>
                  <p className="text-xs font-semibold text-[#221F1F]">
                    {SCHOOL_INFO.contact.email}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8DFD5]">
                  <span className="text-[11px] font-bold uppercase text-[#C88A1A] block mb-1">
                    Campus Location
                  </span>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {SCHOOL_INFO.location.fullAddress}
                  </p>
                </div>
              </div>

              {/* Right Form */}
              <div className="md:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mrs. O. Balogun"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E8DFD5] bg-white text-xs text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-[#E8DFD5] bg-white text-xs text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                        Inquiry Type
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg border border-[#E8DFD5] bg-white text-xs text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                      >
                        <option value="Admission Inquiry">Admission Inquiry</option>
                        <option value="Book Campus Tour">Book Campus Tour</option>
                        <option value="Pay Later Plan Question">Pay Later Plan Question</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1">
                      Message / Question
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E8DFD5] bg-white text-xs text-[#221F1F] focus:outline-none focus:border-[#6B1724]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#6B1724] text-white text-xs font-semibold hover:bg-[#52111B] transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to School</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#221F1F]">
                Message Delivered
              </h3>
              <p className="text-xs sm:text-sm text-[#57534E] max-w-sm mx-auto">
                Thank you for contacting Sealed Nectar Ambassadors Academy. A school administrative officer will respond shortly via phone or email.
              </p>
              <div className="pt-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 rounded-lg bg-[#6B1724] text-white text-xs font-semibold hover:bg-[#52111B]"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
