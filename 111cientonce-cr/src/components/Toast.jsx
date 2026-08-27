import styles from './Toast.module.css'

/**
 * Confirmación visual no bloqueante (nunca alert() nativo del navegador).
 * App.jsx controla cuándo se muestra y por cuánto tiempo.
 */
function Toast({ message, visible }) {
  return (
    <div className={`${styles.toast} ${visible ? styles.visible : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  )
}

export default Toast
