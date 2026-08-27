import { useEffect, useState } from 'react'
import styles from './ProductModal.module.css'
import { formatPriceOrConsultar } from '../utils/formatPrice.js'
import SizeSelector from './SizeSelector.jsx'

/**
 * Ficha de producto (modal). Muestra el detalle completo y permite
 * elegir talla + cantidad antes de agregar al carrito.
 */
function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [sizeError, setSizeError] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!product) return null

  const hasSizes = product.sizes.length > 0
  const priceText = formatPriceOrConsultar(product.price, product.currency)

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1))
  const increaseQty = () => setQuantity((q) => q + 1)

  const handleAdd = () => {
    if (hasSizes && !selectedSize) {
      setSizeError(true)
      return
    }
    onAddToCart(product, selectedSize, quantity)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalle de ${product.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <div className={styles.imageWrap}>
          <span className={`mono ${styles.dorsal}`}>#{product.dorsal}</span>
          {!product.available && (
            <span className={`mono ${styles.badge}`}>BAJO PEDIDO</span>
          )}
          <div className={styles.placeholder} aria-hidden="true">
            <span>111</span>
          </div>
        </div>

        <div className={styles.body}>
          <p className={`mono ${styles.category}`}>
            {product.category}
            {product.gender !== 'Unisex' && ` · ${product.gender}`}
          </p>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={`mono ${styles.sku}`}>SKU {product.sku}</p>

          <p className={styles.price}>{priceText}</p>

          <p className={styles.availability}>
            {product.available ? 'Disponible en inventario' : 'Bajo pedido · encargo especial'}
          </p>

          {product.description && <p className={styles.description}>{product.description}</p>}

          {hasSizes && (
            <SizeSelector
              sizes={product.sizes}
              selected={selectedSize}
              onSelect={(size) => {
                setSelectedSize(size)
                setSizeError(false)
              }}
              error={sizeError}
            />
          )}

          <div className={styles.qtyRow}>
            <p className={`mono ${styles.qtyLabel}`}>CANTIDAD</p>
            <div className={styles.qtyControls}>
              <button type="button" onClick={decreaseQty} aria-label="Disminuir cantidad">
                −
              </button>
              <span className="mono">{quantity}</span>
              <button type="button" onClick={increaseQty} aria-label="Aumentar cantidad">
                +
              </button>
            </div>
          </div>

          <button type="button" className={styles.addButton} onClick={handleAdd}>
            {product.available ? 'AGREGAR AL CARRITO' : 'AGREGAR COMO ENCARGO'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
