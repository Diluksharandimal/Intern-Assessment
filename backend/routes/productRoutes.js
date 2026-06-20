const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Retrieve all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching products' });
  }
});

// POST /api/products - Add a new product (Admin Form)
router.post('/', async (req, res) => {
  try {
    const { id, name, description, category, price, stock, imageUrl } = req.body;
    
    const product = new Product({
      id, name, description, category, price, stock, imageUrl
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
});

module.exports = router;