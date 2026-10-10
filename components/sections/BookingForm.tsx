'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  MessageSquare,
  ShieldCheck,
  Clock,
  User,
  CalendarDays,
  FileCheck,
} from 'lucide-react';
import { normalizeIndianPhone } from '@/lib/schemas/booking';
import { generateTimeSlots, getDateConstraints } from '@/lib/booking/slots';
import { buildWhatsAppBookingUrl } from '@/lib/booking/whatsapp';
import { cn } from '@/lib/cn';
import type { SiteConfig, ServiceItem, Doctor, AnimalCategory } from '@/lib/types';

interface BookingFormProps {
  siteConfig: SiteConfig;
  services: ServiceItem[];
  doctors: Doctor[];
  animals: AnimalCategory[];
}

interface FormState {
  ownerName: string;
  phone: string;
  email: string;
  animal: string;
  petName: string;
  breed: string;
  petAge: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  message: string;
  consent: boolean;
  hp: string;
}

export function BookingForm({ siteConfig, services, doctors, animals }: BookingFormProps) {
  const searchParams = useSearchParams();

  // Constraints for date picker
  const { minDate, maxDate } = getDateConstraints(siteConfig);

  // Form State
  const [formData, setFormData] = useState<FormState>({
    ownerName: '',
    phone: '',
    email: '',
    animal: 'dog',
    petName: '',
    breed: '',
    petAge: '',
    service: '',
    doctor: 'no-preference',
    date: minDate,
    time: '',
    message: '',
    consent: false,
    hp: '',
  });

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [requestCode, setRequestCode] = useState<string>('');

  // Prefill from Query Params on load
  useEffect(() => {
    const qService = searchParams.get('service');
    const qDoctor = searchParams.get('doctor');
    const qAnimal = searchParams.get('animal');

    setFormData((prev) => ({
      ...prev,
      service: qService && services.some((s) => s.slug === qService) ? qService : prev.service || (services[0]?.slug ?? ''),
      doctor: qDoctor && doctors.some((d) => d.slug === qDoctor) ? qDoctor : prev.doctor,
      animal: qAnimal && animals.some((a) => a.slug === qAnimal) ? qAnimal : prev.animal,
    }));
  }, [searchParams, services, doctors, animals]);

  // Generate available time slots for selected date
  const timeSlots = generateTimeSlots(formData.date, siteConfig);

  const handleInputChange = (
    field: keyof FormState,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Step 1 Validation
  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.ownerName.trim() || formData.ownerName.trim().length < 2) {
      errors.ownerName = 'Please enter your full name (minimum 2 characters)';
    }

    if (!normalizeIndianPhone(formData.phone)) {
      errors.phone = 'Enter a valid 10-digit Indian mobile number (e.g. 9830012345)';
    }

    if (!formData.petName.trim()) {
      errors.petName = "Please enter your pet's name";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.service) {
      errors.service = 'Please select a clinical discipline or service';
    }

    if (!formData.date) {
      errors.date = 'Please select an appointment date';
    }

    if (!formData.time) {
      errors.time = 'Please select a preferred time slot';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextToStep2 = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleNextToStep3 = () => {
    if (validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.consent) {
      setFieldErrors((prev) => ({
        ...prev,
        consent: 'You must agree to be contacted to confirm this appointment request',
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || 'Failed to submit appointment request. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setRequestCode(data.requestCode || 'BST-REQ');
      setStep(4);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch {
      setSubmitError('Network error. Please check your connection or contact our clinic directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceObj = services.find((s) => s.slug === formData.service);
  const selectedDoctorObj = doctors.find((d) => d.slug === formData.doctor);

  const whatsAppUrl = buildWhatsAppBookingUrl({
    ownerName: formData.ownerName,
    petName: formData.petName,
    serviceTitle: selectedServiceObj?.title || 'General Consultation',
    date: formData.date,
    time: formData.time,
    requestCode,
    whatsappNumber: siteConfig.whatsapp,
  });

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      {/* 24/7 Emergency Notice Banner using Danger Tokens */}
      <div className="p-4 sm:p-5 rounded-2xl bg-danger/10 dark:bg-danger-deep/30 border border-danger/30 text-ink dark:text-cream flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm backdrop-blur-md">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-danger dark:text-orange block sm:inline mr-2">
              Critical Emergency?
            </span>
            <span className="text-ink/80 dark:text-cream/90 font-light">
              Do not wait for an online form confirmation. Call our 24/7 Trauma line immediately.
            </span>
          </div>
        </div>

        <a
          href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
          className="px-4 py-2 rounded-full bg-danger hover:bg-danger-deep text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-danger"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call 24/7: {siteConfig.phone}</span>
        </a>
      </div>

      {/* Main Glass Form Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass relative overflow-hidden backdrop-blur-md">
        {step < 4 && (
          <>
            {/* Step Progress Tracker with Orange Connector Line */}
            <div className="mb-8">
              <div className="flex items-center justify-between gap-2 mb-3">
                {[
                  { num: 1, label: 'Patient Info', icon: User },
                  { num: 2, label: 'Service & Time', icon: CalendarDays },
                  { num: 3, label: 'Confirm', icon: FileCheck },
                ].map((s, idx) => {
                  const isActive = step === s.num;
                  const isDone = step > s.num;
                  const StepIcon = s.icon;
                  return (
                    <div key={s.num} className="flex-1 flex flex-col items-center">
                      <div className="flex items-center w-full">
                        {idx > 0 && (
                          <div
                            className={cn(
                              'h-0.5 flex-1 transition-colors duration-300',
                              step >= s.num ? 'bg-orange' : 'bg-sand/40 dark:bg-olive-900',
                            )}
                          />
                        )}
                        <div
                          className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0',
                            isActive
                              ? 'bg-orange text-ink ring-4 ring-orange/20 shadow-warm-glow'
                              : isDone
                              ? 'bg-olive text-cream'
                              : 'bg-sand/30 dark:bg-olive-950 text-ink/70 dark:text-cream/70 border border-sand/40',
                          )}
                        >
                          <StepIcon className="w-3.5 h-3.5" />
                        </div>
                        {idx < 2 && (
                          <div
                            className={cn(
                              'h-0.5 flex-1 transition-colors duration-300',
                              step > s.num ? 'bg-orange' : 'bg-sand/40 dark:bg-olive-900',
                            )}
                          />
                        )}
                      </div>
                      <span
                        className={cn(
                          'text-[10px] sm:text-xs font-heading font-semibold uppercase tracking-wider mt-1.5',
                          isActive
                            ? 'text-orange-deep dark:text-sand font-bold'
                            : isDone
                            ? 'text-olive dark:text-sand/80'
                            : 'text-ink/70 dark:text-cream/70',
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-olive-deep dark:text-cream">
                {step === 1 && 'Patient & Guardian Details'}
                {step === 2 && 'Select Service & Preferred Slot'}
                {step === 3 && 'Review Consultation Request'}
              </h2>
              <p className="text-xs sm:text-sm text-ink/75 dark:text-cream/75 font-body mt-1">
                All submissions are appointment requests. Our clinic reception will call or WhatsApp you to confirm.
              </p>
            </div>
          </>
        )}

        {/* STEP 1: PET & PARENT INFORMATION */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Owner Name */}
              <div>
                <label htmlFor="booking-owner-name" className="block text-xs font-semibold uppercase tracking-wider text-olive-deep dark:text-sand mb-1.5 font-heading">
                  Guardian / Full Name <span className="text-danger">*</span>
                </label>
                <input
                  id="booking-owner-name"
                  name="ownerName"
                  type="text"
                  required
                  placeholder="e.g. Arindam Mukherjee"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl bg-white dark:bg-olive-950 border text-ink dark:text-cream placeholder:text-ink/30 focus:outline-none focus:ring-2 transition-all text-sm font-body',
                    fieldErrors.ownerName
                      ? 'border-danger focus:ring-danger/30'
                      : 'border-sand/60 focus:border-orange-deep focus:ring-orange/30',
                  )}
                />
                {fieldErrors.ownerName && (
                  <p className="text-[11px] text-danger mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.ownerName}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="booking-phone" className="block text-xs font-semibold uppercase tracking-wider text-olive-deep dark:text-sand mb-1.5 font-heading">
                  Mobile Number (WhatsApp) <span className="text-danger">*</span>
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="e.g. 98300 12345"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl bg-white dark:bg-olive-950 border text-ink dark:text-cream placeholder:text-ink/30 focus:outline-none focus:ring-2 transition-all text-sm font-body',
                    fieldErrors.phone
                      ? 'border-danger focus:ring-danger/30'
                      : 'border-sand/60 focus:border-orange-deep focus:ring-orange/30',
                  )}
                />
                {fieldErrors.phone && (
                  <p className="text-[11px] text-danger mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              {/* Email (Optional) */}
              <div>
                <label htmlFor="booking-email" className="block text-xs font-semibold uppercase tracking-wider text-olive-deep dark:text-sand mb-1.5 font-heading">
                  Email Address <span className="text-ink/70 dark:text-cream/70 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-olive-950 border border-sand/60 text-ink dark:text-cream placeholder:text-ink/30 focus:border-orange-deep focus:ring-2 focus:ring-orange/30 outline-none transition-all text-sm font-body"
                />
              </div>

              {/* Pet Name */}
              <div>
                <label htmlFor="booking-pet-name" className="block text-xs font-semibold uppercase tracking-wider text-olive-deep dark:text-sand mb-1.5 font-heading">
                  Pet&apos;s Name <span className="text-danger">*</span>
                </label>
                <input
                  id="booking-pet-name"
                  name="petName"
                  type="text"
                  required
                  placeholder="e.g. Bruno"
                  value={formData.petName}
                  onChange={(e) => handleInputChange('petName', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl bg-white dark:bg-olive-950 border text-ink dark:text-cream placeholder:text-ink/30 focus:outline-none focus:ring-2 transition-all text-sm font-body',
                    fieldErrors.petName
                      ? 'border-danger focus:ring-danger/30'
                      : 'border-sand/60 focus:border-orange-deep focus:ring-orange/30',
                  )}
                />
                {fieldErrors.petName && (
                  <p className="text-[11px] text-danger mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.petName}
                  </p>
                )}
              </div>

              {/* Species / Animal */}
              <div>
                <label htmlFor="booking-species-select" className="block text-xs font-semibold uppercase tracking-wider text-olive-deep dark:text-sand mb-1.5 font-heading">
                  Species <span className="text-danger">*</span>
                </label>
                <select
                  id="booking-species-select"
                  name="animal"
                  aria-label="Select Animal Species"
                  value={formData.animal}
                  onChange={(e) => handleInputChange('animal', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-olive-950 border border-sand/60 text-ink dark:text-cream focus:border-orange-deep focus:ring-2 focus:ring-orange/30 outline-none transition-all text-sm font-body capitalize"
                >
                  {animals.map((a) => (
                    <option key={a.id} value={a.slug} disabled={a.comingSoon}>
                      {a.name} {a.comingSoon ? '(Coming Soon)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Breed */}
              <div>
                <label htmlFor="booking-breed" className="block text-xs font-semibold uppercase tracking-wider text-olive-deep dark:text-sand mb-1.5 font-heading">
                  Breed <span className="text-ink/70 dark:text-cream/70 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="booking-breed"
                  name="breed"
                  type="text"
                  placeholder="e.g. Labrador / Indie / Persian"
                  value={formData.breed}
                  onChange={(e) => handleInputChange('breed', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-olive-950 border border-sand/60 text-ink dark:text-cream placeholder:text-ink/30 focus:border-orange-deep focus:ring-2 focus:ring-orange/30 outline-none transition-all text-sm font-body"
                />
              </div>
            </div>

            {/* Step 1 Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNextToStep2}
                className="py-3 px-8 rounded-full bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-warm-glow focus-visible:ring-2 focus-visible:ring-orange-deep"
              >
                <span>Continue to Service & Date</span>
                <ArrowRight className="w-4 h-4 text-ink" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SERVICE, DOCTOR, DATE & TIME */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            className="flex flex-col gap-5"
          >
            {/* Service Selection */}
            <div>
              <label htmlFor="booking-service-select" className="block text-xs font-semibold uppercase tracking-wider text-olive-deep dark:text-sand mb-1.5 font-heading">
                Clinical Discipline <span className="text-danger">*</span>
              </label>
              <select
                id="booking-service-select"
                name="service"
                aria-label="Select Clinical Service"
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                className={cn(
                  'w-full px-4 py-3 rounded-xl bg-white dark:bg-olive-950 border text-ink dark:text-cream focus:outline-none focus:ring-2 transition-all text-sm font-body font-medium',
                  fieldErrors.service
                    ? 'border-danger focus:ring-danger/30'
                    : 'border-sand/60 focus:border-orange-deep focus:ring-orange/30',
                )}
              >
                <option value="">-- Choose a Clinical Service --</option>
                {services.map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
              {fieldErrors.service && (
                <p className="text-[11px] text-danger mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.service}
                </p>
              )}
            </div>

            {/* Doctor Preference */}
            <div>
              <label htmlFor="booking-doctor-select" className="block text-xs font-semibold uppercase tracking-wider text-olive-deep dark:text-sand mb-1.5 font-heading">
                Preferred Specialist <span className="text-ink/70 dark:text-cream/70 font-normal lowercase">(optional)</span>
              </label>
              <select
                id="booking-doctor-select"
                name="doctor"
                aria-label="Select Preferred Doctor"
                value={formData.doctor}
                onChange={(e) => handleInputChange('doctor', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-olive-950 border border-sand/60 text-ink dark:text-cream focus:border-orange-deep focus:ring-2 focus:ring-orange/30 outline-none transition-all text-sm font-body font-medium"
              >
                <option value="no-preference">No Preference (First Available Specialist)</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.slug}>
                    {d.name} — {d.role}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label htmlFor="booking-date-input" className="block text-xs font-semibold uppercase tracking-wider text-olive-deep dark:text-sand mb-1.5 font-heading">
                Appointment Date <span className="text-danger">*</span>
              </label>
              <input
                id="booking-date-input"
                name="date"
                type="date"
                aria-label="Select Appointment Date"
                min={minDate}
                max={maxDate}
                value={formData.date}
                onChange={(e) => {
                  handleInputChange('date', e.target.value);
                  handleInputChange('time', '');
                }}
                className={cn(
                  'w-full px-4 py-3 rounded-xl bg-white dark:bg-olive-950 border text-ink dark:text-cream focus:outline-none focus:ring-2 transition-all text-sm font-body font-medium',
                  fieldErrors.date
                    ? 'border-danger focus:ring-danger/30'
                    : 'border-sand/60 focus:border-orange-deep focus:ring-orange/30',
                )}
              />
              {fieldErrors.date && (
                <p className="text-[11px] text-danger mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.date}
                </p>
              )}
            </div>

            {/* Time Slot Chips Grid */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-olive-deep dark:text-sand mb-2 font-heading">
                Preferred Time Slot <span className="text-danger">*</span>
              </span>

              {timeSlots.length === 0 ? (
                <p className="text-xs text-ink/60 dark:text-cream/60 italic p-3 rounded-xl bg-sand/20 border border-sand/30 font-body">
                  The clinic is closed on this date. Please select another day.
                </p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.time === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        aria-label={`Time slot ${slot.label}`}
                        disabled={!slot.isAvailable}
                        onClick={() => handleInputChange('time', slot.time)}
                        className={cn(
                          'p-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 flex flex-col items-center justify-center font-heading',
                          !slot.isAvailable
                            ? 'opacity-35 bg-sand/10 dark:bg-olive-950/40 text-ink/30 dark:text-cream/30 border-sand/20 line-through cursor-not-allowed'
                            : isSelected
                            ? 'border-orange-deep bg-orange text-ink font-bold shadow-warm-glow ring-2 ring-orange-deep'
                            : 'border-sand/60 bg-cream/50 dark:bg-olive-950/60 hover:border-orange hover:bg-orange/10 text-ink dark:text-cream',
                        )}
                      >
                        <Clock className="w-3 h-3 mb-0.5 opacity-60" />
                        <span>{slot.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {fieldErrors.time && (
                <p className="text-[11px] text-danger mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.time}
                </p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-6 rounded-full border border-sand/60 text-olive-deep dark:text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-sand/20 transition-all font-heading"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextToStep3}
                className="py-3 px-8 rounded-full bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-warm-glow focus-visible:ring-2 focus-visible:ring-orange-deep font-heading"
              >
                <span>Review Request</span>
                <ArrowRight className="w-4 h-4 text-ink" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: REVIEW SUMMARY & SUBMIT */}
        {step === 3 && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            className="flex flex-col gap-5"
          >
            {/* Summary Review Card */}
            <div className="p-6 rounded-2xl bg-olive-deep text-cream border border-sand/40 shadow-xl flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-sand font-bold font-heading block">
                Appointment Summary
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-body">
                <div>
                  <span className="text-cream/60 block">Pet Guardian:</span>
                  <span className="font-semibold text-cream text-sm font-heading">{formData.ownerName}</span>
                </div>

                <div>
                  <span className="text-cream/60 block">Contact Phone:</span>
                  <span className="font-semibold text-cream text-sm font-heading">{formData.phone}</span>
                </div>

                <div>
                  <span className="text-cream/60 block">Patient Details:</span>
                  <span className="font-semibold text-cream text-sm font-heading">
                    {formData.petName} ({formData.animal}{formData.breed ? ` • ${formData.breed}` : ''})
                  </span>
                </div>

                <div>
                  <span className="text-cream/60 block">Clinical Discipline:</span>
                  <span className="font-semibold text-orange text-sm font-heading">
                    {selectedServiceObj?.title || formData.service}
                  </span>
                </div>

                <div>
                  <span className="text-cream/60 block">Scheduled Date & Time:</span>
                  <span className="font-semibold text-cream text-sm font-heading">
                    {formData.date} at {formData.time}
                  </span>
                </div>

                <div>
                  <span className="text-cream/60 block">Specialist:</span>
                  <span className="font-semibold text-cream text-sm font-heading">
                    {selectedDoctorObj ? selectedDoctorObj.name : 'First Available Doctor'}
                  </span>
                </div>
              </div>
            </div>

            {/* Special Instructions / Message */}
            <div>
              <label htmlFor="booking-message" className="block text-xs font-semibold uppercase tracking-wider text-olive-deep dark:text-sand mb-1.5 font-heading">
                Special Notes / Symptoms{' '}
                <span className="text-ink/70 dark:text-cream/70 font-normal lowercase font-body">(optional)</span>
              </label>
              <textarea
                id="booking-message"
                name="message"
                rows={3}
                maxLength={500}
                placeholder="Any existing symptoms, dietary restrictions, or medical history..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-olive-950 border border-sand/60 text-ink dark:text-cream placeholder:text-ink/30 focus:border-orange-deep focus:ring-2 focus:ring-orange/30 outline-none transition-all text-sm font-body"
              />
            </div>

            {/* Honeypot field (hidden from real users) */}
            <input
              type="text"
              name="hp"
              value={formData.hp}
              onChange={(e) => handleInputChange('hp', e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Consent Checkbox */}
            <div>
              <label htmlFor="booking-consent" className="flex items-start gap-3 cursor-pointer">
                <input
                  id="booking-consent"
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => handleInputChange('consent', e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-sand/60 text-orange-deep focus:ring-orange-deep accent-orange shrink-0"
                />
                <span className="text-xs text-ink/80 dark:text-cream/80 leading-relaxed font-body">
                  I agree to be contacted via telephone or WhatsApp regarding this appointment
                  request. I have reviewed the{' '}
                  <Link href="/terms" target="_blank" className="text-orange-deep dark:text-orange font-semibold underline underline-offset-2 hover:text-orange">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" target="_blank" className="text-orange-deep dark:text-orange font-semibold underline underline-offset-2 hover:text-orange">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {fieldErrors.consent && (
                <p className="text-[11px] text-danger mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.consent}
                </p>
              )}
            </div>

            {submitError && (
              <div className="p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Navigation & Submit Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={isSubmitting}
                className="py-3 px-6 rounded-full border border-sand/60 text-olive-deep dark:text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-sand/20 transition-all font-heading"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3.5 px-8 rounded-full bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-warm-glow transition-all disabled:opacity-60 font-heading"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-ink" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Appointment Request</span>
                    <ArrowRight className="w-4 h-4 text-ink" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION SCREEN */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-6 gap-6"
          >
            {/* Animated Orange Check SVG */}
            <div className="w-20 h-20 rounded-full bg-orange/20 border-2 border-orange flex items-center justify-center text-orange shadow-warm-glow">
              <CheckCircle2 className="w-10 h-10 text-orange animate-bounce" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-orange-deep dark:text-sand font-bold font-heading block mb-1">
                Request ID: {requestCode}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-olive-deep dark:text-cream">
                Request Received!
              </h2>
              <p className="text-sm text-ink/80 dark:text-cream/80 font-body mt-2 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="font-semibold text-olive-deep dark:text-cream">{formData.ownerName}</strong>.
                We have received your appointment request for{' '}
                <strong className="font-semibold text-olive-deep dark:text-cream">{formData.petName}</strong> on{' '}
                <strong className="font-semibold text-olive-deep dark:text-cream">
                  {formData.date} at {formData.time}
                </strong>
                .
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sand/20 dark:bg-olive-950/60 border border-sand/40 text-xs text-ink/85 dark:text-cream/85 max-w-md text-left flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-orange shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-olive-deep dark:text-sand block mb-0.5 font-heading">
                  Confirmation Protocol
                </span>
                <p className="leading-relaxed font-body">
                  Request received. We&apos;ll confirm shortly via phone or WhatsApp during clinical operating hours.
                </p>
              </div>
            </div>

            {/* Actions: Confirm on WhatsApp + Book Another */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 rounded-full bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-warm-glow transition-all font-heading"
              >
                <MessageSquare className="w-4 h-4 text-ink" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setFormData((prev) => ({ ...prev, petName: '', time: '', message: '' }));
                }}
                className="py-3.5 px-6 rounded-full border border-sand/60 hover:bg-sand/20 text-olive-deep dark:text-cream font-semibold text-xs uppercase tracking-wider transition-all font-heading"
              >
                <span>Book Another</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
