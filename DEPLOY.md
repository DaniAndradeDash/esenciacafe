# Deploy - Esencia Café

## Backend (Server)

### Configuración

1. Ir a la carpeta:
```bash
cd server
```

2. Instalar dependencias:
```bash
npm install
```

3. Editar `.env` con tus credenciales:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=esenciadb
DB_USER=tu_usuario
DB_PASSWORD=tu_password
PORT=3001
CLIENT_URL=http://localhost:5173
```

4. Ejecutar seed para datos iniciales:
```bash
npm run seed
```

5. Iniciar servidor:
```bash
npm start
```

### En Hostinger

1. Subir carpeta `server/` al hosting
2. Editar `.env` con credenciales de MySQL de Hostinger y URL del frontend
3. Ejecutar `npm install`
4. Ejecutar `npm run seed`
5. Iniciar con `npm start`

---

## Frontend (Client)

### Desarrollo
```bash
cd client
npm install
npm run dev
```

### Build Producción
```bash
npm run build
```

Subir carpeta `dist/` a hosting estático (Netlify/Vercel/Hostinger).

Configurar variable: `VITE_API_URL=https://tu-api.com`

---

## URLs

- **Frontend**: `https://tu-dominio.com`
- **Backend**: `https://tu-dominio.com/api`
- **Admin**: `https://tu-dominio.com/admin`
