import express from 'express';
import morgan from 'morgan';
import studentRoutes from './routes/studentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

//EXPRESS
const app = express();

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
  })
);
app.use(express.static('uploads'));
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
  res.status(200).json({ message: 'STUDENT MANAGEMENT SYSTEM' });
});

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);
