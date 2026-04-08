const sequelize = require('../config/database');
const Category = require('./Category');
const Product = require('./Product');
const Recipe = require('./Recipe');
const RecipeIngredient = require('./RecipeIngredient');

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Conexión a MySQL establecida');
    
    await sequelize.sync({ alter: true });
    console.log('✓ Modelos sincronizados');
    
    return true;
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  Category,
  Product,
  Recipe,
  RecipeIngredient,
  initDatabase
};
