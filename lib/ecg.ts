/**
 * Generates a deterministic SVG path string representing a realistic
 * clinical ECG (Electrocardiogram) cardiac waveform with P, Q, R, S, T complex waves.
 *
 * @param width Total SVG coordinate width in pixels
 * @param height Total SVG coordinate height in pixels
 * @param beats Total number of cardiac cycles to generate (default 3)
 * @returns SVG path 'd' attribute string
 */
export function ecgPath(width: number, height: number, beats: number = 3): string {
  if (width <= 0 || height <= 0 || beats <= 0) {
    return 'M 0 0';
  }

  const safeBeats = Math.max(1, Math.round(beats));
  const beatWidth = width / safeBeats;
  const baseline = height * 0.55;
  const amplitude = height * 0.45;

  let path = `M 0 ${baseline.toFixed(2)}`;

  for (let i = 0; i < safeBeats; i++) {
    const startX = i * beatWidth;

    // Relative keypoint percentages within a single cardiac beat
    // 0.00 - 0.12: Isoelectric baseline
    // 0.12 - 0.22: P wave (atrial depolarization arch)
    // 0.22 - 0.28: PR segment
    // 0.28 - 0.32: Q wave (sharp downward dip)
    // 0.32 - 0.38: R wave (prominent sharp upward peak)
    // 0.38 - 0.44: S wave (sharp downward dip)
    // 0.44 - 0.54: ST segment
    // 0.54 - 0.72: T wave (smooth repolarization arch)
    // 0.72 - 1.00: TP segment (rest interval)

    const x = (pct: number) => (startX + beatWidth * pct).toFixed(2);
    const y = (offsetPct: number) => (baseline - amplitude * offsetPct).toFixed(2);

    // 1. Initial baseline
    path += ` L ${x(0.12)} ${baseline.toFixed(2)}`;

    // 2. P-wave (smooth curve up and down)
    path += ` C ${x(0.15)} ${y(0.22)}, ${x(0.19)} ${y(0.22)}, ${x(0.22)} ${baseline.toFixed(2)}`;

    // 3. PR segment (flat)
    path += ` L ${x(0.28)} ${baseline.toFixed(2)}`;

    // 4. Q-wave (dip down)
    path += ` L ${x(0.31)} ${y(-0.18)}`;

    // 5. R-wave (soaring sharp peak)
    path += ` L ${x(0.36)} ${y(0.92)}`;

    // 6. S-wave (deep plunge)
    path += ` L ${x(0.41)} ${y(-0.35)}`;

    // 7. ST segment return to baseline
    path += ` L ${x(0.46)} ${baseline.toFixed(2)}`;
    path += ` L ${x(0.54)} ${baseline.toFixed(2)}`;

    // 8. T-wave (wide smooth dome)
    path += ` C ${x(0.60)} ${y(0.35)}, ${x(0.66)} ${y(0.35)}, ${x(0.72)} ${baseline.toFixed(2)}`;

    // 9. TP segment to beat end
    path += ` L ${x(1.0)} ${baseline.toFixed(2)}`;
  }

  return path;
}
