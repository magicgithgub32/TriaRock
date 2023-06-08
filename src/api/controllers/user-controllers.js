const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
} = require('../controllers/user-controllers');
const router = express.Router();
const { isAuth } = require('../../middlewares/isAuth');
// const { uploadImgCloudinary } = require('../../middlewares/uploadImg');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', [isAuth], createUser);
router.put('/:id', [isAuth], updateUserById);
router.delete('/:id', [isAuth], deleteUser);

module.exports = router;