import User from "../Models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Photo from './../Models/Photo.js';
const addUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      status: "success",
      user
    });
  } catch (error) {
    let errors = {};

    if (error.code === 11000) {
      errors.email = "Email already exists";  
    }

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
    }


  res.status(400).json(errors);
 
  }

});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const token = createToken(user._id);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000,
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
  const photos = await Photo.find({ user: res.locals.user._id }).sort({
    createdAt: -1,
  });

  res.render("dashboard", { photos });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.locals.user = null;
  res.redirect("/");
});

export { addUser, loginUser, getDashboardPage, logoutUser };
