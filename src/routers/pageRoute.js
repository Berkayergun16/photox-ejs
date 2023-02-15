import express from "express";
import { getIndexPage ,getAboutPage,getRegisterPage} from "../controllers/pageController.js";

const router = express.Router();

router.get('/', getIndexPage);
router.get('/about', getAboutPage);
router.get('/register', getRegisterPage);

export default router;