/**
 * Computes the number closest to, but not over 21
 */
export function blackjack (a: number, b: number): number {
  const nums = [a, b]
  let closest
  let current
  while (nums.length && (current = nums.shift())) {
    if (current > 21) continue
    if (closest === undefined || (21 - current) < (21 - closest)) closest = current
  }
  return closest ?? 0
}
