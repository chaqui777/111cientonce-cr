import styles from './SearchBar.module.css'

/**
 * Buscador por nombre, SKU o categoría. Se combina con el filtro de
 * categoría activo (la lógica de combinación vive en productAdapter).
 */
function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor="product-search" className="visually-hidden">
        Buscar producto
      </label>
      <span className={styles.icon} aria-hidden="true">
        🔍
      </span>
      <input
        id="product-search"
        type="search"
        className={styles.input}
        placeholder="Buscar producto..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
