import { describe, it, expect } from 'vitest'
import { calculateTotal } from '../src/scripts/cart.js'

describe('calculateTotal', () => {
  it('должна считать общую сумму', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 3 },
    ]

    expect(calculateTotal(items)).toBe(350)
  })

  it('должна возвращать 0 для пустой корзины', () => {
    expect(calculateTotal([])).toBe(0)
  })
})
