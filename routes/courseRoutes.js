import { Router } from 'express';
import {
  addCourse,
  getCourse,
  getCourses,
} from '../controllers/courseController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { findCourseID } from '../middlewares/checkById.js';

const router = Router();

router.route('/courses').get(getCourses).post(addCourse).all(notAllowed);

router
  .route('/courses/:id')
  .get(findCourseID, getCourse)
  .patch(findCourseID, addCourse)
  .delete(findCourseID, addCourse)
  .all(notAllowed);

export default router;
