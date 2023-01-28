const express = require("express");

const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");
const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.send({ Message: "User already exist" });
  } else {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ Message: "Something went wrong" });
      }
      const new_user = new UserModel({
        name,
        email,
        password: hash,
      });

      try {
        await new_user.save();
        res.send({ Message: "Signup Success" });
      } catch (err) {
        res.send({ Message: "Something went wrong, please try again" });
      }
    });
  }
};

module.exports = { userSignup };
