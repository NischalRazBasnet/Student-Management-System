import { Router } from 'express';
import {
  adminLogin,
  createAdmin,
  getAdminProfile,
  updateAdminProfile,
} from '../controllers/adminController.js';
import { notAllowed } from '../utils/notAllowed.js';

const router = Router();

router.route('/login').post(adminLogin).all(notAllowed);

router.route('/setup').post(createAdmin).all(notAllowed);

router
  .route('/profile')
  .get(getAdminProfile)
  .patch(updateAdminProfile)
  .all(notAllowed);

export default router;
