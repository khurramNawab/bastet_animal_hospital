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
    'relative inline-flex items-center justify-center font-sans font-semibold rounded-2xl transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 outline-none';

  const variantStyles = {
    primary:
      'bg-gold text-ink shadow-gold-glow hover:bg-gold-light hover:shadow-gold-glow-lg border border-gold/40',
    outline:
      'bg-teal/20 text-teal border border-teal/40 hover:bg-teal hover:text-cream backdrop-blur-sm',
    ghost: 'bg-transparent text-ink hover:text-teal hover:bg-gold/10',
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
