import { Router } from 'express';
import {
  adminLogin,
  createAdmin,
  getAdminProfile,
  updateAdminProfile,
} from '../controllers/adminController.js';
import { notAllowed } from '../utils/notAllowed.js';
import {
  adminLoginValidation,
  adminSetupValidation,
  validates,
} from '../utils/validationSchemas.js';

const router = Router();

router
  .route('/login')
  .post(validates.body(adminLoginValidation), adminLogin)
  .all(notAllowed);

router
  .route('/setup')
  .post(validates.body(adminSetupValidation), createAdmin)
  .all(notAllowed);

router
  .route('/profile')
  .get(getAdminProfile)
  .patch(updateAdminProfile)
  .all(notAllowed);

export default router;
