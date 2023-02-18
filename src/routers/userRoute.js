import express from "express";
import { addUser ,loginUser,getDashboardPage,logoutUser} from "../controllers/userController.js";
import {authenticateToken} from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/register', addUser);
router.post('/login', loginUser);
router.get('/dashboard',authenticateToken, getDashboardPage);
router.get('/logout',authenticateToken, logoutUser);
export default router;