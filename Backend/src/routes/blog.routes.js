import { Router } from "express";
import { createBlog, deleteBlog, updateBlog, getBlog } from "../controller/blog.controller.js";
const router = Router();

router.route('/add-blog').post(createBlog);
router.route('/edit-blog').post(updateBlog);
router.route('/detete/:blog').post(deleteBlog);
router.route('/:blog').get(getBlog);

export default router;