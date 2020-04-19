import { romanToInteger } from '../romanNumerals'

it('works when providing invalid numerals', () => {
  expect(() => romanToInteger('ASDASD')).toThrow(new Error('Invalid roman numeral A'))
})

it('works when providing a single numeral', () => {
  expect(romanToInteger('X')).toBe(10)
  expect(romanToInteger('c')).toBe(100)
  expect(romanToInteger('M')).toBe(1000)
})

it('works when providing a additive numeral', () => {
  expect(romanToInteger('xi')).toBe(11)
  expect(romanToInteger('mc')).toBe(1100)
  expect(romanToInteger('viiiii')).toBe(10)
})

it('works when providing a subtractive numeral', () => {
  expect(romanToInteger('CM')).toBe(900)
  expect(romanToInteger('Cd')).toBe(400)
})

it('works when providing an out-of-magnitude subtractive numeral', () => {
  expect(() => romanToInteger('XM')).toThrow('XM is out of magnitude!')
  expect(() => romanToInteger('IXM')).toThrow('XM is out of magnitude!')
})

it('works when providing a numeral that equals a smaller version of itself', () => {
  expect(() => romanToInteger('DMI')).toThrow(new Error('DM is equal to D!'))
})
