# Esencia Café - Sistema de Menú Digital

Sistema de menú digital para cafeterías con panel de administración para gestionar productos y recetas.

## Características

- **Menú Digital**: Vista elegante y minimalista para clientes
- **Panel de Administración**: Gestiona productos y recetas
- **Generación de QR**: Crea códigos QR para compartir el menú
- **Diseño Botánico**: Estética floral con tonos de café

## Requisitos

- Node.js 18+
- MySQL 8.0+

## Instalación

1. Clona el repositorio:
```bash
git clone <repo-url>
cd esencia-cafe
```

2. Instala las dependencias:
```bash
npm run install:all
```

3. Configura la base de datos MySQL:
   - Crea una base de datos llamada `esencia_cafe`
   - O ajusta las credenciales en `server/.env`

4. Ejecuta los seeders para datos iniciales:
```bash
npm run seed
```

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
esencia-cafe/
├── client/           # Frontend React + Vite
├── server/           # Backend Express + MySQL
├── package.json      # Scripts compartidos
└── SPEC.md           # Especificaciones del proyecto
```

## URLs

- **Menú (Cliente)**: http://localhost:5173/
- **Panel Admin**: http://localhost:5173/admin
- **API**: http://localhost:3001/api

## API Endpoints

### Productos
- `GET /api/products` - Listar todos
- `POST /api/products` - Crear
- `PUT /api/products/:id` - Actualizar
- `DELETE /api/products/:id` - Eliminar

### Categorías
- `GET /api/categories` - Listar todas

### Recetas
- `GET /api/recipes` - Listar todas
- `POST /api/recipes` - Crear
- `PUT /api/recipes/:id` - Actualizar
- `DELETE /api/recipes/:id` - Eliminar

### QR
- `GET /api/qr?url=<url>` - Generar código QR

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia frontend y backend |
| `npm run dev:server` | Solo backend |
| `npm run dev:client` | Solo frontend |
| `npm run build` | Build de producción |
| `npm run seed` | Poblar base de datos |

## Licencia

MIT
