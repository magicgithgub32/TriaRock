const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['running', 'cycling', 'swimming'],
      required: false,
      trim: true
    },
    image: { type: String, required: true, trim: true },
    promo: { type: Boolean, required: false },
    bestSeller: { type: Boolean, required: false }
  },
  {
    timestamps: true,
    collection: 'products'
  }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
