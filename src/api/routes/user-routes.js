const express = require('express');
const { getAllUsers, register, login } = require('../controllers/user-controllers');
const router = express.Router();
const { isAdmin } = require('../../middlewares/isAdmin-middleware');

router.get('/', [isAdmin], getAllUsers);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
