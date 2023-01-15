const express = require("express");
const { connection } = require("./configs/db");
const { UserModel } = require("./models/user.model");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/userRoutes");
const { noteRouter } = require("./routes/noteRouter");
const { authenticate } = require("./middlewares/authenticate.mw");
const cors=require("cors")
app.use(cors())
require('dotenv').config()


app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)


app.listen(process.env.port||4500, async () => {
  console.log(process.env.port)
  try {
    await connection;
    console.log("Connected to DB **%%");
    console.log("Running at 4500");
  } catch (e) {
    console.log("Error", e);
  }
});
