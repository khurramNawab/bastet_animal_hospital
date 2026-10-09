import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Globe,
  GraduationCap,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { getDoctors, getDoctorBySlug, getSiteConfig } from '@/lib/data';
import { getDoctorJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { CrossDivider } from '@/components/ui/CrossDivider';

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

      <main className="min-h-screen pb-24">
        {/* PageHero with single SEO h1 */}
        <PageHero
          title={doctor.name}
          subtitle={`${doctor.role} • Bastet Small Animal Hospital, Kolkata`}
          badge={`${doctor.yearsOfExperience}+ Years Clinical Mastery`}
          breadcrumbs={[
            { label: 'Medical Team', href: '/doctors' },
            { label: doctor.name },
          ]}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Arch Portrait & Booking CTA */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-t-[120px] rounded-b-3xl overflow-hidden border-2 border-sand/50 shadow-2xl bg-olive-deep">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />

                {/* Experience badge */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-olive-deep/90 border border-sand/50 text-sand text-xs font-semibold backdrop-blur-md shadow-lg font-heading">
                  <Award className="w-4 h-4 text-orange" />
                  <span>{doctor.yearsOfExperience}+ Years Experience</span>
                </div>
              </div>

              <div className="mt-6 w-full max-w-sm">
                <Link
                  href={`/book?doctor=${doctor.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider shadow-warm-glow transition-all font-heading"
                >
                  <Calendar className="w-4 h-4 text-ink" />
                  <span>Book with {doctor.name.split(' ')[1] || doctor.name}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Bio, Qualifications & Specialties */}
            <div className="lg:col-span-7 flex flex-col items-start p-6 sm:p-8 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 shadow-glass backdrop-blur-md">
              <span className="text-xs uppercase tracking-widest text-orange-deep dark:text-sand font-bold font-heading mb-1">
                Clinical Specialist Profile
              </span>

              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-olive-deep dark:text-cream mb-1">
                {doctor.name}
              </h2>

              <p className="text-base font-semibold text-orange-deep dark:text-sand mb-5 font-heading">
                {doctor.role}
              </p>

              {/* Qualifications & Languages Strip */}
              <div className="w-full p-4 rounded-2xl bg-sand/20 dark:bg-olive-950/60 border border-sand/40 flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-6 font-body">
                {doctor.qualifications && (
                  <div className="flex items-center gap-2 text-xs text-ink/85 dark:text-cream/85">
                    <GraduationCap className="w-4 h-4 text-orange-deep shrink-0" />
                    <span className="font-semibold font-heading">{doctor.qualifications}</span>
                  </div>
                )}

                {doctor.languages && (
                  <div className="flex items-center gap-2 text-xs text-ink/85 dark:text-cream/85">
                    <Globe className="w-4 h-4 text-olive shrink-0" />
                    <span>Languages: {doctor.languages.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Full Biography */}
              <div className="prose max-w-none text-ink/80 dark:text-cream/80 leading-relaxed font-body text-sm sm:text-base space-y-4 mb-6">
                <p>{doctor.bio.replace('\n', ' ')}</p>
                {doctor.longBio && <p>{doctor.longBio}</p>}
              </div>

              {/* Specialties Grid */}
              {doctor.specialties && doctor.specialties.length > 0 && (
                <div className="w-full pt-4 border-t border-sand/30">
                  <h3 className="text-xs uppercase tracking-widest text-orange-deep dark:text-sand font-bold font-heading mb-4">
                    Clinical Focus & Areas of Mastery
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {doctor.specialties.map((spec, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white/70 dark:bg-olive-950/40 border border-sand/50 text-xs sm:text-sm font-medium text-olive-deep dark:text-cream flex items-center gap-2.5 shadow-sm font-body"
                      >
                        <CheckCircle className="w-4 h-4 text-orange shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <CrossDivider className="mt-16" variant="cross" />
        </div>
      </main>
    </>
  );
}
