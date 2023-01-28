const express = require("express");
const app = express();
const cors = require("cors");
const { userSignup } = require("./routes/usersignup.route");
const { connection } = require("./config/db");
const { userLogin } = require("./routes/userlogin.route");
const { GetUserProfile } = require("./routes/getuserprofile.route");
app.use(express.json());
app.use(cors({ origin: "*" }));
require("dotenv").config();
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("Welcome to BMI APP");
});

// signup
app.post("/signup", userSignup);

// login
app.post("/login", userLogin);

// Get User Profile

app.get("/getuserprofile", GetUserProfile);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connection to DB success");
  } catch (err) {
    console.log("Connection to db failed");
    console.log("=>>", err);
  }
  console.log(`App listen on Port Number ${PORT}`);
});
