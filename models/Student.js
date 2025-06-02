import mongoose from 'mongoose';

export const shifts = ['Morning', 'Day', 'Evening'];

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    email: { unique: true, type: String, required: true },
    phoneNo: { type: Number, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    shift: { type: String, enum: shifts, required: true },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
