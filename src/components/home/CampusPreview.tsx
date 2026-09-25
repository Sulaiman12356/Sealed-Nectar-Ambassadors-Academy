import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { CAMPUS_FACILITIES } from '../../data/schoolData';

interface CampusPreviewProps {
  onExploreCampus: () => void;
}

export const CampusPreview: React.FC<CampusPreviewProps> = ({ onExploreCampus }) => {
  return (
    <section id="campus" className="py-16 sm:py-20 bg-white border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                Our Campus
              </span>
              <span className="w-6 h-px bg-[#6B1724]" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              A Safe, Serene and Conducive Learning Environment
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-1 max-w-2xl">
              Located peacefully in Makun, Sagamu away from noisy highways, our gated campus gives children the tranquility they need to learn and play safely.
            </p>
          </div>

          <button
            onClick={onExploreCampus}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#6B1724] bg-[#FAF7F2] border border-[#E8DFD5] hover:bg-[#F4EFEB] hover:border-[#C88A1A]/40 transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-[#6B1724] whitespace-nowrap"
          >
            <span>Explore Our Campus</span>
            <ArrowRight className="w-4 h-4 text-[#C88A1A]" />
          </button>
        </div>

        {/* 3 Column Grid with Image and Feature Bullets matching Prototype */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAMPUS_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl overflow-hidden flex flex-col hover:border-[#C88A1A] transition-all group"
            >
              {/* Image with fallback */}
              <div className="aspect-[16/10] overflow-hidden bg-[#F4EFEB] relative">
                <ImageWithFallback
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  fallbackText={`${facility.title} at Sealed Nectar Ambassadors Academy`}
                />
              </div>

              {/* Text & Checkpoints */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#C88A1A] uppercase tracking-wider block mb-1">
                    {facility.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#221F1F] mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                    {facility.description}
                  </p>
                </div>

                <ul className="space-y-2 border-t border-[#E8DFD5]/80 pt-4">
                  {facility.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#221F1F]">
                      <div className="w-4 h-4 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
