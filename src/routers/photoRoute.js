// Modules
import express from "express";

// Controllers
import {
  createPhoto,
  getAllPhotos,
  getPhotoDetail,
  updatePhoto,
  deletePhoto,
} from "../controllers/photoController.js";

// Middlewares
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/", createPhoto);
router.get("/", getAllPhotos);
router.get("/:id", getPhotoDetail);

router.put("/:id/update", authenticateToken, updatePhoto);
router.delete("/:id/delete", authenticateToken, deletePhoto);

export default router;
