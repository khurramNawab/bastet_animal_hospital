import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, ShieldCheck, AlertCircle, ArrowRight, Tag, PhoneCall, CalendarPlus } from 'lucide-react';
import { getBlogPosts, getBlogPostBySlug, getRelatedPosts, getSiteConfig, getServices } from '@/lib/data';
import { getBlogPostingJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleProgress } from '@/components/blog/ArticleProgress';
import { BlogCard } from '@/components/blog/BlogCard';
import { CrossDivider } from '@/components/ui/CrossDivider';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Article Not Found | Bastet Small Animal Hospital' };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bastetsmallanimalhospital.com';
  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Bastet Small Animal Hospital Kolkata`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: 'Bastet Small Animal Hospital',
      locale: 'en_IN',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const siteConfig = getSiteConfig();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bastetsmallanimalhospital.com';
  const relatedPosts = getRelatedPosts(post.slug, 2);
  const allServices = getServices();
  const relatedServices = allServices.filter((s) => post.relatedServiceSlugs?.includes(s.slug));

  const jsonLd = getBlogPostingJsonLd(post, siteConfig, baseUrl);

  // Extract H2 headings for Table of Contents
  const headings = post.sections
    .filter((sec) => sec.type === 'h2' && sec.content)
    .map((sec, idx) => ({
      id: `section-${idx + 1}`,
      text: sec.content || '',
    }));

  let headingCounter = 0;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      {/* BlogPosting Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      {/* Reading Progress Indicator */}
      <ArticleProgress headings={headings} title={post.title} />

      <main className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
        </div>

        {/* Article Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column (4 cols): Sticky Table of Contents on Desktop */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <ArticleProgress headings={headings} title={post.title} />
          </aside>

          {/* Right Column (8 cols): Main Article Content */}
          <article className="lg:col-span-8 order-1 lg:order-2 max-w-[68ch]">
            {/* Category & Read Time */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sand/30 dark:bg-olive-deep/70 border border-sand/50 text-orange-deep dark:text-sand text-xs font-semibold uppercase tracking-wider">
                <Tag className="w-3 h-3 text-orange-deep dark:text-sand" />
                <span>{post.category}</span>
              </span>

              <span className="inline-flex items-center gap-1 text-xs text-ink/70 dark:text-cream/70">
                <Clock className="w-3.5 h-3.5 text-orange-deep dark:text-sand" />
                <span>{post.readingMinutes} min read</span>
              </span>

              <span className="inline-flex items-center gap-1 text-xs text-ink/70 dark:text-cream/70">
                <Calendar className="w-3.5 h-3.5 text-olive dark:text-sand" />
                <time dateTime={post.publishedAt}>{formattedDate}</time>
              </span>
            </div>

            {/* Article H1 Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-olive-deep dark:text-cream leading-[1.18] mb-6">
              {post.title}
            </h1>

            {/* Author Credit */}
            <div className="flex items-center gap-3 pb-6 mb-8 border-b border-sand/30 text-xs text-ink/75 dark:text-cream/75">
              <div className="w-9 h-9 rounded-full bg-olive-deep text-sand flex items-center justify-center font-display font-bold border border-sand/40">
                B
              </div>
              <div>
                <p className="font-semibold text-olive-deep dark:text-sand">
                  {siteConfig.name} Clinical Team
                </p>
                <p className="text-ink/60 dark:text-cream/60">
                  Rash Behari Avenue, Kolkata
                </p>
              </div>
            </div>

            {/* Structured Section Renderer */}
            <div className="space-y-6 text-base sm:text-lg text-ink/85 dark:text-cream/85 leading-relaxed font-light">
              {post.sections.map((section, idx) => {
                if (section.type === 'h2') {
                  headingCounter++;
                  const headingId = `section-${headingCounter}`;
                  return (
                    <h2
                      key={idx}
                      id={headingId}
                      className="font-display text-2xl sm:text-3xl font-bold text-olive-deep dark:text-cream pt-6 pb-1 scroll-mt-24 border-b border-sand/20"
                    >
                      {section.content}
                    </h2>
                  );
                }

                if (section.type === 'p') {
                  return (
                    <p key={idx} className="leading-relaxed">
                      {section.content}
                    </p>
                  );
                }

                if (section.type === 'ul' && section.items) {
                  return (
                    <ul key={idx} className="space-y-3 pl-2 sm:pl-4 my-4">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-orange mt-2.5 shrink-0" />
                          <span className="text-sm sm:text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (section.type === 'callout') {
                  const isEmergency = section.title?.toLowerCase().includes('emergency') || section.title?.toLowerCase().includes('warning');
                  return (
                    <div
                      key={idx}
                      className={`p-6 rounded-3xl border my-6 ${
                        isEmergency
                          ? 'bg-red-500/10 dark:bg-red-950/30 border-red-500/40 text-ink dark:text-cream'
                          : 'bg-sand/30 dark:bg-olive-deep/40 border-sand/40 text-ink dark:text-cream'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-display font-bold text-base text-olive-deep dark:text-sand mb-2">
                        <AlertCircle className="w-5 h-5 text-orange shrink-0" />
                        <span>{section.title || 'Important Clinical Note'}</span>
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed font-normal">
                        {section.content}
                      </p>
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {/* Post-Article Consultation Callout & Booking Action */}
            <div className="mt-12 p-8 rounded-4xl bg-gradient-to-br from-olive-deep via-olive to-olive-deep text-cream border border-sand/40 shadow-glass">
              <div className="flex items-center gap-2 text-sand text-xs uppercase tracking-widest font-semibold mb-2">
                <ShieldCheck className="w-4 h-4 text-orange" />
                <span>Expert Veterinary Care In Kolkata</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-sand mb-3">
                Have Health Concerns About Your Pet?
              </h3>

              <p className="text-sm text-cream/90 font-light leading-relaxed mb-6">
                Our surgical, diagnostic, and emergency veterinarians are available 24x7 at Rash Behari Avenue, Kolkata. Schedule a clinical examination or contact our hospital desk.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-orange text-ink text-xs font-semibold uppercase tracking-wider shadow-warm-glow hover:bg-orange-soft transition-all active:scale-95"
                >
                  <CalendarPlus className="w-4 h-4 text-ink" />
                  <span>Request Appointment</span>
                </Link>

                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 border border-sand/40 text-cream text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-sand" />
                  <span>24/7 Helpline: {siteConfig.phone}</span>
                </a>
              </div>
            </div>

            {/* Related Services Links */}
            {relatedServices.length > 0 && (
              <div className="mt-12 pt-8 border-t border-sand/30">
                <h3 className="font-display font-bold text-xl text-olive-deep dark:text-cream mb-4">
                  Related Clinical Services at Bastet
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedServices.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/dog#${service.slug}`}
                      className="p-4 rounded-2xl glass-card border border-sand/40 hover:border-orange transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <h4 className="font-display font-semibold text-sm text-olive-deep dark:text-sand group-hover:text-orange-deep transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-xs text-ink/65 dark:text-cream/65 line-clamp-1 mt-0.5">
                          {service.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-orange group-hover:translate-x-1 transition-transform shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>

        {/* Cross Divider */}
        <CrossDivider variant="cross" className="mt-16 mb-12" />

        {/* Related Articles Carousel/Grid */}
        {relatedPosts.length > 0 && (
          <section className="w-full" aria-label="Related Care Articles">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-olive-deep dark:text-cream text-center mb-8">
              More Pet Health Guides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rPost) => (
                <BlogCard key={rPost.id} post={rPost} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
