const express = require('express');
const router = express.Router();
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require('../controllers/product');
const { getUserById } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

router.param('userId', getUserById);
router.param('productId', getProductById);

router.post(
  '/createProduct/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//get particular product
router.get('/products/:productId', getProduct);

//update
router.put(
  '/update/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//delete
router.delete(
  '/delete/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

router.get('/photo/:productId', photo);

//get all products
router.get('/products', getAllProducts);

router.get('/products/categories', getAllUniqueCategories);

module.exports = router;
