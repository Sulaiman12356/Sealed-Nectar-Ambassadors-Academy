import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStrip } from '../components/home/TrustStrip';
import { AboutSection } from '../components/home/AboutSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { AcademicIslamicBalance } from '../components/home/AcademicIslamicBalance';
import { IslamicEducationSection } from '../components/home/IslamicEducationSection';
import { IslamicValuesSection } from '../components/home/IslamicValuesSection';
import { AcademicLevels } from '../components/home/AcademicLevels';
import { DayAtSNAASection } from '../components/home/DayAtSNAASection';
import { AcademicHighlights } from '../components/home/AcademicHighlights';
import { MuslimFamilySection } from '../components/home/MuslimFamilySection';
import { CampusPreview } from '../components/home/CampusPreview';
import { ProprietressSection } from '../components/home/ProprietressSection';
import { AuthenticSchoolGallery } from '../components/home/AuthenticSchoolGallery';
import { AdmissionsPreview } from '../components/home/AdmissionsPreview';
import { BlogPreview } from '../components/home/BlogPreview';
import { CallToAction } from '../components/home/CallToAction';
import { BlogPost } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenApply: () => void;
  onOpenGuide: () => void;
  onOpenCurriculum: () => void;
  onOpenContact: () => void;
  onSelectPost: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenApply,
  onOpenGuide,
  onOpenCurriculum,
  onOpenContact,
  onSelectPost,
}) => {
  return (
    <div className="bg-[#FAF7F2]">
      {/* 1. Homepage Hero with God Conscious Learners positioning */}
      <HeroSection
        onOpenApply={() => onNavigate('/admissions')}
        onExplore={() => onNavigate('/about')}
      />

      {/* 2. Hero Trust Strip (Islamic & Western Balance, Character, Modern Skills) */}
      <TrustStrip />

      {/* 3. About the School & Two Foundations */}
      <AboutSection
        onLearnMore={() => onNavigate('/about')}
      />

      {/* 4. Why Choose Us (6 Pillars) */}
      <WhyChooseUs />

      {/* 5. Academic + Islamic Balance (Visual Combination) */}
      <AcademicIslamicBalance
        onExploreAcademics={() => onNavigate('/academics')}
      />

      {/* 6. Major Section: Growing With Islamic Knowledge */}
      <IslamicEducationSection />

      {/* 7. Character Is Part of Education (Islamic Values) */}
      <IslamicValuesSection />

      {/* 8. Learning From Early Years to Senior Secondary */}
      <AcademicLevels
        onViewCurriculum={() => onNavigate('/academics')}
      />

      {/* 9. A Day at SNAA: Learning Beyond the Classroom */}
      <DayAtSNAASection />

      {/* 10. Academic Highlights (Multilingual, STEM, Vocational, Physical) */}
      <AcademicHighlights />

      {/* 11. Muslim Family Positioning Section */}
      <MuslimFamilySection
        onOpenApply={() => onNavigate('/admissions')}
        onOpenContact={onOpenContact}
      />

      {/* 12. Campus Facilities Preview */}
      <CampusPreview
        onExploreCampus={() => onNavigate('/campus')}
      />

      {/* 13. Leadership With Purpose: Proprietress Mrs. Muritala F.A. (Nee Adeosun) */}
      <ProprietressSection
        onMeetLeadership={() => onNavigate('/about')}
      />

      {/* 14. Authentic School Moments & Campus Life Gallery */}
      <AuthenticSchoolGallery />

      {/* 15. Admissions Preview & Download Guide */}
      <AdmissionsPreview
        onStartAdmission={() => onNavigate('/admissions')}
        onDownloadGuide={onOpenGuide}
        onOpenAdmissionInfo={onOpenGuide}
      />

      {/* 16. Latest From Our School Blog */}
      <BlogPreview
        onSelectPost={onSelectPost}
        onViewAllPosts={() => onNavigate('/blog')}
      />

      {/* 17. Pre-Footer Call to Action */}
      <CallToAction
        onOpenApply={() => onNavigate('/admissions')}
        onOpenContact={onOpenContact}
      />
    </div>
  );
};
