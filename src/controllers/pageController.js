// Modules
import asyncHandler from "express-async-handler";

const getIndexPage = asyncHandler(async (req, res) => {
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
