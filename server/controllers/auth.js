const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
  const { email, password, name } = req.body;
  if(!name||!email||!password)
  {
    return res.status(400).json({
      error:"Please fill All the Fields"
    })
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          error: 'Email is Already Registered With Us',
        });
      }
      const newUser = new User(req.body);
      newUser
        .save()
        .then((user) =>
          res.json(user)
        )
        .catch((err) =>
          res.json({
            errror: err,
          })
        );
    })
    .catch((err) => console.log(err));
};

exports.login = (req, res) => {
  const { email, password } = req.body;
   if(!email || !password)
  {
    return res.status(400).json({
      error:"Please fill All the Fields"
    })
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: 'User Not Found',
        });
      }
      if (!user.checkPassword(password)) {
        return res.status(400).json({
          error: 'Password is incorrect',
        });
      }

      //Creating token
      else {
        jwt.sign(
          { id: user._id },
          'secret',
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;

            res.json({
              id:user._id,
              name:user.name,
              email:user.email,
              role:user.role,
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      }
      //Checking the Password
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

exports.isSignedIn = expressJwt({
  secret: 'secret',
  userProperty: 'auth',
});

//Custom MiddleWares
exports.isAuthenticated = (req, res, next) => {
  let check = req.profile && req.auth && req.profile._id == req.auth.id;

  if (!check) {
    return res.status(401).json({
      error: 'ACCESS DENIED',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(401).json({
      error: 'You Are Not Admin',
    });
  }
  next();
};
