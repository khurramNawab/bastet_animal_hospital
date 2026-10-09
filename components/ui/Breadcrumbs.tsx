import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbsJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import type { BreadcrumbItem } from '@/lib/types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bastetsmallanimalhospital.com';

  const fullItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    ...items,
  ];

  const jsonLd = getBreadcrumbsJsonLd(fullItems, baseUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <nav aria-label="Breadcrumbs" className={`py-3 ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink/70 dark:text-cream/70">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;

            return (
              <li key={index} className="inline-flex items-center gap-1.5">
                {index === 0 ? (
                  <Link
                    href={item.href || '/'}
                    className="inline-flex items-center gap-1 hover:text-gold dark:hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded"
                    title="Bastet Home"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span className="sr-only">Home</span>
                  </Link>
                ) : !isLast && item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-gold dark:hover:text-gold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-teal dark:text-gold font-semibold truncate max-w-[200px] sm:max-w-xs"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}

                {!isLast && (
                  <ChevronRight className="w-3.5 h-3.5 text-gold/60 shrink-0" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
