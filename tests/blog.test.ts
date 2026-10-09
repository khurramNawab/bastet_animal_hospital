import { describe, it, expect } from 'vitest';
import { getBlogPosts, getBlogPostBySlug, getRelatedPosts } from '@/lib/data';

describe('Blog Data & Posts', () => {
  const posts = getBlogPosts();

  it('contains at least 4 comprehensive blog articles', () => {
    expect(posts.length).toBeGreaterThanOrEqual(4);
  });

  it('every article has unique slug, title, description, category, and readingMinutes', () => {
    const slugs = new Set<string>();
    posts.forEach((post) => {
      expect(post.slug).toBeTruthy();
      expect(slugs.has(post.slug)).toBe(false);
      slugs.add(post.slug);

      expect(post.title).toBeTruthy();
      expect(post.description).toBeTruthy();
      expect(post.category).toBeTruthy();
      expect(post.readingMinutes).toBeGreaterThan(0);
      expect(post.publishedAt).toBeTruthy();
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags.length).toBeGreaterThan(0);
      expect(Array.isArray(post.sections)).toBe(true);
      expect(post.sections.length).toBeGreaterThan(0);
    });
  });

  it('every article has substantial clinical content (>350 words equivalent)', () => {
    posts.forEach((post) => {
      const fullText = post.sections
        .map((s) => {
          if (s.type === 'p' || s.type === 'h2') return s.content || '';
          if (s.type === 'ul') return (s.items || []).join(' ');
          if (s.type === 'callout') return `${s.title || ''} ${s.content || ''}`;
          return '';
        })
        .join(' ');

      const wordCount = fullText.trim().split(/\s+/).length;
      expect(wordCount).toBeGreaterThanOrEqual(350);
    });
  });

  it('getBlogPostBySlug returns correct post or undefined', () => {
    const firstPost = posts[0];
    const retrieved = getBlogPostBySlug(firstPost.slug);
    expect(retrieved).toBeDefined();
    expect(retrieved?.slug).toBe(firstPost.slug);

    const nonExistent = getBlogPostBySlug('non-existent-slug-xyz');
    expect(nonExistent).toBeUndefined();
  });

  it('getRelatedPosts returns posts excluding the current one', () => {
    const currentPost = posts[0];
    const related = getRelatedPosts(currentPost.slug, 2);
    expect(related.every((p) => p.slug !== currentPost.slug)).toBe(true);
  });

  it('all articles contain clinical disclaimer in their sections or metadata', () => {
    posts.forEach((post) => {
      const hasDisclaimer =
        post.needsVetReview === true ||
        post.sections.some(
          (s) =>
            s.type === 'callout' &&
            s.content &&
            s.content.toLowerCase().includes('diagnosis')
        );
      expect(hasDisclaimer).toBe(true);
    });
  });
});
