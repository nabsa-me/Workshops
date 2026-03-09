export function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Example usages of remap:
// remap(5, 0, 10, 100, 200)     // => 150 (5 is halfway between 0 and 10, so result is halfway between 100 and 200)
// remap(0, 0, 10, 50, 60)       // => 50  (0 is at inMin, so returns outMin)
// remap(10, 0, 10, 50, 60)      // => 60  (10 is at inMax, so returns outMax)
// remap(-5, 0, 10, 100, 200)    // => 50  (without clamp, projects linearly beyond outMin)
// remap(-5, 0, 10, 100, 200, true) // => 100 (with clamp, returns outMin)
export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clamp: boolean = false
) {
  let t = (value - inMin) / (inMax - inMin);
  if (clamp) {
    t = Math.max(0, Math.min(1, t));
  }
  return t * (outMax - outMin) + outMin;
}

/**
 * Linearly interpolates a value between `a` and `b` by the interpolation factor `t`.
 *
 * @param {number} a - The start value.
 * @param {number} b - The end value.
 * @param {number} t - The interpolation factor, typically between 0 (returns `a`) and 1 (returns `b`).
 * @returns {number} The interpolated value between `a` and `b` at `t`.
 */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Calculates the dimensions and offset (x, y) needed to scale and center content so that it fully covers a container,
 * maintaining its aspect ratio (like CSS `background-size: cover`).
 *
 * @param {number} containerWidth - The width of the container.
 * @param {number} containerHeight - The height of the container.
 * @param {number} contentWidth - The original width of the content.
 * @param {number} contentHeight - The original height of the content.
 * @returns {{ x: number, y: number, width: number, height: number }} The top-left coordinates (x, y) and size (width, height) for the content.
 */
export function fitContent(
  containerWidth: number,
  containerHeight: number,
  contentWidth: number,
  contentHeight: number
) {
  const scale = Math.max(
    containerWidth / contentWidth,
    containerHeight / contentHeight
  );

  const width = contentWidth * scale;
  const height = contentHeight * scale;

  const x = (containerWidth - width) / 2;
  const y = (containerHeight - height) / 2;

  return { x, y, width, height };
}