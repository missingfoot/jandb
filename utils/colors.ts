/**
 * Lightens a hex color by a given percentage
 * @param hex - Hex color string (e.g., "#0d6efd")
 * @param percent - Percentage to lighten (e.g., 20 for 20%)
 * @returns Lightened hex color string
 */
export function lightenColor(hex: string, percent: number): string {
  // Remove the # if present
  const cleanHex = hex.replace('#', '');

  // Parse RGB components
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Calculate lightened values
  const amt = Math.round(2.55 * percent);
  const newR = Math.min(255, r + amt);
  const newG = Math.min(255, g + amt);
  const newB = Math.min(255, b + amt);

  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}
