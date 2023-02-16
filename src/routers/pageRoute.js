import express from "express";
import { getIndexPage ,getAboutPage,getRegisterPage,getLoginPage} from "../controllers/pageController.js";
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/',getIndexPage);
router.get('/about', getAboutPage);
router.get('/register', getRegisterPage);
router.get('/login', getLoginPage);

export default router;