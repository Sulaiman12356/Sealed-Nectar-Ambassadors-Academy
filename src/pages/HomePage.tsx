import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStrip } from '../components/home/TrustStrip';
import { AboutSection } from '../components/home/AboutSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { AcademicLevels } from '../components/home/AcademicLevels';
import { AcademicHighlights } from '../components/home/AcademicHighlights';
import { CampusPreview } from '../components/home/CampusPreview';
import { ProprietressSection } from '../components/home/ProprietressSection';
import { AuthenticSchoolGallery } from '../components/home/AuthenticSchoolGallery';
import { AdmissionsPreview } from '../components/home/AdmissionsPreview';
import { SchoolValues } from '../components/home/SchoolValues';
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
      {/* Homepage Hero */}
      <HeroSection
        onOpenApply={() => onNavigate('/admissions')}
        onExplore={() => onNavigate('/about')}
      />

      {/* Hero Trust Strip (5 Highlights) */}
      <TrustStrip />

      {/* About the School */}
      <AboutSection
        onLearnMore={() => onNavigate('/about')}
      />

      {/* Why Choose Sealed Nectar (Dark Wine Band with 5 Pillars) */}
      <WhyChooseUs />

      {/* Learning From Early Years to Secondary */}
      <AcademicLevels
        onViewCurriculum={() => onNavigate('/academics')}
      />

      {/* Academic Highlights (4 Pillars + STEM Photography) */}
      <AcademicHighlights />

      {/* Campus Facilities Preview */}
      <CampusPreview
        onExploreCampus={() => onNavigate('/campus')}
      />

      {/* Principal / Proprietress Profile & Our Ethos */}
      <ProprietressSection
        onMeetLeadership={() => onNavigate('/about')}
      />

      {/* Authentic School Moments & Campus Life Gallery */}
      <AuthenticSchoolGallery />

      {/* Admissions Preview & Download Guide */}
      <AdmissionsPreview
        onStartAdmission={() => onNavigate('/admissions')}
        onDownloadGuide={onOpenGuide}
        onOpenAdmissionInfo={onOpenGuide}
      />

      {/* School Values (Growing More Than Students) */}
      <SchoolValues />

      {/* Latest From Our School Blog */}
      <BlogPreview
        onSelectPost={onSelectPost}
        onViewAllPosts={() => onNavigate('/blog')}
      />

      {/* Pre-Footer Call to Action */}
      <CallToAction
        onOpenApply={() => onNavigate('/admissions')}
        onOpenContact={onOpenContact}
      />
    </div>
  );
};
