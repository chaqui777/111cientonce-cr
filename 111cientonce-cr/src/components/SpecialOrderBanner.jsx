import styles from './SpecialOrderBanner.module.css'
import { buildSpecialOrderInquiryUrl } from '../utils/whatsapp.js'

/**
 * Banner al final del catálogo para productos de 111cientonce que no
 * están en esta demo. Abre WhatsApp directamente con un mensaje sugerido.
 */
function SpecialOrderBanner() {
  return (
    <section id="encargo-especial" className={styles.banner}>
      <div className="container">
        <h2 className={styles.title}>¿NO ENCUENTRAS LO QUE BUSCAS?</h2>
        <p className={styles.text}>
          Podemos ayudarte a solicitar otros productos de 111cientonce.
        </p>
        <a
          href={buildSpecialOrderInquiryUrl()}
          target="_blank"
          rel="noreferrer"
          className={styles.cta}
        >
          SOLICITAR POR WHATSAPP
        </a>
      </div>
    </section>
  )
}

export default SpecialOrderBanner
