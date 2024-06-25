import { Category } from "../model/category.model.js";


export const addCategory = async(req, res) => {
      try {
            const { category } = req.body;
            const Categories = Category.create({category});
            return res.status(200).json({ message: "Category added successfully" });
      } catch (error) {
            res.status(500).json({ message:"Error creating category"});
      }
}

export const deleteCategory = async(req, res) => {
      try {
            const { categoryId } = req.params.id;
            const Categories = Category.findByIdAndDelete(categoryId);
            return res.status(200).json({ message: "Category deleted successfully" });
      } catch (error) {
            res.status(500).json({ message: "Error while deleting category" });
      }
}

export const getCategories = async(req, res) => {
      try {
            console.log("Inside the getCategories method ");
            const categories = await Category.find();
            return res.status(200).json(categories);
      } catch (error) {
            res.status(500).json({ message: "Error while getting categories" });
      }
}