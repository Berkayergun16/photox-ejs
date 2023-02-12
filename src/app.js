import express from "express";
import dotenv from "dotenv";
import path from "path";
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// static files
app.use(express.static('src/public'));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
