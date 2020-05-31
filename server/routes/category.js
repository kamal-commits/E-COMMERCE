const express = require('express');
const router = express.Router();
const {
  getCategoryById,
  getCategory,
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

router.param('userId', getUserById);
router.param('categoryId', getCategoryById);


//create
router.post(
  '/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// read
router.get('/categories', getAllCategories);

//get category by particar id
router.get('/category/:categoryId', getCategory);

//update
router.put(
  '/update/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
  '/delete/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
