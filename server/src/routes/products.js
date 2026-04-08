const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require('../controllers/ProductController');

router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
