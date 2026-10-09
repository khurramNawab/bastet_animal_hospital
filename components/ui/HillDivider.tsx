import React from 'react';
import { cn } from '@/lib/cn';

interface HillDividerProps {
  fromColor?: 'olive-deep' | 'orange-deep' | 'cream' | 'brown-deep';
  toColor?: 'olive-deep' | 'orange-deep' | 'cream' | 'brown-deep';
  variant?: 'hill' | 'concave' | 'arch';
  flip?: boolean;
  className?: string;
}

const colorClassMap: Record<string, string> = {
  'olive-deep': 'fill-olive-deep',
  'orange-deep': 'fill-orange-deep',
  'cream': 'fill-cream dark:fill-olive-deep',
  'brown-deep': 'fill-brown-deep',
};

const bgClassMap: Record<string, string> = {
  'olive-deep': 'bg-olive-deep',
  'orange-deep': 'bg-orange-deep',
  'cream': 'bg-cream dark:bg-olive-deep',
  'brown-deep': 'bg-brown-deep',
};

export function HillDivider({
  fromColor = 'olive-deep',
  toColor = 'orange-deep',
  variant = 'hill',
  flip = false,
  className,
}: HillDividerProps) {
  const fillClass = colorClassMap[toColor] || 'fill-orange-deep';
  const bgClass = bgClassMap[fromColor] || 'bg-olive-deep';

  let pathD = 'M 0,120 L 0,35 Q 360,0 720,25 Q 1080,50 1440,15 L 1440,120 Z';

  if (variant === 'concave') {
    pathD = 'M 0,120 L 0,10 Q 720,95 1440,10 L 1440,120 Z';
  } else if (variant === 'arch') {
    pathD = 'M 0,120 L 0,85 Q 720,0 1440,85 L 1440,120 Z';
  }

  return (
    <div
      className={cn('relative w-full h-12 sm:h-16 lg:h-24 overflow-hidden pointer-events-none -my-1', bgClass, className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={cn('w-full h-full', flip && 'transform rotate-180')}
      >
        <path d={pathD} className={cn(fillClass, 'transition-colors duration-300')} />
      </svg>
    </div>
  );
}
