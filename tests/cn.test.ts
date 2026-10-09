import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/cn';

describe('cn utility', () => {
  it('combines class names correctly', () => {
    const result = cn('font-bold', 'text-olive-deep', 'bg-cream');
    expect(result).toBe('font-bold text-olive-deep bg-cream');
  });

  it('handles conditional class names', () => {
    const isOrange = true;
    const isOlive = false;
    const result = cn('base-class', isOrange && 'text-orange', isOlive && 'text-olive');
    expect(result).toBe('base-class text-orange');
  });

  it('resolves tailwind merge conflicts by keeping the last class', () => {
    const result = cn('p-4', 'p-8', 'text-orange-500', 'text-orange-800');
    expect(result).toBe('p-8 text-orange-800');
  });

  it('handles empty and undefined inputs cleanly', () => {
    const result = cn('', undefined, null, false, 'px-4');
    expect(result).toBe('px-4');
  });
});
