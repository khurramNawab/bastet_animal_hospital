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
  ArrowLeft,
} from 'lucide-react';
import { getAnimals, getAnimalBySlug, getServicesByAnimal } from '@/lib/data';
import { WaitlistForm } from '@/components/sections/WaitlistForm';
import { GoldDivider } from '@/components/ui/GoldDivider';

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

  if (animal.comingSoon) {
    return {
      title: `${animal.name} Care Coming Soon | Bastet Small Animal Hospital`,
      description: `Join the VIP waitlist for ${animal.name.toLowerCase()} veterinary services, specialized clinical facilities, and emergency care in Kolkata.`,
    };
  }

  return {
    title: `${animal.name} Veterinary Services in Kolkata | Bastet Hospital`,
    description: `Complete medical specialities, surgery, dermatology, 24x7 trauma, and wellness care for ${animal.name.toLowerCase()} in Park Street, Kolkata.`,
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
        return <ShieldCheck className="w-6 h-6 text-gold" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-gold" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-gold" />;
      case 'Scissors':
        return <Scissors className="w-6 h-6 text-gold" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-gold" />;
      case 'Microscope':
        return <Microscope className="w-6 h-6 text-gold" />;
      case 'Home':
        return <Home className="w-6 h-6 text-gold" />;
      default:
        return <Activity className="w-6 h-6 text-gold" />;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb / Back Link */}
      <div className="mb-6">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-teal hover:text-gold-dark transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Species & Services</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          {animal.comingSoon ? 'Expansion Wing' : 'Clinical Specialities'}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-teal mt-2">
          {animal.name} Care & Specialities
        </h1>
        <p className="mt-3 text-sm sm:text-base text-ink/80 leading-relaxed font-light">
          {animal.heroLine || animal.tagline}
        </p>
      </div>

      {!animal.comingSoon ? (
        /* Active Species: Full Clinical Detail Sections */
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-10">
            {services.map((service) => (
              <section
                key={service.id}
                id={service.slug}
                className="scroll-mt-28 p-8 sm:p-10 rounded-4xl glass-card border border-gold/30 shadow-glass"
              >
                <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                  {/* Left info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-teal text-gold flex items-center justify-center border border-gold/30 shadow-sm shrink-0">
                        {getIcon(service.icon)}
                      </div>
                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-teal">
                          {service.title}
                        </h2>
                        {service.duration && (
                          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-dark mt-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Estimated Duration: {service.duration}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-ink/85 leading-relaxed font-light mb-6">
                      {service.longDescription || service.description}
                    </p>

                    {/* Features list */}
                    {service.features && service.features.length > 0 && (
                      <div className="pt-2">
                        <h3 className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-3">
                          Key Clinical Highlights
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/80"
                            >
                              <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
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
                      href="/book"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gold text-ink font-semibold text-xs uppercase tracking-wider shadow-gold-glow hover:bg-gold-light transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Consultation</span>
                    </Link>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <GoldDivider className="py-8" />
        </div>
      ) : (
        /* Coming Soon Species: Waitlist Section */
        <div className="max-w-2xl mx-auto py-6">
          <WaitlistForm animal={animal} />
          <GoldDivider className="py-12" />
        </div>
      )}
    </main>
  );
}
