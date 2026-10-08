'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteConfig } from '@/lib/types';

interface FloatingActionsProps {
  siteConfig: SiteConfig;
}

export function FloatingActions({ siteConfig }: FloatingActionsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

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

  return (
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
              href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 p-3 sm:px-4 sm:py-2.5 rounded-full bg-teal text-cream border border-gold/40 shadow-xl hover:bg-teal-800 transition-all focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Chat with Bastet WhatsApp Reception"
            >
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-cream group-hover:text-gold transition-colors">
                WhatsApp Desk
              </span>
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                <MessageSquare className="w-4 h-4" />
              </div>
            </a>

            {/* 2. 24/7 Emergency Line */}
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
              className="group flex items-center gap-2.5 p-3 sm:px-4 sm:py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white border border-red-400 shadow-2xl transition-all focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Call 24/7 Emergency Trauma Line"
            >
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-white">
                24/7 Emergency
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white animate-pulse">
                <Phone className="w-4 h-4" />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
