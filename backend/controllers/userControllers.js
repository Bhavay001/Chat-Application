const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

// it is called while registering the user on route /api/user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter All The Fields");
  }
  // checks if user already exists or not while registering
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  // creating a new user on registering
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    // we need to show the data when created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed To Create The User");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

//api/user now to post the data we have two ways either use post req or by passing it as query params

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        // regex dhundega ki search waali value name ya email filed mai hai ki ni database mai
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // else we are not going to do anything
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
