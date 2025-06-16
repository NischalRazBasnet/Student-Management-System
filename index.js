import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import cors from 'cors';

import studentRoutes from './routes/studentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

//EXPRESS
const app = express();

//MIDDLEWARE
app.use(cors());
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
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        'Database connected. Server running on port ' + process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.status(200).json({ message: 'STUDENT MANAGEMENT SYSTEM' });
});

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);
