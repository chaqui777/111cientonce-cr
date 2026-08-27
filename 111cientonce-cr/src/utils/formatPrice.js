/**
 * formatPrice.js
 * ------------------------------------------------------------------
 * Formato de precios. Los precios viven como datos (número + moneda),
 * nunca como texto escrito directamente en los componentes.
 * ------------------------------------------------------------------
 */

const CURRENCY_SYMBOLS = {
  CRC: '₡',
}

/**
 * Formatea un precio numérico como texto de moneda, ej. 45000 -> "₡45,000".
 * @param {number|null|undefined} price
 * @param {string} [currency='CRC']
 * @returns {string|null} El precio formateado, o null si no hay precio.
 */
export function formatPrice(price, currency = 'CRC') {
  if (price === null || price === undefined || Number.isNaN(price)) return null

  const symbol = CURRENCY_SYMBOLS[currency] ?? `${currency} `
  const formatted = new Intl.NumberFormat('en-US').format(price)
  return `${symbol}${formatted}`
}

/**
 * Igual que formatPrice, pero devuelve un texto de respaldo
 * ("Consultar precio") en vez de null cuando no hay precio.
 * @param {number|null|undefined} price
 * @param {string} [currency='CRC']
 * @returns {string}
 */
export function formatPriceOrConsultar(price, currency = 'CRC') {
  return formatPrice(price, currency) ?? 'Consultar precio'
}
