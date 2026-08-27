/**
 * cart.js
 * ------------------------------------------------------------------
 * Lógica del carrito, aislada de los componentes.
 *
 * Cada línea del carrito solo guarda una referencia liviana:
 *   { productId, size, quantity }
 * El producto completo se resuelve desde el catálogo (vía
 * productAdapter) cuando hace falta mostrarlo. Esto evita duplicar
 * información y facilita conectar el carrito a inventario real más
 * adelante (Fase 2): solo hay que validar `quantity` contra el
 * inventario real al momento de resolver la línea.
 * ------------------------------------------------------------------
 */

import { getProductById } from './productAdapter.js'

/**
 * @typedef {Object} CartLine
 * @property {string} productId
 * @property {string|null} size - null cuando el producto no maneja tallas.
 * @property {number} quantity
 */

/**
 * Devuelve una clave única para identificar una línea (mismo producto +
 * misma talla = misma línea; distinta talla = línea distinta).
 * @param {string} productId
 * @param {string|null} size
 */
function lineKey(productId, size) {
  return `${productId}::${size ?? ''}`
}

/**
 * Agrega un producto al carrito. Si ya existe una línea con el mismo
 * producto y la misma talla, suma la cantidad en vez de duplicar la línea.
 *
 * @param {CartLine[]} cartLines
 * @param {{ productId: string, size: string|null, quantity: number }} item
 * @returns {CartLine[]} Nuevo array de líneas (no muta el original).
 */
export function addToCart(cartLines, { productId, size = null, quantity = 1 }) {
  const safeQuantity = Math.max(1, Math.floor(quantity) || 1)
  const key = lineKey(productId, size)
  const existingIndex = cartLines.findIndex((l) => lineKey(l.productId, l.size) === key)

  if (existingIndex !== -1) {
    const updated = [...cartLines]
    updated[existingIndex] = {
      ...updated[existingIndex],
      quantity: updated[existingIndex].quantity + safeQuantity,
    }
    return updated
  }

  return [...cartLines, { productId, size, quantity: safeQuantity }]
}

/**
 * Actualiza la cantidad de una línea específica. No permite bajar de 1
 * (para eliminar una línea se usa removeFromCart).
 * @param {CartLine[]} cartLines
 * @param {string} productId
 * @param {string|null} size
 * @param {number} quantity
 * @returns {CartLine[]}
 */
export function updateQuantity(cartLines, productId, size, quantity) {
  const safeQuantity = Math.max(1, Math.floor(quantity) || 1)
  const key = lineKey(productId, size)
  return cartLines.map((l) =>
    lineKey(l.productId, l.size) === key ? { ...l, quantity: safeQuantity } : l
  )
}

/**
 * Elimina una línea del carrito.
 * @param {CartLine[]} cartLines
 * @param {string} productId
 * @param {string|null} size
 * @returns {CartLine[]}
 */
export function removeFromCart(cartLines, productId, size) {
  const key = lineKey(productId, size)
  return cartLines.filter((l) => lineKey(l.productId, l.size) !== key)
}

/**
 * Suma el total de unidades en el carrito (para el badge del botón flotante).
 * @param {CartLine[]} cartLines
 * @returns {number}
 */
export function getTotalUnits(cartLines) {
  return cartLines.reduce((sum, l) => sum + l.quantity, 0)
}

/**
 * Resuelve cada línea del carrito contra el catálogo actual, devolviendo
 * el producto completo, subtotal y disponibilidad junto a la línea.
 * Descarta silenciosamente líneas cuyo producto ya no existe en el catálogo.
 *
 * @param {CartLine[]} cartLines
 * @returns {Array<CartLine & { product: object, subtotal: number|null }>}
 */
export function resolveCartLines(cartLines) {
  return cartLines
    .map((line) => {
      const product = getProductById(line.productId)
      if (!product) return null
      const subtotal = typeof product.price === 'number' ? product.price * line.quantity : null
      return { ...line, product, subtotal }
    })
    .filter(Boolean)
}

/**
 * Separa las líneas resueltas del carrito entre productos disponibles
 * y encargos especiales (available === false), tal como deben mostrarse
 * en el carrito y en el mensaje de WhatsApp.
 *
 * @param {ReturnType<typeof resolveCartLines>} resolvedLines
 * @returns {{ available: Array, specialOrder: Array }}
 */
export function splitByAvailability(resolvedLines) {
  return {
    available: resolvedLines.filter((l) => l.product.available),
    specialOrder: resolvedLines.filter((l) => !l.product.available),
  }
}
