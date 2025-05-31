import Course from '../models/Course.js';

export const getCourse = (req, res) => {
  return res.status(200).json({ message: 'getCourse' });
};

export const addCourse = async (req, res) => {
  const { title, description, duration, level } = req.body;
  try {
    await Course.create({
      title,
      description,
      duration,
      level,
    });
    return res.status(200).json({ message: 'Course Created Sucessfully' });
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
};
