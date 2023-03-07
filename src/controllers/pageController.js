// Modules
import asyncHandler from "express-async-handler";

// Models
import Photo from './../Models/Photo.js';
import User from './../Models/User.js';

// Helpers
import sendMail from "../helpers/mail/sendMail.js";

const getIndexPage = asyncHandler(async (req, res) => {
  const photos = await Photo.find({}).sort({ createdAt: -1 }).limit(6);
  const userCount = await User.countDocuments();

  res.render("index", { photos ,userCount});
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

const getContactPage = asyncHandler(async (req, res) => {
  res.render("contact");
});

const sendMailInContact = asyncHandler(async (req, res) => {
  sendMail(req, res);
  res.redirect("/contact");
});

export {
  getIndexPage,
  getAboutPage,
  getRegisterPage,
  getLoginPage,
  getContactPage,
  sendMailInContact,
};
