import React from 'react';
import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { getBlogPosts, getSiteConfig } from '@/lib/data';
import { BlogCard } from '@/components/blog/BlogCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
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
    <main className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'Pet Health Blog' }]} />
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand/30 dark:bg-olive-deep/70 border border-sand/60 text-orange-deep dark:text-sand text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange" />
          <span>Clinical Knowledge Base</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-olive-deep dark:text-cream tracking-tight mb-4">
          Pet Health & Care Guides
        </h1>

        <p className="text-base sm:text-lg text-ink/80 dark:text-cream/80 leading-relaxed font-light">
          Reliable veterinary insights, seasonal care protocols, and preventative guidelines
          crafted by the clinical team at {siteConfig.name}, Kolkata.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12" aria-label="Article categories">
        <span className="px-4 py-2 rounded-2xl bg-orange text-ink text-xs font-semibold shadow-warm-glow">
          All Guides ({posts.length})
        </span>
        {categories.map((cat) => (
          <span
            key={cat}
            className="px-4 py-2 rounded-2xl glass border border-sand/40 text-ink/75 dark:text-cream/75 text-xs font-medium"
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
      <CrossDivider variant="paws" className="mt-16 mb-8" />
    </main>
  );
}
