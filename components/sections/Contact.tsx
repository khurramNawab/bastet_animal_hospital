'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { getClinicOpenStatus } from '@/lib/booking/openStatus';
import { cn } from '@/lib/cn';
import type { SiteConfig } from '@/lib/types';

interface ContactProps {
  siteConfig: SiteConfig;
}

const WEEKDAYS_ORDER = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

export function Contact({ siteConfig }: ContactProps) {
  const [openStatus, setOpenStatus] = useState(() => getClinicOpenStatus(siteConfig));
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Refresh open status on client
    setOpenStatus(getClinicOpenStatus(siteConfig));
    const interval = setInterval(() => {
      setOpenStatus(getClinicOpenStatus(siteConfig));
    }, 60000); // Check every 1 min
    return () => clearInterval(interval);
  }, [siteConfig]);

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* LEFT COLUMN: CONTACT DETAILS & TIMINGS */}
      <div className="lg:col-span-6 flex flex-col gap-8">
        {/* Live Clinic Status Card */}
        <div className="p-6 rounded-3xl bg-olive-deep text-cream border border-sand/40 shadow-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div
                className={cn(
                  'w-3.5 h-3.5 rounded-full',
                  openStatus.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-400',
                )}
              />
              <div
                className={cn(
                  'absolute inset-0 w-3.5 h-3.5 rounded-full',
                  openStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500',
                )}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold text-cream">
                  OPD Status:
                </span>
                <span
                  className={cn(
                    'text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border',
                    openStatus.isOpen
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                  )}
                >
                  {openStatus.statusLabel}
                </span>
              </div>
              <p className="text-xs text-cream/75 mt-0.5 font-light">
                {openStatus.message}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* General Inquiries */}
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
            className="p-5 rounded-2xl glass-card border border-sand/40 hover:border-orange/60 transition-all flex items-start gap-4 group"
          >
            <div className="p-3 rounded-xl bg-sand/30 dark:bg-olive-900 text-orange group-hover:bg-orange group-hover:text-ink transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-orange-deep dark:text-sand font-semibold block mb-0.5">
                Appointments & Reception
              </span>
              <span className="font-display text-base font-bold text-olive dark:text-cream group-hover:text-orange-deep dark:group-hover:text-orange transition-colors">
                {siteConfig.phone}
              </span>
              <p className="text-[11px] text-ink/60 dark:text-cream/60 mt-0.5 font-light">
                Call during regular OPD hours
              </p>
            </div>
          </a>

          {/* WhatsApp Desk */}
          <a
            href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl glass-card border border-sand/40 hover:border-orange/60 transition-all flex items-start gap-4 group"
          >
            <div className="p-3 rounded-xl bg-sand/30 dark:bg-olive-900 text-orange group-hover:bg-orange group-hover:text-ink transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-orange-deep dark:text-sand font-semibold block mb-0.5">
                WhatsApp Desk
              </span>
              <span className="font-display text-base font-bold text-olive dark:text-cream group-hover:text-orange-deep dark:group-hover:text-orange transition-colors">
                Quick Chat & Reports
              </span>
              <p className="text-[11px] text-ink/60 dark:text-cream/60 mt-0.5 font-light">
                Prescriptions & Slot inquiries
              </p>
            </div>
          </a>

          {/* 24/7 Emergency Line */}
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
            className="p-5 rounded-2xl bg-red-950/20 border border-red-500/40 hover:border-red-500 transition-all flex items-start gap-4 group sm:col-span-2"
          >
            <div className="p-3 rounded-xl bg-red-600 text-white">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-red-600 font-bold block mb-0.5">
                24x7 Emergency Trauma Unit
              </span>
              <span className="font-display text-base font-bold text-red-950 dark:text-red-200">
                {siteConfig.phone} (Always Active)
              </span>
              <p className="text-[11px] text-red-900/80 dark:text-red-300/80 mt-0.5 font-light">
                Immediate clinical triage, oxygenation, and on-call surgeons
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="p-5 rounded-2xl glass-card border border-sand/40 hover:border-orange/60 transition-all flex items-start gap-4 group sm:col-span-2"
          >
            <div className="p-3 rounded-xl bg-sand/30 dark:bg-olive-900 text-orange group-hover:bg-orange group-hover:text-ink transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-orange-deep dark:text-sand font-semibold block mb-0.5">
                Official Email
              </span>
              <span className="font-display text-base font-bold text-olive dark:text-cream group-hover:text-orange-deep dark:group-hover:text-orange transition-colors break-all">
                {siteConfig.email}
              </span>
            </div>
          </a>
        </div>

        {/* Weekly Operating Hours Table */}
        <div className="p-6 rounded-3xl glass-card border border-sand/40 shadow-glass">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-orange-deep dark:text-orange" />
            <h3 className="font-display text-lg font-bold text-olive dark:text-cream">
              Hospital Operating Schedule
            </h3>
          </div>

          <div className="divide-y divide-sand/20 text-xs">
            {WEEKDAYS_ORDER.map(({ key, label }) => {
              const daySchedule = siteConfig.openingHours?.[key];
              const isToday = openStatus.dayName.toLowerCase() === key;

              return (
                <div
                  key={key}
                  className={cn(
                    'py-2.5 px-3 flex items-center justify-between rounded-lg transition-colors',
                    isToday ? 'bg-sand/30 font-semibold text-olive dark:text-sand' : 'text-ink/80 dark:text-cream/80',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span>{label}</span>
                    {isToday && (
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-orange text-ink">
                        Today
                      </span>
                    )}
                  </div>

                  <span className={isToday ? 'text-olive dark:text-cream font-bold' : 'text-ink/70 dark:text-cream/70'}>
                    {daySchedule ? daySchedule.label : 'Closed'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-sand/30 flex items-center gap-2 text-xs text-orange-deep dark:text-sand font-semibold">
            <ShieldCheck className="w-4 h-4 text-orange" />
            <span>24/7 Critical Care & Emergency Admissions are always active.</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: LOCATION & GOOGLE MAPS */}
      <div className="lg:col-span-6 flex flex-col gap-6 h-full">
        {/* Address Card */}
        <div className="p-6 rounded-3xl glass-card border border-sand/40 shadow-glass flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-sand/30 text-orange-deep dark:text-orange shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-orange-deep dark:text-sand font-semibold block mb-0.5">
                Hospital Location
              </span>
              <h3 className="font-display text-lg font-bold text-olive dark:text-cream">
                {siteConfig.name}
              </h3>
              <p className="text-xs text-ink/75 dark:text-cream/75 mt-0.5 leading-relaxed font-light">
                {siteConfig.address}
              </p>
            </div>
          </div>

          <a
            href={siteConfig.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-5 rounded-full bg-orange text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-orange-soft transition-all shrink-0 shadow-warm-glow"
          >
            <span>Get Directions</span>
            <ExternalLink className="w-3.5 h-3.5 text-ink" />
          </a>
        </div>

        {/* Interactive Google Maps Frame / Facade */}
        <div className="relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-sand/40 shadow-xl bg-olive-900/10 flex items-center justify-center">
          {isMapLoaded ? (
            <iframe
              src={siteConfig.mapEmbedUrl}
              title="Bastet Small Animal Hospital Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          ) : (
            <div className="p-8 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-sand/30 border border-orange flex items-center justify-center text-orange shadow-warm-glow">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-olive dark:text-cream">
                  Explore Clinic Map
                </h4>
                <p className="text-xs text-ink/70 dark:text-cream/70 max-w-xs mx-auto mt-1 font-light">
                  Click below to load the interactive Google Maps view of Rash Behari Avenue, Kolkata.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMapLoaded(true)}
                className="py-3 px-6 rounded-full bg-orange text-ink font-bold text-xs uppercase tracking-wider hover:bg-orange-soft transition-all shadow-warm-glow focus-visible:ring-2 focus-visible:ring-orange-deep"
              >
                <span>Load Interactive Map</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
