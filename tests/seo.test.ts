import { describe, it, expect } from 'vitest';
import {
  serializeJsonLd,
  getHospitalJsonLd,
  getServiceJsonLd,
  getDoctorJsonLd,
  getBlogPostingJsonLd,
  getBreadcrumbsJsonLd,
} from '@/lib/seo/jsonld';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { getSiteConfig, getDoctors, getServices, getBlogPosts } from '@/lib/data';

describe('SEO & Structured Data', () => {
  const siteConfig = getSiteConfig();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bastetsmallanimalhospital.com';

  it('serializeJsonLd escapes unsafe characters against XSS', () => {
    const dangerousObj = {
      tag: '<script>alert("XSS")</script>',
      query: 'a & b > c',
    };
    const serialized = serializeJsonLd(dangerousObj);
    expect(serialized).not.toContain('<script>');
    expect(serialized).toContain('\\u003cscript\\u003e');
    expect(serialized).toContain('\\u0026');
    expect(serialized).toContain('\\u003e');
  });

  it('getHospitalJsonLd generates valid VeterinaryCare schema without fake ratings', () => {
    const schema = getHospitalJsonLd(siteConfig, baseUrl);
    expect(schema['@type']).toBe('VeterinaryCare');
    expect(schema.name).toBe(siteConfig.name);
    expect(schema.telephone).toBe(siteConfig.phone);
    expect((schema as Record<string, unknown>).aggregateRating).toBeUndefined();
    expect((schema as Record<string, unknown>).review).toBeUndefined();
  });

  it('getServiceJsonLd generates valid Service schema', () => {
    const services = getServices();
    const service = services[0];
    const schema = getServiceJsonLd(service, siteConfig, baseUrl);
    expect(schema['@type']).toBe('Service');
    expect(schema.name).toBe(service.title);
    expect(schema.url).toContain('/services/dog#');
  });

  it('getDoctorJsonLd generates valid Person schema for veterinarian', () => {
    const doctors = getDoctors();
    const doc = doctors[0];
    const schema = getDoctorJsonLd(doc, siteConfig, baseUrl);
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe(doc.name);
    expect(schema.worksFor).toBeDefined();
  });

  it('getBlogPostingJsonLd generates BlogPosting schema', () => {
    const posts = getBlogPosts();
    const post = posts[0];
    const schema = getBlogPostingJsonLd(post, siteConfig, baseUrl);
    expect(schema['@type']).toBe('BlogPosting');
    expect(schema.headline).toBe(post.title);
    expect(schema.datePublished).toBe(post.publishedAt);
  });

  it('getBreadcrumbsJsonLd generates BreadcrumbList schema', () => {
    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Current Article' },
    ];
    const schema = getBreadcrumbsJsonLd(breadcrumbs, baseUrl);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[0].item).toBe(`${baseUrl}/`);
    expect(schema.itemListElement[2].item).toBeUndefined();
  });

  it('robots() contains correct sitemap and disallow rules', () => {
    const robotRules = robots();
    expect(robotRules.sitemap).toContain('/sitemap.xml');
    expect(robotRules.rules).toBeDefined();
  });

  it('sitemap() includes core pages, blog articles, doctors, and active services only', async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    // Check core routes
    expect(urls).toContain(baseUrl);
    expect(urls).toContain(`${baseUrl}/services/dog`);
    expect(urls).toContain(`${baseUrl}/blog`);
    expect(urls).toContain(`${baseUrl}/privacy-policy`);
    expect(urls).toContain(`${baseUrl}/terms`);
    expect(urls).toContain(`${baseUrl}/medical-disclaimer`);

    // Ensure comingSoon services are excluded from sitemap
    expect(urls).not.toContain(`${baseUrl}/services/cat`);
    expect(urls).not.toContain(`${baseUrl}/services/bird`);
    expect(urls).not.toContain(`${baseUrl}/services/cattle`);

    // Ensure blog articles and doctors are present
    const doctors = getDoctors();
    doctors.forEach((doc) => {
      expect(urls).toContain(`${baseUrl}/doctors/${doc.slug}`);
    });

    const posts = getBlogPosts();
    posts.forEach((post) => {
      expect(urls).toContain(`${baseUrl}/blog/${post.slug}`);
    });
  });
});
