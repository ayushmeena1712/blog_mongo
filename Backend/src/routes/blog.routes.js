import { Router } from "express";
import { createBlog, deleteBlog, updateBlog, getUserBlogs, getAllBlogs, getBlog } from "../controller/blog.controller.js";
import { upload } from '../middleware/multer.middleware.js';
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router();

router.route('/').post(getAllBlogs);
router.route('/add-blog').post(verifyJWT, upload.single('blogImage'), createBlog);
router.route('/:blog').put(upload.single('blogImage'), updateBlog);
router.route('/:blog').delete(deleteBlog);
router.route('/:blog').get(getBlog);
router.route('/userprofile').post(verifyJWT, getUserBlogs);

export default router;