import React from 'react';
import { Award, ShieldCheck, Building2, HeartHandshake, Trophy } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const highlights = [
    {
      icon: Award,
      title: 'Quality Education',
      caption: 'Standardized national curriculum',
    },
    {
      icon: ShieldCheck,
      title: 'Moral Upbringing',
      caption: 'Islamic values and discipline',
    },
    {
      icon: Building2,
      title: 'Modern Facilities',
      caption: 'Equipped classes and library',
    },
    {
      icon: HeartHandshake,
      title: 'Supportive Environment',
      caption: 'Dedicated, nurturing educators',
    },
    {
      icon: Trophy,
      title: 'Future Leaders',
      caption: 'Confidence and responsibility',
    },
  ];

  return (
    <div className="w-full bg-white border-y border-[#E8DFD5] py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center text-[#6B1724] mb-3 group-hover:border-[#C88A1A] group-hover:bg-[#F4EFEB] transition-colors">
                  <Icon className="w-5 h-5 text-[#6B1724]" />
                </div>
                <h2 className="text-sm font-bold text-[#221F1F] leading-tight mb-1 font-display">
                  {item.title}
                </h2>
                <p className="text-xs text-[#57534E] leading-relaxed max-w-[160px]">
                  {item.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
