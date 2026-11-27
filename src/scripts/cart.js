export const cart = []

export function addToCart(items, product) {
  const existingItem = items.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    items.push({ ...product, quantity: 1 })
  }

  return items
}

export function removeFromCart(items, productId) {
  return items.filter((item) => item.id !== productId)
}

export function updateQuantity(items, productId, quantity) {
  const item = items.find((item) => item.id === productId)

  if (item) {
    item.quantity = Math.max(1, quantity)
  }

  return items
}

export function itemTotal(item) {
  return item.price * item.quantity
}

export function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + itemTotal(item)
  }, 0)
}

export function applyPromoCode(items, promoCode) {
  const total = calculateTotal(items)
  const code = promoCode.trim().toUpperCase()

  let discount = 0
  let message = ''

  if (code === 'SALE10') {
    discount = total * 0.1
    message = 'Прормокод применился'
  } else if (code !== '') {
    message = 'Неправильный промокод'
  }

  return {
    total,
    discount,
    totalFinal: total - discount,
    message,
  }
}

export function getCartCount(items) {
  return items.reduce((total, item) => {
    return total + item.quantity
  }, 0)
}
