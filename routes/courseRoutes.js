import { Router } from 'express';
import { addCourse, getCourse } from '../controllers/courseController.js';
import { notAllowed } from '../utils/notAllowed.js';

const router = Router();

router.route('/courses').get(getCourse).post(addCourse).all(notAllowed);

export default router;
