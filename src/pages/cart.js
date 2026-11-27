import {
  cart,
  removeFromCart,
  updateQuantity,
  itemTotal,
  applyPromoCode,
} from '../scripts/cart.js'

import '../styles/cart.css'

export function renderCart() {
  const section = document.createElement('section')
  section.className = 'cart'

  let promoCode = ''

  function render() {
    section.innerHTML = '<h1 class="cart__title">Корзина</h1>'

    if (cart.length === 0) {
      section.innerHTML += `
        <p class="cart__empty">Корзина пуста</p>
      `
      return
    }

    const itemsList = document.createElement('div')
    itemsList.className = 'cart__list'

    cart.forEach((item) => {
      const itemElement = document.createElement('div')
      itemElement.className = 'cart-item'

      itemElement.innerHTML = `
        <div class="cart-item__info">
          <h3 class="cart-item__title">${item.name}</h3>
          <img class="product-card__image" src=${item.image} alt="${item.name}">
          <p class="cart-item__price">Цена: ${item.price} ₸</p>
        </div>
        <div class="cart-item__quantity">
          <button class="btn btn--light" data-action="decrease">−</button>
          <span>${item.quantity}</span>
          <button class="btn btn--light" data-action="increase">+</button>
        </div>
        <p class="cart-item__sum">Сумма: ${itemTotal(item)} ₸</p>
        <button class="btn" data-action="remove">Удалить</button>
      `

      itemElement
        .querySelector('[data-action="decrease"]')
        .addEventListener('click', () => {
          updateQuantity(cart, item.id, item.quantity - 1)
          window.dispatchEvent(new CustomEvent('cart:updated'))
          render()
        })

      itemElement
        .querySelector('[data-action="increase"]')
        .addEventListener('click', () => {
          updateQuantity(cart, item.id, item.quantity + 1)
          window.dispatchEvent(new CustomEvent('cart:updated'))
          render()
        })

      itemElement
        .querySelector('[data-action="remove"]')
        .addEventListener('click', () => {
          const updatedCart = removeFromCart(cart, item.id)
          cart.splice(0, cart.length, ...updatedCart)
          window.dispatchEvent(new CustomEvent('cart:updated'))
          render()
        })

      itemsList.append(itemElement)
    })

    section.append(itemsList)

    const promoResult = applyPromoCode(cart, promoCode)

    const promoContainer = document.createElement('div')
    promoContainer.className = 'cart__promo'

    const promoInput = document.createElement('input')
    promoInput.className = 'input cart__promo-input'
    promoInput.type = 'text'
    promoInput.placeholder = 'Введите промокод'
    promoInput.value = promoCode

    const promoBtn = document.createElement('button')
    promoBtn.className = 'btn'
    promoBtn.textContent = 'Применить'

    const promoMessage = document.createElement('p')
    promoMessage.className = 'cart__promo-message'
    promoMessage.textContent = promoResult.message

    promoBtn.addEventListener('click', () => {
      promoCode = promoInput.value
      render()
    })

    promoContainer.append(promoInput, promoBtn, promoMessage)
    section.append(promoContainer)

    const totalElement = document.createElement('div')
    totalElement.className = 'cart__summary'
    totalElement.innerHTML = `
      <p>Сумма без скидки: ${promoResult.total} ₸</p>
      <p>Скидка: ${promoResult.discount} ₸</p>
      <p class="cart__total">Итого: ${promoResult.totalFinal} ₸</p>
    `
    section.append(totalElement)
  }

  render()

  return section
}
