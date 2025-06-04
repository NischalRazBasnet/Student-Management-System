import mongoose from 'mongoose';
import Student from '../models/Student.js';
import Course from '../models/Course.js';

//Check Student ID
export const findStudentID = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: 'Invalid Student ID' });

  const student = await Student.findById(id);

  if (!student) return res.status(404).json({ message: 'Student Not Found' });

  req.student = student;
  next();
};

export const findCourseID = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid Course ID' });
  }
  const course = await Course.findById(id);
  if (!course) return res.status(404).json({ message: 'Course Not Found' });

  req.course = course;
  next();
};
