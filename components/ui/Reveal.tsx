'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { useReveal, type RevealVariant } from '@/hooks/useReveal';

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
}

export function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.75,
  className,
  as: Component = 'div',
}: RevealProps) {
  const { ref, isRevealed, isReducedMotion } = useReveal();

  if (isReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'fade-up':
        return isRevealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8';
      case 'mask-up':
        return isRevealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-full';
      case 'scale-in':
        return isRevealed
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95';
      case 'stagger-children':
        return isRevealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6';
      default:
        return isRevealed ? 'opacity-100' : 'opacity-0';
    }
  };

  return (
    <Component
      ref={ref as any}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={cn(
        'transition-all will-change-transform',
        getVariantStyles(),
        className,
      )}
    >
      {children}
    </Component>
  );
}
