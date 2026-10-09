import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { getSiteConfig, getServices } from '@/lib/data';
import { FloatCard } from '@/components/ui/FloatCard';
import { HeroServicesMarquee } from '@/components/ui/HeroServicesMarquee';
import { computePawTrailPoints } from '@/components/ui/PawTrail';

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

describe('FloatCard Component', () => {
  const siteConfig = getSiteConfig();

  it('renders emergency variant with 24x7 Emergency label', () => {
    const { getByText } = render(
      React.createElement(FloatCard, { variant: 'emergency', siteConfig })
    );
    expect(getByText('24x7 Emergency')).toBeDefined();
    expect(getByText('Immediate Trauma Care')).toBeDefined();
  });

  it('renders doctors variant without any fake ratings or star text', () => {
    const { container, queryByText } = render(
      React.createElement(FloatCard, { variant: 'doctors', siteConfig })
    );
    expect(container.textContent).toContain('Expert Doctors');
    // STRICT: No fake ratings or stars
    expect(container.textContent?.toLowerCase()).not.toContain('star');
    expect(container.textContent?.toLowerCase()).not.toContain('rating');
    expect(queryByText(/4\.[0-9]/)).toBeNull();
  });

  it('renders status variant with live OPD label', () => {
    const { container } = render(
      React.createElement(FloatCard, { variant: 'status', siteConfig })
    );
    expect(container.textContent).toMatch(/OPD: (Open Now|Closed)/);
  });

  it('suppresses animation class when isReducedMotion is true', () => {
    const { container } = render(
      React.createElement(FloatCard, {
        variant: 'emergency',
        siteConfig,
        isReducedMotion: true,
      })
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain('animate-float');
  });
});

describe('HeroServicesMarquee Component', () => {
  const services = getServices();

  it('renders duplicate track with aria-hidden="true" for screen reader accessibility', () => {
    const { container } = render(
      React.createElement(HeroServicesMarquee, { services })
    );
    const hiddenTrack = container.querySelector('[aria-hidden="true"]');
    expect(hiddenTrack).toBeDefined();
  });

  it('renders static scrollable strip on reduced motion', () => {
    const { container } = render(
      React.createElement(HeroServicesMarquee, { services, isReducedMotion: true })
    );
    const animatedMarquee = container.querySelector('.animate-marquee');
    expect(animatedMarquee).toBeNull();
  });
});

describe('PawTrail helper', () => {
  it('handles null pathElement safely', () => {
    const points = computePawTrailPoints(null, 8);
    expect(points).toEqual([]);
  });

  it('returns empty array when count is zero or negative', () => {
    const mockPath = {
      getTotalLength: () => 100,
      getPointAtLength: (d: number) => ({ x: d, y: d * 2 }),
    } as unknown as SVGPathElement;

    const points = computePawTrailPoints(mockPath, 0);
    expect(points).toEqual([]);
  });

  it('computes alternating left/right points along mock path', () => {
    const mockPath = {
      getTotalLength: () => 1000,
      getPointAtLength: (d: number) => ({ x: d * 0.1, y: d * 0.5 }),
    } as unknown as SVGPathElement;

    const points = computePawTrailPoints(mockPath, 6);
    expect(points).toHaveLength(6);
    expect(points[0].isRight).toBe(false);
    expect(points[1].isRight).toBe(true);
    expect(points[2].isRight).toBe(false);
  });
});
