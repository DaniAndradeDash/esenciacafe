# Esencia Café - Sistema de Menú Digital

## 1. Concept & Vision

**Esencia Café** es una experiencia digital que captura la calidez y sofisticación de una cafetería artesanal. El sistema presenta un menú digital elegante con estética floral-botánica combinada con tonos terrosos del café, creando una sensación de refugio acogedor. La interfaz transmite calidad artesanal y atención al detalle, invitando a los clientes a explorar cada categoría como quien recorre un jardín de sabores.

## 2. Design Language

### Aesthetic Direction
Minimalismo botánico con toques de ilustración botánica victoriana. Patrones sutiles de hojas y flores estilizadas como elementos decorativos. Sensación de catálogo de especialidad, no de快餐.

### Color Palette
```css
--esencia-cream: #FAF7F2;
--esencia-warm-white: #FFFEF9;
--esencia-taupe: #8B7355;
--esencia-espresso: #3D2B1F;
--esencia-caramel: #C4956A;
--esencia-sage: #9CAF88;
--esencia-blush: #E8D5D0;
--esencia-gold: #D4A574;
```

### Typography
- **Display/Headers**: "Playfair Display" (serif elegante)
- **Body/UI**: "Cormorant Garamond" (legible, sofisticado)
- **Accents/Prices**: "DM Sans" (moderno, limpio)
- **Fallback**: Georgia, serif

### Spatial System
- Base unit: 8px
- Section padding: 64px vertical, 24px horizontal
- Card padding: 24px
- Gap between items: 16px
- Max content width: 1200px

### Motion Philosophy
- Transiciones suaves de 300-400ms con ease-out
- Hover states con elevación sutil (transform + shadow)
- Aparición en scroll con fade-up staggered
- Navegación entre secciones con slide horizontal
- QR modal con scale-in suave

### Visual Assets
- Iconos: Lucide Icons (línea fina, 1.5px stroke)
- Ilustraciones: Patrones SVG de hojas/flores estilizadas como watermarks
- Imágenes: Fondo sutil con textura de papel artesanal
- Decorativos: Line art botánico en headers de sección

## 3. Layout & Structure

### Página Principal (Menú Cliente)
```
┌─────────────────────────────────────┐
│ Header: Logo + "Esencia Café"       │
│ Subtítulo decorativo                │
├─────────────────────────────────────┤
│ Banner con notas de leche (sticky)   │
├─────────────────────────────────────┤
│ Navegación por categorías (sticky)  │
│ [Bebidas Calientes] [Frías] [etc]   │
├─────────────────────────────────────┤
│ Sección: Bebidas Calientes          │
│   ┌─────┐ ┌─────┐ ┌─────┐          │
│   │Item │ │Item │ │Item │          │
│   │ $XX │ │ $XX │ │ $XX │          │
│   └─────┘ └─────┘ └─────┘          │
├─────────────────────────────────────┤
│ Sección: Bebidas Frías              │
│   ...                               │
├─────────────────────────────────────┤
│ Sección: Frapes                     │
│   ...                               │
├─────────────────────────────────────┤
│ Sección: Alimentos                  │
│   ...                               │
├─────────────────────────────────────┤
│ Sección: Otros                      │
│   ...                               │
├─────────────────────────────────────┤
│ Footer: "Visítanos" + redes         │
└─────────────────────────────────────┘
```

### Panel de Administración
```
┌──────────┬──────────────────────────┐
│ Sidebar  │ Content Area             │
│ ──────── │ ──────────────────────── │
│ Productos│ [Formulario/Tabla]       │
│ Recetas  │                          │
│ QR       │                          │
└──────────┴──────────────────────────┘
```

### Responsive Strategy
- Desktop: Grid de 3-4 columnas para productos
- Tablet: Grid de 2-3 columnas
- Mobile: Grid de 1-2 columnas, navegación horizontal scrollable

## 4. Features & Interactions

### Menú Cliente
- **Ver menú completo**: Scroll suave por secciones, navegación sticky
- **Filtrar por categoría**: Click en tabs filtra con animación
- **Ver nota de leche**: Banner sticky siempre visible arriba
- **Generar QR**: Botón flotante abre modal con QR descargable
- **Animaciones de entrada**: Elementos aparecen con stagger al scroll

### Panel Admin - Productos
- **Listar productos**: Tabla con categorías, editable in-place
- **Agregar producto**: Modal con formulario (nombre, descripción, precio, categoría)
- **Editar producto**: Click en editar abre modal con datos precargados
- **Eliminar producto**: Confirmación antes de eliminar
- **Cambiar categoría**: Dropdown para reordenar
- **Drag & drop**: Reordenar productos (futuro)

### Panel Admin - Recetas
- **Listar recetas**: Cards con preview de ingredientes
- **Ver receta completa**: Modal expandido
- **Agregar receta**: Formulario multi-step (datos → ingredientes → preparación)
- **Editar receta**: Mismo flujo de creación
- **Eliminar receta**: Confirmación
- **Campo "quien agregó"**: Auto-fill con usuario actual

