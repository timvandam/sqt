/**
 * Computes the number closest to, but not over 21
 */
export function blackjack (...nums: number[]): number {
  let closest = undefined
  let current = undefined
  while (nums.length && (current = nums.shift())) {
    if (current > 21) continue
    if (closest === undefined || (21 - current) < (21 - closest)) closest = current
  }
  return closest ?? 0
}
