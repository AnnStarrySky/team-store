import { renderAbout } from './pages/about.js'
import { renderCatalog } from './pages/catalog.js'
import { renderCart } from './pages/cart.js'
import { cart, getCartCount } from './scripts/cart.js'

import './styles/main.css'

const content = document.querySelector('.content')

const cartCount = document.querySelector('#cart-count')

function updateCartCount() {
  cartCount.textContent = getCartCount(cart)
}

window.addEventListener('cart:updated', updateCartCount)

updateCartCount()

function showPage(renderFn) {
  content.innerHTML = ''
  content.appendChild(renderFn())
}

const routes = [
  { selector: '.btn-about', render: renderAbout },
  { selector: '.btn-catalog', render: renderCatalog },
  { selector: '.btn-cart', render: renderCart },
]

routes.forEach(({ selector, render }) => {
  const elements = document.querySelectorAll(selector)
  elements.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      showPage(render)
    })
  })
})

showPage(renderAbout)
