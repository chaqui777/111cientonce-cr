import { WHATSAPP_DISPLAY, buildWhatsAppUrl } from '../utils/whatsapp.js'
import { CATEGORIES } from '../utils/productAdapter.js'

/**
 * Footer deportivo y limpio. No se inventan redes sociales, dirección
 * ni correo — solo la información que sí fue provista (WhatsApp).
 */
import styles from './Footer.module.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contacto" className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <p className={styles.brandName}>111CIENTONCE COSTA RICA</p>
          <p className={`mono ${styles.brandTag}`}>DISTRIBUIDOR AUTORIZADO</p>
        </div>

        <nav className={styles.categories} aria-label="Categorías">
          {CATEGORIES.map((category) => (
            <span key={category} className={styles.categoryItem}>
              {category}
            </span>
          ))}
        </nav>

        <div className={styles.contact}>
          <p className={`mono ${styles.contactLabel}`}>WHATSAPP</p>
          <a
            href={buildWhatsAppUrl('Hola, tengo una consulta sobre 111cientonce Costa Rica.')}
            target="_blank"
            rel="noreferrer"
            className={styles.contactLink}
          >
            {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={`mono ${styles.copy}`}>© {year} 111CIENTONCE COSTA RICA — Sitio de demostración</p>
      </div>
    </footer>
  )
}

export default Footer
