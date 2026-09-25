import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Shield } from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';
import { SCHOOL_INFO } from '../../data/schoolData';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const currentYear = new Date().getFullYear();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/academics', label: 'Academics' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/admissions/status', label: 'Track Application' },
    { path: '/#campus', label: 'Our Campus' },
    { path: '/#blog', label: 'Blog & News' },
  ];

  return (
    <footer id="contact" className="bg-[#4F101A] text-white border-t-2 border-[#D49A24]">
      {/* Main Multi-Column Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: School Identity & Motto */}
          <div className="lg:col-span-4 space-y-4">
            <SchoolCrest size="lg" lightMode={true} />
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed max-w-sm">
              An upright Islamic private institution dedicated to providing quality basic and junior secondary education, strong moral values, global languages, and hands-on digital skills.
            </p>
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#D49A24] font-bold block mb-1">
                School Motto
              </span>
              <p className="text-sm font-serif italic text-white">
                "{SCHOOL_INFO.tagline}"
              </p>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#D49A24] font-bold block mb-1">
                College Motto
              </span>
              <p className="text-sm font-serif italic text-[#FAF7F2]/90">
                "{SCHOOL_INFO.collegeMotto}"
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D49A24] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#FAF7F2]/80">
              {links.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => onNavigate(link.path)}
                    className="hover:text-white hover:underline transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D49A24] mb-4">
              Contact & Location
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-[#FAF7F2]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D49A24] shrink-0 mt-0.5" />
                <span>
                  4, Azeez Lamidi Street, Behind Loto Ewu-Oliwo, Makun, Sagamu, Ogun State, Nigeria.
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D49A24] shrink-0" />
                <div className="space-x-2">
                  <a
                    href={`tel:${SCHOOL_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
                    className="hover:text-white tabular-nums"
                  >
                    {SCHOOL_INFO.contact.primaryPhone}
                  </a>
                  <span>·</span>
                  <a
                    href={`tel:${SCHOOL_INFO.contact.secondaryPhone.replace(/\s+/g, '')}`}
                    className="hover:text-white tabular-nums"
                  >
                    {SCHOOL_INFO.contact.secondaryPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D49A24] shrink-0" />
                <a
                  href={`mailto:${SCHOOL_INFO.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SCHOOL_INFO.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Community & Socials */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D49A24] mb-4">
              Follow Us
            </h3>
            <p className="text-xs text-[#FAF7F2]/75 mb-4 leading-relaxed">
              Connect with our official community pages for event announcements and photos.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Sealed Nectar Ambassadors Academy on Facebook"
                className="w-9 h-9 rounded-lg bg-[#5C1320] border border-[#801E2E] flex items-center justify-center text-[#D49A24] hover:bg-[#D49A24] hover:text-[#4F101A] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Sealed Nectar Ambassadors Academy on Instagram"
                className="w-9 h-9 rounded-lg bg-[#5C1320] border border-[#801E2E] flex items-center justify-center text-[#D49A24] hover:bg-[#D49A24] hover:text-[#4F101A] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-[#801E2E]/60 text-[11px] text-[#FAF7F2]/60">
              <span>Alternative / Registered:</span>
              <p className="text-[#FAF7F2]/90 font-medium mt-0.5">
                Sealed Nectar Ambassadors Academy (SNAA)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="bg-[#3D0C14] border-t border-[#6B1724] py-4 px-4 sm:px-6 lg:px-8 text-xs text-[#FAF7F2]/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © {currentYear} Sealed Nectar Ambassadors Academy. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-[#6B1724]">·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </button>
            <span className="text-[#6B1724]">·</span>
            <button
              onClick={() => onNavigate('/admin/admissions')}
              className="hover:text-[#D49A24] transition-colors inline-flex items-center gap-1 text-[11px] opacity-75 hover:opacity-100"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
