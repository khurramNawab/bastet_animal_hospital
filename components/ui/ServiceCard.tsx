'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  ShieldCheck,
  Activity,
  Sparkles,
  Scissors,
  HeartPulse,
  Microscope,
  Home,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ServiceItem } from '@/lib/types';

interface ServiceCardProps {
  service: ServiceItem;
  animalSlug: string;
}

export function ServiceCard({ service, animalSlug }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [canTilt, setCanTilt] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanTilt(isFine && !isReduced);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !canTilt) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation: max ±8 degrees
    const rotX = -((y - centerY) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 8;

    mouseY.set(rotX);
    mouseX.set(rotY);

    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-gold" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-gold" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-gold" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-gold" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-gold" />;
      case 'Microscope':
        return <Microscope className="w-5 h-5 text-gold" />;
      case 'Home':
        return <Home className="w-5 h-5 text-gold" />;
      default:
        return <Activity className="w-5 h-5 text-gold" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        perspective: 1000,
        rotateX: canTilt ? rotateX : 0,
        rotateY: canTilt ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full"
    >
      <Link
        href={`/services/${animalSlug}#${service.slug}`}
        className="group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-3xl glass-card hover:border-gold/60 transition-all duration-300 shadow-glass overflow-hidden block"
      >
        {/* Dynamic Cursor-Following Gold Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10"
          style={{
            opacity: glowPos.opacity,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(201, 162, 75, 0.25) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        <div>
          {/* Top Row: Icon & Duration */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal text-gold flex items-center justify-center border border-gold/30 shadow-sm group-hover:scale-105 group-hover:border-gold transition-all duration-300">
              {getIcon(service.icon)}
            </div>

            {service.duration && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink/70 bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3 text-gold-dark" />
                <span>{service.duration}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-xl text-teal group-hover:text-teal-600 transition-colors mb-2">
            {service.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-ink/80 leading-relaxed font-light mb-4 line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* Bottom: Learn More Link with Sliding Arrow */}
        <div className="pt-3 border-t border-gold/20 flex items-center justify-between text-xs font-semibold text-teal group-hover:text-gold-dark transition-colors">
          <span>Explore Clinical Details</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200 text-gold" />
        </div>
      </Link>
    </motion.div>
  );
}
