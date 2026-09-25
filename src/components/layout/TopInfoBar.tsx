import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';

export const TopInfoBar: React.FC = () => {
  return (
    <div className="hidden lg:block bg-[#FAF7F2] border-b border-[#E8DFD5] text-[12px] text-[#57534E] py-2 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#6B1724]">Official School Portal</span>
          <span className="text-[#C88A1A]" aria-hidden="true">·</span>
          <span>{SCHOOL_INFO.tagline}</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={`tel:${SCHOOL_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-[#6B1724] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#C88A1A]" />
            <span className="tabular-nums font-medium">{SCHOOL_INFO.contact.primaryPhone}</span>
          </a>

          <a
            href={`mailto:${SCHOOL_INFO.contact.email}`}
            className="flex items-center gap-1.5 hover:text-[#6B1724] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#C88A1A]" />
            <span>{SCHOOL_INFO.contact.email}</span>
          </a>

          <div className="flex items-center gap-1.5 text-[#57534E]">
            <MapPin className="w-3.5 h-3.5 text-[#C88A1A]" />
            <span>Makun, Sagamu, Ogun State</span>
          </div>
        </div>
      </div>
    </div>
  );
};
