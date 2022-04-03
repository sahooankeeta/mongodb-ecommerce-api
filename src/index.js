const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const port = process.env.PORT || 3000;
dotenv.config({ path: path.join(__dirname, "/config.env") });

const DB = process.env.DB.replace("<PASSWORD>", process.env.PASSWORD);
//connect mongoose and express
mongoose.connect(DB).then((con) => {
  console.log("connection made to database");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/.netlify/functions/index", require("./routes"));
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "welcome to ecommerce-api",
  });
});
app.listen(port, function (err) {
  if (err) {
    console.log("error on running port");
  }
  console.log(`server running on ${port}`);
});
module.exports.handler = serverless(app);
