const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['running', 'cycling', 'swimming'],
      required: true,
      trim: true
    },
    image: { type: String, required: true, trim: true },
    bestSeller: { type: Boolean, required: true}
  },
  {
    timestamps: true,
    collection: 'products'
  }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
