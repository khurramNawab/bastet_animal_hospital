'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, Sparkles, Send } from 'lucide-react';
import { waitlistSchema, type WaitlistInput } from '@/lib/schemas/waitlist';
import type { AnimalCategory } from '@/lib/types';

interface WaitlistFormProps {
  animal: AnimalCategory;
}

export function WaitlistForm({ animal }: WaitlistFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      animal: animal.name,
      hp: '',
    },
  });

  const onSubmit = async (data: WaitlistInput) => {
    setServerError('');
    setServerMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        setServerError(resData.error || 'Failed to join waitlist. Please try again.');
        return;
      }

      setIsSubmitted(true);
      setServerMessage(resData.message || 'You have been added to our priority waitlist!');
      reset();
    } catch {
      setServerError('Network error. Please try again in a few moments.');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 rounded-3xl glass-card border border-sand/40 shadow-glass">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-orange-deep dark:text-sand font-semibold mb-2">
        <Sparkles className="w-3.5 h-3.5 text-orange" />
        <span>Priority VIP Access</span>
      </div>

      <h3 className="font-display text-2xl font-bold text-olive dark:text-cream mb-2">
        Be First To Know When {animal.name} Care Launches
      </h3>

      <p className="text-sm text-ink/75 dark:text-cream/75 font-light mb-6">
        Join our exclusive priority list for opening dates, priority appointments, and inaugural
        health packages in Kolkata.
      </p>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 rounded-2xl bg-sand/20 dark:bg-olive-900/60 border border-sand/40 flex flex-col items-center text-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-sand/30 flex items-center justify-center text-orange">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-display text-lg font-bold text-olive dark:text-cream">
              You&apos;re On The VIP List!
            </h4>
            <p className="text-xs sm:text-sm text-ink/80 dark:text-cream/80">{serverMessage}</p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="mt-2 text-xs font-semibold text-orange-deep dark:text-orange hover:underline"
            >
              Add another email
            </button>
          </motion.div>
        ) : (
          <form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Hidden species field & honeypot */}
            <input type="hidden" {...register('animal')} value={animal.name} />
            <input
              type="text"
              {...register('hp')}
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-olive dark:text-sand mb-1">
                Email Address <span className="text-orange">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="petparent@example.com"
                {...register('email')}
                className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-olive-950/80 border border-sand/40 text-ink dark:text-cream text-sm placeholder:text-ink/40 focus:bg-white focus:border-orange focus:ring-2 focus:ring-orange/30 outline-none transition-all"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-olive dark:text-sand mb-1">
                  Your Name <span className="text-ink/40 dark:text-cream/40">(optional)</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Rohini Roy"
                  {...register('name')}
                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-olive-950/80 border border-sand/40 text-ink dark:text-cream text-sm placeholder:text-ink/40 focus:bg-white focus:border-orange focus:ring-2 focus:ring-orange/30 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-olive dark:text-sand mb-1">
                  Phone / WhatsApp <span className="text-ink/40 dark:text-cream/40">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 98300 00000"
                  {...register('phone')}
                  className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-olive-950/80 border border-sand/40 text-ink dark:text-cream text-sm placeholder:text-ink/40 focus:bg-white focus:border-orange focus:ring-2 focus:ring-orange/30 outline-none transition-all"
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phone.message}</span>
                  </p>
                )}
              </div>
            </div>

            {serverError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-orange text-ink font-bold text-xs uppercase tracking-wider shadow-warm-glow hover:bg-orange-soft hover:shadow-warm-glow-lg transition-all active:scale-95 disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Securing Priority Spot...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Join {animal.name.split(' ')[0]} Waitlist</span>
                </>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
