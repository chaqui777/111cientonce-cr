import styles from './Hero.module.css'

const QUICK_CATEGORIES = ['Ciclismo', 'Triatlón', 'Running', 'Urbano']

/**
 * Sección hero: copy original y provisional (no textos oficiales de la marca).
 */
function Hero({ onSelectCategory }) {
  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <p className={`mono ${styles.eyebrow}`}>DISTRIBUIDOR AUTORIZADO · COSTA RICA</p>

        <h1 className={styles.title}>
          111CIENTONCE
          <span className={styles.titleLine}>COSTA RICA</span>
        </h1>

        <p className={styles.subtitle}>
          Equipo técnico para tu próxima carrera. Ciclismo, triatlón, running y calle —
          disponible ahora o como encargo especial.
        </p>

        <div className={styles.quickCategories}>
          {QUICK_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={styles.pill}
              onClick={() => onSelectCategory?.(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <a href="#catalogo" className={styles.cta}>
          VER CATÁLOGO
        </a>
      </div>

      <div className={styles.trackLine} aria-hidden="true" />
    </section>
  )
}

export default Hero
