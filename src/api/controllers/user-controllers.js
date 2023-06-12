const { generateToken } = require('../../config/jwt');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return next('Error finding users 😥', error);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const newUser = new User({ email, password });

    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists 🤔' });
    }

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 6 characters long and contain both uppercase and lowercase letters 🙈'
      });
    }

    const createdUser = await newUser.save();

    createdUser.password = null;

    return res.status(201).json({
      createdUser
    });
  } catch (error) {
    console.error('Error registering user:', error);

    return res.status(500).json({ message: 'Error registering user 🥺' });
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next('User not found 🤨');
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      return res.status(200).json({
        user: {
          email: user.email,
          _id: user._id
        },
        token: token
      });
    } else {
      return next('Incorrect password ⛔️');
    }
  } catch (error) {
    return next('Login failed 🤔', error);
  }
};

module.exports = {
  getAllUsers,
  register,
  login
};
