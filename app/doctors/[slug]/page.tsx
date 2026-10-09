import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Stethoscope,
  Globe,
  GraduationCap,
  Calendar,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import { getDoctors, getDoctorBySlug, getSiteConfig } from '@/lib/data';
import { getDoctorJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { GoldDivider } from '@/components/ui/GoldDivider';

interface DoctorPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const doctors = getDoctors();
  return doctors.map((doc) => ({
    slug: doc.slug,
  }));
}

export function generateMetadata({ params }: DoctorPageProps): Metadata {
  const doctor = getDoctorBySlug(params.slug);

  if (!doctor) {
    return {
      title: 'Doctor Not Found | Bastet Small Animal Hospital',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bastetsmallanimalhospital.com';

  return {
    title: `${doctor.name}, ${doctor.role} in Kolkata | Bastet Hospital`,
    description: `Consult ${doctor.name} at Bastet Small Animal Hospital Kolkata. Specialized in ${doctor.specialties?.slice(0, 2).join(', ')} with ${doctor.yearsOfExperience}+ years clinical experience.`,
    alternates: {
      canonical: `${baseUrl}/doctors/${doctor.slug}`,
    },
    openGraph: {
      title: `${doctor.name} | Veterinary Specialist at Bastet Hospital Kolkata`,
      description: doctor.bio,
      url: `${baseUrl}/doctors/${doctor.slug}`,
      siteName: 'Bastet Small Animal Hospital',
      locale: 'en_IN',
      type: 'profile',
    },
  };
}

export default function DoctorProfilePage({ params }: DoctorPageProps) {
  const doctor = getDoctorBySlug(params.slug);

  if (!doctor) {
    notFound();
  }

  const siteConfig = getSiteConfig();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bastetsmallanimalhospital.com';
  const jsonLd = getDoctorJsonLd(doctor, siteConfig, baseUrl);

  return (
    <>
      {/* Person Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: 'Doctors', href: '/doctors' },
              { label: doctor.name },
            ]}
          />
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Portrait & Quick Stats */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-t-[100px] rounded-b-3xl overflow-hidden border-2 border-gold/40 shadow-2xl bg-teal-900">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />

            {/* Experience overlay */}
            <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal/90 border border-gold/50 text-gold text-xs font-semibold backdrop-blur-md shadow-lg">
              <Award className="w-4 h-4" />
              <span>{doctor.yearsOfExperience}+ Years Experience</span>
            </div>
          </div>

          <div className="mt-8 w-full max-w-sm">
            <Link
              href={`/book?doctor=${doctor.slug}`}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gold text-ink font-semibold text-xs uppercase tracking-wider shadow-gold-glow hover:bg-gold-light hover:shadow-gold-glow-lg transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with {doctor.name.split(' ')[1]}</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Bio, Qualifications & Specialties */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-gold-dark" />
            <span>Senior Clinical Staff</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-teal tracking-tight mb-2">
            {doctor.name}
          </h1>

          <p className="text-base sm:text-lg font-medium text-gold-dark mb-4">{doctor.role}</p>

          {/* Qualifications & Languages Strip */}
          <div className="w-full p-4 rounded-2xl bg-teal/5 border border-gold/20 flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-8">
            {doctor.qualifications && (
              <div className="flex items-center gap-2 text-xs text-ink/85">
                <GraduationCap className="w-4 h-4 text-gold shrink-0" />
                <span className="font-medium">{doctor.qualifications}</span>
              </div>
            )}

            {doctor.languages && (
              <div className="flex items-center gap-2 text-xs text-ink/85">
                <Globe className="w-4 h-4 text-gold shrink-0" />
                <span>Languages: {doctor.languages.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Full Biography */}
          <div className="prose max-w-none text-ink/80 leading-relaxed font-light text-sm sm:text-base space-y-4 mb-8">
            <p className="font-normal text-teal">{doctor.bio.replace('\n', ' ')}</p>
            {doctor.longBio && <p>{doctor.longBio}</p>}
          </div>

          {/* Specialties Grid */}
          {doctor.specialties && doctor.specialties.length > 0 && (
            <div className="w-full pt-4 border-t border-gold/20">
              <h2 className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-4">
                Clinical Focus & Areas of Mastery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doctor.specialties.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/70 border border-gold/30 text-xs sm:text-sm font-medium text-teal flex items-center gap-2.5 shadow-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <GoldDivider className="mt-16" variant="ankh-pattern" />
    </main>
    </>
  );
}
