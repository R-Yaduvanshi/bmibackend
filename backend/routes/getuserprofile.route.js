const express = require("express");

const app = express();
app.use(express.json());
const { UserModel } = require("../models/User.model");

const GetUserProfile = async (req, res) => {
  const { email } = req.headers;
  const user = await UserModel.findOne({ email: email });

  res.send({
    name: user?.name,
    email: user?.email,
  });
  //   res.send("helo");
  //   console.log(email);
};

module.exports = {
  GetUserProfile,
};
