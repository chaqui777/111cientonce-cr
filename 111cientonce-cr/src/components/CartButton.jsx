import styles from './CartButton.module.css'

/**
 * Botón flotante fijo (esquina inferior) que abre el carrito y muestra
 * el total de unidades.
 */
function CartButton({ totalUnits, onClick }) {
  return (
    <button type="button" className={styles.button} onClick={onClick} aria-label={`Abrir carrito, ${totalUnits} unidades`}>
      <span aria-hidden="true">🛒</span>
      <span className="mono">{totalUnits}</span>
    </button>
  )
}

export default CartButton
