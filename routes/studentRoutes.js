import { Router } from 'express';
import {
  getStudents,
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';
import {
  handleImageUpload,
  handleOptionalImageUpload,
} from '../middlewares/imageUpload.js';
import {
  studentValidationSchema,
  validates,
} from '../utils/validationSchemas.js';
import { notAllowed } from '../utils/notAllowed.js';
import { findStudentID } from '../middlewares/checkByID.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();
router.use(verifyToken);
router
  .route('/')
  .get(getStudents)
  .post(validates.body(studentValidationSchema), handleImageUpload, addStudent)
  .all(notAllowed);

router
  .route('/:id')
  .get(findStudentID, getStudent)
  .patch(findStudentID, handleOptionalImageUpload, updateStudent)
  .delete(findStudentID, deleteStudent)
  .all(notAllowed);

export default router;
