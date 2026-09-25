import React, { useState, useEffect } from 'react';
import { Bell, ArrowRight, X } from 'lucide-react';

interface SchoolAnnouncementBannerProps {
  onNavigate?: (path: string) => void;
}

export const SchoolAnnouncementBanner: React.FC<SchoolAnnouncementBannerProps> = ({ onNavigate }) => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    fetch('/api/public/announcements')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAnnouncements(data);
        }
      })
      .catch((e) => console.error('Failed to load announcements banner:', e));
  }, []);

  if (isDismissed || announcements.length === 0) return null;

  const current = announcements[0];

  return (
    <div className="bg-[#6B1724] text-white border-b border-[#52111B] text-xs py-2 px-4 relative z-30 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="p-1 rounded-md bg-[#D49A24] text-[#4F101A] font-bold text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Bell className="w-3 h-3" />
            <span>Notice</span>
          </span>
          <strong className="font-semibold text-white/95 shrink-0 hidden sm:inline">
            {current.title}:
          </strong>
          <span className="text-white/85 text-xs truncate">
            {current.message}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onNavigate && (
            <button
              onClick={() => onNavigate('/admissions')}
              className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-[#D49A24] hover:underline"
            >
              <span>Explore Admissions</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-white/70 hover:text-white rounded transition-colors"
            aria-label="Dismiss school notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
