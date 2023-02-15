import asyncHandler from "express-async-handler";
import User from "../Models/User.js";
const getIndexPage = asyncHandler(async (req, res) => {
  res.render("index");
});

const getAboutPage = asyncHandler(async (req, res) => {
  res.render("about");
});

const getRegisterPage = asyncHandler(async (req, res) => {
  res.render("register");
});


export { getIndexPage, getAboutPage, getRegisterPage };
