import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';

export const WHATSAPP_URL = 'https://wa.me/2349017530688?text=Hello%20Proprietress%20Mrs.%20Muritala,%20I%20would%20like%20to%20make%20enquiries%20about%20admission%20and%20enrolment%20at%20Sealed%20Nectar%20Ambassadors%20School.';
export const WHATSAPP_PHONE = '+234 901 753 0688';

export const WhatsAppFloatingCTA: React.FC = () => {
  return (
    <aside aria-label="Chat with Proprietress on WhatsApp" className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 group">
      {/* Tooltip Badge */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#160B0E]/95 text-white text-xs font-semibold shadow-xl border border-[#25D366]/40 backdrop-blur-md hover:bg-[#160B0E] transition-all"
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
        <span>Chat with Proprietress on WhatsApp</span>
        <span className="text-[#25D366] font-mono font-bold">{WHATSAPP_PHONE}</span>
      </a>

      {/* Main WhatsApp Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat With Us on WhatsApp ${WHATSAPP_PHONE} to make enquiries with the Proprietress`}
        className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa51] text-white font-bold text-sm sm:text-base shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-3 focus-visible:outline-[#25D366]"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="tracking-wide">Chat With Us on WhatsApp</span>
        <span className="hidden md:inline font-mono font-bold text-xs bg-white/20 px-2 py-0.5 rounded-full">
          {WHATSAPP_PHONE}
        </span>
      </a>
    </aside>
  );
};
