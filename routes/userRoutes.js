const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
require("dotenv").config()

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Home Page");
});


userRouter.get("/data", (req, res) => {
  const token = req.query.token;
  jwt.verify(token, process.env.key, (err, decoded) => {
    if (err) {
      res.send("Invalid Token");
      console.log(err);
    } else {
      res.send("Data...");
    }
  });
});

userRouter.get("/cart", (req, res) => {
  const token = req.headers.auth;
  jwt.verify(token, process.env.key, (err, decoded) => {
    if (err) {
      res.send("Invalid Token");
      console.log(err);
    } else {
      res.send("Cart...");
    }
  });
});

userRouter.post("/register", async (req, res) => {
    const { email, password, name, age } = req.body;
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log("Error");
        } else {
          const user = new UserModel({ email, password: hash, name, age });
          await user.save();
          res.send("Registered");
        }
      });
    } catch (e) {
      console.log("Error", e);
    }
  });

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    console.log(user);
    // localStorage.setItem("headers", token);
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          var token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ msg: "Login Successfull", token: token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
    console.log(user);
  } catch (e) {
    console.log("Error", e);
  }
});

module.exports = { userRouter };
