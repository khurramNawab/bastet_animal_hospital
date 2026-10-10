'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
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
        return <AlertCircle className="w-6 h-6 text-danger" />;
      case 'today':
        return <Clock className="w-6 h-6 text-orange-deep" />;
      case 'soon':
        return <Calendar className="w-6 h-6 text-brown-deep dark:text-sand" />;
      case 'monitor':
        return <CheckCircle2 className="w-6 h-6 text-olive-deep dark:text-olive-soft" />;
    }
  };

  const getUrgencyCardStyles = (urgency: TriageUrgency) => {
    switch (urgency) {
      case 'emergency':
        return {
          card: 'bg-danger/10 dark:bg-danger-deep/30 border-danger/40 text-ink dark:text-cream',
          badge: 'bg-danger/20 text-danger border-danger/30',
          guidanceBox: 'bg-danger/15 border-danger/20 text-ink dark:text-cream',
        };
      case 'today':
        return {
          card: 'bg-orange/15 dark:bg-orange-deep/20 border-orange/40 text-ink dark:text-cream',
          badge: 'bg-orange/25 text-orange-deep dark:text-sand border-orange/40',
          guidanceBox: 'bg-orange/10 border-orange/20 text-ink dark:text-cream',
        };
      case 'soon':
        return {
          card: 'bg-sand/30 dark:bg-brown-deep/20 border-sand/60 text-ink dark:text-cream',
          badge: 'bg-sand/50 text-brown-deep dark:text-sand border-sand/70',
          guidanceBox: 'bg-sand/20 border-sand/40 text-ink dark:text-cream',
        };
      case 'monitor':
        return {
          card: 'bg-olive/15 dark:bg-olive-deep/40 border-olive/30 text-ink dark:text-cream',
          badge: 'bg-olive/25 text-olive-deep dark:text-sand border-olive/40',
          guidanceBox: 'bg-olive/10 border-olive/20 text-ink dark:text-cream',
        };
    }
  };

  const urgencyStyles = getUrgencyCardStyles(triageResult.urgency);

  return (
    <div className="w-full flex flex-col gap-6 text-ink dark:text-cream">
      {/* SCREEN 1: INTRO & CONSENT */}
      {step === 'intro' && (
        <div className="flex flex-col gap-6 py-2">
          <div className="p-5 rounded-2xl bg-sand/30 dark:bg-olive-950/60 border border-sand/50 flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-orange-deep shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-base text-olive-deep dark:text-sand mb-1">
                Clinical Triage Guidance
              </h3>
              <p className="text-xs text-ink/80 dark:text-cream/80 leading-relaxed font-body">
                {config.disclaimer}
              </p>
            </div>
          </div>

          <p className="text-sm text-ink/80 dark:text-cream/80 leading-relaxed font-body">
            This rapid assessment evaluates critical symptoms to help you determine whether your pet
            needs immediate emergency stabilization, same-day consultation, or monitored home care.
          </p>

          <div className="p-4 rounded-xl bg-white/70 dark:bg-olive-950/40 border border-sand/40 text-xs text-ink/70 dark:text-cream/70 flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-olive-deep dark:text-sand font-heading">
              <HelpCircle className="w-4 h-4 text-orange-deep" />
              <span>Safety & Disclaimer Notice</span>
            </div>
            <p className="leading-relaxed font-body">
              <strong>Mandatory notice: This is not a diagnosis.</strong> Answers are processed securely in your browser to guide immediate scheduling urgency.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setStep('redflags')}
            className="w-full py-3.5 px-6 rounded-2xl bg-orange hover:bg-orange-soft text-ink font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-warm-glow focus-visible:ring-2 focus-visible:ring-orange-deep font-heading uppercase tracking-wider"
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
            <span className="text-xs uppercase tracking-widest text-danger font-bold flex items-center gap-1.5 mb-1 font-heading">
              <AlertCircle className="w-4 h-4 text-danger" />
              <span>Critical Priority Screening</span>
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-olive-deep dark:text-cream">
              Is your dog experiencing any of these right now?
            </h3>
            <p className="text-xs text-ink/70 dark:text-cream/70 mt-1 font-body">
              Select all that apply. If any critical signs are present, immediate emergency care is advised.
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
                      ? 'border-danger bg-danger/10 text-danger font-semibold shadow-sm ring-1 ring-danger'
                      : 'border-sand/50 bg-white/70 dark:bg-olive-950/40 hover:border-sand text-ink/90 dark:text-cream/90 hover:bg-white dark:hover:bg-olive-950/70',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleRedFlag(flag.id)}
                    className="mt-0.5 h-4 w-4 rounded border-sand/60 text-danger focus:ring-danger accent-danger shrink-0"
                  />
                  <span className="font-body">{flag.label}</span>
                </label>
              );
            })}
          </fieldset>

          <div className="pt-2 border-t border-sand/30 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setStep('intro')}
              className="px-4 py-2.5 rounded-xl border border-sand/60 text-olive-deep dark:text-cream text-xs font-semibold hover:bg-sand/20 transition-all flex items-center gap-1.5 font-heading"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleRedFlagSubmit}
              className={cn(
                'px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm font-heading',
                selectedRedFlags.length > 0
                  ? 'bg-danger text-white hover:bg-danger-deep shadow-md'
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
            <div className="flex items-center justify-between text-xs text-orange-deep dark:text-sand font-bold uppercase tracking-wider mb-2 font-heading">
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
            <span className="text-xs uppercase tracking-widest text-orange-deep dark:text-sand font-bold font-heading block mb-1">
              {currentQuestion.title}
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-olive-deep dark:text-cream">
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
                    'w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all duration-150 flex items-center justify-between focus-visible:ring-2 focus-visible:ring-orange-deep font-body',
                    isSelected
                      ? 'border-orange bg-sand/40 dark:bg-olive-950/70 text-olive-deep dark:text-cream font-semibold ring-1 ring-orange shadow-sm'
                      : 'border-sand/50 bg-white/80 dark:bg-olive-950/30 hover:border-sand hover:bg-white dark:hover:bg-olive-950/60 text-ink dark:text-cream',
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
              className="px-4 py-2 rounded-xl border border-sand/60 text-olive-deep dark:text-cream text-xs font-semibold hover:bg-sand/20 transition-all flex items-center gap-1.5 font-heading"
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
          {/* Result Card styled with token mapping */}
          <div
            className={cn(
              'p-6 sm:p-7 rounded-3xl border shadow-xl flex flex-col gap-5 relative overflow-hidden backdrop-blur-md',
              urgencyStyles.card,
            )}
          >
            {/* Header with Urgency Badge & Icon */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/40 dark:bg-black/20 backdrop-blur-md border border-sand/40">
                  {getUrgencyIcon(triageResult.urgency)}
                </div>
                <div>
                  <span
                    className={cn(
                      'inline-block text-[11px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full border mb-1 font-heading',
                      urgencyStyles.badge,
                    )}
                  >
                    {triageResult.urgencyDetails.badge}
                  </span>
                  <h3
                    ref={resultHeadingRef}
                    tabIndex={-1}
                    className="font-heading text-xl sm:text-2xl font-extrabold text-olive-deep dark:text-cream outline-none"
                  >
                    {triageResult.urgencyDetails.title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed font-body">
              {triageResult.urgencyDetails.subtitle}
            </p>

            {/* Red Flags Triggered List if any */}
            {triageResult.triggeredRedFlags.length > 0 && (
              <div className="p-3.5 rounded-xl bg-danger/15 border border-danger/30 flex flex-col gap-1.5 text-danger dark:text-orange">
                <span className="text-xs font-bold uppercase tracking-wider font-heading">
                  Identified Critical Warning Signs:
                </span>
                <ul className="text-xs list-disc list-inside space-y-1 font-body">
                  {triageResult.triggeredRedFlags.map((flag, idx) => (
                    <li key={idx}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Clinical Guidance Checklist */}
            <div className={cn('p-4 rounded-2xl border flex flex-col gap-2', urgencyStyles.guidanceBox)}>
              <span className="text-xs font-bold uppercase tracking-wider font-heading">
                Recommended Action Protocol:
              </span>
              <ul className="text-xs space-y-1.5 font-body">
                {triageResult.urgencyDetails.guidance.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mandatory Disclaimer Badge */}
            <div className="p-3 rounded-xl bg-sand/20 dark:bg-black/20 border border-sand/40 text-[11px] font-semibold text-olive-deep dark:text-sand flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-orange shrink-0" />
              <span>Mandatory Notice: This is not a diagnosis. Always consult a veterinary surgeon.</span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {triageResult.urgency === 'emergency' ? (
                <>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-danger hover:bg-danger-deep text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all font-heading"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Emergency: {siteConfig.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-olive-deep hover:bg-olive text-cream border border-sand/40 font-bold text-xs flex items-center justify-center gap-2 transition-all font-heading uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4 text-sand" />
                    <span>WhatsApp</span>
                  </a>
                </>
              ) : (
                <>
                  <Link
                    href="/book"
                    className="flex-1 py-3 px-4 rounded-xl bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-warm-glow transition-all font-heading"
                  >
                    <Calendar className="w-4 h-4 text-ink" />
                    <span>{triageResult.urgencyDetails.actionPrimary}</span>
                  </Link>

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-olive-deep hover:bg-olive text-cream border border-sand/40 font-bold text-xs flex items-center justify-center gap-2 transition-all font-heading uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4 text-sand" />
                    <span>Consult on WhatsApp</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Hospital Location Summary */}
          <div className="p-3.5 rounded-xl bg-white/70 dark:bg-olive-950/40 border border-sand/50 flex items-center justify-between text-xs text-ink/75 dark:text-cream/75">
            <div className="flex items-center gap-2 font-body">
              <MapPin className="w-4 h-4 text-orange-deep shrink-0" />
              <span>{siteConfig.address}</span>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-deep dark:text-sand font-bold hover:underline shrink-0 ml-2 font-heading"
            >
              Directions
            </a>
          </div>

          {/* Disclaimer & Start Over */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-sand/30">
            <p className="text-[11px] text-ink/60 dark:text-cream/60 italic max-w-sm font-body">
              * {config.disclaimer}
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl border border-sand/60 text-olive-deep dark:text-cream text-xs font-semibold hover:bg-sand/20 transition-all flex items-center gap-1.5 shrink-0 font-heading"
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
