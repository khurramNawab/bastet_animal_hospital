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
          dot: <span className="w-2 h-2 rounded-full bg-orange animate-ping inline-block" />,
          title: '24x7 Emergency',
          subtitle: 'Immediate Trauma Care',
        };
      case 'status':
        return {
          icon: <Clock className="w-4 h-4 text-olive-deep dark:text-sand" />,
          dot: (
            <span
              className={cn(
                'w-2 h-2 rounded-full inline-block',
                openStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500',
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
          dot: <span className="w-2 h-2 rounded-full bg-orange inline-block" />,
          title: `${doctorsCount} Expert Doctors`,
          subtitle: 'Surgery & Dermatology',
        };
    }
  }, [variant, openStatus, doctorsCount]);

  return (
    <div
      style={style}
      className={cn(
        'glass-card rounded-2xl p-3.5 sm:p-4 border border-sand/60 shadow-glass select-none pointer-events-none z-20 flex items-center gap-3 backdrop-blur-md transition-transform duration-300',
        !isReducedMotion && 'animate-float',
        className,
      )}
      aria-hidden="true"
    >
      <div className="w-9 h-9 rounded-xl bg-sand/30 dark:bg-olive-deep/70 border border-sand/50 flex items-center justify-center shrink-0">
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
