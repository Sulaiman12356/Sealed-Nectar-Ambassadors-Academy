import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Search } from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenApply: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenApply,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/academics', label: 'Academics' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/campus', label: 'Campus' },
    { path: '/blog', label: 'Blog & News' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E8DFD5]'
          : 'bg-[#FAF7F2] border-b border-[#E8DFD5]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Brand Wordmark & Crest */}
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-center text-left focus-visible:outline-2 focus-visible:outline-[#6B1724] rounded-lg p-1 transition-opacity hover:opacity-90"
            aria-label="Sealed Nectar Ambassadors Academy Home"
          >
            <SchoolCrest size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#57534E]">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative py-1 transition-colors hover:text-[#6B1724] ${
                    active ? 'text-[#6B1724] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B1724] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => onNavigate('/admissions')}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#6B1724] hover:bg-[#52111B] active:bg-[#3E0A12] shadow-xs transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B1724]"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('/admissions')}
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-[#6B1724] hover:bg-[#52111B] transition-colors"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#221F1F] hover:bg-[#F4EFEB] focus-visible:outline-2 focus-visible:outline-[#6B1724]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DFD5] px-4 pt-3 pb-6 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`flex items-center justify-between text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#F4EFEB] text-[#6B1724] font-semibold'
                      : 'text-[#221F1F] hover:bg-[#F4EFEB]'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#6B1724]" />}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#E8DFD5] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/admissions');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#6B1724] text-white font-semibold text-sm shadow-xs hover:bg-[#52111B] transition-colors"
              >
                <span>Start Online Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
