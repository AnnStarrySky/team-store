import { describe, it, expect } from 'vitest'
import {
  addToCart,
  removeFromCart,
  itemTotal,
  updateQuantity,
  calculateTotal,
} from '../src/scripts/cart.js'

describe('addToCart', () => {
  it('должна добавлять новый товар в корзину', () => {
    const cart = []
    const product = { id: 1, name: 'корм Обжорка', price: 1000 }

    addToCart(cart, product)

    expect(cart).toEqual([
      { id: 1, name: 'корм Обжорка', price: 1000, quantity: 1 },
    ])
  })

  it('должна увеличивать количество уже существующего в корзине товара', () => {
    const cart = [{ id: 1, name: 'корм Обжорка', price: 1000, quantity: 1 }]
    const product = { id: 1, name: 'игрушка Мышка', price: 1800 }

    addToCart(cart, product)

    expect(cart[0].quantity).toBe(2)
  })
})

describe('removeFromCart', () => {
  it('должна удалять товар из корзины по id', () => {
    const cart = [
      { id: 1, name: 'корм Обжорка', price: 1000, quantity: 1 },
      { id: 2, name: 'игрушка Мышка', price: 1800, quantity: 1 },
    ]

    expect(removeFromCart(cart, 1)).toEqual([
      { id: 2, name: 'игрушка Мышка', price: 1800, quantity: 1 },
    ])
  })
})

describe('itemTotal', () => {
  it('должна считать сумму строки', () => {
    const item = { id: 1, name: 'корм Обжорка', price: 1000, quantity: 3 }

    expect(itemTotal(item)).toBe(3000)
  })
})

describe('updateQuantity', () => {
  it('должна изменять количество товара', () => {
    const cart = [{ id: 1, name: 'корм Обжорка', price: 1000, quantity: 1 }]

    updateQuantity(cart, 1, 3)

    expect(cart[0].quantity).toBe(3)
  })

  it('не должна уменьшать количество товара меньше 1', () => {
    const cart = [{ id: 1, name: 'корм Обжорка', price: 1000, quantity: 1 }]

    updateQuantity(cart, 1, 0)

    expect(cart[0].quantity).toBe(1)
  })
})

describe('calculateTotal', () => {
  it('должна считать общую сумму', () => {
    const items = [
      { id: 1, name: 'корм Обжорка', price: 1000, quantity: 2 },
      { id: 2, name: 'игрушка Мышка', price: 500, quantity: 3 },
    ]

    expect(calculateTotal(items)).toBe(3500)
  })

  it('должна возвращать 0 для пустой корзины', () => {
    expect(calculateTotal([])).toBe(0)
  })
})
