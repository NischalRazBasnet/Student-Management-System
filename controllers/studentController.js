import Student, { shifts } from '../models/Student.js';
import Course from '../models/Course.js';

export const getStudents = async (req, res) => {
  try {
    const queryObject = { ...req.query };
    const excludeFields = ['sort', 'fields', 'page', 'limit', 'search'];
    excludeFields.forEach((field) => delete queryObject[field]);

    // search
    if (req.query.search) {
      const searchText = req.query.search.toLowerCase();

      const courseMatches = await Course.find({
        title: { $regex: searchText, $options: 'i' },
      });

      const courseId = courseMatches.map((course) => course._id);

      queryObject.$or = [
        { firstName: { $regex: searchText, $options: 'i' } },
        { lastName: { $regex: searchText, $options: 'i' } },
        { shift: { $regex: searchText, $options: 'i' } },
      ];

      if (courseId.length > 0) {
        queryObject.$or.push({ course: { $in: courseId } });
      }
    }

    let query = Student.find(queryObject).populate('course', '_id title');

    // sorting
    if (req.query.sort) {
      const sorting = req.query.sort
        .split(/[\s,]+/)
        .filter(Boolean)
        .join(' ');
      query.sort(sorting);
    }

    // field selection
    if (req.query.fields) {
      const selects = req.query.fields
        .split(/[\s,]+/)
        .filter(Boolean)
        .join(' ');
      query.select(selects);
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const students = await query
      .skip(skip)
      .limit(limit)
      .select('-createdAt -updatedAt');

    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const addStudent = async (req, res) => {
  // const { image } = req.body;
  try {
    // await Student.create({
    //   firstName,
    //   lastName,
    //   age,
    //   image,
    //   address,
    //   email,
    //   phoneNo,
    //   course,
    //   shift,
    // });
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
