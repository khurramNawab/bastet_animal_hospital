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
      <div className="block dark:hidden relative w-36 sm:w-44 h-12">
        <Image
          src="/brand/logo.avif"
          alt="Bastet Small Animal Hospital"
          fill
          priority={priority}
          sizes="(max-width: 640px) 144px, 176px"
          className={cn('object-contain', imageClassName)}
        />
      </div>

      {/* Dark mode: placed on a warm cream pill plate for optimal contrast */}
      <div className="hidden dark:flex items-center justify-center relative w-36 sm:w-44 h-12 px-2.5 py-1 bg-cream/95 rounded-full shadow-sm border border-sand/40">
        <div className="relative w-full h-full">
          <Image
            src="/brand/logo.avif"
            alt="Bastet Small Animal Hospital"
            fill
            priority={priority}
            sizes="(max-width: 640px) 144px, 176px"
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
