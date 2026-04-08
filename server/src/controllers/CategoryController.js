const { Category, Product } = require('../models');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Product,
        as: 'products',
        where: { is_available: true },
        required: false
      }],
      order: [['order', 'ASC']]
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description, order, icon } = req.body;
    const category = await Category.create({ name, description, order, icon });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, description, order, icon } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    await category.update({ name, description, order, icon });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    await category.destroy();
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
