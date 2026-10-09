'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Clock,
  Calendar,
  CheckCircle2,
  Phone,
  MessageSquare,
  MapPin,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import { evaluateTriage } from '@/lib/tools/triage';
import { cn } from '@/lib/cn';
import type { SymptomCheckerConfig, SiteConfig, TriageUrgency } from '@/lib/types';

interface SymptomCheckerProps {
  config: SymptomCheckerConfig;
  siteConfig: SiteConfig;
}

export function SymptomChecker({ config, siteConfig }: SymptomCheckerProps) {
  const [step, setStep] = useState<'intro' | 'redflags' | 'questions' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedRedFlags, setSelectedRedFlags] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  const totalQuestions = config.questions.length;
  const currentQuestion = config.questions[currentQuestionIndex];

  // Focus result heading when reaching result
  useEffect(() => {
    if (step === 'result' && resultHeadingRef.current) {
      resultHeadingRef.current.focus();
    }
  }, [step]);

  const handleToggleRedFlag = (id: string) => {
    setSelectedRedFlags((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleRedFlagSubmit = () => {
    if (selectedRedFlags.length > 0) {
      // Immediate emergency exit
      setStep('result');
    } else {
      setStep('questions');
      setCurrentQuestionIndex(0);
    }
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updatedAnswers = { ...answers, [questionId]: optionId };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep('result');
    }
  };

  const handleBackQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setStep('redflags');
    }
  };

  const handleReset = () => {
    setStep('intro');
    setSelectedRedFlags([]);
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const triageResult = evaluateTriage(
    {
      selectedRedFlags,
      questionAnswers: answers,
    },
    config,
  );

  const getUrgencyIcon = (urgency: TriageUrgency) => {
    switch (urgency) {
      case 'emergency':
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
      case 'today':
        return <Clock className="w-6 h-6 text-orange" />;
      case 'soon':
        return <Calendar className="w-6 h-6 text-olive-soft" />;
      case 'monitor':
        return <CheckCircle2 className="w-6 h-6 text-emerald-400" />;
    }
  };

  const getUrgencyBadgeColor = (urgency: TriageUrgency) => {
    switch (urgency) {
      case 'emergency':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'today':
        return 'bg-orange/20 text-orange-deep dark:text-orange-soft border-orange/40';
      case 'soon':
        return 'bg-olive/20 text-olive-soft border-olive/40';
      case 'monitor':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-ink dark:text-cream">
      {/* SCREEN 1: INTRO & CONSENT */}
      {step === 'intro' && (
        <div className="flex flex-col gap-6 py-2">
          <div className="p-5 rounded-2xl bg-sand/30 dark:bg-olive-deep/60 border border-sand/60 dark:border-sand/30 flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-orange-deep shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-bold text-base text-olive-deep dark:text-sand mb-1">
                Clinical Triage Guidance
              </h3>
              <p className="text-xs text-ink/80 dark:text-cream/80 leading-relaxed font-light">
                {config.disclaimer}
              </p>
            </div>
          </div>

          <p className="text-sm text-ink/80 dark:text-cream/80 leading-relaxed font-light">
            This rapid assessment evaluates critical symptoms to help you determine whether your pet
            needs immediate emergency stabilization, same-day consultation, or monitored home care.
          </p>

          <div className="p-4 rounded-xl bg-white/70 dark:bg-olive-deep/40 border border-sand/40 text-xs text-ink/70 dark:text-cream/70 flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-olive-deep dark:text-sand">
              <HelpCircle className="w-4 h-4 text-orange-deep" />
              <span>Safety & Privacy Notice</span>
            </div>
            <p className="leading-relaxed">
              No medical diagnosis is given, and your answers are computed securely inside your
              browser without being stored or transmitted.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setStep('redflags')}
            className="w-full py-3.5 px-6 rounded-2xl bg-orange text-ink font-semibold text-sm hover:bg-orange-soft transition-all flex items-center justify-center gap-2 shadow-warm-glow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-orange-deep"
          >
            <span>I Understand — Begin Assessment</span>
            <ArrowRight className="w-4 h-4 text-ink" />
          </button>
        </div>
      )}

      {/* SCREEN 2: RED FLAGS CHECKLIST */}
      {step === 'redflags' && (
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-red-600 font-semibold flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Critical Priority Screening</span>
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-olive-deep dark:text-cream">
              Is your dog experiencing any of these right now?
            </h3>
            <p className="text-xs text-ink/70 dark:text-cream/70 mt-1 font-light">
              Select all that apply. If any critical signs are present, immediate emergency care is
              advised.
            </p>
          </div>

          <fieldset className="flex flex-col gap-2.5 max-h-[340px] overflow-y-auto pr-1">
            <legend className="sr-only">Emergency Red Flags</legend>
            {config.redFlags.map((flag) => {
              const isChecked = selectedRedFlags.includes(flag.id);
              return (
                <label
                  key={flag.id}
                  className={cn(
                    'p-3.5 rounded-xl border text-xs sm:text-sm font-medium flex items-start gap-3 cursor-pointer transition-all',
                    isChecked
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-950 dark:text-red-200 font-semibold shadow-sm ring-1 ring-red-400'
                      : 'border-sand/40 bg-white/70 dark:bg-olive-deep/40 hover:border-sand/80 text-ink/90 dark:text-cream/90 hover:bg-white dark:hover:bg-olive-deep/60',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleRedFlag(flag.id)}
                    className="mt-0.5 h-4 w-4 rounded border-sand/60 text-red-600 focus:ring-red-500 accent-red-600 shrink-0"
                  />
                  <span>{flag.label}</span>
                </label>
              );
            })}
          </fieldset>

          <div className="pt-2 border-t border-sand/30 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setStep('intro')}
              className="px-4 py-2.5 rounded-xl border border-sand/50 text-olive-deep dark:text-cream text-xs font-semibold hover:bg-sand/20 transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleRedFlagSubmit}
              className={cn(
                'px-6 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 shadow-sm',
                selectedRedFlags.length > 0
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-md'
                  : 'bg-orange text-ink hover:bg-orange-soft shadow-warm-glow',
              )}
            >
              <span>
                {selectedRedFlags.length > 0
                  ? 'Proceed with Emergency Notice'
                  : 'None of These — Next Step'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 3: GUIDED QUESTIONS */}
      {step === 'questions' && currentQuestion && (
        <div className="flex flex-col gap-6">
          {/* Progress Bar & Header */}
          <div>
            <div className="flex items-center justify-between text-xs text-orange-deep dark:text-sand font-semibold uppercase tracking-wider mb-2">
              <span>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
            </div>
            <div
              className="w-full h-1.5 bg-sand/30 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={currentQuestionIndex + 1}
              aria-valuemin={1}
              aria-valuemax={totalQuestions}
            >
              <div
                className="h-full bg-orange transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                }}
              />
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-orange-deep dark:text-sand font-semibold block mb-1">
              {currentQuestion.title}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-olive-deep dark:text-cream">
              {currentQuestion.prompt}
            </h3>
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="sr-only">{currentQuestion.prompt}</legend>
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                  className={cn(
                    'w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all duration-200 flex items-center justify-between focus-visible:ring-2 focus-visible:ring-orange',
                    isSelected
                      ? 'border-orange bg-sand/40 dark:bg-olive-deep/70 text-olive-deep dark:text-cream font-semibold ring-1 ring-orange shadow-sm'
                      : 'border-sand/40 bg-white/80 dark:bg-olive-deep/30 hover:border-sand hover:bg-white dark:hover:bg-olive-deep/50 text-ink dark:text-cream',
                  )}
                >
                  <span>{option.label}</span>
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3',
                      isSelected ? 'border-orange bg-orange' : 'border-sand/60',
                    )}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-ink" />}
                  </div>
                </button>
              );
            })}
          </fieldset>

          <div className="pt-2 border-t border-sand/30 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBackQuestion}
              className="px-4 py-2 rounded-xl border border-sand/50 text-olive-deep dark:text-cream text-xs font-semibold hover:bg-sand/20 transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 4: TRIAGE RESULT */}
      {step === 'result' && (
        <div
          role={triageResult.urgency === 'emergency' ? 'alert' : 'region'}
          aria-label="Triage Assessment Result"
          className="flex flex-col gap-6"
        >
          {/* Result Card */}
          <div
            className={cn(
              'p-6 sm:p-7 rounded-3xl border shadow-xl flex flex-col gap-5 text-cream relative overflow-hidden',
              triageResult.urgency === 'emergency'
                ? 'bg-red-950 border-red-500/60'
                : 'bg-olive-deep border-sand/40',
            )}
          >
            {/* Header with Urgency Badge & Icon */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  {getUrgencyIcon(triageResult.urgency)}
                </div>
                <div>
                  <span
                    className={cn(
                      'inline-block text-[11px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full border mb-1',
                      getUrgencyBadgeColor(triageResult.urgency),
                    )}
                  >
                    {triageResult.urgencyDetails.badge}
                  </span>
                  <h3
                    ref={resultHeadingRef}
                    tabIndex={-1}
                    className="font-display text-xl sm:text-2xl font-bold text-cream outline-none"
                  >
                    {triageResult.urgencyDetails.title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-sm text-cream/90 leading-relaxed font-light">
              {triageResult.urgencyDetails.subtitle}
            </p>

            {/* Red Flags Triggered List if any */}
            {triageResult.triggeredRedFlags.length > 0 && (
              <div className="p-3.5 rounded-xl bg-red-900/50 border border-red-500/40 flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-300">
                  Identified Critical Warning Signs:
                </span>
                <ul className="text-xs text-red-100 list-disc list-inside space-y-1 font-light">
                  {triageResult.triggeredRedFlags.map((flag, idx) => (
                    <li key={idx}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Clinical Guidance Checklist */}
            <div className="p-4 rounded-2xl bg-olive/40 border border-sand/20 flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sand">
                Recommended Actions:
              </span>
              <ul className="text-xs text-cream/85 space-y-1.5 font-light">
                {triageResult.urgencyDetails.guidance.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {triageResult.urgency === 'emergency' ? (
                <>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Emergency: {siteConfig.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-olive-deep/90 hover:bg-olive/60 text-cream border border-sand/40 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-sand" />
                    <span>WhatsApp</span>
                  </a>
                </>
              ) : (
                <>
                  <Link
                    href="/book"
                    className="flex-1 py-3 px-4 rounded-xl bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-warm-glow transition-all"
                  >
                    <Calendar className="w-4 h-4 text-ink" />
                    <span>{triageResult.urgencyDetails.actionPrimary}</span>
                  </Link>

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-olive/40 hover:bg-olive/60 text-cream border border-sand/40 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-sand" />
                    <span>Consult on WhatsApp</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Hospital Location Summary */}
          <div className="p-3.5 rounded-xl bg-white/70 dark:bg-olive-deep/40 border border-sand/40 flex items-center justify-between text-xs text-ink/75 dark:text-cream/75">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-deep shrink-0" />
              <span>{siteConfig.address}</span>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-olive font-semibold hover:text-orange-deep underline shrink-0 ml-2"
            >
              Directions
            </a>
          </div>

          {/* Disclaimer & Start Over */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-sand/30">
            <p className="text-[11px] text-ink/60 dark:text-cream/60 italic max-w-sm">
              * {config.disclaimer}
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl border border-sand/50 text-olive-deep dark:text-cream text-xs font-semibold hover:bg-sand/20 transition-all flex items-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start Over</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
