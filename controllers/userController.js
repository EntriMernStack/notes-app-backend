const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = await req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  //user already exists or not

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //hash password
  console.log(process.env.SALT);
  const secret = parseInt(process.env.SALT);
  const salt = await bcrypt.genSalt(secret);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});

const generateToken = (id) => {
  var token = jwt.sign({ id }, process.env.LOGIN_SECRET_KEY, {
    expiresIn: "30d",
  });
  console.log(token);
  return token;
};

module.exports = { registerUser, loginUser };
