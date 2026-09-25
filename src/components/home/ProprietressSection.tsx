import React from 'react';
import { ArrowRight, Quote, Users, HeartHandshake, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SCHOOL_INFO } from '../../data/schoolData';

interface ProprietressSectionProps {
  onMeetLeadership: () => void;
}

export const ProprietressSection: React.FC<ProprietressSectionProps> = ({ onMeetLeadership }) => {
  const { proprietress } = SCHOOL_INFO.leadership;

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              Leadership & Ethos
            </span>
            <span className="w-6 h-px bg-[#6B1724]" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
            Our Principal & Proprietress
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Profile: Photo + Bio */}
          <div className="lg:col-span-8 bg-white border border-[#E8DFD5] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-start shadow-xs">
            {/* Portrait */}
            <div className="w-full md:w-56 shrink-0 flex flex-col items-center">
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#F4EFEB] border border-[#E8DFD5]">
                <ImageWithFallback
                  src={proprietress.image}
                  alt={`${proprietress.name} - ${proprietress.title}`}
                  className="w-full h-full object-cover object-top"
                  fallbackText={proprietress.name}
                />
              </div>
              <span className="mt-3 text-xs font-semibold text-[#6B1724] font-display text-center">
                {proprietress.name}
              </span>
              <span className="text-[11px] text-[#57534E]">
                {proprietress.title}
              </span>
            </div>

            {/* Bio & Quote */}
            <div className="flex-1 flex flex-col justify-between h-full">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#221F1F] mb-1">
                  {proprietress.name}
                </h3>
                <p className="text-xs font-bold text-[#C88A1A] uppercase tracking-wider mb-4">
                  {proprietress.title}
                </p>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                  {proprietress.bio}
                </p>

                {/* Quote */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] border-l-3 border-[#6B1724] my-4 relative">
                  <Quote className="w-4 h-4 text-[#C88A1A] mb-1" />
                  <p className="text-xs sm:text-sm italic text-[#221F1F] font-serif leading-relaxed">
                    "{proprietress.quote}"
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onMeetLeadership}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#6B1724] hover:bg-[#52111B] active:bg-[#3E0A12] transition-colors focus-visible:outline-2 focus-visible:outline-[#6B1724]"
                >
                  <span>Meet Our Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Our Ethos Box (matching Prototype) */}
          <div className="lg:col-span-4 bg-[#F4EFEB] border border-[#E8DFD5] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8DFD5]">
                <h3 className="font-display text-lg font-bold text-[#221F1F]">
                  Our Ethos
                </h3>
                <span className="text-[11px] font-semibold text-[#6B1724] uppercase tracking-wider">
                  SNAA Core
                </span>
              </div>

              <p className="text-xs text-[#57534E] mb-6 leading-relaxed">
                Every child is guided under three foundational standards that govern daily school life:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E8DFD5]/80">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] text-[#6B1724] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#221F1F]">
                      Highly Qualified & Dedicated Staff
                    </h4>
                    <p className="text-[11px] text-[#57534E] mt-0.5 leading-snug">
                      Trained professional educators passionate about children's emotional and academic progress.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E8DFD5]/80">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] text-[#1B4332] flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#221F1F]">
                      Total Child Development
                    </h4>
                    <p className="text-[11px] text-[#57534E] mt-0.5 leading-snug">
                      Equal balance between intellect, moral character, emotional resilience and practical skills.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E8DFD5]/80">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] text-[#C88A1A] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#221F1F]">
                      Academic, Moral, Social & Intellectual Growth
                    </h4>
                    <p className="text-[11px] text-[#57534E] mt-0.5 leading-snug">
                      Preparing students with Islamic values and modern competencies for life.
                    </p>
                  </div>
                </div>
              </div>

              {/* Authentic Academic Excellence Frame Showcase */}
              <div className="mt-5 p-3.5 bg-white rounded-xl border border-[#E8DFD5] flex items-center gap-3 shadow-xs">
                <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 border border-[#E8DFD5] bg-[#FAF7F2]">
                  <img
                    src="/images/excellent_frame.jpg"
                    alt="Award of Academic Excellence"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A] block">
                    Recognition of Merit
                  </span>
                  <p className="text-xs font-bold text-[#221F1F]">
                    Academic Excellence Honors
                  </p>
                  <p className="text-[11px] text-[#57534E] leading-tight">
                    Celebrating outstanding student diligence, character and scholarly distinction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
