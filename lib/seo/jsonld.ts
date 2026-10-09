import type { SiteConfig, ServiceItem, Doctor, BlogPost, BreadcrumbItem } from '@/lib/types';

/**
 * XSS-safe serialization for JSON-LD script blocks.
 * Safely escapes '<', '>', and '&' characters to prevent script injection.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

/**
 * Generates VeterinaryCare Schema.org JSON-LD structured data.
 * STRICT: Excludes fake AggregateRating/Review schemas to comply with Google Search policies.
 */
export function getHospitalJsonLd(siteConfig: SiteConfig, baseUrl: string) {
  const openingHoursSpec = Object.entries(siteConfig.openingHours || {}).map(([dayKey, dayData]) => {
    const dayMap: Record<string, string> = {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday',
    };

    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: dayMap[dayKey] || dayKey,
      opens: dayData.open,
      closes: dayData.close,
    };
  });

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: baseUrl,
    logo: `${baseUrl}/images/Bastetanimalhospital.avif`,
    image: `${baseUrl}/images/Bastetanimalhospital.avif`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: 'West Bengal',
      addressCountry: 'IN',
    },
    openingHoursSpecification: openingHoursSpec,
  };

  if (siteConfig.emergencyNote) {
    schema.specialOpeningHoursSpecification = {
      '@type': 'OpeningHoursSpecification',
      description: siteConfig.emergencyNote,
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    };
  }

  return schema;
}

/**
 * Generates Service Schema.org JSON-LD structured data.
 */
export function getServiceJsonLd(service: ServiceItem, siteConfig: SiteConfig, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'VeterinaryCare',
      name: siteConfig.name,
      url: baseUrl,
    },
    areaServed: {
      '@type': 'City',
      name: siteConfig.city,
    },
    url: `${baseUrl}/services/dog#${service.slug}`,
  };
}

/**
 * Generates Person (Veterinarian) Schema.org JSON-LD structured data.
 */
export function getDoctorJsonLd(doctor: Doctor, siteConfig: SiteConfig, baseUrl: string) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: doctor.name,
    jobTitle: doctor.role,
    description: doctor.bio,
    image: `${baseUrl}${doctor.image}`,
    worksFor: {
      '@type': 'VeterinaryCare',
      name: siteConfig.name,
      url: baseUrl,
    },
    url: `${baseUrl}/doctors/${doctor.slug}`,
  };

  if (doctor.languages && doctor.languages.length > 0) {
    schema.knowsLanguage = doctor.languages;
  }

  return schema;
}

/**
 * Generates BlogPosting Schema.org JSON-LD structured data.
 */
export function getBlogPostingJsonLd(post: BlogPost, siteConfig: SiteConfig, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: `${siteConfig.name} Clinical Care Team`,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/Bastetanimalhospital.avif`,
      },
    },
    mainEntityOfPage: `${baseUrl}/blog/${post.slug}`,
  };
}

/**
 * Generates BreadcrumbList Schema.org JSON-LD structured data.
 */
export function getBreadcrumbsJsonLd(items: BreadcrumbItem[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };
}
