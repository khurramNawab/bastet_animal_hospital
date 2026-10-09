import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Activity,
  Sparkles,
  Scissors,
  HeartPulse,
  Microscope,
  Home,
  CheckCircle,
  Clock,
  Calendar,
} from 'lucide-react';
import { getAnimals, getAnimalBySlug, getServicesByAnimal } from '@/lib/data';
import { PageHero } from '@/components/sections/PageHero';
import { WaitlistForm } from '@/components/sections/WaitlistForm';
import { CrossDivider } from '@/components/ui/CrossDivider';

interface ServicePageProps {
  params: {
    animal: string;
  };
}

export function generateStaticParams() {
  const animals = getAnimals();
  return animals.map((animal) => ({
    animal: animal.slug,
  }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const animal = getAnimalBySlug(params.animal);

  if (!animal) {
    return {
      title: 'Services Not Found | Bastet Small Animal Hospital',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bastetsmallanimalhospital.com';
  const url = `${baseUrl}/services/${animal.slug}`;

  if (animal.comingSoon) {
    return {
      title: `${animal.name} Care Coming Soon | Bastet Small Animal Hospital`,
      description: `Join the VIP waitlist for ${animal.name.toLowerCase()} veterinary services, specialized clinical facilities, and emergency care in Kolkata.`,
      robots: {
        index: false,
        follow: false,
      },
      alternates: {
        canonical: url,
      },
    };
  }

  return {
    title: `${animal.name} Veterinary Services in Kolkata | Bastet Hospital`,
    description: `Complete medical specialities, surgery, dermatology, 24x7 trauma, and wellness care for ${animal.name.toLowerCase()} in Rash Behari Avenue, Kolkata.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${animal.name} Veterinary Services | Bastet Hospital Kolkata`,
      description: `Complete medical specialities and wellness care for ${animal.name.toLowerCase()} in Kolkata.`,
      url,
      siteName: 'Bastet Small Animal Hospital',
      locale: 'en_IN',
      type: 'website',
    },
  };
}

export default function AnimalServicesPage({ params }: ServicePageProps) {
  const animal = getAnimalBySlug(params.animal);

  if (!animal) {
    notFound();
  }

  const services = getServicesByAnimal(animal.slug);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-orange" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-orange" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-orange" />;
      case 'Scissors':
        return <Scissors className="w-6 h-6 text-orange" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-orange" />;
      case 'Microscope':
        return <Microscope className="w-6 h-6 text-orange" />;
      case 'Home':
        return <Home className="w-6 h-6 text-orange" />;
      default:
        return <Activity className="w-6 h-6 text-orange" />;
    }
  };

  return (
    <main className="min-h-screen pb-24">
      {/* PageHero with single SEO h1 */}
      <PageHero
        title={`${animal.name} Care & Disciplines`}
        subtitle={animal.heroLine || animal.tagline}
        badge={animal.comingSoon ? 'Expansion Wing' : 'Clinical Specialities'}
        breadcrumbs={[
          { label: 'Clinical Services', href: '/services' },
          { label: `${animal.name} Care` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        {!animal.comingSoon ? (
          /* Active Species: Full Clinical Detail Sections */
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {services.map((service, idx) => (
                <section
                  key={service.id}
                  id={service.slug}
                  className={`scroll-mt-28 p-8 sm:p-10 rounded-3xl border border-sand/50 shadow-glass backdrop-blur-md transition-all ${
                    idx % 2 === 0
                      ? 'bg-cream/90 dark:bg-olive-deep/90'
                      : 'bg-sand/20 dark:bg-olive-950/70'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                    {/* Left info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-olive-deep text-sand flex items-center justify-center border border-sand/40 shadow-sm shrink-0">
                          {getIcon(service.icon)}
                        </div>
                        <div>
                          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-olive-deep dark:text-cream">
                            {service.title}
                          </h2>
                          {service.duration && (
                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-deep dark:text-sand mt-1 font-heading">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Estimated Duration: {service.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-ink/85 dark:text-cream/85 leading-relaxed font-body mb-6">
                        {service.longDescription || service.description}
                      </p>

                      {/* Features list */}
                      {service.features && service.features.length > 0 && (
                        <div className="pt-2">
                          <h3 className="text-xs uppercase tracking-widest text-orange-deep dark:text-sand font-bold font-heading mb-3">
                            Key Clinical Highlights
                          </h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-body">
                            {service.features.map((feature, fIdx) => (
                              <li
                                key={fIdx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/80 dark:text-cream/80"
                              >
                                <CheckCircle className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Right CTA */}
                    <div className="w-full lg:w-auto flex lg:flex-col items-center justify-center shrink-0 pt-4 lg:pt-0">
                      <Link
                        href={`/book?service=${service.slug}&animal=${animal.slug}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider shadow-warm-glow transition-all font-heading"
                      >
                        <Calendar className="w-4 h-4 text-ink" />
                        <span>Book Consultation</span>
                      </Link>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <CrossDivider variant="cross" className="py-8" />
          </div>
        ) : (
          /* Coming Soon Species: Waitlist Section */
          <div className="max-w-2xl mx-auto py-6">
            <WaitlistForm animal={animal} />
            <CrossDivider variant="cross" className="py-12" />
          </div>
        )}
      </div>
    </main>
  );
}
