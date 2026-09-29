import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';
import { WHATSAPP_URL, WHATSAPP_PHONE } from './WhatsAppFloatingCTA';

interface WhatsAppSectionCTAProps {
  variant?: 'banner' | 'inline' | 'compact';
  customTitle?: string;
  customSubtitle?: string;
}

export const WhatsAppSectionCTA: React.FC<WhatsAppSectionCTAProps> = ({
  variant = 'banner',
  customTitle,
  customSubtitle,
}) => {
  if (variant === 'inline') {
    return (
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>Chat With Us on WhatsApp {WHATSAPP_PHONE}</span>
      </a>
    );
  }

  return (
    <div className="w-full my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1B4332] to-[#143326] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#25D366]/30 shadow-md">
      <div className="flex items-center gap-3 text-center sm:text-left">
        <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5 text-[#25D366] fill-current" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">
            {customTitle || 'Have Enquiries? Chat Directly with the Proprietress'}
          </h4>
          <p className="text-xs text-[#FAF7F2]/80 mt-0.5">
            {customSubtitle || 'Get instant answers regarding admission, school fees, and child placement.'}
          </p>
        </div>
      </div>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>Chat on WhatsApp: {WHATSAPP_PHONE}</span>
      </a>
    </div>
  );
};
