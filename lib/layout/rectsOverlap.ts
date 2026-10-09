export interface BoundingRect2D {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Pure 2D Axis-Aligned Bounding Box (AABB) collision test to guarantee
 * floating cards never overlap with a designated safe zone (e.g. dog head).
 *
 * @param rectA First rectangle
 * @param rectB Second rectangle
 * @param minMargin Optional minimum required safety clearance in pixels
 * @returns true if rectA and rectB overlap (or violate minMargin), false if completely separated
 */
export function rectsOverlap(
  rectA: BoundingRect2D,
  rectB: BoundingRect2D,
  minMargin: number = 0,
): boolean {
  const leftA = rectA.x - minMargin;
  const rightA = rectA.x + rectA.width + minMargin;
  const topA = rectA.y - minMargin;
  const bottomA = rectA.y + rectA.height + minMargin;

  const leftB = rectB.x;
  const rightB = rectB.x + rectB.width;
  const topB = rectB.y;
  const bottomB = rectB.y + rectB.height;

  // If one rectangle is entirely to the left, right, above, or below the other, they do not overlap
  if (rightA <= leftB || leftA >= rightB || bottomA <= topB || topA >= bottomB) {
    return false;
  }

  return true;
}
