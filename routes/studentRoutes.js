import { Router } from 'express';
import {
  getStudents,
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { fileCheck } from '../middlewares/checkFile.js';

const router = Router();

router
  .route('/students')
  .get(getStudents)
  .post(fileCheck, addStudent)
  .all(notAllowed);

router
  .route('/students/:id')
  .get(getStudent)
  .patch(updateStudent)
  .delete(deleteStudent)
  .all(notAllowed);

router
  .route('/students/:id')
  .get(getStudent)
  .patch(updateStudent)
  .delete(deleteStudent);

export default router;
