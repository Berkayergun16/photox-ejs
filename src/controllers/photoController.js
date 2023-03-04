//Modules
import asyncHandler from "express-async-handler";
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

// Models
import Photo from "../Models/Photo.js";
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
  const {secure_url, public_id} = result;

  const photo = await Photo.create({
    name,
    description,
    user: res.locals.user._id,
    url: secure_url,
    image_id: public_id,
  });
  
  if (photo) {

    fs.unlinkSync(req.files.image.tempFilePath);

    User.findByIdAndUpdate(res.locals.user._id, {
      $push: { photos: photo._id },
    }).exec();
  
    return res.status(201).redirect('/users/dashboard');
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

const updatePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const { image } = req.files;

  const photo = await Photo.findById(id);

  if (photo) {
    photo.name = name ? name : photo.name;
    photo.description = description ? description : photo.description ;
    photo.url = image ? image.tempFilePath : photo.url;

    if (image) {
      await cloudinary.uploader.destroy(photo.image_id);
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        use_filename: true,
        folder: 'lenslight'
      })
      photo.url = result.secure_url;
      photo.image_id = result.public_id;

      fs.unlinkSync(image.tempFilePath);
    }

     const updatedPhoto =  await photo.save();

    res.status(200).redirect(`/photos/${updatedPhoto._id}`);
  }

  res.status(404);


});

const deletePhoto = asyncHandler(async (req, res) => {
  const {id} = req.params;

  const photo = await Photo.findById(id);

  await cloudinary.uploader.destroy(photo.image_id);

  await Photo.findOneAndRemove({_id: id});

  res.status(200).redirect('/users/dashboard');

});

export { createPhoto ,getAllPhotos, getPhotoDetail,updatePhoto,deletePhoto};
