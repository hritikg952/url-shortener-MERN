const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const shortid = require("shortid");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Url", urlSchema);
