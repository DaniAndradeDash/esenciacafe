const { Product, Category } = require('../models');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: 'category' }],
      order: [['order', 'ASC']]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category' }]
    });
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const categoryFound = await Category.findOne({ where: { name: category } });
    
    if (!categoryFound) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    const products = await Product.findAll({
      where: { category_id: categoryFound.id, is_available: true },
      order: [['order', 'ASC']]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { category_id, name, description, price, is_available, order } = req.body;
    const product = await Product.create({ category_id, name, description, price, is_available, order });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { category_id, name, description, price, is_available, order } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await product.update({ category_id, name, description, price, is_available, order });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await product.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
};
