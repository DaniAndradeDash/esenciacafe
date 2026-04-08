const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Recipe = require('./Recipe');

const RecipeIngredient = sequelize.define('RecipeIngredient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'recipes',
      key: 'id'
    }
  },
  ingredient_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  quantity: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'recipe_ingredients',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

RecipeIngredient.belongsTo(Recipe, { foreignKey: 'recipe_id', as: 'recipe' });
Recipe.hasMany(RecipeIngredient, { foreignKey: 'recipe_id', as: 'ingredients', onDelete: 'CASCADE' });

module.exports = RecipeIngredient;
