import Student from '../models/Student.js';
import Course from '../models/Course.js';
import fs from 'fs';

//GET STUDENTS
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

//GET STUDENT BY ID
export const getStudent = (req, res) => {
  try {
    return res.status(200).json(req.student);
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
};

//ADD STUDENT
export const addStudent = async (req, res) => {
  const { firstName, lastName, age, address, email, phoneNo, course, shift } =
    req.body;
  try {
    await Student.create({
      firstName,
      lastName,
      age,
      image: req.image,
      address,
      email,
      phoneNo,
      course,
      shift,
    });
    return res.status(200).json({ message: 'Student Added Successfully' });
  } catch (err) {
    fs.unlink(`./uploads${req.image}`, (imageErr) => {
      return res.status(400).json({ message: `${err}` });
    });
  }
};

//UPDATE STUDENT DETAILS
export const updateStudent = async (req, res) => {
  const student = req.student;
  const { firstName, lastName, age, address, email, phoneNo, course, shift } =
    req.body;
  try {
    student.firstName = firstName || student.firstName;
    student.lastName = lastName || student.lastName;
    student.age = age || student.age;
    student.address = address || student.address;
    student.email = email || student.email;
    student.phoneNo = phoneNo || student.phoneNo;
    student.course = course || student.course;
    student.shift = shift || student.shift;
    if (req.image) {
      fs.unlink(`./uploads${student.image}`, async (err) => {
        student.image = req.image;
        await student.save();
      });
    } else {
      await student.save();
    }
    return res.status(200).json({ message: 'Student Updated Successfully' });
  } catch (err) {
    fs.unlink(`./uploads${req.image}`, (imageErr) => {
      return res.status(400).json({ message: `${err}` });
    });
  }
};

//DELETE STUDENT
export const deleteStudent = async (req, res) => {
  const student = req.student;
  try {
    if (student.image) {
      fs.unlink(`./uploads${student.image}`, async (imageErr) => {
        if (imageErr && imageErr.code !== 'ENOENT') {
          return res.status(400).json({ message: `${imageErr}` });
        }
        await Student.findByIdAndDelete(student._id);
        return res.status(200).json({ message: 'Student Removed Sucessfully' });
      });
    } else {
      await Student.findByIdAndDelete(student._id);
      return res.status(200).json({ message: 'Student Removed Sucessfully' });
    }
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
};
