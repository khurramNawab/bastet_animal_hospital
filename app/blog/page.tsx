import React from 'react';
import type { Metadata } from 'next';
import { getBlogPosts, getSiteConfig } from '@/lib/data';
import { PageHero } from '@/components/sections/PageHero';
import { BlogCard } from '@/components/blog/BlogCard';
import { CrossDivider } from '@/components/ui/CrossDivider';

export const metadata: Metadata = {
  title: 'Pet Care Guides & Veterinary Health Tips | Bastet Small Animal Hospital Kolkata',
  description:
    'Evidence-based pet health guides, canine vaccination timelines, monsoon wellness, tick fever prevention, and emergency triage advice from Kolkata veterinarians.',
  alternates: {
    canonical: 'https://bastetsmallanimalhospital.com/blog',
  },
  openGraph: {
    title: 'Pet Care Guides & Veterinary Health Tips | Bastet Small Animal Hospital',
    description:
      'Evidence-based pet health guides, canine vaccination timelines, and emergency triage advice from Kolkata veterinarians.',
    url: 'https://bastetsmallanimalhospital.com/blog',
    siteName: 'Bastet Small Animal Hospital',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const siteConfig = getSiteConfig();

  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <main className="min-h-screen pb-24">
      {/* Shared Page Hero with single SEO h1 */}
      <PageHero
        title="Pet Health & Clinical Guides"
        subtitle={`Reliable veterinary insights, seasonal care protocols, and preventative guidelines crafted by the clinical team at ${siteConfig.name}, Kolkata.`}
        badge="Clinical Knowledge Base"
        breadcrumbs={[{ label: 'Pet Health Blog', href: '/blog' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" aria-label="Article categories">
          <span className="px-4 py-2 rounded-full bg-orange text-ink text-xs font-bold font-heading shadow-warm-glow">
            All Guides ({posts.length})
          </span>
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 rounded-full bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 text-ink/75 dark:text-cream/75 text-xs font-semibold font-heading"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Bottom Cross Divider */}
        <CrossDivider variant="cross" className="mt-16" />
      </div>
    </main>
  );
}
