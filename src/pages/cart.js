import {
  cart,
  removeFromCart,
  updateQuantity,
  itemTotal,
  calculateTotal,
} from '../scripts/cart.js'

export function renderCart() {
  const section = document.createElement('section')

  function render() {
    section.innerHTML = '<h1>Корзина</h1>'

    if (cart.length === 0) {
      section.innerHTML += `
        <p>Корзина пуста</p>
        <p>Итого: 0 ₸</p>
      `
      return
    }

    const itemsList = document.createElement('div')

    cart.forEach((item) => {
      const itemElement = document.createElement('div')

      itemElement.innerHTML = `
        <h3>${item.name}</h3>
        <p>Цена: ${item.price} ₸</p>
        <button data-action="decrease">−</button>
        <span>${item.quantity}</span>
        <button data-action="increase">+</button>
        <p>Сумма: ${itemTotal(item)} ₸</p>
        <button data-action="remove">Удалить</button>
      `

      itemElement
        .querySelector('[data-action="decrease"]')
        .addEventListener('click', () => {
          updateQuantity(cart, item.id, item.quantity - 1)
          render()
        })

      itemElement
        .querySelector('[data-action="increase"]')
        .addEventListener('click', () => {
          updateQuantity(cart, item.id, item.quantity + 1)
          render()
        })

      itemElement
        .querySelector('[data-action="remove"]')
        .addEventListener('click', () => {
          const updatedCart = removeFromCart(cart, item.id)
          cart.splice(0, cart.length, ...updatedCart)
          render()
        })

      itemsList.append(itemElement)
    })

    section.append(itemsList)

    const totalElement = document.createElement('p')
    totalElement.textContent = `Итого: ${calculateTotal(cart)} ₸`
    section.append(totalElement)
  }

  render()

  return section
}
