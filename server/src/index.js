require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase } = require('./models');

const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const recipesRoutes = require('./routes/recipes');
const qrRoutes = require('./routes/qr');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: function (origin, callback) {
    // Permite cualquier origen que venga de localhost o el CLIENT_URL
    if (!origin || origin.includes('localhost') || origin === process.env.CLIENT_URL) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/qr', qrRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (req, res) => {
  res.json({
    name: 'Esencia Café API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      categories: {
        list: 'GET /api/categories',
        get: 'GET /api/categories/:id',
        create: 'POST /api/categories',
        update: 'PUT /api/categories/:id',
        delete: 'DELETE /api/categories/:id'
      },
      products: {
        list: 'GET /api/products',
        get: 'GET /api/products/:id',
        byCategory: 'GET /api/products/category/:category',
        create: 'POST /api/products',
        update: 'PUT /api/products/:id',
        delete: 'DELETE /api/products/:id'
      },
      recipes: {
        list: 'GET /api/recipes',
        get: 'GET /api/recipes/:id',
        create: 'POST /api/recipes',
        update: 'PUT /api/recipes/:id',
        delete: 'DELETE /api/recipes/:id'
      },
      qr: {
        generate: 'GET /api/qr?url=<url>'
      }
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

const startServer = async () => {
  try {
    await initDatabase();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n☕ Servidor de Esencia Café corriendo en puerto ${PORT}`);
      console.log(`📋 API disponible en http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
