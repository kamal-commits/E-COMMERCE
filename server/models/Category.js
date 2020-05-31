const mongoose = require('mongoose');
const categorySchema = mongoose.Schema(
  {
    name: {
       type: String,
            trim: true,
            required: true,
            maxLength: 32
    },
  },

  { timestamps: true }
);

const categoryModel = mongoose.model('categories', categorySchema);
module.exports = categoryModel;
