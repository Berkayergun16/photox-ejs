import express from "express";
import { createPhoto ,getAllPhotos} from "../controllers/photoController.js";


const router = express.Router();

router.post('/', createPhoto);
router.get('/', getAllPhotos)


export default router;