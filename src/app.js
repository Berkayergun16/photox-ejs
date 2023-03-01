import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import {v2 as cloudinary} from "cloudinary"
import methodOverride from "method-override";
import connectDb from "./helpers/Databse/connectDb.js";
import pageRouter from "./routers/pageRoute.js";
import photoRouter from "./routers/photoRoute.js";
import userRouter from "./routers/userRoute.js";
import { checkUser, authenticateToken } from "./middlewares/authMiddleware.js";
const app = express();
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})
connectDb();

const __dirname = path.resolve() + '/src';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true
}))
app.use(methodOverride('_method',{
  methods: ['POST', 'GET']
}));



// routes
app.use('*', checkUser);
app.use('/', pageRouter)
app.use('/photos', photoRouter)
app.use('/users', userRouter)
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(process.env.PORT || 5000 , () => {
  console.log(`Server running on port ${process.env.PORT || 5000} 🚀`);
});
