import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, Tag } from 'lucide-react';
import type { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="group relative flex flex-col justify-between h-full p-7 rounded-3xl glass-card border border-gold/30 hover:border-gold/60 transition-all duration-300 shadow-glass overflow-hidden">
      {/* Background Ambient Spotlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/15 to-transparent rounded-bl-full pointer-events-none -z-10 group-hover:scale-125 transition-transform duration-500" />

      <div>
        {/* Category & Read Time Bar */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 dark:bg-gold/10 border border-gold/30 text-gold-dark dark:text-gold text-xs font-semibold uppercase tracking-wider">
            <Tag className="w-3 h-3" />
            <span>{post.category}</span>
          </span>

          <span className="inline-flex items-center gap-1 text-xs text-ink/65 dark:text-cream/70">
            <Clock className="w-3.5 h-3.5 text-gold-dark dark:text-gold" />
            <span>{post.readingMinutes} min read</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-teal dark:text-cream group-hover:text-teal-600 dark:group-hover:text-gold transition-colors mb-3 leading-snug">
          <Link href={`/blog/${post.slug}`} className="focus-visible:ring-2 focus-visible:ring-gold rounded-lg">
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-ink/80 dark:text-cream/80 font-light leading-relaxed mb-6 line-clamp-3">
          {post.description}
        </p>
      </div>

      {/* Footer / Meta Row */}
      <div className="pt-4 border-t border-gold/20 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-ink/60 dark:text-cream/60">
          <Calendar className="w-3.5 h-3.5 text-gold" />
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal dark:text-gold group-hover:text-gold-dark dark:group-hover:text-gold-light transition-colors"
          aria-label={`Read full article: ${post.title}`}
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
