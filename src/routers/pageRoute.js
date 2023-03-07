// Modules
import express from "express";

// Controllers
import {
  getIndexPage,
  getAboutPage,
  getRegisterPage,
  getLoginPage,
  getContactPage,
  sendMailInContact,
} from "../controllers/pageController.js";

// Middlewares
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes
router.get("/", getIndexPage);
router.get("/about", getAboutPage);
router.get("/register", getRegisterPage);
router.get("/login", getLoginPage);
router.get("/contact", getContactPage);

router.post("/contact", sendMailInContact);

export default router;
