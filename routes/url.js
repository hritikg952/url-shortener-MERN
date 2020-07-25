const express = require("express");
const router = express.Router();
const {
  getUrlById,
  createUrl,
  getAllUrls,
  deleteUrl,
} = require("../controller/url");

const { isAuthenticated, isSignedIn } = require("../controller/auth");
const { getUserById } = require("../controller/user");

//params
router.param("userId", getUserById);
router.param("urlId", getUrlById);

//create
router.post("/url/create/:userId", isSignedIn, isAuthenticated, createUrl);

//read
//?read all urls of specific user
router.get("/url/all/:userId", isSignedIn, isAuthenticated, getAllUrls);

//delete
//?delete perticular url of perticular user
router.delete(
  "/url/delete/:urlId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteUrl
);
module.exports = router;
