import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};
export const getCourse = async (req, res) => {
  try {
    res.status(200).json(req.course);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
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
