const express = require('express');
const { getAllUsers, register, login } = require('../controllers/user-controllers');
const router = express.Router();
// const { uploadImgCloudinary } = require('../../middlewares/uploadImg');

router.get('/', getAllUsers);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
