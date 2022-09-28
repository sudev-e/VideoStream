const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const dotenv = require("dotenv").config();

//@ Register new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add all the fields");
  }
  //check if the user already registered
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  res.json({ message: "Register User" });
  //user registration
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    let token = generateToken(user._id);
    res.cookie("accesstoken", token).status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    })
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//@ user login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check for user
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    let token = generateToken(user._id);
    res.cookie("accesstoken", token).status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    })
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  res.json({ message: "Login User" });
});
 

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
};
