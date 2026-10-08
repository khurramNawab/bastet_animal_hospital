import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { FloatingActions } from '@/components/ui/FloatingActions';
import { getSiteConfig } from '@/lib/data';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Best Vet Hospital in Kolkata | Bastet Small Animal Hospital',
  description:
    'Bastet Small Animal Hospital in Kolkata offers premier 24x7 veterinary care, advanced surgery, dog dermatology, dental care, and diagnostics.',
  metadataBase: new URL('https://bastetsmallanimalhospital.com'),
  keywords: [
    'Veterinary Hospital Kolkata',
    'Best Dog Hospital Kolkata',
    'Pet Surgery Park Street',
    '24x7 Animal Emergency Kolkata',
    'Dog Clinic Kolkata',
  ],
  authors: [{ name: 'Bastet Small Animal Hospital' }],
  openGraph: {
    title: 'Bastet Small Animal Hospital | Premier Veterinary Care in Kolkata',
    description:
      'Where every paw gets royal care. 24x7 emergency, dedicated surgeons, and modern diagnostics in Kolkata.',
    siteName: 'Bastet Small Animal Hospital',
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B3C3F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteConfig = getSiteConfig();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-ink antialiased selection:bg-gold selection:text-ink">
        <SmoothScroll>
          <Navbar siteConfig={siteConfig} />
          <div id="main-content" className="flex-1 pt-20">
            {children}
          </div>
          <Footer siteConfig={siteConfig} />
          <FloatingActions siteConfig={siteConfig} />
        </SmoothScroll>
      </body>
    </html>
  );
}
