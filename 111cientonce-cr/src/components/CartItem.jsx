import styles from './CartItem.module.css'
import { formatPrice } from '../utils/formatPrice.js'

/**
 * Una línea del carrito ya resuelta contra el catálogo
 * (line.product viene de resolveCartLines en utils/cart.js).
 */
function CartItem({ line, onUpdateQuantity, onRemove }) {
  const { product, size, quantity, subtotal } = line
  const priceText = formatPrice(product.price, product.currency)
  const subtotalText = formatPrice(subtotal, product.currency)

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        {size && <p className={`mono ${styles.meta}`}>Talla {size}</p>}
        {priceText && <p className={`mono ${styles.meta}`}>{priceText} c/u</p>}
        {!product.available && <p className={`mono ${styles.specialTag}`}>ENCARGO ESPECIAL</p>}
      </div>

      <div className={styles.controls}>
        <div className={styles.qty}>
          <button
            type="button"
            onClick={() => onUpdateQuantity(product.id, size, quantity - 1)}
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <span className="mono">{quantity}</span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(product.id, size, quantity + 1)}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>

        {subtotalText && <p className={`mono ${styles.subtotal}`}>{subtotalText}</p>}

        <button
          type="button"
          className={styles.remove}
          onClick={() => onRemove(product.id, size)}
          aria-label={`Eliminar ${product.name} del carrito`}
        >
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default CartItem
