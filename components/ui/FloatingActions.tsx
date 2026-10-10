'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Phone, PhoneCall, Copy, Check, X, MapPin, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteConfig } from '@/lib/types';

interface FloatingActionsProps {
  siteConfig: SiteConfig;
}

export function FloatingActions({ siteConfig }: FloatingActionsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const cleanPhone = siteConfig.phone.replace(/\s+/g, '');
  const cleanWhatsapp = siteConfig.whatsapp.replace(/\D/g, '');

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const handleScroll = () => {
      // Show floating actions after user scrolls down 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    },
    [isModalOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleCopyPhone = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(siteConfig.phone);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch {
      // Fallback
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
              animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-end gap-3 pointer-events-auto"
            >
              {/* 1. Direct WhatsApp Desk */}
              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 p-3 sm:px-4 sm:py-2.5 rounded-full bg-olive-900 text-cream border border-sand/40 shadow-xl hover:bg-olive-800 transition-all focus-visible:ring-2 focus-visible:ring-orange-deep"
                aria-label="Chat with Bastet WhatsApp Reception"
              >
                <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-cream group-hover:text-sand transition-colors">
                  WhatsApp Desk
                </span>
                <div className="w-8 h-8 rounded-full bg-sand/20 flex items-center justify-center text-sand">
                  <MessageSquare className="w-4 h-4" />
                </div>
              </a>

              {/* 2. 24/7 Emergency Line (Opens Emergency Modal) */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center gap-2.5 p-3 sm:px-4 sm:py-2.5 rounded-full bg-danger hover:bg-danger-deep text-white border border-danger-soft/50 shadow-2xl transition-all focus-visible:ring-2 focus-visible:ring-danger-soft active:scale-95 cursor-pointer"
                aria-label="Open 24/7 Emergency Trauma Hotline Contact Options"
              >
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-white">
                  24/7 Emergency
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white animate-pulse">
                  <Phone className="w-4 h-4" />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Emergency Quick-Contact Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="emergency-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 10 }}
              animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-3xl bg-cream dark:bg-olive-deep text-ink dark:text-cream border-2 border-danger/40 shadow-2xl overflow-hidden p-6 sm:p-8 z-10"
            >
              {/* Top Danger Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-danger" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-ink/60 dark:text-cream/60 hover:bg-sand/30 hover:text-ink dark:hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-orange-deep"
                aria-label="Close emergency modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-danger-tint text-danger-deep dark:bg-danger-deep/50 dark:text-danger-soft text-[11px] font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                  24/7 Critical Emergency
                </span>
              </div>

              {/* Title & Description */}
              <h2
                id="emergency-modal-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-ink dark:text-cream mb-2"
              >
                Emergency Trauma Line
              </h2>
              <p className="text-xs sm:text-sm text-ink/75 dark:text-cream/75 mb-6 leading-relaxed">
                For sudden collapse, difficulty breathing, profuse bleeding, or toxic ingestion, reach our clinical trauma team immediately.
              </p>

              {/* Phone Number Display Box */}
              <div className="rounded-2xl bg-white/80 dark:bg-olive-950/80 border border-sand/40 p-4 sm:p-5 mb-6 shadow-inner text-center">
                <span className="text-[11px] uppercase tracking-widest font-semibold text-ink/60 dark:text-cream/60 block mb-1">
                  Primary Emergency Hotline
                </span>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-danger dark:text-danger-soft tracking-wider select-all">
                  {siteConfig.phone}
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {/* 1. Direct Call Link */}
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-danger hover:bg-danger-deep text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all duration-200 active:scale-95 text-center focus-visible:ring-2 focus-visible:ring-danger-soft"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                {/* 2. Copy Number Button */}
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-sand/30 dark:bg-olive-800/60 hover:bg-sand/50 text-ink dark:text-cream border border-sand/60 font-semibold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 text-center focus-visible:ring-2 focus-visible:ring-orange-deep"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-olive" />
                      <span className="text-olive">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>

                {/* 3. WhatsApp Direct Chat */}
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('EMERGENCY: I need immediate veterinary assistance for my pet.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-olive-900 hover:bg-olive-800 text-cream border border-sand/40 font-semibold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 text-center focus-visible:ring-2 focus-visible:ring-orange-deep"
                >
                  <MessageSquare className="w-4 h-4 text-sand" />
                  <span>WhatsApp Desk</span>
                </a>

                {/* 4. Google Maps Directions */}
                <a
                  href={siteConfig.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/60 dark:bg-olive-900/60 hover:bg-white text-ink/80 dark:text-cream/80 border border-sand/40 font-semibold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 text-center focus-visible:ring-2 focus-visible:ring-orange-deep"
                >
                  <MapPin className="w-4 h-4 text-orange" />
                  <span>Hospital Map</span>
                </a>
              </div>

              {/* Location Footer Note */}
              <div className="flex items-center justify-center gap-2 text-xs text-ink/60 dark:text-cream/60 text-center pt-2 border-t border-sand/20">
                <MapPin className="w-3.5 h-3.5 text-orange shrink-0" />
                <span>{siteConfig.address} • Open 24 Hours</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

