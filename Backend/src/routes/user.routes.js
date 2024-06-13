import { Router } from 'express';
import { login, register, logout, verify } from '../controller/user.controller.js'; // Ensure the path is correct

const router = Router();

router.route('/signup').post(register);
router.route('/login').post(login);
router.route('/login').post(updatePassword);
router.route('/logout').get(logout);
router.route('/verify-email/:token').get(verify);

export default router;
