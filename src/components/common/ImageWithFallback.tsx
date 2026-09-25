import React, { useState } from 'react';
import { School } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackText?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackText,
  containerClassName = '',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden bg-[#F4EFEB] ${containerClassName}`}>
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-[#EFE8DF] animate-pulse" />
      )}

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
          {...props}
        />
      ) : (
        <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center bg-[#F4EFEB] border border-[#E8DFD5]">
          <div className="w-12 h-12 rounded-full bg-[#6B1724]/10 text-[#6B1724] flex items-center justify-center mb-3">
            <School className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-[#6B1724] uppercase tracking-wider mb-1">
            Sealed Nectar Ambassadors Academy
          </span>
          <p className="text-xs text-[#57534E] max-w-xs line-clamp-2">
            {fallbackText || alt}
          </p>
        </div>
      )}
    </div>
  );
};
