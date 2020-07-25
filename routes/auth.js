const express = require("express");
const { check } = require("express-validator");
const { signup, signout,signin } = require("../controller/auth");
const router = express.Router();

//signup route
router.post("/signup", [
  check("name", "name should be atleast 3 characters").isLength({ min: 3 }),
  check("email", "email is required").isEmail(),
  check("password", "password should be atleast 3 characters").isLength({
    min: 3,
  }),
  signup,
]);

//signout route
router.get("/signout", signout);

//signin route
router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 3 characters").isLength({
      min: 3,
    }),
    signin,
  ]);

module.exports = router;
