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
    <article className="group relative flex flex-col justify-between h-full p-7 rounded-3xl bg-cream/90 dark:bg-olive-deep/90 border border-sand/50 hover:border-orange/60 transition-all duration-300 shadow-glass overflow-hidden backdrop-blur-md">
      {/* Subtle brand glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange/15 to-transparent rounded-bl-full pointer-events-none -z-10 group-hover:scale-125 transition-transform duration-500" />

      <div>
        {/* Category & Read Time Bar */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 dark:bg-olive-950/70 border border-sand/50 text-orange-deep dark:text-sand text-xs font-bold font-heading uppercase tracking-wider">
            <Tag className="w-3 h-3 text-orange" />
            <span>{post.category}</span>
          </span>

          <span className="inline-flex items-center gap-1 text-xs text-ink/65 dark:text-cream/70 font-body">
            <Clock className="w-3.5 h-3.5 text-orange" />
            <span>{post.readingMinutes} min read</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-olive-deep dark:text-cream group-hover:text-orange-deep dark:group-hover:text-sand transition-colors mb-3 leading-snug">
          <Link href={`/blog/${post.slug}`} className="focus-visible:ring-2 focus-visible:ring-orange rounded-lg">
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-ink/80 dark:text-cream/80 font-body leading-relaxed mb-6 line-clamp-3">
          {post.description}
        </p>
      </div>

      {/* Footer / Meta Row */}
      <div className="pt-4 border-t border-sand/30 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-ink/60 dark:text-cream/60 font-body">
          <Calendar className="w-3.5 h-3.5 text-olive dark:text-sand" />
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-deep dark:text-sand group-hover:text-orange transition-colors font-heading"
          aria-label={`Read full article: ${post.title}`}
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5 text-orange group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
