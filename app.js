const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const montresRoutes = require("./routes/montre");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect((process.env.MONGO_URI || 'mongodb://localhost:27017') + "/bdStar",
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch(() => {
      console.log("Connection failed!");
    });
var db = mongoose.connection;

db.collection("nodes").countDocuments(
    {}, // filters
    {}, // options
    function(error, result) {
      console.log(result);
    }
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/montres", montresRoutes);
app.use("/api/user", userRoutes); //http://localhost:3000/api/user/signup'
//http://localhost:3000/api/user/login 

module.exports = app;
