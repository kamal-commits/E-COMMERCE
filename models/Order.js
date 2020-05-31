const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'users',
    },
    address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
    },
    products: [],
    updated: Date,
  },
  { timestamps: true }
);

const orderModel = new mongoose.model('orders', orderSchema);
module.exports = orderModel;
