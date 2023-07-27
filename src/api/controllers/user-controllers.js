const { generateToken } = require('../../config/jwt');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate('favs');
    return res.status(200).json(allUsers);
  } catch (error) {
    return next('Error finding users 😥', error);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate('favs');
    return res.status(200).json(user);
  } catch (error) {
    return next('User not found 👺', error);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, rol } = req.body;

    const newUser = new User({ email, password, rol });

    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 6 characters long and contain both uppercase and lowercase letters.'
      });
    }

    const createdUser = await newUser.save();

    createdUser.password = null;

    return res.status(201).json({
      createdUser
    });
  } catch (error) {
    return next('Error registering user 🙁', error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: 'Please, check your email and password and try again.'
      });
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
      return res.status(400).json({
        message: 'Please, check your email and password and try again.'
      });
    }
  } catch (error) {
    return next('Login failed 🤔', error);
  }
};

const addOrRemoveFav = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { fav } = req.body;
    const selectedUser = await User.findOne({ email });

    if (selectedUser.favs.includes(fav)) {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        {
          $pull: { favs: fav }
        },
        { new: true }
      ).populate('favs');
      return res.status(200).json(updatedUser);
    }
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $addToSet: { favs: fav }
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next('Error adding fav to user 🥺', error);
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  register,
  login,
  addOrRemoveFav
};
