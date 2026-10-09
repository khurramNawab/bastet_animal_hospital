import { describe, it, expect } from 'vitest';
import { getStoryPanels } from '@/lib/data';
import { interpolateCameraPose } from '@/lib/cameraInterpolation';

describe('Story Data & Schema', () => {
  it('loads exactly 3 sequential clinical story panels', () => {
    const panels = getStoryPanels();
    expect(panels).toHaveLength(3);
    expect(panels.map((p) => p.step)).toEqual(['01', '02', '03']);
    expect(panels.map((p) => p.title)).toEqual(['Prevent', 'Diagnose', 'Heal']);
  });

  it('validates each panel has required copy and complete camera pose', () => {
    const panels = getStoryPanels();
    panels.forEach((panel) => {
      expect(panel.id).toBeDefined();
      expect(panel.line.length).toBeGreaterThan(10);
      expect(panel.detail.length).toBeGreaterThan(20);
      expect(panel.icon).toBeDefined();
      expect(panel.cameraPose.position).toHaveLength(3);
      expect(panel.cameraPose.target).toHaveLength(3);
      expect(typeof panel.cameraPose.dogRotationY).toBe('number');
      expect(panel.cameraPose.dogScale).toBeGreaterThanOrEqual(1);
    });
  });
});

describe('Camera Interpolation Helper', () => {
  const panels = getStoryPanels();

  it('returns initial pose at progress 0', () => {
    const pose = interpolateCameraPose(0, panels);
    expect(pose.position).toEqual(panels[0].cameraPose.position);
    expect(pose.dogRotationY).toBe(panels[0].cameraPose.dogRotationY);
  });

  it('returns final pose at progress 1', () => {
    const pose = interpolateCameraPose(1, panels);
    expect(pose.position).toEqual(panels[panels.length - 1].cameraPose.position);
    expect(pose.dogRotationY).toBe(panels[panels.length - 1].cameraPose.dogRotationY);
  });

  it('smoothly computes midpoint pose at progress 0.5 (panel 2 midpoint)', () => {
    const pose = interpolateCameraPose(0.5, panels);
    expect(pose.position).toBeDefined();
    expect(pose.position[0]).toBeCloseTo(panels[1].cameraPose.position[0], 2);
    expect(pose.position[1]).toBeCloseTo(panels[1].cameraPose.position[1], 2);
    expect(pose.dogRotationY).toBeCloseTo(panels[1].cameraPose.dogRotationY, 2);
  });

  it('clamps out-of-bounds progress values cleanly', () => {
    const under = interpolateCameraPose(-0.5, panels);
    expect(under.position).toEqual(panels[0].cameraPose.position);

    const over = interpolateCameraPose(1.5, panels);
    expect(over.position).toEqual(panels[panels.length - 1].cameraPose.position);
  });
});
