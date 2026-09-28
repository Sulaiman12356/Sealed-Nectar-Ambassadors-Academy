import React, { useState } from 'react';

interface SchoolCrestProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightMode?: boolean;
}

export const SchoolCrest: React.FC<SchoolCrestProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightMode = false,
}) => {
  const [imgSrc, setImgSrc] = useState('/Real Logo sealed.jpeg');

  const sizeMap = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Real School Logo */}
      <div
        className={`${sizeMap[size]} shrink-0 rounded-xl relative flex items-center justify-center p-0.5 overflow-hidden shadow-xs border ${
          lightMode
            ? 'border-white/30 bg-white ring-1 ring-white/10'
            : 'border-[#C88A1A]/40 bg-white ring-1 ring-black/5'
        }`}
        title="SEALED NECTAR AMBASSADORS SCHOOL Official Crest"
      >
        <img
          src={imgSrc}
          onError={() => setImgSrc('/images/real_logo_sealed.jpeg')}
          alt="SEALED NECTAR AMBASSADORS SCHOOL Official Logo"
          className="w-full h-full object-contain rounded-lg select-none"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-display font-bold leading-tight uppercase tracking-tight ${
              lightMode ? 'text-white' : 'text-[#6B1724]'
            } ${size === 'lg' ? 'text-xl' : size === 'xl' ? 'text-2xl' : size === 'sm' ? 'text-xs' : 'text-sm sm:text-base'}`}
          >
            Sealed Nectar
          </span>
          <span
            className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase ${
              lightMode ? 'text-[#FFD566]' : 'text-[#C88A1A]'
            }`}
          >
            Ambassadors School
          </span>
        </div>
      )}
    </div>
  );
};
