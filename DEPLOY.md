# Deploy - Esencia Café

Proyecto separado en **Client** (Frontend) y **Server** (Backend), completamente independientes.

---

## 1. BACKEND (Server)

El backend es una aplicación Node.js que se sube a Hostinger como "Node.js Application".

### Configuración

1. Ir a la carpeta `server`:
```bash
cd server
```

2. Crear archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

3. Editar `.env` con tus credenciales:
```env
DB_HOST=tu_host_mysql
DB_PORT=3306
DB_NAME=esenciadb
DB_USER=tu_usuario
DB_PASSWORD=tu_password
PORT=3001
CLIENT_URL=https://tu-dominio-frontend.com
```

4. Instalar dependencias:
```bash
npm install
```

5. Crear datos iniciales:
```bash
npm run seed
```

6. Probar localmente:
```bash
npm start
```

### Subir a Hostinger (Node.js App)

1. Comprimir la carpeta `server/` como `.zip`
2. Subir el `.zip` a Hostinger
3. En el panel de Hostinger:
   - Seleccionar "Node.js Application"
   - Establecer directorio de aplicación
   - Comando de inicio: `npm start`
   - Puerto personalizado: `3001`
4. Descomprimir y configurar `.env` con credenciales de Hostinger
5. Ejecutar `npm install` y `npm run seed`

---

## 2. FRONTEND (Client)

El frontend es una aplicación React que se build y se sube como archivos estáticos.

### Desarrollo Local

1. Ir a la carpeta `client`:
```bash
cd client
```

2. Crear archivo `.env.local`:
```bash
# Desarrollo
VITE_API_URL=http://localhost:3001/api

# Producción (cambiar cuando subas a hosting)
VITE_API_URL=https://tu-dominio-backend.com/api
```

3. Instalar dependencias:
```bash
npm install
```

4. Iniciar desarrollo:
```bash
npm run dev
```

### Build para Producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con todos los archivos estáticos.

### Subir a Hostinger (Hosting Estático)

1. Hacer build:
```bash
npm run build
```

2. Subir contenido de `dist/` a `public_html`

3. Crear archivo `.htaccess` en `public_html/`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Subir a Netlify/Vercel

1. Hacer build localmente:
```bash
npm run build
```

2. Subir carpeta `dist/` a Netlify/Vercel

3. Configurar variable de entorno:
   - `VITE_API_URL`: URL del backend (ej: `https://api.tu-dominio.com/api`)

---

## Estructura de URLs

| Servicio | URL |
|----------|-----|
| **Frontend** | `https://tu-dominio.com` |
| **Backend API** | `https://api.tu-dominio.com/api` |
| **Panel Admin** | `https://tu-dominio.com/admin` |

---

## Comandos Rápidos

### Server
```bash
cd server
npm install
npm run seed   # Datos iniciales
npm start     # Iniciar servidor
```

### Client
```bash
cd client
npm install
npm run dev   # Desarrollo
npm run build # Build producción
```

---

## Notas Importantes

1. **CORS**: Asegúrate de que `CLIENT_URL` en el `.env` del servidor apunte al dominio del frontend
2. **Base de datos**: MySQL debe estar disponible (local o en Hostinger)
3. **Puerto**: El servidor usa el puerto 3001 por defecto
