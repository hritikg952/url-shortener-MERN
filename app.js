const express = require("express");
const mongoose = require("mongoose");
const app = express();

//import routes
const authRoutes = require("./routes/auth");
const urlRoutes = require("./routes/url");

//middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/url_shortener_database", {
    useNewUrlParser: true, //compulsary
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log(`DB CONNECTED`))
  .catch((err) => {
    console.log(err);
  });

//middleware-runs after the connection establish
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api", authRoutes);
app.use("/api", urlRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
