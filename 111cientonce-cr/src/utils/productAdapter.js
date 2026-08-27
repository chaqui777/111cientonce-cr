/**
 * productAdapter.js
 * ------------------------------------------------------------------
 * Capa de adaptación entre la fuente de datos cruda (hoy: products.js)
 * y el resto de la aplicación.
 *
 * Ningún componente debe importar `src/data/products.js` directamente.
 * Todos deben pasar por las funciones de este archivo.
 *
 * ¿Por qué existe esto?
 * El catálogo oficial de 111cientonce tiene ~416 productos y, a futuro,
 * esta fuente podría cambiar a Shopify, un CMS, Google Sheets, una API
 * propia o un sistema de inventario. Cuando eso pase, solo este archivo
 * necesita cambiar (por ejemplo, `getAllProducts` pasaría a hacer un
 * fetch en vez de leer un array local). Los componentes seguirán
 * llamando a las mismas funciones con la misma forma de datos.
 *
 * Modelo conceptual (ver README):
 *   CATÁLOGO OFICIAL → INVENTARIO DEL DISTRIBUIDOR → CATÁLOGO DE LA TIENDA
 *
 * Hoy el "inventario del distribuidor" es solo `available: true/false`.
 * Este adaptador ya deja espacio (`stock`, `inventory`) para cuando eso
 * se vuelva más granular, sin que la UI tenga que cambiar su forma de
 * consumir los productos.
 * ------------------------------------------------------------------
 */

import rawProducts, { CATEGORIES, GENDERS } from '../data/products.js'

export { CATEGORIES, GENDERS }

/**
 * Forma normalizada y estable que consume toda la UI.
 *
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} sku
 * @property {string} name
 * @property {string} category
 * @property {string} gender
 * @property {string[]} sizes
 * @property {number|null} price
 * @property {string} currency
 * @property {boolean} available
 * @property {string|null} image
 * @property {string} description
 * @property {string} dorsal        - Número de dorsal visual (derivado del id).
 * @property {number|null} stock    - Reservado para Fase 2 (cantidad total). No usado aún.
 * @property {Object|null} inventory - Reservado para Fase 2 (stock por talla). No usado aún.
 */

/**
 * Normaliza un producto crudo a la forma estable `Product`.
 * Rellena valores por defecto para que el resto de la app nunca
 * tenga que revisar `undefined`.
 * @param {*} raw
 * @returns {Product}
 */
function normalizeProduct(raw) {
  return {
    id: String(raw.id),
    sku: raw.sku ?? raw.id,
    name: raw.name ?? 'Producto sin nombre',
    category: raw.category ?? 'Sin categoría',
    gender: raw.gender ?? 'Unisex',
    sizes: Array.isArray(raw.sizes) ? raw.sizes : [],
    price: typeof raw.price === 'number' ? raw.price : null,
    currency: raw.currency ?? 'CRC',
    available: Boolean(raw.available),
    image: raw.image ?? null,
    description: raw.description ?? '',
    dorsal: String(raw.id),
    // Campos preparados para Fase 2 (inventario real). No implementados todavía.
    stock: raw.stock ?? null,
    inventory: raw.inventory ?? null,
  }
}

// Se normaliza una sola vez al cargar el módulo, no en cada render.
const normalizedProducts = rawProducts.map(normalizeProduct)

/**
 * Devuelve todos los productos normalizados.
 * En una futura integración (Shopify/API), esta función podría
 * convertirse en async sin cambiar cómo se usa desde la UI
 * (por ejemplo con un hook `useProducts` que maneje el estado de carga).
 * @returns {Product[]}
 */
export function getAllProducts() {
  return normalizedProducts
}

/**
 * Devuelve las categorías reales del catálogo (sin incluir "Todo",
 * que es una categoría virtual manejada por la UI).
 * @returns {string[]}
 */
export function getCategories() {
  return CATEGORIES
}

/**
 * Devuelve los géneros reales del catálogo (sin incluir "Todos",
 * que es un género virtual manejado por la UI).
 * @returns {string[]}
 */
export function getGenders() {
  return GENDERS
}

/**
 * Busca un producto por id.
 * @param {string} id
 * @returns {Product|undefined}
 */
export function getProductById(id) {
  return normalizedProducts.find((p) => p.id === String(id))
}

/**
 * Filtra productos por categoría, género y/o texto de búsqueda, de forma combinada.
 *
 * @param {Object} options
 * @param {string} [options.category] - Nombre de categoría, o 'Todo'/undefined para no filtrar.
 * @param {string} [options.gender] - 'Hombre' | 'Mujer', o 'Todos'/undefined para no filtrar.
 *   Los productos 'Unisex' aparecen tanto en 'Hombre' como en 'Mujer'.
 * @param {string} [options.query] - Texto de búsqueda (nombre, SKU o categoría).
 * @returns {Product[]}
 */
export function filterProducts({ category, gender, query } = {}) {
  let result = normalizedProducts

  if (category && category !== 'Todo') {
    result = result.filter((p) => p.category === category)
  }

  if (gender && gender !== 'Todos') {
    result = result.filter((p) => p.gender === gender || p.gender === 'Unisex')
  }

  const term = (query ?? '').trim().toLowerCase()
  if (term.length > 0) {
    result = result.filter((p) => {
      return (
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      )
    })
  }

  return result
}
