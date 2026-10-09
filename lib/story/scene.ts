import type { StoryPanel, StoryScene } from '@/lib/types';

export interface SceneTransition {
  index: number;
  nextIndex: number;
  blend: number; // 0 to 1 transition progress
  currentScene: StoryScene;
  nextScene: StoryScene;
  isTransitioning: boolean;
}

const defaultScene: StoryScene = {
  id: 'scene-default',
  mood: 'Royal Care',
  backgroundFrom: 'olive-deep',
  backgroundTo: 'olive-900',
  glow: 'orange',
  glowOpacity: 0.2,
  effect: 'sun',
};

/**
 * Computes active scene and blend factor for smooth cross-fades across scroll progress.
 *
 * @param progress Normalized scroll progress between 0 and 1
 * @param panels Array of StoryPanel with scene metadata
 * @returns SceneTransition with index, blend (0 to 1), and scene objects
 */
export function sceneForProgress(
  progress: number,
  panels: StoryPanel[],
): SceneTransition {
  if (!panels || panels.length === 0) {
    return {
      index: 0,
      nextIndex: 0,
      blend: 0,
      currentScene: defaultScene,
      nextScene: defaultScene,
      isTransitioning: false,
    };
  }

  const clampedProgress = Math.max(0, Math.min(1, progress));
  const count = panels.length;

  if (count === 1) {
    const s = panels[0].scene || defaultScene;
    return {
      index: 0,
      nextIndex: 0,
      blend: 0,
      currentScene: s,
      nextScene: s,
      isTransitioning: false,
    };
  }

  // 3 panels -> 2 segments (segment 0: progress 0..0.5, segment 1: progress 0.5..1.0)
  const segments = count - 1;
  const scaledProgress = clampedProgress * segments;
  const index = Math.min(Math.floor(scaledProgress), count - 1);
  const nextIndex = Math.min(index + 1, count - 1);
  const localProgress = scaledProgress - index; // 0 to 1 within this segment

  // Transition smoothing band (smooth cross-fade in middle of segment)
  const transitionStart = 0.2;
  const transitionEnd = 0.8;
  let blend = 0;
  let isTransitioning = false;

  if (localProgress <= transitionStart) {
    blend = 0;
    isTransitioning = false;
  } else if (localProgress >= transitionEnd) {
    blend = 1;
    isTransitioning = false;
  } else {
    blend = (localProgress - transitionStart) / (transitionEnd - transitionStart);
    isTransitioning = true;
  }

  const currentScene = panels[index].scene || defaultScene;
  const nextScene = panels[nextIndex].scene || defaultScene;

  return {
    index,
    nextIndex,
    blend,
    currentScene,
    nextScene,
    isTransitioning,
  };
}
