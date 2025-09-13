'use client'

import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = 'full',
  height = '20px',
  rounded = true,
  count = 1,
}) => {
  const baseStyle = `animate-pulse bg-gray-200 dark:bg-gray-700`;
  const roundedStyle = rounded ? 'rounded-md' : '';
  const widthStyle = typeof width === 'number' ? `w-[${width}px]` : `w-${width}`;
  const heightStyle = typeof height === 'number' ? `h-[${height}px]` : `h-${height}`;

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={`${baseStyle} ${roundedStyle} ${widthStyle} ${heightStyle} ${className}`}
          role="status"
          aria-label="Loading..."
        />
      ))}
    </>
  );
};

// Preset components for common use cases
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1,
  className = ''
}) => (
  <div className={`space-y-3 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <Skeleton 
        key={i}
        width={i === lines - 1 ? '3/4' : 'full'}
        height={16}
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    <Skeleton height={200} /> {/* Image placeholder */}
    <Skeleton height={20} width="3/4" /> {/* Title placeholder */}
    <div className="space-y-2">
      <Skeleton height={16} /> {/* Description line 1 */}
      <Skeleton height={16} /> {/* Description line 2 */}
      <Skeleton height={16} width="2/3" /> {/* Description line 3 */}
    </div>
  </div>
);

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({ 
  size = 48,
  className = ''
}) => (
  <Skeleton 
    width={size} 
    height={size} 
    className={`rounded-full ${className}`}
  />
);

export default Skeleton;
