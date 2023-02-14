import asyncHandler from "express-async-handler";



const getIndexPage = asyncHandler(async (req, res) => {
  res.render('index');
});

const getAboutPage = asyncHandler(async (req, res) => {
    res.render('about');
    });

export { getIndexPage ,getAboutPage};