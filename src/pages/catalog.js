import { products } from '../data/products.js'
import { cart, addToCart } from '../scripts/cart.js'
import {
  defaultFilters,
  getCategories,
  applyFilters,
} from '../scripts/filters.js'

import '../styles/catalog.css'

function createCard(product) {
  const card = document.createElement('li')
  card.className = 'product-card'
  card.innerHTML = `
    <img class="product-card__image" src="${import.meta.env.BASE_URL}${product.image}" alt="${product.name}" />
    <h2 class="product-card__title">${product.name}</h2>
    <p class="product-card__category">${product.category}</p>
    <p class="product-card__price">${product.price} ₸</p>
    <button class="product-card__button">В корзину</button>
  `

  card
    .querySelector('.product-card__button')
    .addEventListener('click', () => addToCart(cart, product))

  return card
}

export function renderCatalog() {
  const filters = { ...defaultFilters }

  const categoryOptions = getCategories(products)
    .map((category) => `<option value="${category}">${category}</option>`)
    .join('')

  const section = document.createElement('section')
  section.className = 'catalog'
  section.innerHTML = `
    <h1 class="catalog__title">Каталог</h1>
    <div class="catalog__filters">
      <input class="catalog__search" type="search" placeholder="Поиск по названию" />
      <select class="catalog__category">
        <option value="all">Все категории</option>
        ${categoryOptions}
      </select>
      <input class="catalog__price-min" type="number" min="0" placeholder="Цена от" />
      <input class="catalog__price-max" type="number" min="0" placeholder="Цена до" />
      <select class="catalog__sort">
        <option value="default">Без сортировки</option>
        <option value="price-asc">Цена по возрастанию</option>
        <option value="price-desc">Цена по убыванию</option>
      </select>
      <button class="catalog__reset" type="button">Сбросить</button>
    </div>
    <p class="catalog__empty" hidden>Ничего не найдено</p>
    <ul class="catalog__list"></ul>
  `

  const search = section.querySelector('.catalog__search')
  const category = section.querySelector('.catalog__category')
  const priceMin = section.querySelector('.catalog__price-min')
  const priceMax = section.querySelector('.catalog__price-max')
  const sort = section.querySelector('.catalog__sort')
  const reset = section.querySelector('.catalog__reset')
  const empty = section.querySelector('.catalog__empty')
  const list = section.querySelector('.catalog__list')

  function renderList() {
    const visible = applyFilters(products, filters)
    empty.hidden = visible.length > 0
    list.replaceChildren(...visible.map(createCard))
  }

  search.addEventListener('input', () => {
    filters.search = search.value
    renderList()
  })
  category.addEventListener('change', () => {
    filters.category = category.value
    renderList()
  })
  priceMin.addEventListener('input', () => {
    filters.minPrice = priceMin.value
    renderList()
  })
  priceMax.addEventListener('input', () => {
    filters.maxPrice = priceMax.value
    renderList()
  })
  sort.addEventListener('change', () => {
    filters.sort = sort.value
    renderList()
  })

  reset.addEventListener('click', () => {
    Object.assign(filters, defaultFilters)
    search.value = ''
    category.value = 'all'
    priceMin.value = ''
    priceMax.value = ''
    sort.value = 'default'
    renderList()
  })

  renderList()

  return section
}
