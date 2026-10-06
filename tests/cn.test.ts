import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/cn';

describe('cn utility', () => {
  it('combines class names correctly', () => {
    const result = cn('font-bold', 'text-teal', 'bg-cream');
    expect(result).toBe('font-bold text-teal bg-cream');
  });

  it('handles conditional class names', () => {
    const isGold = true;
    const isTeal = false;
    const result = cn('base-class', isGold && 'text-gold', isTeal && 'text-teal');
    expect(result).toBe('base-class text-gold');
  });

  it('resolves tailwind merge conflicts by keeping the last class', () => {
    const result = cn('p-4', 'p-8', 'text-teal-500', 'text-teal-800');
    expect(result).toBe('p-8 text-teal-800');
  });

  it('handles empty and undefined inputs cleanly', () => {
    const result = cn('', undefined, null, false, 'px-4');
    expect(result).toBe('px-4');
  });
});
