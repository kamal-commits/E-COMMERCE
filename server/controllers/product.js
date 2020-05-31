const Product = require('../models/Product');
const formidable = require('formidable');
const fs = require('fs');
const _ = require("lodash");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(400).json({
          error: 'Unable to Find Product',
        });
      }
      req.product = product;
      next();
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res) => {
  return res.json(req.product);
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) throw err;

    const { name, description, price, category, stock } = fields;

    let product = new Product(fields);

      if (file.photo) {
      if (file.photo.size > 4000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    console.log(product);

    //Save to db
    product
      .save()
      .then((product) => res.json(product))
      .catch((err) => console.log("Product Error "+ err));
  });
};
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//MIDDLEWARE
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: 'problem with image',
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

    let product = req.product;
    product = _.extend(product, fields);
    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: 'File size too big!',
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    console.log(product);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: 'Updation in DB failed',
        });
      }
      res.json(product);
    });
  });
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      res.status(400).json({
        error: 'Something Went Wrong..!',
      });
    }
    res.json({
      msg: 'Delete Product Success.!!',
      deletedProduct,
    });
  });
};

exports.getAllProducts = (req, res) => {
  // let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sort ? req.query.sort : '_id';

  Product.find()
    .select('-photo')
    .populate('categories')
    .sort([[sortBy, 'asc']])
    // .limit(limit)
    .exec((err, products) => {
      if (err) {
        res.status(400).json({
          error: "Can't Find The Products",
        });
      }

      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Can't Find The Categories",
      });
    }
    res.json(categories);
  });
};

exports.updateStocks = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: {
          _id: prod._id,
        },
        update: {
          $inc: {
            stock: -prod.cout,
            sold: +prod.cout,
          },
        },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Can't Do The Bulk Operation..!",
      });
    }

    next();
  });
};
