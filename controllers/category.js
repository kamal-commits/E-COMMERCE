const Category = require('../models/Category');

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id)
    .then((category) => {
      if (!category) {
        return res.status(400).json({
          error: 'Category Not Found',
        });
      }
      req.category = category;

      next();
    })
    .catch((err) => console.log(err));
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.createCategory = (req, res) => {

  const { name } = req.body;
   
  Category.findOne({ name:name })
    .then((category) => {
      if (category) {
        return res.status(400).json({ error: 'Category Is Already Created' });
      }
      const newCategory = new Category(req.body);
      newCategory
        .save()
        .then((category) => res.json({
          category,
          message:"Category Created SuccesFully"
        }
          
          ))
        .catch((err) => console.log("Category Can't Created : "+err));
    })
    .catch((err) => console.log(err));
};

exports.getAllCategories = (req, res) => {
  Category.find()
    .then((categories) => res.json(categories))
    .catch((err) => console.log(err));
};

exports.updateCategory = (req, res) => {
  const {name}=req.body
  Category.findByIdAndUpdate(
    { _id: req.category.id },
    { $set: req.body },
    { useFindAndModify: false }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => console.log(err));
};

// exports.deleteCategory = (req, res) => {
//   Category.findByIdAndDelete({ _id: req.category.id })
//     .then(() => {
//       res.json({ message: 'Category Deleted SuccesFully' });
//     })
//     .catch((err) => console.log(err));
// };

exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((err, deletedCategory) => {
    if (err) {
      res.status(400).json({
        error: 'Something Went Wrong..!',
      });
    }
    res.json({
      msg: 'Delete Category Success.!!',
      deletedCategory,
    });
  });
};
