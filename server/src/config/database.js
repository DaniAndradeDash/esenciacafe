require('dotenv').config();
const { Sequelize } = require('sequelize'); // 1. Importa la librería

// 2. Determina el entorno (development por defecto)
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'andrade96',
    database: process.env.DB_NAME || 'esenciadb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
};

const dbConfig = config[env];

// 3. CREA LA INSTANCIA (Esto es lo que le falta a tus modelos)
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging
  }
);

// 4. EXPORTA LA INSTANCIA
module.exports = sequelize;