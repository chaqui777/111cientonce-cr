# 111cientonce Costa Rica — Sitio (Fase 1)

Catálogo web para el distribuidor autorizado de **111cientonce** en Costa
Rica (ropa técnica de ciclismo, triatlón y running). Esta es la **Fase 1**:
un sitio funcional sin pagos ni backend, pensado para validar la
experiencia y quedar listo para crecer.

Todos los productos, nombres, descripciones y fotos de este proyecto son
de **demostración**. No se usó copy comercial ni fotografías reales de
111cientonce.

## Stack

- React 19 + Vite
- JavaScript (sin TypeScript)
- CSS Modules + variables CSS (sin librerías de UI)
- React hooks (`useState`, `useMemo`, etc.)
- Sin backend, sin base de datos, sin autenticación

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre la URL que muestra la terminal (normalmente `http://localhost:5173`).

Otros comandos:

```bash
npm run build     # build de producción en /dist
npm run preview   # sirve el build de producción localmente
npm run lint      # revisa el código con oxlint
```

## Estructura del proyecto

```text
src/
├── components/         # Componentes de UI (uno por archivo, + su .module.css)
├── data/
│   └── products.js     # Fuente de datos actual (catálogo de demostración)
├── utils/
│   ├── productAdapter.js  # Capa de acceso a productos (ver abajo)
│   ├── cart.js             # Lógica del carrito
│   ├── whatsapp.js         # Mensaje y URLs de WhatsApp
│   └── formatPrice.js      # Formato de precios
├── styles/
│   ├── variables.css   # Paleta, tipografía, espaciado (tokens)
│   └── global.css      # Reset + estilos base + utilidades compartidas
├── App.jsx             # Estado central (carrito, filtros, modal)
└── main.jsx
```

## Cómo modificar el catálogo de productos

Edita `src/data/products.js`. Cada producto tiene esta forma:

```js
{
  id: '0301',              // también se usa como "número de dorsal" visual
  sku: '111-0301',
  name: 'Jersey Aero Demo',
  category: 'Ciclismo',     // Triatlón | Ciclismo | Running | Urbano
  sizes: ['S', 'M', 'L', 'XL'],  // [] si el producto no maneja tallas
  price: 45000,             // número, o null si no hay precio publicado
  currency: 'CRC',
  available: true,          // ver sección "Estados de disponibilidad"
  image: null,               // null = placeholder. Acepta URL cuando haya fotos reales
  description: 'Texto corto de descripción.',
}
```

**Importante:** ningún componente importa `products.js` directamente. Todo
pasa por `src/utils/productAdapter.js`, así que puedes agregar, quitar o
editar productos en este archivo sin tocar ningún componente.

## Estados de disponibilidad (`available`)

- `available: true` → el distribuidor **sí tiene** el producto en
  inventario. Se muestra normal y se agrega como pedido normal.
- `available: false` → el producto **existe** en el catálogo de la marca,
  pero el distribuidor no lo tiene en este momento. Se muestra con el
  badge amarillo **BAJO PEDIDO**, el contenido de la card se atenúa, y se
  agrega como **encargo especial** (se separa del resto en el carrito y en
  el mensaje de WhatsApp).

Esto **no** debe confundirse con "el producto no existe": en Fase 1 todo
lo que está en `products.js` existe, solo cambia si el distribuidor lo
tiene a mano o no.

## Cómo cambiar los colores de la marca

Todos los colores viven como variables en `src/styles/variables.css`
(`--color-asphalt`, `--color-bone`, `--color-red`, `--color-yellow`, etc.).
Ningún componente usa colores "hardcodeados": cambia los valores ahí y se
actualiza todo el sitio.

## Cómo cambiar el número de WhatsApp

Edita las constantes al inicio de `src/utils/whatsapp.js`:

```js
export const WHATSAPP_NUMBER = '50688145190' // formato internacional, usado en los links
export const WHATSAPP_DISPLAY = '8814-5190'  // formato local, solo para mostrar en el footer
```

## Cómo está preparado para una futura API / Shopify

El catálogo real de la marca tiene ~416 productos y, a futuro, esta fuente
de datos podría cambiar (Shopify, un CMS, Google Sheets, una API propia o
un sistema de inventario). Por eso:

- **Ningún componente** conoce la forma de `products.js`. Todos llaman a
  funciones de `productAdapter.js` (`getAllProducts`, `filterProducts`,
  `getProductById`, `getCategories`).
- El día que cambie la fuente de datos, **solo hay que editar
  `productAdapter.js`** (por ejemplo, para hacer un `fetch` a una API en
  vez de leer el array local). El resto de la app no cambia.
- El modelo de producto ya reserva los campos `stock` e `inventory` para
  cuando el inventario sea más granular que un simple sí/no (ver Fase 2).
- El carrito guarda líneas livianas (`{ productId, size, quantity }`), no
  copias del producto completo — así es fácil validar contra inventario
  real más adelante.
- No se asume que todos los productos tengan imagen, precio o las mismas
  tallas.

Modelo conceptual:

```text
CATÁLOGO OFICIAL (111cientonce.com, ~416 productos)
        ↓
INVENTARIO DEL DISTRIBUIDOR (lo que Jara tiene a mano)
        ↓
estado disponible / bajo pedido
        ↓
CATÁLOGO DE LA TIENDA (este sitio)
```

## Qué es Fase 1 (esto, ya implementado)

- Catálogo por categorías (Triatlón, Ciclismo, Running, Urbano) + "Todo"
- Buscador combinado con el filtro de categoría
- Card de producto con dorsal, badge de disponibilidad, selección de
  talla y agregar al carrito
- Ficha de producto (modal) con detalle completo
- Carrito en memoria (sin `localStorage`, sin pagos), con cantidades y
  separación entre productos disponibles y encargos especiales
- Pedido consolidado en un solo mensaje de WhatsApp
- Banner de "encargo especial" para productos fuera del catálogo de demo
- Identidad visual deportiva/técnica (asfalto oscuro, rojo dorsal,
  amarillo señalización, tipografía condensada + monoespaciada)
- SEO básico (título, meta description, Open Graph, favicon)

## Qué queda para Fase 2 (futuro, NO implementado todavía)

- Backend y base de datos
- Inventario real (por talla, en tiempo real)
- Panel administrativo para que Jara suba/edite productos sin depender de
  un desarrollador
- Integración real con Shopify, un CMS o una API
- Autenticación / cuentas de usuario
- Pedidos y checkout real
- Pagos (SINPE Móvil, Tilopay u otra pasarela para Costa Rica)
- Analítica

## Nota sobre el catálogo completo de la marca

Antes de reemplazar los productos de demostración por el catálogo real,
faltan dos cosas (fuera del alcance de este código):

1. La lista real de inventario de Jara, para marcar qué productos están
   `available: true` vs. `false`.
2. Confirmación con la marca 111cientonce sobre el uso de su catálogo y
   fotografías completas en este sitio.
