import { useState } from 'react'
import styles from './ProductCard.module.css'
import { formatPrice } from '../utils/formatPrice.js'
import SizeSelector from './SizeSelector.jsx'

/**
 * Card de producto. Permite elegir talla (si aplica) y agregar al
 * carrito directamente, o abrir la ficha completa tocando la card.
 */
function ProductCard({ product, onAddToCart, onOpenDetail }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [sizeError, setSizeError] = useState(false)

  const hasSizes = product.sizes.length > 0
  const priceText = formatPrice(product.price, product.currency)

  const handleAdd = (e) => {
    e.stopPropagation()
    if (hasSizes && !selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    onAddToCart(product, selectedSize, 1)
  }

  const handleSelectSize = (size) => {
    setSelectedSize(size)
    setSizeError(false)
  }

  return (
    <article
      className={`${styles.card} ${!product.available ? styles.cardMuted : ''}`}
      onClick={() => onOpenDetail(product)}
    >
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
        <h3 className={styles.name}>{product.name}</h3>
        {priceText && <p className={styles.price}>{priceText}</p>}

        {hasSizes && (
          <div className={styles.sizes} onClick={(e) => e.stopPropagation()}>
            <SizeSelector
              sizes={product.sizes}
              selected={selectedSize}
              onSelect={handleSelectSize}
              error={sizeError}
            />
          </div>
        )}

        <button type="button" className={styles.addButton} onClick={handleAdd}>
          {product.available ? 'AGREGAR AL CARRITO' : 'AGREGAR COMO ENCARGO'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
