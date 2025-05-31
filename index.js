import express from 'express';
import morgan from 'morgan';
import studentRoutes from './routes/studentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import mongoose from 'mongoose';

//EXPRESS
const app = express();

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

//DATABASE CONNECTION
mongoose
  .connect(
    'mongodb+srv://nischalbasnet7848:Password@cluster0.pzmrcz4.mongodb.net/StudentManagementSystem'
  )
  .then((val) => {
    app.listen(5000, () => {
      console.log('database connected and server is listening');
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.status(200).json({ message: 'WELCOME TO BACKEND' });
});

app.use(studentRoutes);
app.use(courseRoutes);
