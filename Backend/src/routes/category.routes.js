import { Router } from "express";
import { addCategory, deleteCategory, getCategories } from "../controller/category.controller.js";

const router = Router();

router.route('/add-category').post(addCategory); 
router.route('/delete-category/:id').post(deleteCategory);
router.route('/get-category').get(getCategories);

export default router;