import { renderAbout } from './pages/about.js'
import { renderCatalog } from './pages/catalog.js'
import { renderCart } from './pages/cart.js'

import './styles/main.css'

const content = document.querySelector('.content')

function showPage(renderFn) {
  content.innerHTML = ''
  content.appendChild(renderFn())
}

document
  .querySelector('.btn-about')
  .addEventListener('click', () => showPage(renderAbout))
document
  .querySelector('.btn-catalog')
  .addEventListener('click', () => showPage(renderCatalog))
document
  .querySelector('.btn-cart')
  .addEventListener('click', () => showPage(renderCart))

showPage(renderAbout)
