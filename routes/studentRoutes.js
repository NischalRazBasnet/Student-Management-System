import { Router } from 'express';
import {
  getStudents,
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { CheckImageFile } from '../middlewares/checkImageFile.js';
import { findStudentID } from '../middlewares/checkById.js';

const router = Router();

router
  .route('/students')
  .get(getStudents)
  .post(CheckImageFile, addStudent)
  .all(notAllowed);

router
  .route('/students/:id')
  .get(findStudentID, getStudent)
  .patch(findStudentID, CheckImageFile, updateStudent)
  .delete(findStudentID, deleteStudent)
  .all(notAllowed);

export default router;
