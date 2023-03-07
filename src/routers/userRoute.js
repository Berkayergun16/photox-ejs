// Modules
import express from "express";

// Controllers
import {
  addUser,
  loginUser,
  getDashboardPage,
  logoutUser,
  getAllUsers,
  getUserDetails,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";

// Middlewares
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", authenticateToken, getAllUsers);
router.get("/detail/:id", authenticateToken, getUserDetails);

router.post("/register", addUser);
router.post("/login", loginUser);
router.get("/dashboard", authenticateToken, getDashboardPage);
router.get("/logout", authenticateToken, logoutUser);

router.put("/:id/follow", authenticateToken, followUser);
router.put("/:id/unfollow", authenticateToken, unfollowUser);

export default router;
