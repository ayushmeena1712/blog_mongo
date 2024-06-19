import { Router } from 'express';
import { login, register, logout, verify, forgotPassword, verifyForgotPassword } from '../controller/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

router.route('/register').post(upload.single('avatar'), register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/verify-email/:secret').post(verify);
router.route('/forgot-password').post(forgotPassword);
router.route('/verify-forgot-password/:secret').post(verifyForgotPassword);

export default router;
