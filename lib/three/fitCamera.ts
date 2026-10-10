/**
 * Pure mathematical helper to calculate optimal Three.js perspective camera distance
 * to ensure bounding box fits within the viewport with a guaranteed safe-area padding.
 *
 * @param bboxHeight Height of object's bounding box
 * @param bboxWidth Width of object's bounding box
 * @param fov Vertical Field of View in degrees
 * @param aspect Viewport aspect ratio (width / height)
 * @param paddingRatio Fraction of viewport to reserve as safety margin (default 0.08 for ~8% margin)
 * @returns Camera distance along Z-axis
 */
export function computeCameraDistance(
  bboxHeight: number,
  bboxWidth: number,
  fov: number,
  aspect: number,
  paddingRatio: number = 0.08,
): number {
  if (bboxHeight <= 0 || bboxWidth <= 0 || fov <= 0 || aspect <= 0) {
    return 3.0; // fallback safe distance
  }

  // Convert vertical FOV to radians
  const vFovRad = (fov * Math.PI) / 180;
  
  // Effective height/width needed including safe margin
  const effectiveHeight = bboxHeight / (1 - paddingRatio * 2);
  const effectiveWidth = bboxWidth / (1 - paddingRatio * 2);

  // Distance needed to fit height
  const distFromHeight = (effectiveHeight / 2) / Math.tan(vFovRad / 2);

  // Distance needed to fit width (using horizontal FOV derived from aspect ratio)
  const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * aspect);
  const distFromWidth = (effectiveWidth / 2) / Math.tan(hFovRad / 2);

  return Math.max(distFromHeight, distFromWidth);
}
