import { Router } from "express";
import { createBlog, deleteBlog, updateBlog, getBlog } from "../controller/blog.controller.js";
const router = Router();

router.route('/add-blog').post(upload.single('blogImage'), createBlog);
router.route('/edit-blog').post(upload.single('blogImage'), updateBlog);
router.route('/detete/:blog').post(deleteBlog);
router.route('/:blog').get(getBlog);

export default router;