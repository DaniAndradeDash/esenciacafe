const { Product, Category } = require('../models');
const { Op } = require('sequelize');

const getAllProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, status } = req.query;
    const where = {};

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    if (category) {
      where.category_id = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price[Op.gte] = parseFloat(minPrice);
      }
      if (maxPrice !== undefined) {
        where.price[Op.lte] = parseFloat(maxPrice);
      }
    }

    if (status !== undefined) {
      where.is_available = status === 'true';
    }

    const products = await Product.findAll({
      where,
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
