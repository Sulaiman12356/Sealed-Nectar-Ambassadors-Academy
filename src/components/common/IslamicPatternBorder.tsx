import React from 'react';

export const IslamicPatternBorder: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden flex items-center justify-center opacity-30 select-none pointer-events-none py-1.5 ${className}`}>
      <svg
        className="w-full max-w-4xl h-3 text-[#C88A1A]"
        viewBox="0 0 400 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="repeat-x"
      >
        <pattern id="islamic-repeat" x="0" y="0" width="40" height="12" patternUnits="userSpaceOnUse">
          {/* Subtle geometric star polygon motif */}
          <path
            d="M20 1L23 4H27L25 8L27 12H23L20 9L17 12H13L15 8L13 4H17L20 1Z"
            stroke="currentColor"
            strokeWidth="0.75"
            fill="none"
          />
          <circle cx="20" cy="6" r="1.5" fill="currentColor" fillOpacity="0.4" />
          <path d="M0 6H13M27 6H40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#islamic-repeat)" />
      </svg>
    </div>
  );
};
