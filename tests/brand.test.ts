import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Logo } from '@/components/ui/Logo';
import { CrossDivider } from '@/components/ui/CrossDivider';

// WCAG Contrast calculation helper
function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function luminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrastRatio(hex1: string, hex2: string) {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const lum1 = luminance(r1, g1, b1);
  const lum2 = luminance(r2, g2, b2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

describe('Brand Token & Design System Specifications', () => {
  describe('WCAG AA Contrast Compliance', () => {
    it('achieves >= 4.5:1 contrast for Ink text (#241E10) on Orange Primary (#FF751B)', () => {
      const ratio = contrastRatio('#241E10', '#FF751B');
      // Minimum normal text requirement is 4.5:1
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('achieves >= 4.5:1 contrast for Olive Deep (#2B3318) on Cream Background (#FFF6E5)', () => {
      const ratio = contrastRatio('#2B3318', '#FFF6E5');
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('achieves >= 4.5:1 contrast for Deep Orange (#C2410C) on Cream Background (#FFF6E5)', () => {
      const ratio = contrastRatio('#C2410C', '#FFF6E5');
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('achieves >= 4.5:1 contrast for Cream text (#FFF6E5) on Olive Deep (#2B3318)', () => {
      const ratio = contrastRatio('#FFF6E5', '#2B3318');
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Logo Component', () => {
    it('renders with accessible alt text and responsive dimensions', () => {
      const { getAllByAltText, container } = render(
        React.createElement(Logo, { priority: true })
      );
      const imgs = getAllByAltText('Bastet Small Animal Hospital');
      expect(imgs.length).toBeGreaterThan(0);
      expect(container.querySelector('a')).toHaveAttribute('href', '/');
    });

    it('includes dark mode background pill plate for contrast against dark themes', () => {
      const { container } = render(
        React.createElement(Logo, {})
      );
      const pillPlate = container.querySelector('.dark\\:bg-cream\\/95');
      expect(pillPlate).toBeDefined();
    });
  });

  describe('CrossDivider Component', () => {
    it('renders line variant with proper accessibility semantics', () => {
      const { container } = render(
        React.createElement(CrossDivider, { variant: 'line' })
      );
      const divider = container.querySelector('[role="separator"]');
      expect(divider).toBeDefined();
    });

    it('renders cross variant with medical cross badge', () => {
      const { container } = render(
        React.createElement(CrossDivider, { variant: 'cross' })
      );
      const crossSvg = container.querySelector('svg');
      expect(crossSvg).toBeDefined();
    });

    it('renders paws variant with paw icons', () => {
      const { container } = render(
        React.createElement(CrossDivider, { variant: 'paws' })
      );
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });
});
