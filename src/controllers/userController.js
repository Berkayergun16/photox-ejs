import User from "../Models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const addUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await User.create({
      username,
      email,
      password,
    });
    res.render("register");
  } catch (error) {
    res.render("register");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const token = createToken(user._id);
  
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge:  2 * 60 * 60 * 1000,
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.redirect("/users/dashboard");
  }
  res.redirect("/login");
});

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


const getDashboardPage = asyncHandler(async (req, res) => {
  res.render("dashboard");
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.locals.user = null;
  res.redirect("/");
});


export { addUser, loginUser ,getDashboardPage,logoutUser};
