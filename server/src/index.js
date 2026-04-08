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
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/qr', qrRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

const startServer = async () => {
  try {
    await initDatabase();
    
    app.listen(PORT, () => {
      console.log(`\n☕ Servidor de Esencia Café corriendo en http://localhost:${PORT}`);
      console.log(`📋 API disponible en http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
