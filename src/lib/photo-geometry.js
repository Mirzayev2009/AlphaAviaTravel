// Frame crop and inverse image scale keep a photograph undistorted during FLIP.
export function photoGeometry(source, target, progress) {
  if (![source, target].every((rect) => rect && [rect.left, rect.top, rect.width, rect.height].every(Number.isFinite) && rect.width > 0 && rect.height > 0)) return null;
  const p = Math.max(0, Math.min(1, progress));
  const x = (source.left - target.left) * (1 - p) || 0;
  const y = (source.top - target.top) * (1 - p) || 0;
  const sx = source.width / target.width * (1 - p) + p;
  const sy = source.height / target.height * (1 - p) + p;
  const cover = Math.max(sx, sy);
  return { x, y, sx, sy, imageX: cover / sx, imageY: cover / sy };
}
