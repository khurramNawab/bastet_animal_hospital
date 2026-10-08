import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, MapPin, Clock, Mail, ShieldCheck } from 'lucide-react';
import { GoldDivider } from '@/components/ui/GoldDivider';
import type { SiteConfig } from '@/lib/types';

interface FooterProps {
  siteConfig: SiteConfig;
}

export function Footer({ siteConfig }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-900 text-cream pt-16 pb-10 border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand & Tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-teal-800 flex items-center justify-center border border-gold/40 shrink-0">
                <Image
                  src="/images/Bastetanimalhospital.avif"
                  alt="Bastet Small Animal Hospital Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display text-2xl font-bold tracking-wide text-gold">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-cream/80 font-light leading-relaxed">
              {siteConfig.tagline}. Providing world-class clinical, surgical, and emergency
              veterinary care in {siteConfig.city}.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Registered & Certified Veterinary Hospital</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-gold font-display text-lg font-semibold tracking-wide">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm text-cream/80 font-light">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gold hover:underline underline-offset-4 transition-colors duration-150 inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hospital Timings */}
          <div className="flex flex-col gap-3">
            <h3 className="text-gold font-display text-lg font-semibold tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              Hospital Timings
            </h3>
            <ul className="space-y-2 text-sm text-cream/80 font-light">
              <li className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-gold/80 font-medium">
                  General OPD
                </span>
                <span>{siteConfig.timings.weekdays}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-gold/80 font-medium">
                  Sunday Clinic
                </span>
                <span>{siteConfig.timings.sunday}</span>
              </li>
              <li className="flex flex-col pt-1">
                <span className="text-xs uppercase tracking-wider text-gold font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                  Emergency Trauma
                </span>
                <span className="text-gold-light font-medium">{siteConfig.timings.emergency}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Emergency WhatsApp */}
          <div className="flex flex-col gap-3">
            <h3 className="text-gold font-display text-lg font-semibold tracking-wide">
              Contact & Location
            </h3>
            <ul className="space-y-2.5 text-sm text-cream/80 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="hover:text-gold transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-gold transition-colors break-all"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Bastet%20Hospital,%20I%20would%20like%20to%20inquire%20about%20veterinary%20services`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold/15 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-ink transition-all duration-200 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Instant Help</span>
              </a>
            </div>
          </div>
        </div>

        {/* Egyptian Gold Divider */}
        <GoldDivider className="mt-12 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            {siteConfig.credits?.model3D ? (
              <span>
                3D model:{' '}
                <a
                  href={siteConfig.credits.model3D.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold/90 hover:underline"
                >
                  {siteConfig.credits.model3D.title}
                </a>{' '}
                by {siteConfig.credits.model3D.author} ({siteConfig.credits.model3D.license}),{' '}
                {siteConfig.credits.model3D.source}
              </span>
            ) : (
              <span>3D Model Credits: Licensed via Sketchfab</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
