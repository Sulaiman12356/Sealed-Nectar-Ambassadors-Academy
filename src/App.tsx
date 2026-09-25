/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopInfoBar } from './components/layout/TopInfoBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ApplicationStatusPage } from './pages/ApplicationStatusPage';
import { AdminAdmissionsPage } from './pages/AdminAdmissionsPage';

// Shared Modals
import { AdmissionGuideModal } from './components/modals/AdmissionGuideModal';
import { BlogPostModal } from './components/modals/BlogPostModal';
import { CurriculumModal } from './components/modals/CurriculumModal';
import { ContactModal } from './components/modals/ContactModal';
import { LegalModal } from './components/modals/LegalModal';
import { BlogPost } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Global modals
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Router navigation helper
  const navigate = (path: string) => {
    // If hashtag anchor on home page
    if (path.startsWith('/#')) {
      const sectionId = path.replace('/#', '');
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route Dispatcher
  const renderCurrentPage = () => {
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentPath === '/academics') {
      return (
        <AcademicsPage
          onNavigate={navigate}
          onOpenContact={() => setIsContactOpen(true)}
        />
      );
    }
    if (currentPath === '/admissions') {
      return <AdmissionsPage onNavigate={navigate} />;
    }
    if (currentPath === '/admissions/status') {
      return <ApplicationStatusPage onNavigate={navigate} />;
    }
    if (currentPath === '/admin/admissions') {
      return <AdminAdmissionsPage onNavigate={navigate} />;
    }

    // Default: Home Page
    return (
      <HomePage
        onNavigate={navigate}
        onOpenApply={() => navigate('/admissions')}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenCurriculum={() => setIsCurriculumOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onSelectPost={(post) => setSelectedPost(post)}
      />
    );
  };

  const isAdminRoute = currentPath === '/admin/admissions';

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#221F1F] flex flex-col font-body selection:bg-[#6B1724] selection:text-white">
      {/* If not in admin mode, display global header */}
      {!isAdminRoute && (
        <>
          <TopInfoBar />
          <Navbar
            currentPath={currentPath}
            onNavigate={navigate}
            onOpenApply={() => navigate('/admissions')}
          />
        </>
      )}

      {/* Main Page Content */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* If not in admin mode, display global footer */}
      {!isAdminRoute && (
        <Footer
          onNavigate={navigate}
          onOpenPrivacy={() => setLegalModalType('privacy')}
          onOpenTerms={() => setLegalModalType('terms')}
        />
      )}

      {/* Shared Modals */}
      <AdmissionGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onOpenOnlineForm={() => {
          setIsGuideOpen(false);
          navigate('/admissions');
        }}
      />

      <CurriculumModal
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
        onOpenApply={() => {
          setIsCurriculumOpen(false);
          navigate('/admissions');
        }}
      />

      <BlogPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
