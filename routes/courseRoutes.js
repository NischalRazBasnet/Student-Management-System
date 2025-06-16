import { Router } from 'express';
import { notAllowed } from '../utils/notAllowed.js';
import { findCourseID } from '../middlewares/checkByID.js';
import {
  addCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from '../controllers/courseController.js';
import {
  courseValidationSchema,
  validates,
} from '../utils/validationSchemas.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();
router.use(verifyToken);

router
  .route('/')
  .get(getCourses)
  .post(validates.body(courseValidationSchema), addCourse)
  .all(notAllowed);

router
  .route('/:id')
  .get(findCourseID, getCourse)
  .patch(findCourseID, updateCourse)
  .delete(findCourseID, deleteCourse)
  .all(notAllowed);

export default router;
