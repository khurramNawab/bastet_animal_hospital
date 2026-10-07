'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToolDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  triggerRef?: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}

export function ToolDialog({
  isOpen,
  onClose,
  title,
  triggerRef,
  children,
}: ToolDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Focus trap and keyboard handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!dialogRef.current) return;

        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = (triggerRef?.current ||
        document.activeElement) as HTMLElement;

      // Lock body scroll
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Initial focus to close button or first interactive element inside modal
      const timer = setTimeout(() => {
        if (dialogRef.current) {
          const firstFocusable = dialogRef.current.querySelector<HTMLElement>(
            'button, [href], input, [tabindex="0"]',
          );
          firstFocusable?.focus();
        }
      }, 50);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        previouslyFocusedElement.current?.focus();
      };
    }
  }, [isOpen, handleKeyDown, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/80 backdrop-blur-md -z-10"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col bg-cream rounded-t-[32px] sm:rounded-3xl border border-gold/40 shadow-2xl overflow-hidden focus:outline-none"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gold/20 flex items-center justify-between bg-teal/5 shrink-0">
              <h2 className="font-display font-bold text-lg sm:text-xl text-teal">
                {title}
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-teal hover:bg-gold/20 hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
