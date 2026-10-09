'use client';

import React, { useMemo } from 'react';
import { HeartPulse, Stethoscope, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { getClinicOpenStatus } from '@/lib/booking/openStatus';
import type { SiteConfig } from '@/lib/types';

export type FloatCardVariant = 'emergency' | 'status' | 'doctors';

interface FloatCardProps {
  variant: FloatCardVariant;
  siteConfig: SiteConfig;
  className?: string;
  isReducedMotion?: boolean;
  style?: React.CSSProperties;
}

export function FloatCard({
  variant,
  siteConfig,
  className,
  isReducedMotion = false,
  style,
}: FloatCardProps) {
  const openStatus = useMemo(() => {
    return getClinicOpenStatus(siteConfig);
  }, [siteConfig]);

  const doctorsCount = useMemo(() => {
    const docStat = siteConfig.stats?.find((s) => s.label.toLowerCase().includes('doctor'));
    return docStat?.value || 3;
  }, [siteConfig.stats]);

  const cardContent = useMemo(() => {
    switch (variant) {
      case 'emergency':
        return {
          icon: <HeartPulse className="w-4 h-4 text-orange" />,
          dot: (
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange" />
            </span>
          ),
          title: '24x7 Emergency',
          subtitle: 'Immediate Trauma Care',
        };
      case 'status':
        return {
          icon: <Clock className="w-4 h-4 text-olive-deep dark:text-sand" />,
          dot: (
            <span
              className={cn(
                'w-2.5 h-2.5 rounded-full inline-block shrink-0',
                openStatus.isOpen
                  ? 'bg-emerald-600 dark:bg-emerald-400 ring-2 ring-emerald-500/30'
                  : 'bg-brown-600 dark:bg-sand ring-2 ring-brown-500/30',
              )}
            />
          ),
          title: openStatus.isOpen ? 'OPD: Open Now' : 'OPD: Closed Today',
          subtitle: openStatus.isOpen
            ? `Active until ${openStatus.hoursLabel.split('–')[1]?.trim() || 'evening'}`
            : '24x7 ER Active',
        };
      case 'doctors':
        return {
          icon: <Stethoscope className="w-4 h-4 text-orange" />,
          dot: <span className="w-2.5 h-2.5 rounded-full bg-orange inline-block shrink-0" />,
          title: `${doctorsCount} Expert Doctors`,
          subtitle: 'Surgery & Dermatology',
        };
    }
  }, [variant, openStatus, doctorsCount]);

  return (
    <div
      style={style}
      className={cn(
        'glass-card rounded-2xl p-3 sm:p-3.5 border border-sand/60 shadow-glass select-none pointer-events-none z-20 flex items-center gap-3 backdrop-blur-md transition-transform duration-300',
        !isReducedMotion && 'animate-float',
        className,
      )}
      aria-hidden="true"
    >
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sand/30 dark:bg-olive-deep/70 border border-sand/50 flex items-center justify-center shrink-0">
        {cardContent.icon}
      </div>

      <div className="flex flex-col min-w-0 pr-1">
        <div className="flex items-center gap-1.5">
          {cardContent.dot}
          <span className="text-xs sm:text-sm font-bold text-olive-deep dark:text-cream leading-tight truncate">
            {cardContent.title}
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] text-ink/75 dark:text-cream/75 font-normal leading-tight mt-0.5 truncate">
          {cardContent.subtitle}
        </span>
      </div>
    </div>
  );
}
