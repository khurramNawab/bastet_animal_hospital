'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/cn';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'primary' | 'outline' | 'ghost';
  disabled?: boolean;
  'aria-label'?: string;
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = 'primary',
  disabled = false,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Only enable magnetic physics on fine pointers (desktop mouse) and when not reduced-motion
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanHover(isFinePointer && !isReducedMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !buttonRef.current || disabled) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Apply magnetic strength (~0.25)
    x.set(distanceX * 0.25);
    y.set(distanceY * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-sans font-semibold rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-orange-deep focus-visible:ring-offset-2 outline-none';

  const variantStyles = {
    primary:
      'bg-orange text-ink font-bold shadow-warm-glow hover:bg-orange-soft hover:shadow-warm-glow-lg border border-orange/40 active:scale-[0.98]',
    outline:
      'bg-olive/10 text-olive dark:text-sand border border-olive/40 hover:bg-olive hover:text-cream dark:hover:bg-sand dark:hover:text-ink backdrop-blur-sm active:scale-[0.98]',
    ghost: 'bg-transparent text-ink dark:text-cream hover:text-orange-deep dark:hover:text-orange hover:bg-orange/10 active:scale-[0.98]',
  };

  const content = (
    <motion.div
      ref={buttonRef}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        <Link
          href={href}
          aria-label={ariaLabel}
          className={cn(baseStyles, variantStyles[variant], className)}
        >
          {children}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          className={cn(baseStyles, variantStyles[variant], className)}
        >
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
}
