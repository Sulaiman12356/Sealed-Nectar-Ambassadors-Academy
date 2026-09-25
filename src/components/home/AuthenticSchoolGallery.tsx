import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Award, GraduationCap, Users } from 'lucide-react';
import { AUTHENTIC_SCHOOL_GALLERY, GalleryImageItem } from '../../data/schoolData';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface AuthenticSchoolGalleryProps {
  title?: string;
  subtitle?: string;
}

export const AuthenticSchoolGallery: React.FC<AuthenticSchoolGalleryProps> = ({
  title = 'Life & Moments at Sealed Nectar',
  subtitle = 'Authentic glimpses of our students, certified educators, academic excellence, and campus events.',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Pupils & Uniforms',
    'Faculty & Staff',
    'Academics & Languages',
    'Excellence & Parades',
  ];

  const filteredItems = selectedCategory === 'All'
    ? AUTHENTIC_SCHOOL_GALLERY
    : AUTHENTIC_SCHOOL_GALLERY.filter((item) => item.category === selectedCategory);

  const handlePrev = () => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((activeModalIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((activeModalIndex + 1) % filteredItems.length);
  };

  const activeItem: GalleryImageItem | undefined = activeModalIndex !== null ? filteredItems[activeModalIndex] : undefined;

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Camera className="w-4 h-4 text-[#C88A1A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                Authentic School Moments
              </span>
              <span className="w-6 h-px bg-[#6B1724]" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-1 max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* Stat badge */}
          <div className="flex items-center gap-3 p-3 bg-white border border-[#E8DFD5] rounded-xl self-start md:self-auto shadow-xs text-xs">
            <GraduationCap className="w-5 h-5 text-[#6B1724]" />
            <div>
              <span className="font-bold text-[#221F1F] block">100% Real Campus Photos</span>
              <span className="text-[11px] text-[#57534E]">Captured at Makun, Sagamu</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-3 border-b border-[#E8DFD5]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveModalIndex(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#6B1724] ${
                selectedCategory === cat
                  ? 'bg-[#6B1724] text-white shadow-xs'
                  : 'bg-white text-[#57534E] hover:bg-[#F4EFEB] hover:text-[#221F1F] border border-[#E8DFD5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveModalIndex(idx)}
              className="group bg-white border border-[#E8DFD5] rounded-xl overflow-hidden shadow-xs hover:shadow-sm hover:border-[#C88A1A] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#F4EFEB] relative">
                <ImageWithFallback
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fallbackText={item.title}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-xs font-semibold text-[#221F1F] shadow-sm">
                    <Eye className="w-3.5 h-3.5 text-[#6B1724]" />
                    <span>View Photo</span>
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#6B1724] shadow-xs">
                    {item.tag}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-[#221F1F] group-hover:text-[#6B1724] transition-colors leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#57534E] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <span className="text-[10px] text-[#C88A1A] font-semibold mt-3 block">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalIndex !== null && activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveModalIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-[#E8DFD5] flex items-center justify-between bg-[#FAF7F2]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C88A1A] block">
                  {activeItem.category} · {activeItem.tag}
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#221F1F]">
                  {activeItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalIndex(null)}
                className="w-9 h-9 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#57534E] hover:text-[#221F1F] hover:bg-[#F4EFEB] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Image */}
            <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden">
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="max-h-[60vh] max-w-full object-contain mx-auto"
              />

              {/* Prev Button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#E8DFD5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-2xl">
                {activeItem.description}
              </p>
              <div className="text-right shrink-0 text-xs text-[#57534E] font-medium">
                Photo {activeModalIndex + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
