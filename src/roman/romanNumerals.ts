const alphabet = new Map<string, number>([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000]
])

/**
 * Converts a roman numeral to a base 10 integer
 * @param {string} roman - the roman numeral to convert to a base 10 integer
 */
export function romanToInteger (roman: string): number {
  roman = roman.toUpperCase()
  let total = 0
  for (let i = 0; i < roman.length; i++) {
    const letter = roman.charAt(i)
    const currentNum = alphabet.get(letter)
    if (currentNum === undefined) throw new Error(`Invalid roman numeral ${letter}`)
    total += currentNum
    const previousLetter = roman.charAt(i - 1)
    const previousNum = previousLetter ? alphabet.get(previousLetter) : undefined
    if (!previousNum) continue
    if (previousNum >= currentNum) continue
    // If the previous number is smaller than the current one, we will have to subtract it instead of add it
    const currentMagnitude = currentNum.toString().length
    const prevMagnitude = previousNum.toString().length
    // Amount of digits should be within difference of 1
    if (Math.abs(currentMagnitude - prevMagnitude) > 1)
      throw new Error(`${previousLetter}${letter} is out of magnitude!`)
    // No numerals that equal a smaller version of it (DM = 1000 - 500 = D)
    if (currentNum - previousNum === previousNum)
      throw new Error(`${previousLetter}${letter} is equal to ${previousLetter}!`)
    // Since we have previously already added it, we have to subtract it twice
    total -= 2 * previousNum
  }
  return total
}

/*
Test cases I thought of:
- Invalid numerals such as 'ABC' (numeral not in the defined alphabet)
- Numerals of length 1 (no previous numeral)
- Numerals where the previous numeral is more than 1 order of magnitude greater/smaller than the current one (invalid)
- Numerals where the previous numeral is greater than the current numeral (simply add current total)
- Numerals where the previous numeral is smaller that the current numeral (prev should be subtracted)
- Numerals where the order of magnitude between two numerals is incorrect
- Numerals where the subtraction of one numeral creates another single-letter numeral (DM = D)

I thought of these by looking at all branches in my code. The mentioned test cases should cover all lines & branches
When testing the test suite in __tests__/romanNumerals.test it reports a coverage of 100%, so it seems like these test
cases have achieved my goal
 */
