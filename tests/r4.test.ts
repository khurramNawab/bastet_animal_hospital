import { describe, it, expect } from 'vitest';
import { getBentoLayout } from '@/lib/services/bento';
import galleryData from '@/data/gallery.json';
import servicesData from '@/data/services.json';
import type { ServiceItem } from '@/lib/types';

describe('Redesign R4 Unit & Integration Tests', () => {
  describe('Bento Grid Layout Mapper (lib/services/bento.ts)', () => {
    it('should map feature layout to 2x2 spans on desktop', () => {
      const service: ServiceItem = {
        id: 'emergency',
        slug: 'critical-emergency-care',
        title: 'Emergency Care',
        description: '24/7 care',
        icon: 'HeartPulse',
        animals: ['dog'],
        layout: 'feature',
      };
      const result = getBentoLayout(service);
      expect(result.colSpan).toContain('lg:col-span-2');
      expect(result.rowSpan).toContain('lg:row-span-2');
      expect(result.isFeature).toBe(true);
      expect(result.isWide).toBe(false);
    });

    it('should map wide layout to 2x1 spans on desktop', () => {
      const service: ServiceItem = {
        id: 'vaccination',
        slug: 'preventive-care-vaccination',
        title: 'Vaccination',
        description: 'Vaccine protocols',
        icon: 'ShieldCheck',
        animals: ['dog'],
        layout: 'wide',
      };
      const result = getBentoLayout(service);
      expect(result.colSpan).toContain('lg:col-span-2');
      expect(result.rowSpan).toBe('row-span-1');
      expect(result.isFeature).toBe(false);
      expect(result.isWide).toBe(true);
    });

    it('should fallback to 1x1 normal span when layout is normal or missing', () => {
      const normalService: ServiceItem = {
        id: 'dental',
        slug: 'dental-care',
        title: 'Dental',
        description: 'Teeth cleaning',
        icon: 'Sparkles',
        animals: ['dog'],
        layout: 'normal',
      };
      const missingService: ServiceItem = {
        id: 'grooming',
        slug: 'grooming',
        title: 'Grooming',
        description: 'Fur styling',
        icon: 'Scissors',
        animals: ['dog'],
      };

      const res1 = getBentoLayout(normalService);
      expect(res1.colSpan).toBe('col-span-1');
      expect(res1.rowSpan).toBe('row-span-1');
      expect(res1.isFeature).toBe(false);

      const res2 = getBentoLayout(missingService);
      expect(res2.colSpan).toBe('col-span-1');
      expect(res2.rowSpan).toBe('row-span-1');
      expect(res2.isFeature).toBe(false);
    });

    it('should ensure all services in services.json produce valid Bento spans', () => {
      servicesData.forEach((s) => {
        const layout = getBentoLayout(s as ServiceItem);
        expect(layout.colSpan).toBeDefined();
        expect(layout.rowSpan).toBeDefined();
      });
    });
  });

  describe('Happy Tails Gallery & Patient Safety (data/gallery.json)', () => {
    it('should have at least 6 gallery items with valid schema', () => {
      expect(galleryData.length).toBeGreaterThanOrEqual(6);
    });

    it('should strictly flag every item as isDummy: true until real hospital photos are provided', () => {
      galleryData.forEach((item) => {
        expect(item.isDummy).toBe(true);
      });
    });

    it('should provide non-empty descriptive alt text and local SVG placeholder image path for each item', () => {
      galleryData.forEach((item) => {
        expect(item.alt).toBeDefined();
        expect(item.alt.length).toBeGreaterThan(10);
        expect(item.image).toMatch(/^\/images\/gallery\/polaroid-\d+\.svg$/);
        expect(item.title).toBeDefined();
        expect(item.caption).toBeDefined();
      });
    });
  });

  describe('Semantic Danger Token Contrast (A6)', () => {
    // Relative luminance calculation according to WCAG 2.1
    function getLuminance(r: number, g: number, b: number): number {
      const [rs, gs, bs] = [r, g, b].map((c) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function getContrast(hex1: string, hex2: string): number {
      const parseHex = (hex: string) => {
        const clean = hex.replace('#', '');
        return [
          parseInt(clean.substring(0, 2), 16),
          parseInt(clean.substring(2, 4), 16),
          parseInt(clean.substring(4, 6), 16),
        ];
      };
      const [r1, g1, b1] = parseHex(hex1);
      const [r2, g2, b2] = parseHex(hex2);
      const l1 = getLuminance(r1, g1, b1);
      const l2 = getLuminance(r2, g2, b2);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }

    it('should ensure danger DEFAULT (#DC2626) has contrast >= 4.5:1 against white text', () => {
      const contrast = getContrast('#DC2626', '#FFFFFF');
      expect(contrast).toBeGreaterThanOrEqual(4.5);
    });

    it('should ensure danger deep (#991B1B) has high contrast >= 7.0:1 against white text', () => {
      const contrast = getContrast('#991B1B', '#FFFFFF');
      expect(contrast).toBeGreaterThanOrEqual(7.0);
    });
  });
});
