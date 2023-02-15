import User from "../Models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

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
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      user,
    });
  }

  res.status(401).json({
    message: "Invalid username or password",
  });
});

export { addUser, loginUser };
