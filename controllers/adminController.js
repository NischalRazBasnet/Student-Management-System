import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';

//Admin Login
export const adminLogin = (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (err) {}
  return res.status(200).json({ message: 'Login Sucessful' });
};

//Setup (create) Admin
export const createAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;
  const isExist = await Admin.findOne({});
  if (isExist)
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
export const getAdminProfile = (req, res) => {
  return res.status(200).json({ message: 'Admin Profile' });
};

//Update Admin Profile
export const updateAdminProfile = (req, res) => {
  return res.status(200).json({ message: 'Admin Profile Updated' });
};
