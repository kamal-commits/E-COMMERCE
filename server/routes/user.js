const express = require('express');
const router = express.Router();
const {
  getUserById,
  getUser,
  getAllUsers,
  updateUser,
} = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

router.param('userId', getUserById);

//@method     Get
//@route     /api/user/:userId
//@access    PRIVATE

router.get('/:userId', isSignedIn, isAuthenticated, getUser);
router.put('/:userId', isSignedIn, isAuthenticated, updateUser);

router.get('/', getAllUsers);
module.exports = router;
