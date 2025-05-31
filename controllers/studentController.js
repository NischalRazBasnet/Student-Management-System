import Student from '../models/Student.js';

export const getStudents = async (req, res) => {
  try {
    const queryObject = { ...req.query };
    const excludeFields = ['sort', 'fields', 'page', 'limit', 'skip'];

    excludeFields.forEach((label) => delete queryObject[label]);

    console.log(queryObject);
    const students = await Student.find(queryObject).sort(req.query.sort);
    return res.status(200).json(students);
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
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
export const getStudent = async (req, res) => {
  return res.status(200).json({ message: 'getStudent' });
};

export const updateStudent = async (req, res) => {
  return res.status(200).json({ message: 'updateStudent' });
};

export const deleteStudent = async (req, res) => {
  return res.status(200).json({ message: 'removeStudent' });
};
