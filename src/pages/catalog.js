import { products } from '../data/products.js'
import { cart, addToCart } from '../scripts/cart.js'

export function renderCatalog() {
  const section = document.createElement('section')
  section.className = 'catalog'
  section.innerHTML = `
    <h1>Каталог</h1>
    <ul class="catalog__list"></ul>
  `

  const list = section.querySelector('.catalog__list')

  products.forEach((product) => {
    const card = document.createElement('li')
    card.className = 'product-card'
    card.innerHTML = `
      <img class="product-card__image" src="${product.image}" alt="${product.name}" />
      <h2 class="product-card__title">${product.name}</h2>
      <p class="product-card__category">${product.category}</p>
      <p class="product-card__price">${product.price} ₸</p>
      <button class="product-card__button">В корзину</button>
    `

    card
      .querySelector('.product-card__button')
      .addEventListener('click', () => addToCart(cart, product))

    list.append(card)
  })

  return section
}
