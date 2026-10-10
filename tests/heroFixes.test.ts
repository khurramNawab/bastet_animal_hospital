import { describe, it, expect } from 'vitest';
import { computeCameraDistance } from '@/lib/three/fitCamera';
import { rectsOverlap, type BoundingRect2D } from '@/lib/layout/rectsOverlap';
import { getSiteConfig, getDoctors } from '@/lib/data';

describe('Camera Fit Helper (fitCamera)', () => {
  const bboxHeight = 1.0;
  const bboxWidth = 0.8;

  it('computes positive camera distance ensuring target fits vertical FOV', () => {
    const dist16x9 = computeCameraDistance(bboxHeight, bboxWidth, 34, 16 / 9, 0.1);
    expect(dist16x9).toBeGreaterThan(1.5);
    expect(dist16x9).toBeLessThan(5.0);
  });

  it('increases distance for narrower aspect ratios (mobile portrait)', () => {
    const distWidescreen = computeCameraDistance(bboxHeight, bboxWidth, 34, 16 / 9, 0.1);
    const distPortrait = computeCameraDistance(bboxHeight, bboxWidth, 34, 9 / 16, 0.1);

    expect(distPortrait).toBeGreaterThan(distWidescreen);
  });

  it('handles custom padding factor properly', () => {
    const distTight = computeCameraDistance(bboxHeight, bboxWidth, 34, 16 / 9, 0.05);
    const distSpacious = computeCameraDistance(bboxHeight, bboxWidth, 34, 16 / 9, 0.15);

    expect(distSpacious).toBeGreaterThan(distTight);
  });
});

describe('Floating Card Clearance & Safe Zone (rectsOverlap)', () => {
  // Dog head safe zone normalized in Hero 3D container coordinates (0-100%)
  const dogHeadSafeZone: BoundingRect2D = {
    x: 35,
    y: 10,
    width: 30,
    height: 35,
  };

  it('verifies card bottom-left does not intersect dog head safe zone', () => {
    const cardEmergencyBottomLeft: BoundingRect2D = {
      x: 4,
      y: 72,
      width: 25,
      height: 18,
    };
    expect(rectsOverlap(cardEmergencyBottomLeft, dogHeadSafeZone)).toBe(false);
  });

  it('verifies card mid-right does not intersect dog head safe zone', () => {
    const cardOpdMidRight: BoundingRect2D = {
      x: 75,
      y: 28,
      width: 22,
      height: 16,
    };
    expect(rectsOverlap(cardOpdMidRight, dogHeadSafeZone)).toBe(false);
  });

  it('verifies card bottom-right does not intersect dog head safe zone', () => {
    const cardDoctorsBottomRight: BoundingRect2D = {
      x: 72,
      y: 70,
      width: 24,
      height: 18,
    };
    expect(rectsOverlap(cardDoctorsBottomRight, dogHeadSafeZone)).toBe(false);
  });

  it('correctly detects intentional overlaps', () => {
    const overlappingCard: BoundingRect2D = {
      x: 40,
      y: 15,
      width: 20,
      height: 20,
    };
    expect(rectsOverlap(overlappingCard, dogHeadSafeZone)).toBe(true);
  });
});

describe('Hero Data & Config Integrity', () => {
  it('loads site config with valid emergency phone and tagline', () => {
    const siteConfig = getSiteConfig();
    expect(siteConfig.phone).toBeDefined();
    expect(siteConfig.name).toBe('Bastet Small Animal Hospital');
  });

  it('provides real doctor counts for live hero cards without hardcoding fake ratings', () => {
    const doctors = getDoctors();
    expect(doctors.length).toBeGreaterThanOrEqual(1);
    expect(doctors.some((d) => (d.specialties?.length ?? 0) > 0)).toBe(true);
  });
});
