import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { FloatingActions } from '@/components/ui/FloatingActions';
import { PawCursor } from '@/components/ui/PawCursor';
import { SiteLoader } from '@/components/ui/SiteLoader';
import { getSiteConfig } from '@/lib/data';
import { getHospitalJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Best Vet Hospital in Kolkata | Bastet Small Animal Hospital',
  description:
    'Bastet Small Animal Hospital in Kolkata offers premier 24x7 veterinary care, advanced surgery, dog dermatology, dental care, and diagnostics.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bastetsmallanimalhospital.com'),
  keywords: [
    'Veterinary Hospital Kolkata',
    'Best Dog Hospital Kolkata',
    'Pet Surgery Rash Behari Avenue',
    '24x7 Animal Emergency Kolkata',
    'Dog Clinic Kolkata',
    'Pet Clinic Near Park Street',
    'Dog Vaccination Kolkata',
  ],
  authors: [{ name: 'Bastet Small Animal Hospital' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/brand/logo.avif', type: 'image/avif' },
    ],
    shortcut: '/icon.svg',
    apple: '/brand/logo.avif',
  },
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF6E5' },
    { media: '(prefers-color-scheme: dark)', color: '#2B3318' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteConfig = getSiteConfig();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bastetsmallanimalhospital.com';
  const hospitalJsonLd = getHospitalJsonLd(siteConfig, baseUrl);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${dmSans.variable}`}
    >
      <head>
        {/* Anti-FOUC Theme Initialization Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bastet_theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        {/* VeterinaryCare Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(hospitalJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-ink dark:bg-olive-deep dark:text-cream antialiased selection:bg-sand selection:text-ink transition-colors duration-300">
        <ThemeProvider>
          <SmoothScroll>
            <SiteLoader />
            <PawCursor />
            <Navbar siteConfig={siteConfig} />
            <div id="main-content" className="flex-1 pt-20">
              {children}
            </div>
            <Footer siteConfig={siteConfig} />
            <FloatingActions siteConfig={siteConfig} />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
