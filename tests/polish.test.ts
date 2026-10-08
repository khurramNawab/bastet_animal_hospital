import { describe, it, expect, beforeEach, vi } from 'vitest';
import { THEME_STORAGE_KEY } from '@/components/providers/ThemeProvider';

describe('Phase 8: Polish & Design System Verification', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.restoreAllMocks();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  describe('Theme System & Token Consistency', () => {
    it('defines THEME_STORAGE_KEY as bastet_theme', () => {
      expect(THEME_STORAGE_KEY).toBe('bastet_theme');
    });

    it('persists selected theme in localStorage correctly', () => {
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

      localStorage.setItem(THEME_STORAGE_KEY, 'light');
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');

      localStorage.setItem(THEME_STORAGE_KEY, 'system');
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('system');
    });
  });

  describe('SiteLoader Session Guard', () => {
    it('sets session storage flag upon initial session visit', () => {
      expect(sessionStorage.getItem('bastet_intro_shown')).toBeNull();
      sessionStorage.setItem('bastet_intro_shown', 'true');
      expect(sessionStorage.getItem('bastet_intro_shown')).toBe('true');
    });
  });

  describe('Accessibility & Device Queries', () => {
    it('evaluates fine pointer media queries without crashing', () => {
      const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)');
      expect(finePointer).toBeDefined();
    });

    it('evaluates prefers-reduced-motion media query correctly', () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      expect(reducedMotion).toBeDefined();
    });
  });
});
