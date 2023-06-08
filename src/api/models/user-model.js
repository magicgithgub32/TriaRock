const mongoose = require('mongoose');

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
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
