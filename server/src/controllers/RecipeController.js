const { Recipe, RecipeIngredient } = require('../models');

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [{ model: RecipeIngredient, as: 'ingredients', order: [['order', 'ASC']] }],
      order: [['created_at', 'DESC']]
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [{ model: RecipeIngredient, as: 'ingredients', order: [['order', 'ASC']] }]
    });
    if (!recipe) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRecipe = async (req, res) => {
  try {
    const { name, description, preparation, author, ingredients } = req.body;
    
    const recipe = await Recipe.create({ name, description, preparation, author });
    
    if (ingredients && ingredients.length > 0) {
      const ingredientData = ingredients.map((ing, index) => ({
        recipe_id: recipe.id,
        ingredient_name: ing.ingredient_name,
        quantity: ing.quantity,
        order: index
      }));
      await RecipeIngredient.bulkCreate(ingredientData);
    }
    
    const fullRecipe = await Recipe.findByPk(recipe.id, {
      include: [{ model: RecipeIngredient, as: 'ingredients' }]
    });
    
    res.status(201).json(fullRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { name, description, preparation, author, ingredients } = req.body;
    const recipe = await Recipe.findByPk(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    
    await recipe.update({ name, description, preparation, author });
    
    if (ingredients) {
      await RecipeIngredient.destroy({ where: { recipe_id: recipe.id } });
      
      if (ingredients.length > 0) {
        const ingredientData = ingredients.map((ing, index) => ({
          recipe_id: recipe.id,
          ingredient_name: ing.ingredient_name,
          quantity: ing.quantity,
          order: index
        }));
        await RecipeIngredient.bulkCreate(ingredientData);
      }
    }
    
    const fullRecipe = await Recipe.findByPk(recipe.id, {
      include: [{ model: RecipeIngredient, as: 'ingredients' }]
    });
    
    res.json(fullRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    await RecipeIngredient.destroy({ where: { recipe_id: req.params.id } });
    await recipe.destroy();
    res.json({ message: 'Receta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
