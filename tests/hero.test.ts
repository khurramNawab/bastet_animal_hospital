import { describe, it, expect } from 'vitest';
import { getSiteConfig } from '@/lib/data';

describe('Hero Data & Configuration', () => {
  it('contains valid hospital tagline and emergency contact details for Hero', () => {
    const site = getSiteConfig();
    expect(site.tagline).toBe('Where Every Paw Gets Royal Care');
    expect(site.phone).toBeDefined();
    expect(site.whatsapp).toBeDefined();
  });

  it('contains stats for hero trust badges', () => {
    const site = getSiteConfig();
    expect(site.stats).toHaveLength(4);
    const labels = site.stats.map((s) => s.label);
    expect(labels).toContain('Emergency Support');
    expect(labels).toContain('Expert Doctors');
    expect(labels).toContain('Happy Pets');
  });

  it('contains valid 3D model credits mapping', () => {
    const site = getSiteConfig();
    expect(site.credits?.model3D).toBeDefined();
    expect(site.credits?.model3D?.author).toBe('kenchoo');
    expect(site.credits?.model3D?.title).toBe('Dog Puppy');
  });
});
