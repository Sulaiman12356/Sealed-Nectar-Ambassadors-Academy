import React from 'react';
import { Compass, ArrowRight, Phone, Mail } from 'lucide-react';
import { SchoolCrest } from '../components/common/SchoolCrest';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center p-4 py-16">
      <div className="max-w-md w-full bg-white border border-[#E8DFD5] rounded-2xl p-8 text-center shadow-xs">
        <SchoolCrest size="md" className="justify-center mb-6" />

        <span className="text-xs font-bold uppercase tracking-wider text-[#C88A1A] block mb-2">
          404 Error
        </span>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F] mb-3">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-8">
          The page you are looking for may have moved or may no longer be available.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="px-5 py-2.5 bg-[#6B1724] text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#52111B] transition-colors"
          >
            Return Home
          </button>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-5 py-2.5 bg-[#FAF7F2] border border-[#E8DFD5] text-[#221F1F] rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#F4EFEB] transition-colors"
          >
            Contact School
          </button>
        </div>
      </div>
    </div>
  );
};
