const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/auth');
const { signupValidation } = require('../validation/validator');
const { LoginValidation } = require('../validation/validator');
const { runValidation } = require('../validation/index');

//@method     POST
//@route     /api/signup
//@access    PUBLIC
router.post('/signup', signupValidation, runValidation, signup);

//@method     POST
//@route     /api/auth/login
//@access    PUBLIC
router.post('/login', LoginValidation, runValidation, login);

module.exports = router;
