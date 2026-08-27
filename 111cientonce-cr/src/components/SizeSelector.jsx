import styles from './SizeSelector.module.css'

/**
 * Selector de talla reutilizable (chips). La talla seleccionada queda
 * marcada visualmente. Usado tanto en la card como en la ficha de producto.
 */
function SizeSelector({ sizes, selected, onSelect, error }) {
  if (!sizes || sizes.length === 0) return null

  return (
    <div>
      <p className={`mono ${styles.label}`}>TALLA</p>
      <div className={styles.chips}>
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={`mono ${styles.chip} ${selected === size ? styles.chipActive : ''}`}
            aria-pressed={selected === size}
            onClick={() => onSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
      {error && <p className={styles.error}>Selecciona una talla</p>}
    </div>
  )
}

export default SizeSelector
