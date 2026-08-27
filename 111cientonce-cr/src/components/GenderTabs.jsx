import styles from './GenderTabs.module.css'

const ALL_LABEL = 'Todos'

/**
 * Filtro Hombre/Mujer, como una segunda fila de tabs junto a categoría.
 * Reutiliza los estilos de CategoryTabs para mantener el mismo lenguaje visual.
 * Los productos 'Unisex' aparecen tanto en 'Hombre' como en 'Mujer'
 * (la lógica de eso vive en productAdapter.filterProducts).
 */
function GenderTabs({ genders, selected, onSelect }) {
  const tabs = [ALL_LABEL, ...genders.filter((g) => g !== 'Unisex')]

  return (
    <div className={styles.wrapper}>
      <div className={styles.scroller} role="tablist" aria-label="Filtro por género">
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

export default GenderTabs
