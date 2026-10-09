'use client';

import React, { useState, useEffect } from 'react';
import { List, Check, Share2, MessageCircle, Copy } from 'lucide-react';

interface ArticleProgressProps {
  headings: { id: string; text: string }[];
  title: string;
}

export function ArticleProgress({ headings, title }: ArticleProgressProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setReadingProgress(progress);
      }

      // Determine active heading
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveHeadingId(headings[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Check out this pet care guide from Bastet Small Animal Hospital: "${title}"`);
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* Pinned Golden Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gold/20 z-[60] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-gold via-gold-light to-gold shadow-gold-glow transition-all duration-75 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Desktop Sticky Table of Contents & Share Widget */}
      <div className="hidden lg:block sticky top-28 space-y-6">
        {/* Table of Contents Card */}
        {headings.length > 0 && (
          <div className="p-6 rounded-3xl glass-card border border-gold/30 shadow-glass">
            <h4 className="font-display font-bold text-sm text-teal dark:text-gold uppercase tracking-wider flex items-center gap-2 mb-4">
              <List className="w-4 h-4 text-gold" />
              <span>Table of Contents</span>
            </h4>
            <nav aria-label="Article Table of Contents">
              <ul className="space-y-2.5 text-xs text-ink/75 dark:text-cream/75">
                {headings.map((h) => {
                  const isActive = activeHeadingId === h.id;
                  return (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`block py-1 transition-colors leading-snug rounded ${
                          isActive
                            ? 'text-gold-dark dark:text-gold font-semibold translate-x-1'
                            : 'hover:text-teal dark:hover:text-gold'
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}

        {/* Share Card */}
        <div className="p-6 rounded-3xl glass-card border border-gold/30 shadow-glass">
          <h4 className="font-display font-bold text-xs text-teal dark:text-gold uppercase tracking-wider flex items-center gap-2 mb-3">
            <Share2 className="w-3.5 h-3.5 text-gold" />
            <span>Share Guide</span>
          </h4>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-teal/10 dark:bg-gold/15 border border-gold/30 text-teal dark:text-cream text-xs font-semibold hover:bg-gold hover:text-ink transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-gold" />
              <span>Share on WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/40 dark:bg-ink/40 border border-gold/20 text-ink/80 dark:text-cream/80 text-xs font-medium hover:border-gold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gold" />}
              <span>{copied ? 'Link Copied!' : 'Copy Article Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
