export const defaultFilters = {
  search: '',
  category: 'all',
  minPrice: '',
  maxPrice: '',
  sort: 'default',
}

function toNumberOrNull(value) {
  if (value === '') return null
  const number = Number(value)
  return Number.isNaN(number) ? null : number
}

export function getCategories(products) {
  return [...new Set(products.map((product) => product.category))]
}

export function filterProducts(products, filters = defaultFilters) {
  const query = filters.search.trim().toLowerCase()
  const min = toNumberOrNull(filters.minPrice)
  const max = toNumberOrNull(filters.maxPrice)

  return products.filter((product) => {
    if (query && !product.name.toLowerCase().includes(query)) return false
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false
    }
    if (min !== null && product.price < min) return false
    if (max !== null && product.price > max) return false
    return true
  })
}

export function sortProducts(products, sort = 'default') {
  const result = [...products]
  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
  return result
}

export function applyFilters(products, filters = defaultFilters) {
  return sortProducts(filterProducts(products, filters), filters.sort)
}
