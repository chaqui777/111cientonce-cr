import { useMemo, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import CategoryTabs from './components/CategoryTabs.jsx'
import GenderTabs from './components/GenderTabs.jsx'
import SearchBar from './components/SearchBar.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import SpecialOrderBanner from './components/SpecialOrderBanner.jsx'
import Footer from './components/Footer.jsx'
import CartButton from './components/CartButton.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import ProductModal from './components/ProductModal.jsx'
import Toast from './components/Toast.jsx'
import { filterProducts, getCategories, getGenders } from './utils/productAdapter.js'
import { addToCart, removeFromCart, updateQuantity, getTotalUnits } from './utils/cart.js'

const ALL_LABEL = 'Todo'
const ALL_GENDER_LABEL = 'Todos'
const TOAST_DURATION_MS = 2200

function App() {
  const [category, setCategory] = useState(ALL_LABEL)
  const [gender, setGender] = useState(ALL_GENDER_LABEL)
  const [query, setQuery] = useState('')
  const [cartLines, setCartLines] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState(null)
  const [toast, setToast] = useState({ message: '', visible: false })
  const toastTimeoutRef = useRef(null)

  const categories = useMemo(() => getCategories(), [])
  const genders = useMemo(() => getGenders(), [])
  const filteredProducts = useMemo(
    () => filterProducts({ category, gender, query }),
    [category, gender, query]
  )
  const totalUnits = useMemo(() => getTotalUnits(cartLines), [cartLines])

  const showToast = (message) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToast({ message, visible: true })
    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, TOAST_DURATION_MS)
  }

  const handleAddToCart = (product, size, quantity) => {
    setCartLines((prev) => addToCart(prev, { productId: product.id, size, quantity }))
    showToast('✓ AGREGADO AL CARRITO')
  }

  const handleUpdateQuantity = (productId, size, quantity) => {
    setCartLines((prev) => updateQuantity(prev, productId, size, quantity))
  }

  const handleRemove = (productId, size) => {
    setCartLines((prev) => removeFromCart(prev, productId, size))
  }

  const handleSelectCategoryFromHero = (selected) => {
    setCategory(selected)
    setQuery('')
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSelectCategory = (selected) => {
    setCategory(selected)
  }

  const handleSelectGender = (selected) => {
    setGender(selected)
  }

  return (
    <>
      <Header cartCount={totalUnits} onOpenCart={() => setIsCartOpen(true)} />

      <main>
        <Hero onSelectCategory={handleSelectCategoryFromHero} />

        <section id="catalogo" className="container">
          <CategoryTabs categories={categories} selected={category} onSelect={handleSelectCategory} />
          <GenderTabs genders={genders} selected={gender} onSelect={handleSelectGender} />
          <SearchBar value={query} onChange={setQuery} />
          <ProductGrid
            products={filteredProducts}
            categories={categories}
            selectedCategory={category}
            selectedGender={gender}
            hasQuery={query.trim().length > 0}
            onAddToCart={handleAddToCart}
            onOpenDetail={setActiveProduct}
          />
        </section>

        <SpecialOrderBanner />
      </main>

      <Footer />

      <CartButton totalUnits={totalUnits} onClick={() => setIsCartOpen(true)} />

      <CartDrawer
        isOpen={isCartOpen}
        cartLines={cartLines}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />

      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <Toast message={toast.message} visible={toast.visible} />
    </>
  )
}

export default App
