const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const cartSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: 'products',
    },
    name: String,
    count: String,
    price: String,
  },
  { timestamps: true }
);

const cartModel = new mongoose.model('cart', cartSchema);
module.exports = cartModel;
