const User = require('../api/models/user-model');
const { verifyToken } = require('../config/jwt');
require('dotenv').config();

const isAdmin = async (req, res, next) => {
  try {
   
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
      return next(new Error('Unauthorized ⛔️'));
    }

    const parsedToken = token?.replace('Bearer ', '');
    const validToken = verifyToken(parsedToken, process.env.JWT_SECRET);

    const userLogged = await User.findById(validToken.id);

    if (userLogged.rol === 'admin') {
    userLogged.password = null;
    req.user = userLogged;
    next();
  } else {
return next('You are not logged as an admin')
  }

    
  } catch (error) {
    return next(error);
  }
};

module.exports = { isAdmin };
