const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    image: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
   
    items: [{ type: mongoose.Types.ObjectId, required: true, trim: true, ref: 'Product' }]
  },
  {
    timestamps: true,
    collection: 'categories'
  }
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
