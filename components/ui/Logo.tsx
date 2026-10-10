'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

interface LogoProps {
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  showLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  priority = false,
  className,
  imageClassName,
  showLink = true,
}) => {
  const content = (
    <div
      className={cn(
        'relative inline-flex items-center justify-center transition-transform hover:scale-[1.02] duration-200',
        className
      )}
    >
      {/* Light mode: clean image on transparent background */}
      <div className="block dark:hidden relative w-32 sm:w-40 md:w-44 h-9 sm:h-10 md:h-11">
        <Image
          src="/brand/logo.avif"
          alt="Bastet Small Animal Hospital"
          fill
          priority={priority}
          sizes="(max-width: 640px) 128px, 176px"
          className={cn('object-contain object-left', imageClassName)}
        />
      </div>

      {/* Dark mode: placed on a warm cream pill plate for optimal contrast */}
      <div className="hidden dark:flex items-center justify-center relative w-32 sm:w-40 md:w-44 h-9 sm:h-10 md:h-11 px-2.5 py-1 bg-cream/95 rounded-full shadow-xs border border-sand/40">
        <div className="relative w-full h-full">
          <Image
            src="/brand/logo.avif"
            alt="Bastet Small Animal Hospital"
            fill
            priority={priority}
            sizes="(max-width: 640px) 128px, 176px"
            className={cn('object-contain', imageClassName)}
          />
        </div>
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link href="/" aria-label="Bastet Small Animal Hospital - Home">
        {content}
      </Link>
    );
  }

  return content;
};
