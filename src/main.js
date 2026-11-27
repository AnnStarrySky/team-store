import { renderAbout } from './pages/about.js'
import { renderCatalog } from './pages/catalog.js'
import { renderCart } from './pages/cart.js'

import './styles/main.css'

const content = document.querySelector('.content')

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
  document.querySelector(selector).addEventListener('click', (e) => {
    e.preventDefault()
    showPage(render)
  })
})

showPage(renderAbout)
