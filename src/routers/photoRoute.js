import express from "express";
import { createPhoto ,getAllPhotos, getPhotoDetail} from "../controllers/photoController.js";


const router = express.Router();

router.post('/', createPhoto);
router.get('/', getAllPhotos)
router.get('/:id', getPhotoDetail);


export default router;