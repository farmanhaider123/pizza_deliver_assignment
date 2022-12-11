require("dotenv").config(); //to access all vars insde env file
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const mongoose = require("mongoose");
// const { urlencoded } = require('express')
const PORT = 4000;
const count = 0;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookieParser());
mongoose.connect("mongodb://127.0.0.1:27017/pizza", (err) => {
  if (err) {
    console.log("db Failed");
  } else {
    console.log("db connected");
  }
});
// const connection = mongoose.connection;
// let mongoStore = new MongoDbStore({
//   url: "mongodb://127.0.0.1:27017/pizza",
//   collection: "sessions1",
// });
app.use(
  session({
    secret: process.env.COOKIE_SECRET, //to encrypt cookie
    resave: false,
    // store: mongoStore,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //24 hrs
    },
  })
);
require("./routes/routes")(app);

// const connection=mongoose.connection
// connection.once('open',()=>{
// }).catch(err=>{
// })

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`${PORT}`);
  }
});
