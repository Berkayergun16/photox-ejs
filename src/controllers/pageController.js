// Modules
import asyncHandler from "express-async-handler";
import htmlMailTemplate from "../helpers/mail/htmlMailTemplate.js";
import nodemailer from "nodemailer";
import sendMail from "../helpers/mail/sendMail.js";

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
