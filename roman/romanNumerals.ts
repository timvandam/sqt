const alphabet = new Map<string, number>([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000]
])

// Seems to work with small tests, but does not detect invalid numerals
export function romanToInteger (roman: string) {
  let total = 0
  for (let i = 0; i < roman.length; i++) {
    const letter = roman.charAt(i)
    const currentNum = alphabet.get(letter)
    if (currentNum === undefined) throw new Error(`Undefined roman numeral ${letter}`)
    total += currentNum
    const previousLetter = roman.charAt(i - 1)
    const previousNum = previousLetter ? alphabet.get(previousLetter) : undefined
    if (!previousNum) continue
    if (previousNum >= currentNum) continue
    // If the previous number is smaller than the current one, we will have to subtract it instead of add it
    // Since we have previously already added it, we have to subtract it twice
    total -= 2 * previousNum
  }
  return total
}
