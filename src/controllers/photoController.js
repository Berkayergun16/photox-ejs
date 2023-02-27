import Photo from "../Models/Photo.js";
import asyncHandler from "express-async-handler";
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import User from './../Models/User.js';


const getAllPhotos = asyncHandler(async (req, res) => {
    const photos = res.locals.user ? await Photo.find({
      user: {
        $ne: res.locals.user._id,
      }
    }).sort({ createdAt: -1 }) : await Photo.find({}).sort({ createdAt: -1 });

   

    res.render('photos', { photos });
});

const createPhoto = asyncHandler(async (req, res) => {

  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true,
    folder: 'lenslight'
  })

  const { name, description } = req.body;
  
  const photo = await Photo.create({
    name,
    description,
    user: res.locals.user._id,
    url: result.secure_url,
  });
  
  if (photo) {
    fs.unlinkSync(req.files.image.tempFilePath);

    User.findByIdAndUpdate(res.locals.user._id, {
      $push: { photos: photo._id },
    }).exec();
  
    res.status(201).redirect('/users/dashboard');
  } else {
    res.status(400);
    throw new Error("Invalid photo data");
  }
});

const getPhotoDetail = asyncHandler(async (req, res) => {
  const photo = await Photo.findById(req.params.id).populate('user');

  if(!photo) {
    res.status(404);
    throw new Error('Photo not found');
  }
  res.render('photo', { photo });
});

export { createPhoto ,getAllPhotos, getPhotoDetail};