### Estados y Edge Cases
- **Empty state productos**: "Aún no hay productos en esta categoría"
- **Empty state recetas**: "Comienza agregando tu primera receta"
- **Error de conexión**: Toast con mensaje y retry
- **Loading states**: Skeleton cards
- **Validación**: Mensajes inline en formularios

## 5. Component Inventory

### Header (Cliente)
- Logo SVG de hoja estilizada + texto "Esencia Café"
- Subtítulo: "Donde cada sorbo cuenta una historia"
- Estados: default, scrolled (shadow + shrink)

### ProductCard
- Nombre en Playfair Display
- Precio alineado a derecha con símbolo $
- Hover: elevación + borde caramel
- Estados: default, hover, loading (skeleton)

### CategoryNav
- Tabs horizontales con icono + texto
- Indicador de sección activa (underline animado)
- Estados: default, active, hover

### MilkNote
- Banner sticky con icono de leche
- Texto: "Leche: entera, deslactosada y de almendras"
- Fondo semi-transparente con blur

### AdminSidebar
- Navegación vertical con iconos
- Items activos con background sutil
- Estados: default, hover, active

### ProductForm
- Campos: nombre, descripción (opcional), precio, categoría (select)
- Validación en tiempo real
- Estados: default, error, submitting, success

### RecipeForm
- Step 1: Nombre, descripción
- Step 2: Lista dinámica de ingredientes (nombre + cantidad)
- Step 3: Pasos de preparación (textarea)
- Step 4: Quien agregó (auto)
- Estados: cada step con validación

### QRModal
- Preview del QR generado
- Botón de descarga
- Botón de copiar enlace
- Estados: generating, ready, error

### Toast Notifications
- Tipos: success, error, warning, info
- Auto-dismiss en 4 segundos
- Posición: bottom-right

## 6. Technical Approach

### Stack
- **Frontend**: React 18 + Vite + React Router
- **Backend**: Express.js + Fastify (no FastAPI Python, sino fastify-node)
- **Base de datos**: MySQL con Sequelize ORM
- **QR Generation**: qrcode (npm package)
- **Styling**: CSS Modules + CSS Variables

### Estructura del Proyecto
```
esencia-cafe/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── index.html
│   └── vite.config.js
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── index.js
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

### API Endpoints

#### Productos
```
GET    /api/products              # Listar todos
GET    /api/products/:category    # Por categoría
POST   /api/products              # Crear
PUT    /api/products/:id          # Actualizar
DELETE /api/products/:id          # Eliminar
```

#### Categorías
```
GET    /api/categories             # Listar todas
POST   /api/categories             # Crear
PUT    /api/categories/:id         # Actualizar
DELETE /api/categories/:id        # Eliminar
```

#### Recetas
```
GET    /api/recipes                # Listar todas
GET    /api/recipes/:id            # Ver una
POST   /api/recipes                # Crear
PUT    /api/recipes/:id            # Actualizar
DELETE /api/recipes/:id            # Eliminar
```

#### Utilidades
```
GET    /api/qr?url=<menu_url>      # Generar QR
GET    /api/menu/public            # Menú público (sin admin)
```

### Data Model

#### Category
```javascript
{
  id: INT PRIMARY KEY,
  name: VARCHAR(100),
  description: TEXT,
  order: INT,
  icon: VARCHAR(50),
  created_at: DATETIME,
  updated_at: DATETIME
}
```

#### Product
```javascript
{
  id: INT PRIMARY KEY,
  category_id: INT FK,
  name: VARCHAR(100),
  description: TEXT,
  price: DECIMAL(10,2),
  is_available: BOOLEAN,
  order: INT,
  created_at: DATETIME,
  updated_at: DATETIME
}
```

#### Recipe
```javascript
{
  id: INT PRIMARY KEY,
  name: VARCHAR(150),
  description: TEXT,
  preparation: TEXT,
  author: VARCHAR(100),
  created_at: DATETIME,
  updated_at: DATETIME
}
```

#### RecipeIngredient
```javascript
{
  id: INT PRIMARY KEY,
  recipe_id: INT FK,
  ingredient_name: VARCHAR(100),
  quantity: VARCHAR(50),
  order: INT
}
```

### Seed Data - Categorías
1. Bebidas Calientes
2. Bebidas Frías
3. Frapes
4. Alimentos
5. Otros

### Seed Data - Productos (Bebidas Calientes)
| Producto | Precio |
|----------|--------|
| Espresso | $35.00 |
| Espresso Americano | $40.00 |
| Café del Día | $40.00 |
| Cappuccino | $55.00 |
| Latte | $60.00 |
| Latte Saborizado | $70.00 |
| Matcha | $65.00 |
| Chai | $65.00 |
| Chocolate | $60.00 |
| Tisana | $65.00 |

### Configuration
```javascript
// .env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=esencia_cafe
DB_USER=root
DB_PASSWORD=
PORT=3001
CLIENT_URL=http://localhost:5173
```
