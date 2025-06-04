export const adminLogin = (req, res) => {
  return res.status(200).json({ message: 'Login Sucessful' });
};
export const createAdmin = (req, res) => {
  return res.status(200).json({ message: 'Admin Created Sucessfully' });
};
export const getAdminProfile = (req, res) => {
  return res.status(200).json({ message: 'Admin Profile' });
};
export const updateAdminProfile = (req, res) => {
  return res.status(200).json({ message: 'Admin Profile Updated' });
};
