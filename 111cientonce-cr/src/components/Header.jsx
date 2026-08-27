import { useState } from 'react'
import styles from './Header.module.css'

/**
 * Header mobile-first: logo/nombre, navegación básica y acceso al carrito.
 * En móvil, la navegación se colapsa en un menú simple.
 */
function Header({ cartCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} onClick={closeMenu}>
          <span className={styles.brandName}>111CIENTONCE</span>
          <span className={styles.brandTag}>COSTA RICA</span>
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Navegación principal">
          <a href="#catalogo" className={styles.navLink} onClick={closeMenu}>
            Catálogo
          </a>
          <a href="#encargo-especial" className={styles.navLink} onClick={closeMenu}>
            Encargo especial
          </a>
          <a href="#contacto" className={styles.navLink} onClick={closeMenu}>
            Contacto
          </a>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cartButton}
            onClick={onOpenCart}
            aria-label={`Abrir carrito, ${cartCount} unidades`}
          >
            <span aria-hidden="true">🛒</span>
            <span className={`mono ${styles.cartCount}`}>{cartCount}</span>
          </button>

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
