import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, MapPin, Clock, Mail, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { CrossDivider } from '@/components/ui/CrossDivider';
import type { SiteConfig } from '@/lib/types';

interface FooterProps {
  siteConfig: SiteConfig;
}

export function Footer({ siteConfig }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-olive-deep text-cream pt-16 pb-10 border-t border-sand/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand & Tagline */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Logo />
            </div>
            <p className="text-sm text-cream/80 font-body leading-relaxed font-light">
              {siteConfig.tagline}. Providing world-class clinical, surgical, and emergency
              veterinary care in {siteConfig.city}.
            </p>
            <div className="flex items-center gap-2 text-xs text-sand font-semibold font-heading">
              <ShieldCheck className="w-4 h-4 text-orange shrink-0" />
              <span>Registered & Certified Veterinary Hospital</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sand font-heading text-lg font-bold tracking-wide">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm text-cream/80 font-body">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-sand hover:underline underline-offset-4 transition-colors duration-150 inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hospital Timings */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sand font-heading text-lg font-bold tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange" />
              Hospital Timings
            </h3>
            <ul className="space-y-2 text-sm text-cream/80 font-body">
              <li className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-sand/80 font-bold font-heading">
                  General OPD
                </span>
                <span>{siteConfig.timings.weekdays}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-sand/80 font-bold font-heading">
                  Sunday Clinic
                </span>
                <span>{siteConfig.timings.sunday}</span>
              </li>
              <li className="flex flex-col pt-1">
                <span className="text-xs uppercase tracking-wider text-sand font-bold font-heading flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange animate-ping" />
                  Emergency Trauma
                </span>
                <span className="text-orange-soft font-semibold font-heading">{siteConfig.timings.emergency}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Emergency WhatsApp */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sand font-heading text-lg font-bold tracking-wide">
              Contact & Location
            </h3>
            <ul className="space-y-2.5 text-sm text-cream/80 font-body">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange mt-1 shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange shrink-0" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="hover:text-sand transition-colors font-semibold"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-sand transition-colors break-all"
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-orange hover:bg-orange-soft text-ink font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-warm-glow font-heading"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Instant Help</span>
              </a>
            </div>
          </div>
        </div>

        {/* Cross & Paw Divider */}
        <CrossDivider variant="cross" className="mt-12 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/60 font-body">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px] text-cream/70">
              <Link href="/privacy-policy" className="hover:text-sand transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-sand transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/medical-disclaimer" className="hover:text-sand transition-colors">
                Medical Disclaimer
              </Link>
            </div>
          </div>
          <p className="text-center md:text-right text-[11px]">
            {siteConfig.credits?.model3D ? (
              <span>
                3D model:{' '}
                <a
                  href={siteConfig.credits.model3D.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sand/90 hover:underline"
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
