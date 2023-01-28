const express = require("express");

const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");
const jwt = require("jsonwebtoken");
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.send({ Message: "Signup First" });
  } else {
    const hash_password = user.password;
    const user_id = user._id;
    bcrypt.compare(password, hash_password, (err, result) => {
      if (result == true) {
        const generated_token = jwt.sign(
          { userID: user_id },
          process.env.SECRET_KEY
        );
        res.send({
          Message: "Login Success",
          token: generated_token,
        });
      }
      if (result == false) {
        res.send({ Message: "Wrong password" });
      }
      if (err) {
        res.send({ Message: "Something Went wrong" });
      }
    });
  }
};

module.exports = { userLogin };
