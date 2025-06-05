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
import { verifyToken } from '../middlewares/verifyToken.js';

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
  .get(verifyToken, getAdminProfile)
  .patch(verifyToken, updateAdminProfile)
  .all(notAllowed);

export default router;
