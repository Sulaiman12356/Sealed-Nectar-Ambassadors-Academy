import React, { useState, useEffect } from 'react';
import {
  Compass,
  Maximize2,
  X,
  Play,
  CheckCircle2,
  Building,
  BookOpen,
  Award,
  Video,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface CampusPageProps {
  onNavigate: (path: string) => void;
}

const GALLERY_CATEGORIES = [
  'All',
  'Classrooms',
  'Students',
  'School Events',
  'Sports',
  'School Environment'
];

export const CampusPage: React.FC<CampusPageProps> = ({ onNavigate }) => {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    loadGallery();
  }, [activeCategory]);

  const loadGallery = async () => {
    setIsLoading(true);
    try {
      const url = activeCategory === 'All' ? '/api/public/gallery' : `/api/public/gallery?category=${encodeURIComponent(activeCategory)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setGalleryItems(data || []);
      }
    } catch (e) {
      console.error('Failed to load campus gallery:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const facilities = [
    {
      title: 'Classrooms',
      description: 'Well-ventilated, well-lit classrooms fitted with structured pedagogical charts, age-appropriate seating, and disciplined study layouts.',
      image: '/images/sitting_children_sealed.jpg',
      tag: 'Academic Spaces'
    },
    {
      title: 'Library & Reading Center',
      description: 'Curated collection of Islamic texts, graded English readers, phonics storybooks and curriculum reference guides promoting quiet study.',
      image: '/images/chinese_training_student.jpg',
      tag: 'Literacy & Research'
    },
    {
      title: 'Educational Toy & Activity Rooms',
      description: 'Montessori-inspired manipulatives, sensory toys, and fine-motor coordination puzzles for our Crèche and Kindergarten pupils.',
      image: '/images/children_sealed.jpg',
      tag: 'Early Years'
    },
    {
      title: 'Sports & Parade Field',
      description: 'Spacious drill grounds for physical exercise, athletics, Karate club katas, and ceremonial student parades.',
      image: '/images/marching_children_sealed.jpg',
      tag: 'Athletics & Martial Arts'
    },
    {
      title: 'Open Air Playground',
      description: 'Safe, enclosed outdoor recreational area where learners build social bonds and physical agility under teacher supervision.',
      image: '/images/boy_and_girl_sealed.jpg',
      tag: 'Outdoor Recreation'
    },
    {
      title: 'Serene School Environment',
      description: 'A protected, gated compound in peaceful Makun, Sagamu, situated away from high-speed vehicular traffic to safeguard children.',
      image: '/images/staff_of_sealed_nectar.jpg',
      tag: 'Safe Campus'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 1. Hero Section */}
      <section className="relative py-14 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
              Campus Grounds
            </span>
            <span className="w-8 h-px bg-[#6B1724]" />
            <span className="text-xs font-semibold text-[#C88A1A]">
              Makun, Sagamu
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#221F1F] leading-tight mb-4 text-balance">
            Our Campus
          </h1>

          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-6 font-body">
            A safe, serene and conducive environment designed to support meaningful learning and child development.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#57534E]">
            <Building className="w-4 h-4 text-[#6B1724]" />
            <span>4, Azeez Lamidi Street, Behind Loto Ewu-Oliwo, Makun, Sagamu</span>
          </div>
        </div>
      </section>

      {/* 2. Campus Facilities Grid */}
      <section className="py-14 sm:py-20 border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Purpose-Built Spaces
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Facilities Supporting the Total Child
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-3">
              Every area of our academy campus is intentionally organized to foster mental concentration, physical vigor, and moral refinement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8DFD5] overflow-hidden shadow-xs hover:border-[#C88A1A] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-[#F4EFEB] overflow-hidden relative">
                    <ImageWithFallback
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#6B1724] shadow-sm">
                      {fac.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-[#221F1F] mb-2">
                      {fac.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 border-t border-[#FAF7F2] flex items-center gap-2 text-xs font-semibold text-[#1B4332]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Verified Safe Academy Facility</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Visual Campus Gallery with Filtering & Lightbox */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724] block mb-2">
              Visual Archive
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#221F1F]">
              Campus Life in Pictures
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-3">
              Explore authentic glimpses of student achievements, classroom engagement, drills, and faculty mentorship.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-4">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#6B1724] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#57534E] border border-[#E8DFD5] hover:bg-[#F4EFEB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Items */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="aspect-square bg-[#E8DFD5] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF7F2] rounded-2xl border border-[#E8DFD5] max-w-md mx-auto">
              <p className="text-sm font-semibold text-[#57534E]">
                School gallery images will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-[#F4EFEB] border border-[#E8DFD5] cursor-pointer shadow-xs hover:shadow-md transition-all"
                >
                  <ImageWithFallback
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D49A24]">
                      {item.category}
                    </span>
                    <p className="text-xs font-bold leading-tight line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Video & Multi-Media Section */}
      <section className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#E8DFD5] p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Video className="w-4 h-4 text-[#6B1724]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B1724]">
                    Audio-Visual Highlights
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#221F1F] mb-3">
                  Experience Our School in Action
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                  Watch our pupils present conversational Mandarin Chinese, recite sacred Arabic poetry, demonstrate disciplined martial arts drills, and celebrate scholastic milestones.
                </p>

                <div className="space-y-3 text-xs text-[#221F1F]">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5]">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span>Annual Marching Procession Demonstrations</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5]">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span>Mandarin Immersion & Arabic Recitations</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/90 border border-[#E8DFD5] shadow-sm flex items-center justify-center group">
                  <ImageWithFallback
                    src="/images/marching_children_sealed.jpg"
                    alt="School procession video preview"
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#6B1724] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3">
                      <Play className="w-6 h-6 ml-0.5" />
                    </div>
                    <p className="text-white font-display font-bold text-sm sm:text-base">
                      Sealed Nectar Annual Parade & Academic Showcase
                    </p>
                    <span className="text-white/80 text-xs mt-1">
                      Official Academy Video Documentation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && galleryItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() => setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : galleryItems.length - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setLightboxIndex((prev) => (prev! < galleryItems.length - 1 ? prev! + 1 : 0))}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-xs uppercase tracking-wider font-bold text-[#D49A24]">
                {galleryItems[lightboxIndex].category}
              </span>
              <h3 className="font-display text-lg font-bold mt-1">
                {galleryItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-white/80 mt-1">
                {galleryItems[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
