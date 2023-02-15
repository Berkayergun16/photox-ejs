import Photo from "../Models/Photo.js";
import asyncHandler from "express-async-handler";

const getAllPhotos = asyncHandler(async (req, res) => {
    const photos = await Photo.find({}).sort({ createdAt: -1 });
    res.render('photos', { photos });
});

const createPhoto = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const photo = await Photo.create({
    name,
    description,
  });
  if (photo) {
    res.status(201).json({
      _id: photo._id,
      name: photo.name,
      description: photo.description,
    });
  } else {
    res.status(400);
    throw new Error("Invalid photo data");
  }
});

const getPhotoDetail = asyncHandler(async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  if(!photo) {
    res.status(404);
    throw new Error('Photo not found');
  }
  res.render('photo', { photo });
});

export { createPhoto ,getAllPhotos, getPhotoDetail};
