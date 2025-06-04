import Course from '../models/Course.js';

//GET COURSES
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

//GET COURSE BY ID
export const getCourse = async (req, res) => {
  try {
    res.status(200).json(req.course);
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};

//ADD COURSE
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

//UPDATE COURSE
export const updateCourse = async (req, res) => {
  const course = req.course;
  const { title, description, duration, level } = req.body;
  try {
    course.title = title || course.title;
    course.description = description || course.description;
    course.duration = duration || course.duration;
    course.level = level || course.level;
    await course.save();
    return res.status(200).json({ message: 'Course Updated Sucessfully' });
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
};

//DELETE COURSE
export const deleteCourse = async (req, res) => {
  const course = req.course;
  try {
    if (!course) return res.status(404).json({ message: 'Course Not Found' });
    await Course.findByIdAndDelete(course._id);
    res.status(200).json({ message: 'Course Removed Successfully' });
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
};
