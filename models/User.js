const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuidv1');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    cart: {
      type: Array,
      default: [],
    },

    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

//Create Virtual field of Encrypter Password

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

//Methods to Encrypt Password

userSchema.methods = {
  checkPassword: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return '';

    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainPassword)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
