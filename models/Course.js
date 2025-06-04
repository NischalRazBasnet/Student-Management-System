import mongoose from 'mongoose';

export const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    level: { type: String, enum: levels, required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
