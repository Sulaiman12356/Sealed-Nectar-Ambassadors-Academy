import React from 'react';

interface SchoolCrestProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  lightMode?: boolean;
}

export const SchoolCrest: React.FC<SchoolCrestProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightMode = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Crest Insignia */}
      <div
        className={`${sizeMap[size]} shrink-0 rounded-lg relative flex items-center justify-center shadow-xs overflow-hidden border border-[#C88A1A]/40 bg-gradient-to-b from-[#6B1724] to-[#4F101A]`}
        title="Sealed Nectar Ambassadors Academy Crest"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield Outline */}
          <path
            d="M50 8C30 8 18 16 18 36C18 64 50 92 50 92C50 92 82 64 82 36C82 16 70 8 50 8Z"
            fill="#6B1724"
            stroke="#D49A24"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Inner Inset Shield */}
          <path
            d="M50 14C34 14 24 21 24 38C24 60 50 84 50 84C50 84 76 60 76 38C76 21 66 14 50 14Z"
            fill="#52111B"
            stroke="#D49A24"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
          {/* Open Book of Knowledge */}
          <path
            d="M32 44C38 42 45 42 50 45C55 42 62 42 68 44V60C62 58 55 58 50 61C45 58 38 58 32 60V44Z"
            fill="#FAF7F2"
            stroke="#D49A24"
            strokeWidth="1.5"
          />
          <path
            d="M50 45V61"
            stroke="#6B1724"
            strokeWidth="1.5"
          />
          {/* Flame / Nectar Lamp */}
          <path
            d="M50 24C47 28 45 32 47 36C48 38 50 40 50 40C50 40 52 38 53 36C55 32 53 28 50 24Z"
            fill="#D49A24"
          />
          {/* Banner with SNAA */}
          <rect
            x="28"
            y="67"
            width="44"
            height="11"
            rx="2"
            fill="#FAF7F2"
            stroke="#D49A24"
            strokeWidth="1.2"
          />
          <text
            x="50"
            y="75.5"
            fill="#6B1724"
            fontSize="7.5"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
            letterSpacing="0.8"
          >
            SNAA
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-display font-bold leading-tight uppercase tracking-tight ${
              lightMode ? 'text-white' : 'text-[#6B1724]'
            } ${size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-xs' : 'text-sm sm:text-base'}`}
          >
            Sealed Nectar
          </span>
          <span
            className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase ${
              lightMode ? 'text-[#FAF7F2]/80' : 'text-[#57534E]'
            }`}
          >
            Ambassadors Academy
          </span>
        </div>
      )}
    </div>
  );
};
