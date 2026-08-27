/**
 * whatsapp.js
 * ------------------------------------------------------------------
 * Construcción del mensaje de WhatsApp y de las URLs wa.me.
 * Toda la lógica de WhatsApp vive aquí (no dentro de componentes),
 * para que sea fácil de encontrar y modificar en un solo lugar.
 *
 * PARA CAMBIAR EL NÚMERO DE WHATSAPP DEL NEGOCIO:
 * edita la constante WHATSAPP_NUMBER más abajo. Ver README.md.
 * ------------------------------------------------------------------
 */

import { formatPrice } from './formatPrice.js'

// Número de WhatsApp del negocio, en formato internacional (506 = Costa Rica).
export const WHATSAPP_NUMBER = '50688145190'
// Mismo número en formato local, solo para mostrar en la UI (footer, etc).
export const WHATSAPP_DISPLAY = '8814-5190'

/**
 * Arma el bloque de texto para un grupo de líneas de carrito (disponibles
 * o encargos especiales).
 * @param {Array<{ product: object, size: string|null, quantity: number, subtotal: number|null }>} lines
 * @returns {string}
 */
function buildLinesBlock(lines) {
  return lines
    .map((line) => {
      const parts = [`${line.quantity}x ${line.product.name}`]
      if (line.size) parts.push(`Talla: ${line.size}`)
      const priceText = formatPrice(line.product.price, line.product.currency)
      if (priceText) parts.push(`Precio: ${priceText}`)
      return parts.join('\n')
    })
    .join('\n\n')
}

/**
 * Arma el mensaje consolidado de pedido, separando productos disponibles
 * de encargos especiales, listo para enviar por WhatsApp.
 *
 * @param {{ available: Array, specialOrder: Array }} splitLines
 * @returns {string}
 */
export function buildOrderMessage({ available, specialOrder }) {
  const sections = ['Hola, quiero realizar este pedido:']

  if (available.length > 0) {
    sections.push(`PRODUCTOS DISPONIBLES\n\n${buildLinesBlock(available)}`)
  }

  if (specialOrder.length > 0) {
    sections.push(`ENCARGOS ESPECIALES\n\n${buildLinesBlock(specialOrder)}`)
  }

  sections.push('¿Me pueden confirmar disponibilidad, precio y detalles del pedido?\n\nGracias.')

  return sections.join('\n\n')
}

/**
 * Construye una URL wa.me a partir de un texto, codificando correctamente
 * el mensaje. Funciona tanto en móvil como en escritorio.
 * @param {string} text
 * @returns {string}
 */
export function buildWhatsAppUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

/**
 * URL de WhatsApp para el pedido consolidado del carrito.
 * @param {{ available: Array, specialOrder: Array }} splitLines
 * @returns {string}
 */
export function buildOrderWhatsAppUrl(splitLines) {
  return buildWhatsAppUrl(buildOrderMessage(splitLines))
}

/** Mensaje sugerido para el banner de "no encuentro lo que busco". */
export const SPECIAL_ORDER_INQUIRY_MESSAGE =
  'Hola, quisiera consultar por un producto de 111cientonce que no aparece en el catálogo.'

/** URL de WhatsApp para la consulta general de encargo especial. */
export function buildSpecialOrderInquiryUrl() {
  return buildWhatsAppUrl(SPECIAL_ORDER_INQUIRY_MESSAGE)
}
