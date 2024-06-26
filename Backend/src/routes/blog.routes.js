import { Router } from "express";
import { createBlog, deleteBlog, updateBlog, getUserBlogs, getAllBlogs, getBlog } from "../controller/blog.controller.js";
import { upload } from '../middleware/multer.middleware.js';
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router();

router.route('/').post(getAllBlogs);
router.route('/add-blog').post(verifyJWT, upload.single('blogImage'), createBlog);
router.route('/:blog').put(verifyJWT, updateBlog);
router.route('/:blog').delete(verifyJWT, deleteBlog);
router.route('/:blog').get(getBlog);
router.route('/userProfile').post(verifyJWT, getUserBlogs);

export default router;