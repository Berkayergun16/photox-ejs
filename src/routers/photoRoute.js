import express from "express";
import { createPhoto ,getAllPhotos, getPhotoDetail,updatePhoto,deletePhoto} from "../controllers/photoController.js";


const router = express.Router();

router.post('/', createPhoto);
router.get('/', getAllPhotos)
router.get('/:id', getPhotoDetail);

router.put('/:id/update', updatePhoto);
router.delete('/:id/delete', deletePhoto);


export default router;