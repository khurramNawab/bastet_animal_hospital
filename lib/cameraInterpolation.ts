import type { CameraPose, StoryPanel } from './types';

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

function lerp3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

export function interpolateCameraPose(progress: number, panels: StoryPanel[]): CameraPose {
  if (!panels || panels.length === 0) {
    return {
      position: [0, 1, 3],
      target: [0, 0.7, 0],
      dogRotationY: 0,
      dogScale: 1.5,
    };
  }

  const clampedProgress = Math.max(0, Math.min(1, progress));
  const segmentCount = panels.length - 1;

  if (segmentCount <= 0 || clampedProgress === 0) {
    return panels[0].cameraPose;
  }

  if (clampedProgress === 1) {
    return panels[panels.length - 1].cameraPose;
  }

  // Calculate segment index and normalized progress within that segment
  const floatIndex = clampedProgress * segmentCount;
  const index = Math.floor(floatIndex);
  const nextIndex = Math.min(index + 1, panels.length - 1);
  const segmentProgress = floatIndex - index;

  // Smooth Hermite / smoothstep ease
  const t = segmentProgress * segmentProgress * (3 - 2 * segmentProgress);

  const poseA = panels[index].cameraPose;
  const poseB = panels[nextIndex].cameraPose;

  return {
    position: lerp3(poseA.position, poseB.position, t),
    target: lerp3(poseA.target, poseB.target, t),
    dogRotationY: lerp(poseA.dogRotationY, poseB.dogRotationY, t),
    dogScale: lerp(poseA.dogScale, poseB.dogScale, t),
  };
}
