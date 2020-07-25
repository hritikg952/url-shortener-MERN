const User = require("../models/User");

//getUserById middleware
exports.getUserById = (req, res, next, id) => {
  
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "User not found in DB",
      });
    }

    req.profile = user;
    next();
  });
};
