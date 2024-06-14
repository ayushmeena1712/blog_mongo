import { Router } from 'express';
import { login, register, logout, verify } from '../controller/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

router.route('/register').post(upload.single('avatar'), register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/verify-email/:secret').get(verify);

export default router;
