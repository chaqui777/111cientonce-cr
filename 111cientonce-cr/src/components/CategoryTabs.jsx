import styles from './CategoryTabs.module.css'

const ALL_LABEL = 'Todo'

/**
 * Navegación por categorías como tabs/chips desplazables horizontalmente
 * en móvil. "Todo" es una categoría virtual manejada por la UI.
 */
function CategoryTabs({ categories, selected, onSelect }) {
  const tabs = [ALL_LABEL, ...categories]

  return (
    <div className={styles.wrapper}>
      <div className={styles.scroller} role="tablist" aria-label="Categorías de producto">
        {tabs.map((tab) => {
          const isActive = tab === selected
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              onClick={() => onSelect(tab)}
            >
              {tab.toUpperCase()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryTabs
