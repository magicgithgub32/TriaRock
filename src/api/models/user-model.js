const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    rol: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer',
      required: true,
      trim: true
    },
    favs: [{ type: mongoose.Types.ObjectId, required: true, trim: true, ref: 'Product' }], 
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

UserSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next('Error hashing password', error);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
