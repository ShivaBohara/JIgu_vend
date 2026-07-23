const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

router.post('/create', async (req, res) => {
  try {
    const { machineId, productId } = req.body;

    const product = await Product.findOne({
      machineId,
      productId
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const order = new Order({
      orderId: 'JIGU-' + Date.now(),
      machineId,
      productId,
      productName: product.name,
      slot: product.slot,
      price: product.price
    });

    await order.save();

    res.json({
      success: true,
      orderId: order.orderId,
      productName: product.name,
      price: product.price
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;