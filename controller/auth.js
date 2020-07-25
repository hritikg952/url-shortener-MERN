const User = require("../models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { validationResult } = require("express-validator");

//**SIGNUP route controller */
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        message: "Not able to save in database",
      });
    }

    res.json({
      name: user.name,
      email: user.email,
      id: user._is,
    });
  });
};

//**SIGNOUT Route controller */

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signed out successfully",
  });
};

//**SIGNIN route controller */

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        message: "Email does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        message: "Email and password does not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, "hritikApp");

    res.cookie("token", token, { expire: new Date() + 9999 });

    const { name, _id, email } = user;
    return res.json({ token, user: { _id, name, email } });
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: "hritikApp",
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuthenticated = (req, res, next) => {
  console.log("auth",req.auth)
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      message: "ACCESS DENIED",
    });
  }
  next();
};
