import React from 'react';
import { getSiteConfig } from '@/lib/data';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const siteConfig = getSiteConfig();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          Get in Touch
        </span>
        <h1 className="font-display text-4xl text-teal font-bold mt-2">Contact Bastet Hospital</h1>
        <p className="mt-3 text-ink/80 text-sm">
          We are located at Park Street area in Kolkata with 24x7 emergency coverage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 border border-gold/20 flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-teal">Location Address</h3>
              <p className="text-sm text-ink/80 mt-1">{siteConfig.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-teal">Emergency Phone</h3>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                className="text-sm text-ink/80 hover:text-gold transition-colors block mt-1"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-gold shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-teal">Email Inquiries</h3>
              <p className="text-sm text-ink/80 mt-1">{siteConfig.email}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 border border-gold/20 flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gold shrink-0" />
            <h3 className="font-semibold text-teal">Operating Hours</h3>
          </div>
          <ul className="text-sm text-ink/80 space-y-2 mt-2">
            <li>
              <strong>Weekdays:</strong> {siteConfig.timings.weekdays}
            </li>
            <li>
              <strong>Sunday:</strong> {siteConfig.timings.sunday}
            </li>
            <li className="text-teal font-medium">
              <strong>Emergency:</strong> {siteConfig.timings.emergency}
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
