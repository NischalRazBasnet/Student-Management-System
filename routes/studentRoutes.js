import { Router } from 'express';
import {
  addStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from '../controllers/studentController.js';
import { notAllowed } from '../utils/notAllowed.js';

const router = Router();

router.route('/students').get(getStudents).post(addStudent).all(notAllowed);

router
  .route('/students/:id')
  .get(getStudent)
  .patch(updateStudent)
  .delete(deleteStudent);

export default router;
