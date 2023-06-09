const express = require('express');
const {
  getAllUsers,
  register,
  login,
  addOrRemoveFav,
  getUserByEmail
} = require('../controllers/user-controllers');
const router = express.Router();
const { isAdmin } = require('../../middlewares/isAdmin-middleware');
const { isLogged } = require('../../middlewares/isLogged-middleware');

router.get('/', [isAdmin], getAllUsers);
router.get('/:email', getUserByEmail);
router.post('/register', register);
router.post('/login', login);
router.put('/:email/fav', [isLogged], addOrRemoveFav);

module.exports = router;
