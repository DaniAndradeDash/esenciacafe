# Deploy - Esencia Café

Este proyecto tiene dos partes separadas para deploy:

## 1. Backend (Server)

### Requisitos
- Node.js 18+
- MySQL 8.0+

### Configuración

1. Navegar a la carpeta server:
```bash
cd server
```

2. Crear archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

3. Editar `.env` con tus credenciales:
```
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

5. Ejecutar seed para datos iniciales:
```bash
npm run seed
```

6. Iniciar el servidor:
```bash
npm start
```

### En Hostinger (Node.js)
1. Subir la carpeta `server/` al hosting
2. Configurar variables de entorno en el panel de Hostinger
3. Establecer comando de inicio: `npm start`
4. Puerto: 3001 (o el que configures)

---

## 2. Frontend (Client)

### Desarrollo Local

1. Crear archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar desarrollo:
```bash
npm run dev
```

### Build para Producción

```bash
npm run build
```

Los archivos estáticos se generan en `dist/`

### Deploy en Netlify/Vercel

1. Hacer build localmente:
```bash
npm run build
```

2. Subir la carpeta `dist/` a Netlify/Vercel

3. Configurar variable de entorno:
- `VITE_API_URL`: URL del backend (ej: `https://api.tu-dominio.com`)

### Deploy en Hostinger (Hosting Estático)

1. Hacer build:
```bash
npm run build
```

2. Subir contenido de `dist/` a la carpeta `public_html`

3. Crear archivo `.htaccess` para SPA:
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

---

## Estructura de URLs

- **Frontend**: `https://tu-dominio.com`
- **Backend API**: `https://api.tu-dominio.com` (o subdomain)
- **Panel Admin**: `https://tu-dominio.com/admin`

---

## Comandos Rápidos

### Servidor
```bash
cd server
npm install
npm run seed  # Datos iniciales
npm start     # Producción
npm run dev   # Desarrollo
```

### Cliente
```bash
cd client
npm install
npm run dev   # Desarrollo
npm run build # Build producción
```
