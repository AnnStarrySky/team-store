import {
  cart,
  removeFromCart,
  updateQuantity,
  itemTotal,
  applyPromoCode,
} from '../scripts/cart.js'

export function renderCart() {
  const section = document.createElement('section')

  let promoCode = ''

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

    const promoResult = applyPromoCode(cart, promoCode)

    const promoContainer = document.createElement('div')

    const promoInput = document.createElement('input')
    promoInput.type = 'text'
    promoInput.placeholder = 'Введите промокод'
    promoInput.value = promoCode

    const promoBtn = document.createElement('button')
    promoBtn.textContent = 'применить'

    const promoMessage = document.createElement('p')
    promoMessage.textContent = promoResult.message

    promoBtn.addEventListener('click', () => {
      promoCode = promoInput.value
      render()
    })

    promoContainer.append(promoInput, promoBtn, promoMessage)
    section.append(promoContainer)

    const totalElement = document.createElement('div')
    totalElement.innerHTML = `
      <p>Сумма без скидки: ${promoResult.total} ₸</p>
      <p>Скидка: ${promoResult.discount} ₸</p>
      <p>Итого: ${promoResult.totalFinal} ₸</p>
    `
    section.append(totalElement)
  }

  render()

  return section
}
