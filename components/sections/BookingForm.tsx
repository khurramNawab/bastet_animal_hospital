'use client';

import React, { useState, useEffect, useId } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Phone,
  Calendar,
  Clock,
  User,
  Heart,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  MessageSquare,
  Sparkles,
  ShieldCheck,
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
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handleNextToStep3 = () => {
    if (validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 150, behavior: 'smooth' });
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
      window.scrollTo({ top: 150, behavior: 'smooth' });
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
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
      {/* 24/7 Emergency Notice Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-red-950/80 border border-red-500/50 text-cream flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg backdrop-blur-md">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-red-200 block sm:inline mr-2">
              Critical Emergency?
            </span>
            <span className="text-cream/90 font-light">
              Do not wait for an online form confirmation. Call our 24/7 Trauma line immediately.
            </span>
          </div>
        </div>

        <a
          href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all shadow-md"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call 24/7: {siteConfig.phone}</span>
        </a>
      </div>

      {/* Main Glass Form Container */}
      <div className="p-6 sm:p-10 rounded-3xl glass-card border border-gold/30 shadow-glass relative overflow-hidden">
        {step < 4 && (
          <>
            {/* Step Progress Tracker */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gold-dark mb-2">
                <span>Step {step} of 3</span>
                <span>
                  {step === 1 && 'Patient Details'}
                  {step === 2 && 'Service & Schedule'}
                  {step === 3 && 'Review & Confirm'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-gold/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-teal">
                Request an Appointment
              </h2>
              <p className="text-xs sm:text-sm text-ink/75 font-light mt-1">
                All online submissions are requests. Our staff will contact you via phone or
                WhatsApp to confirm your slot.
              </p>
            </div>
          </>
        )}

        {/* STEP 1: PET & PARENT INFORMATION */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Owner Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arindam Mukherjee"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl bg-white border text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 transition-all text-sm',
                    fieldErrors.ownerName
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gold/40 focus:border-gold focus:ring-gold/30',
                  )}
                />
                {fieldErrors.ownerName && (
                  <p className="text-[11px] text-red-600 mt-1">{fieldErrors.ownerName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">
                  Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98300 12345"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl bg-white border text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 transition-all text-sm',
                    fieldErrors.phone
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gold/40 focus:border-gold focus:ring-gold/30',
                  )}
                />
                {fieldErrors.phone && (
                  <p className="text-[11px] text-red-600 mt-1">{fieldErrors.phone}</p>
                )}
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">
                  Email Address <span className="text-ink/40 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/40 text-ink placeholder:text-ink/30 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all text-sm"
                />
              </div>

              {/* Pet Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">
                  Pet&apos;s Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leo"
                  value={formData.petName}
                  onChange={(e) => handleInputChange('petName', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl bg-white border text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 transition-all text-sm',
                    fieldErrors.petName
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gold/40 focus:border-gold focus:ring-gold/30',
                  )}
                />
                {fieldErrors.petName && (
                  <p className="text-[11px] text-red-600 mt-1">{fieldErrors.petName}</p>
                )}
              </div>

              {/* Breed */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">
                  Breed <span className="text-ink/40 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Golden Retriever / Desi Dog"
                  value={formData.breed}
                  onChange={(e) => handleInputChange('breed', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/40 text-ink placeholder:text-ink/30 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all text-sm"
                />
              </div>

              {/* Pet Age */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">
                  Pet&apos;s Age <span className="text-ink/40 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3 years"
                  value={formData.petAge}
                  onChange={(e) => handleInputChange('petAge', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gold/40 text-ink placeholder:text-ink/30 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Step 1 Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNextToStep2}
                className="py-3 px-8 rounded-2xl bg-teal text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-teal-800 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>Continue to Service & Date</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SERVICE, DOCTOR, DATE & TIME */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            {/* Service Selection Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">
                Clinical Service <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                className={cn(
                  'w-full px-4 py-3 rounded-xl bg-white border text-ink focus:outline-none focus:ring-2 transition-all text-sm font-medium',
                  fieldErrors.service
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gold/40 focus:border-gold focus:ring-gold/30',
                )}
              >
                <option value="">-- Choose a Service --</option>
                {services.map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
              {fieldErrors.service && (
                <p className="text-[11px] text-red-600 mt-1">{fieldErrors.service}</p>
              )}
            </div>

            {/* Doctor Preference */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">
                Preferred Doctor <span className="text-ink/40 font-normal lowercase">(optional)</span>
              </label>
              <select
                value={formData.doctor}
                onChange={(e) => handleInputChange('doctor', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gold/40 text-ink focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all text-sm font-medium"
              >
                <option value="no-preference">No Preference (First Available Specialist)</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.slug}>
                    {d.name} ({d.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">
                Appointment Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                min={minDate}
                max={maxDate}
                value={formData.date}
                onChange={(e) => {
                  handleInputChange('date', e.target.value);
                  handleInputChange('time', ''); // Reset selected time on date change
                }}
                className={cn(
                  'w-full px-4 py-3 rounded-xl bg-white border text-ink focus:outline-none focus:ring-2 transition-all text-sm font-medium',
                  fieldErrors.date
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gold/40 focus:border-gold focus:ring-gold/30',
                )}
              />
              {fieldErrors.date && (
                <p className="text-[11px] text-red-600 mt-1">{fieldErrors.date}</p>
              )}
            </div>

            {/* Time Slot Chips Grid */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-teal mb-2">
                Preferred Time Slot <span className="text-red-500">*</span>
              </label>

              {timeSlots.length === 0 ? (
                <p className="text-xs text-ink/60 italic p-3 rounded-xl bg-teal/5 border border-gold/20">
                  The clinic is closed on this date. Please pick another day.
                </p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.time === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.isAvailable}
                        onClick={() => handleInputChange('time', slot.time)}
                        className={cn(
                          'p-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 flex flex-col items-center justify-center',
                          !slot.isAvailable
                            ? 'opacity-30 bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : isSelected
                            ? 'border-gold bg-gold text-ink shadow-gold-glow ring-2 ring-gold'
                            : 'border-gold/30 bg-white hover:border-gold hover:bg-gold/10 text-teal',
                        )}
                      >
                        <span>{slot.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {fieldErrors.time && (
                <p className="text-[11px] text-red-600 mt-1.5">{fieldErrors.time}</p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-6 rounded-xl border border-gold/40 text-teal font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold/15 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextToStep3}
                className="py-3 px-8 rounded-2xl bg-teal text-cream font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-teal-800 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>Review Request</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: REVIEW SUMMARY & SUBMIT */}
        {step === 3 && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            {/* Summary Review Card */}
            <div className="p-6 rounded-2xl bg-teal-900 text-cream border border-gold/40 shadow-xl flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
                Appointment Summary
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-cream/60 block">Pet Parent:</span>
                  <span className="font-semibold text-cream text-sm">{formData.ownerName}</span>
                </div>

                <div>
                  <span className="text-cream/60 block">Contact:</span>
                  <span className="font-semibold text-cream text-sm">{formData.phone}</span>
                </div>

                <div>
                  <span className="text-cream/60 block">Patient:</span>
                  <span className="font-semibold text-cream text-sm">
                    {formData.petName} {formData.breed ? `(${formData.breed})` : ''}
                  </span>
                </div>

                <div>
                  <span className="text-cream/60 block">Service:</span>
                  <span className="font-semibold text-gold text-sm">
                    {selectedServiceObj?.title || formData.service}
                  </span>
                </div>

                <div>
                  <span className="text-cream/60 block">Scheduled Date & Time:</span>
                  <span className="font-semibold text-cream text-sm">
                    {formData.date} at {formData.time}
                  </span>
                </div>

                <div>
                  <span className="text-cream/60 block">Specialist:</span>
                  <span className="font-semibold text-cream text-sm">
                    {selectedDoctorObj ? selectedDoctorObj.name : 'First Available Doctor'}
                  </span>
                </div>
              </div>
            </div>

            {/* Special Instructions / Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-teal mb-1.5">
                Special Notes or Medical History{' '}
                <span className="text-ink/40 font-normal lowercase">(optional)</span>
              </label>
              <textarea
                rows={3}
                maxLength={500}
                placeholder="Any existing symptoms, dietary restrictions, or previous vaccination records..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gold/40 text-ink placeholder:text-ink/30 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition-all text-sm"
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
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => handleInputChange('consent', e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gold/40 text-teal focus:ring-gold accent-teal shrink-0"
                />
                <span className="text-xs text-ink/80 dark:text-cream/80 leading-relaxed font-light">
                  I agree to be contacted via telephone or WhatsApp regarding this appointment
                  request. I have reviewed the{' '}
                  <Link href="/terms" target="_blank" className="text-gold font-semibold underline underline-offset-2 hover:text-gold-light">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" target="_blank" className="text-gold font-semibold underline underline-offset-2 hover:text-gold-light">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {fieldErrors.consent && (
                <p className="text-[11px] text-red-600 mt-1">{fieldErrors.consent}</p>
              )}
            </div>

            {submitError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Navigation & Submit Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={isSubmitting}
                className="py-3 px-6 rounded-xl border border-gold/40 text-teal font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold/15 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3.5 px-8 rounded-2xl bg-gold hover:bg-gold-light text-ink font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Appointment Request</span>
                    <ArrowRight className="w-4 h-4" />
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
            <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-gold shadow-gold-glow animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-gold" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold block mb-1">
                Request ID: {requestCode}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-teal">
                Appointment Request Received!
              </h2>
              <p className="text-sm text-ink/80 font-light mt-2 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="font-semibold text-teal">{formData.ownerName}</strong>.
                Our medical reception team has received your request for{' '}
                <strong className="font-semibold text-teal">{formData.petName}</strong> on{' '}
                <strong className="font-semibold text-teal">
                  {formData.date} at {formData.time}
                </strong>
                .
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-teal/5 border border-gold/30 text-xs text-ink/75 max-w-md text-left flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-teal block mb-0.5">Confirmation Protocol</span>
                <p className="leading-relaxed">
                  We will contact you via phone or WhatsApp within operating hours to finalize and
                  confirm your consultation.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 rounded-2xl bg-teal hover:bg-teal-800 text-cream font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 text-gold" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setFormData((prev) => ({ ...prev, petName: '', time: '', message: '' }));
                }}
                className="py-3.5 px-6 rounded-2xl border border-gold/40 hover:bg-gold/15 text-teal font-semibold text-xs uppercase tracking-wider transition-all"
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
