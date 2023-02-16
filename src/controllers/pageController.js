import asyncHandler from "express-async-handler";
import User from "../Models/User.js";
const getIndexPage = asyncHandler(async (req, res) => {
  console.log("req.user", req.user)
  console.log("req.cookies", req.cookies)
  res.render("index");
});

const getAboutPage = asyncHandler(async (req, res) => {
  res.render("about");
});

const getRegisterPage = asyncHandler(async (req, res) => {
  res.render("register");
});

const getLoginPage = asyncHandler(async (req, res) => {
  res.render("login");
});

export { getIndexPage, getAboutPage, getRegisterPage,getLoginPage };
