const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  machineId: String,
  productId: String,
  productName: String,
  slot: String,
  price: Number,
  status: {
    type: String,
    default: 'pending' // pending, paid, dispensed
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);

