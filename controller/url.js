const Url = require("../models/Url");

//getUrlById middelware
exports.getUrlById = (req, res, next, id) => {
  Url.findById(id).exec((err, url) => {
    if (err || !url) {
      return res.status(404).json({
        error: "url not found in DB",
      });
    }

    req.urlData = url;
    next();
  });
};

//**CREATE URL  */
exports.createUrl = (req, res) => {
  console.log(req.body.user);
  req.body.user = req.profile;
  const url = new Url(req.body);
  url.save((err, url) => {
    if (err) {
      return res.status(400).json({
        error: "Can not save in DB",
      });
    }
    res.json(url);
  });
};

//**READ ALL URLS */
exports.getAllUrls = (req, res) => {
  console.log("req", req.profile._id);
  Url.find({ user: { _id: req.profile._id } })
    .populate("user", "_id name")
    .exec((err, url) => {
      if (err || !url) {
        return res.status(404).json({
          error: "No URL in DB",
        });
      }

      res.json(url);
    });
};

//** DELETE URL */
exports.deleteUrl = (req, res) => {
  let url = req.urlData;
  url.remove((err, delUrl) => {
    if (err) {
      return res.status(400).json({
        error: `failed to delete ${url.full}`,
      });
    }
    res.json({
      message: `Successfully delete ${url.full}`,
      delUrl,
    });
  });
};
