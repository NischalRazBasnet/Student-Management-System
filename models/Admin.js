import mongoose from 'mongoose';

export const adminSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { unique: true, type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
