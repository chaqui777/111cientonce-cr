import { useEffect } from 'react'
import styles from './CartDrawer.module.css'
import CartItem from './CartItem.jsx'
import { resolveCartLines, splitByAvailability, getTotalUnits } from '../utils/cart.js'
import { buildOrderWhatsAppUrl } from '../utils/whatsapp.js'

/**
 * Carrito (drawer). Separa visualmente productos disponibles de
 * encargos especiales y arma el pedido consolidado de WhatsApp.
 */
function CartDrawer({ isOpen, cartLines, onClose, onUpdateQuantity, onRemove }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const resolvedLines = resolveCartLines(cartLines)
  const { available, specialOrder } = splitByAvailability(resolvedLines)
  const totalUnits = getTotalUnits(cartLines)
  const isEmpty = resolvedLines.length === 0

  const whatsappUrl = buildOrderWhatsAppUrl({ available, specialOrder })

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>Tu carrito</h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar carrito">
            ✕
          </button>
        </header>

        <div className={styles.content}>
          {isEmpty && <p className={styles.emptyState}>Tu carrito está vacío.</p>}

          {available.length > 0 && (
            <section>
              <p className={`mono ${styles.sectionTitle}`}>PRODUCTOS DISPONIBLES</p>
              <ul className={styles.list}>
                {available.map((line) => (
                  <CartItem
                    key={`${line.product.id}-${line.size ?? 'nosize'}`}
                    line={line}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </ul>
            </section>
          )}

          {specialOrder.length > 0 && (
            <section>
              <p className={`mono ${styles.sectionTitle} ${styles.specialSectionTitle}`}>ENCARGOS ESPECIALES</p>
              <ul className={styles.list}>
                {specialOrder.map((line) => (
                  <CartItem
                    key={`${line.product.id}-${line.size ?? 'nosize'}`}
                    line={line}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </ul>
            </section>
          )}
        </div>

        {!isEmpty && (
          <footer className={styles.footer}>
            <p className={`mono ${styles.totalUnits}`}>{totalUnits} unidad{totalUnits === 1 ? '' : 'es'}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.sendButton}
            >
              ENVIAR PEDIDO POR WHATSAPP
            </a>
          </footer>
        )}
      </div>
    </div>
  )
}

export default CartDrawer
