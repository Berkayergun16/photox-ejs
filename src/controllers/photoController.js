import Photo from "../Models/Photo.js";
import asyncHandler from "express-async-handler";

const getAllPhotos = asyncHandler(async (req, res) => {
    const photos = await Photo.find({});
    res.json(photos);
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

export { createPhoto ,getAllPhotos};