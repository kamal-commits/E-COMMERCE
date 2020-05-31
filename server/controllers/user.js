const User = require('../models/User');

exports.getUserById = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: 'User Not Found',
        });
      }
      req.profile = user;
      req.profile.encry_password = undefined;
      req.profile.createdAt = undefined;
      req.profile.updatedAt = undefined;
      req.profile.salt = undefined;
      next();
    })
    .catch((err) => console.log(err));
};

exports.getUser = (req, res) => {
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find()
    .then((user) => {
      if (!user) {
        return res.status(403).json({
          error: 'No User Found',
        });
      }
      res.json(user);
    })
    .catch((err) => console.log(err));
};

exports.updateUser = (req, res) => {
  const { name, email, password } = req.body;
  User.findByIdAndUpdate(
    { _id: req.profile.id },
    { $set: req.body },
    { useFindAndModify: false }
  )
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) =>
      res.status(400).json({ error: 'Unable To Update Information' } + err)
    );
};
