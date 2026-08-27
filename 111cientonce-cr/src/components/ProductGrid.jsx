import ProductCard from './ProductCard.jsx'
import styles from './ProductGrid.module.css'

/**
 * Grid de productos. Cuando se ven todas las categorías sin búsqueda
 * activa, agrupa por categoría con separadores decorativos estilo
 * "marcador de kilómetro". Con un filtro de categoría o búsqueda activa,
 * se muestra como una sola grilla plana.
 */
function ProductGrid({
  products,
  categories,
  selectedCategory,
  selectedGender,
  hasQuery,
  onAddToCart,
  onOpenDetail,
}) {
  if (products.length === 0) {
    const message = hasQuery
      ? 'No encontramos productos que coincidan con tu búsqueda.'
      : 'Todavía no tenemos productos en esta categoría — muy pronto agregamos más.'
    return <p className={styles.empty}>{message}</p>
  }

  const shouldGroup = selectedCategory === 'Todo' && (selectedGender ?? 'Todos') === 'Todos' && !hasQuery

  if (!shouldGroup) {
    return (
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    )
  }

  const groups = categories
    .map((category, index) => ({
      category,
      km: String(index + 1).padStart(2, '0'),
      items: products.filter((p) => p.category === category),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div>
      {groups.map((group) => (
        <section key={group.category} aria-label={group.category}>
          <div className="km-separator">
            <span>KM {group.km} · {group.category.toUpperCase()}</span>
          </div>
          <div className={styles.grid}>
            {group.items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default ProductGrid
