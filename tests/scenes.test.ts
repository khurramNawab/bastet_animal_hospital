import { describe, it, expect } from 'vitest';
import { sceneForProgress } from '@/lib/story/scene';
import { ecgPath } from '@/lib/ecg';
import { getStoryPanels, getSiteConfig } from '@/lib/data';

describe('Story Scene Progress & Interpolation', () => {
  const panels = getStoryPanels();

  it('computes initial scene (Prevent) at progress 0.0', () => {
    const transition = sceneForProgress(0, panels);
    expect(transition.index).toBe(0);
    expect(transition.currentScene.effect).toBe('sun');
    expect(transition.currentScene.backgroundFrom).toBe('olive-deep');
  });

  it('computes midpoint scene (Diagnose) around progress 0.5', () => {
    const transition = sceneForProgress(0.5, panels);
    expect(transition.index).toBe(1);
    expect(transition.currentScene.effect).toBe('scan');
    expect(transition.currentScene.backgroundFrom).toBe('olive-900');
  });

  it('computes final scene (Heal) at progress 1.0', () => {
    const transition = sceneForProgress(1.0, panels);
    expect(transition.index).toBe(2);
    expect(transition.currentScene.effect).toBe('pulse');
    expect(transition.currentScene.backgroundFrom).toBe('brown-deep');
  });

  it('gracefully handles empty panels or single panel fallback', () => {
    const emptyTransition = sceneForProgress(0.5, []);
    expect(emptyTransition.index).toBe(0);
    expect(emptyTransition.currentScene).toBeDefined();

    const singleTransition = sceneForProgress(0.5, [panels[0]]);
    expect(singleTransition.index).toBe(0);
  });
});

describe('Story JSON Scene Schema & Brand Token Compliance', () => {
  const panels = getStoryPanels();
  const validBackgroundTokens = ['olive-deep', 'olive-900', 'brown-deep', 'cream', 'sand'];
  const validGlowTokens = ['orange', 'sand', 'olive'];
  const validEffects = ['sun', 'scan', 'pulse'];

  it('ensures every panel has valid scene configuration using brand tokens exclusively', () => {
    expect(panels).toHaveLength(3);
    panels.forEach((panel) => {
      expect(panel.scene).toBeDefined();
      expect(panel.scene?.id).toBeDefined();
      expect(panel.scene?.mood).toBeDefined();
      expect(validBackgroundTokens).toContain(panel.scene?.backgroundFrom);
      expect(validBackgroundTokens).toContain(panel.scene?.backgroundTo);
      expect(validGlowTokens).toContain(panel.scene?.glow);
      expect(validEffects).toContain(panel.scene?.effect);
      expect(panel.scene?.glowOpacity).toBeGreaterThan(0);
      expect(panel.scene?.glowOpacity).toBeLessThanOrEqual(1);
    });
  });
});

describe('ECG Path Waveform Generator', () => {
  it('generates a valid deterministic SVG path string', () => {
    const path1 = ecgPath(800, 80, 3);
    const path2 = ecgPath(800, 80, 3);

    expect(path1).toBe(path2);
    expect(path1.startsWith('M 0')).toBe(true);
    expect(path1).toContain('L ');
    expect(path1).toContain('C ');
  });

  it('adjusts path geometry based on custom beat counts and dimensions', () => {
    const singleBeat = ecgPath(400, 60, 1);
    const multiBeat = ecgPath(1200, 80, 4);

    expect(singleBeat.length).toBeLessThan(multiBeat.length);
  });

  it('handles zero or negative dimensions safely', () => {
    expect(ecgPath(0, 80)).toBe('M 0 0');
    expect(ecgPath(800, 0)).toBe('M 0 0');
    expect(ecgPath(800, 80, 0)).toBe('M 0 0');
  });
});

describe('Emergency Band Content Integrity', () => {
  it('loads real clinic credentials without fabricated statistics or fake claims', () => {
    const siteConfig = getSiteConfig();
    expect(siteConfig.phone).toBeDefined();
    expect(siteConfig.address).toContain('Rash Behari');
    expect(siteConfig.city).toBe('Kolkata');

    // Strict guard against fake marketing claims
    const forbiddenClaims = ['100% survival', '5 min response', 'award winning', 'best in world'];
    forbiddenClaims.forEach((claim) => {
      expect(siteConfig.name.toLowerCase()).not.toContain(claim);
      expect(siteConfig.tagline.toLowerCase()).not.toContain(claim);
    });
  });
});
