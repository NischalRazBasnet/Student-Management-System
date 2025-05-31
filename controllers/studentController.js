import Student from '../models/Student.js';

export const getStudents = (req, res) => {
  return res.status(200).json({ message: 'getAllStudents' });
};

export const addStudent = async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    image,
    address,
    email,
    phoneNo,
    course,
    shift,
  } = req.body;
  try {
    await Student.create({
      firstName,
      lastName,
      age,
      image,
      address,
      email,
      phoneNo,
      course,
      shift,
    });
    return res.status(200).json({ message: 'Student Added Successfully' });
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
};
export const getStudent = (req, res) => {
  return res.status(200).json({ message: 'getStudent' });
};

export const updateStudent = (req, res) => {
  return res.status(200).json({ message: 'updateStudent' });
};

export const deleteStudent = (req, res) => {
  return res.status(200).json({ message: 'removeStudent' });
};
