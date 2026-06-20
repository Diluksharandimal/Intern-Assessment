const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// POST /api/transactions - Save final transaction
router.post('/', async (req, res) => {
  try {
    const { cartItems, subTotal, tax, discount, totalPayment } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    const transaction = new Transaction({
      cartItems, subTotal, tax, discount, totalPayment
    });

    const savedTransaction = await transaction.save();
    
    console.log('--- NEW TRANSACTION SAVED ---');
    console.log(savedTransaction);

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error processing transaction' });
  }
});

module.exports = router;