const { check } = require("express-validator");

exports.signupValidation = [
  check('name', "Name Can't Be Empty").not().isEmpty(),
  check('email').isEmail().withMessage('Enter Valid Email'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Password Must be minimum 5 character'),
];
exports.LoginValidation = [
  check('email').isEmail().withMessage('Enter Valid Email'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Password Must be minimum 5 character'),
];