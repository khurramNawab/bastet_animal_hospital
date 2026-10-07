import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCanRender3D } from '@/hooks/useCanRender3D';

describe('useCanRender3D hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
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

  it('initializes with default state and mounts on client', () => {
    const { result } = renderHook(() => useCanRender3D());
    expect(result.current.isMounted).toBe(true);
    expect(result.current.isReducedMotion).toBe(false);
  });

  it('detects prefers-reduced-motion correctly', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useCanRender3D());
    expect(result.current.isReducedMotion).toBe(true);
  });

  it('disables 3D for mobile screen widths (<768px)', () => {
    window.innerWidth = 375;
    const { result } = renderHook(() => useCanRender3D());
    expect(result.current.canRender3D).toBe(false);
  });
});
