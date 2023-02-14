import express from "express";
import dotenv from "dotenv";
import path from "path";

const app = express();

dotenv.config();

const __dirname = path.resolve() + '/src';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// static files
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});


app.listen(process.env.PORT || 5000 , () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
