import User from "../Models/User.js";
import asyncHandler from "express-async-handler";


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

export { addUser };