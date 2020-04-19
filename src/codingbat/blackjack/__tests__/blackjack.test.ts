import { blackjack } from "../blackjack";

it('works when both variables are under or equal to 21', () => {
  expect(blackjack(20, 19)).toBe(20)
  expect(blackjack(21, 19)).toBe(21)
  expect(blackjack(20, 20)).toBe(20)
  expect(blackjack(3, 19)).toBe(19)
})

it('works when one variable is over 21', () => {
  expect(blackjack(30, 1)).toBe(1)
  expect(blackjack(30, 10)).toBe(10)
  expect(blackjack(30, 17)).toBe(17)
  expect(blackjack(30, 9)).toBe(9)
  expect(blackjack(30, 6)).toBe(6)
})

it('works when both variables are over 21', () => {
  expect(blackjack(30, 32)).toBe(0)
  expect(blackjack(22, 23)).toBe(0)
  expect(blackjack(22, 32)).toBe(0)
  expect(blackjack(22, 100)).toBe(0)
  expect(blackjack(60, 23)).toBe(0)
})
