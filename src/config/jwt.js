const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id, email) => {
  if (!id || !email) {
    throw new Error('Id or email are missing 🙁');
  }

  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '2h'
  });
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token is missing ⛔️');
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
