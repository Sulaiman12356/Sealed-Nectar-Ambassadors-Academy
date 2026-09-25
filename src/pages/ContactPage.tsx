import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Building,
  ExternalLink
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network connection error. Please try again or reach out directly by phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappCleanPhone = '2349017530688';
  const whatsappUrl = `https://wa.me/${whatsappCleanPhone}?text=${encodeURIComponent(
    'Assalamu Alaikum. I am inquiring about admissions and academic programmes at Sealed Nectar Ambassadors Academy.'
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 1. Hero Section */}
      <section className="relative py-14 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              Admissions & Inquiries Desk
            </span>
            <span className="w-8 h-px bg-[#6B1724]" />
            <span className="text-xs font-semibold text-[#C88A1A]">
              Connect With Us
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#221F1F] leading-tight mb-4 text-balance">
            We Would Love to Hear From You
          </h1>

          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-6 font-body">
            Have questions about enrolling your child, our dual curriculum, or scheduling a visit to our Makun, Sagamu campus? Our team is pleased to assist you.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B4332] text-white text-xs sm:text-sm font-semibold hover:bg-[#143326] transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4 text-[#D49A24]" />
            <span>Chat With Us on WhatsApp (+234 901 753 0688)</span>
          </a>
        </div>
      </section>

      {/* 2. Contact Details & Form Grid */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-7 shadow-xs">
                <h3 className="font-display text-lg font-bold text-[#221F1F] mb-4 pb-3 border-b border-[#E8DFD5]">
                  School Campus Address
                </h3>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                  <MapPin className="w-5 h-5 text-[#6B1724] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#221F1F] block mb-1">Sealed Nectar Ambassadors Academy (SNAA)</strong>
                    <p>4, Azeez Lamidi Street, Behind Loto Ewu-Oliwo, Makun, Sagamu, Ogun State, Nigeria.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-7 shadow-xs">
                <h3 className="font-display text-lg font-bold text-[#221F1F] mb-4 pb-3 border-b border-[#E8DFD5]">
                  Direct Phone Lines
                </h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C88A1A] shrink-0" />
                    <div>
                      <span className="text-[11px] text-[#57534E] block">Admissions & General:</span>
                      <a href="tel:+2349017530688" className="font-bold text-[#221F1F] hover:text-[#6B1724]">
                        +234 901 753 0688
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C88A1A] shrink-0" />
                    <div>
                      <span className="text-[11px] text-[#57534E] block">Alternative Office Line:</span>
                      <a href="tel:+2347080508894" className="font-bold text-[#221F1F] hover:text-[#6B1724]">
                        +234 070 805 08894
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-7 shadow-xs">
                <h3 className="font-display text-lg font-bold text-[#221F1F] mb-4 pb-3 border-b border-[#E8DFD5]">
                  Official Email & Desk
                </h3>
                <div className="flex items-center gap-3 text-xs sm:text-sm mb-4">
                  <Mail className="w-4 h-4 text-[#6B1724] shrink-0" />
                  <a href="mailto:sealednectar15@gmail.com" className="font-bold text-[#221F1F] hover:text-[#6B1724]">
                    sealednectar15@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#57534E]">
                  <Clock className="w-4 h-4 text-[#C88A1A] shrink-0" />
                  <span>Monday – Friday: 7:30 AM – 3:30 PM (School Hours)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-10 shadow-xs">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#221F1F] mb-2">
                  Send an Official Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] mb-6">
                  Please provide your contact information below. Enquiries are received directly by the admissions administration.
                </p>

                {submitSuccess ? (
                  <div className="p-6 bg-[#FAF7F2] border border-[#1B4332] rounded-xl text-center animate-in fade-in duration-300">
                    <CheckCircle2 className="w-12 h-12 text-[#1B4332] mx-auto mb-3" />
                    <h4 className="font-display text-lg font-bold text-[#221F1F] mb-1">
                      Message Sent Successfully
                    </h4>
                    <p className="text-xs sm:text-sm text-[#57534E] mb-4 leading-relaxed">
                      Thank you for contacting Sealed Nectar Ambassadors Academy. A member of our admissions team will respond shortly.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-4 py-2 bg-[#6B1724] text-white rounded-lg text-xs font-semibold hover:bg-[#52111B] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Alh. Ibrahim Sulaiman"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-[#FAF7F2] text-xs sm:text-sm text-[#221F1F] focus:bg-white focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="parent@example.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-[#FAF7F2] text-xs sm:text-sm text-[#221F1F] focus:bg-white focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 08012345678"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-[#FAF7F2] text-xs sm:text-sm text-[#221F1F] focus:bg-white focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1.5">
                          Subject *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="e.g. Crèche Admission Inquiry"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-[#FAF7F2] text-xs sm:text-sm text-[#221F1F] focus:bg-white focus:outline-none focus:border-[#6B1724]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#221F1F] uppercase tracking-wider mb-1.5">
                        Your Message / Question *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please write your inquiry here..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8DFD5] bg-[#FAF7F2] text-xs sm:text-sm text-[#221F1F] focus:bg-white focus:outline-none focus:border-[#6B1724]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#6B1724] text-white text-sm font-semibold hover:bg-[#52111B] active:bg-[#3E0A12] disabled:opacity-50 transition-colors shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit School Enquiry'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Location Map Section */}
      <section className="py-14 bg-white border-t border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C88A1A] block mb-1">
                Visiting Our Campus
              </span>
              <h3 className="font-display text-xl font-bold text-[#221F1F] mb-1">
                Directions to Makun, Sagamu Campus
              </h3>
              <p className="text-xs sm:text-sm text-[#57534E] max-w-xl">
                Located behind Loto Ewu-Oliwo, off Azeez Lamidi Street in Makun, Sagamu. The campus is readily accessible via major Sagamu arterial roads with secure parking.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Makun+Sagamu+Ogun+State+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-[#E8DFD5] text-xs sm:text-sm font-semibold text-[#6B1724] hover:bg-[#F4EFEB] transition-colors whitespace-nowrap shadow-xs"
            >
              <ExternalLink className="w-4 h-4 text-[#C88A1A]" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
