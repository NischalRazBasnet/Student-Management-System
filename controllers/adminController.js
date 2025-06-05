import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Admin Login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email: email });
    if (!existingAdmin)
      return res.status(401).json({ message: 'Incorrect Email' });
    const isPasswordValid = bcrypt.compareSync(
      password,
      existingAdmin.password
    );
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Invalid Credential' });
    const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      token,
      id: existingAdmin._id,
      fullName: existingAdmin.fullName,
      email: existingAdmin.email,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//Setup (create) Admin
export const createAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;
  const adminExists = await Admin.findOne({});
  if (adminExists)
    return res
      .status(403)
      .json({ message: 'Admin already exists. Setup Not Allowed' });

  const hashPass = bcrypt.hashSync(password, 10);
  try {
    await Admin.create({ fullName, email, password: hashPass });
    return res.status(200).json({ message: 'Admin Created Sucessfully' });
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

//Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    return res.status(200).json({
      id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

//Update Admin Profile
export const updateAdminProfile = (req, res) => {
  return res.status(200).json({ message: 'Admin Profile Updated' });
};
