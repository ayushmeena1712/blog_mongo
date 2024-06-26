import { Blog } from "../model/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.utils.js";
import { Category } from "../model/category.model.js";

const createBlog = async (req, res) => {
  try { 
    console.log('req.body : ', req.body);
    console.log('req.file : ', req.file);
    console.log('req.user : ', req.user);
    const { title, content, categoryId } = req.body;
    console.log(title, content, categoryId);

    const localFilePath = req.file.path;
    const url = await uploadOnCloudinary(localFilePath);
    const userId = req.user._id;

    const blog = await Blog.create({
      title: title,
      content: content,
      categoryId: categoryId,
      userId: userId,
      blogImage: url.url,
    });

    if (!blog) {
      return res.status(404).json("Couldn't create blog");
    }

    const isSaved = await Category.findByIdAndUpdate(categoryId, {
      $push: { blogs: blog._id },
    });
    if (!isSaved) {
      console.log("no saved in teh database")
      return res.status(404).send("Couldn't saved category malware");
    }
    console.log("saved the blog successfully");
    return res.status(201).send(blog);
  } catch (error) {
    console.error("Server error:", error);
    res.status(404).send(error);
  }
};
 
const updateBlog = async (req, res) => {
  try {
    console.log('req.body : ', req.body);
    console.log('req.params : ', req.params);
    const { title, content, categoryId, userId } = req.body;
    const blog = await Blog.findByIdAndUpdate(req.params.blog, {
      title,
      content,
      categoryId,
      userId,
    },{ new: true });

    if (!blog) {
      console.log("Couldn't update blog blog is not found ");
      return res.status(404).send("Couldn't update blog");
    }
     
    return res.status(201).json(blog.data);
  } catch (error) {
    console.log("Error updating blog : ", error.message);
    return res.status(404).send(error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    console.log("req.params : ", req.params);
    const blog = await Blog.findByIdAndDelete(req.params.blog);
    console.log(`Blog deleted is ${blog}`);

    if (blog) {
      return res.status(404).send("blog is not deleted successfully");
    }
    const dbClear = await Category.findByIdAndUpdate(blog._id, {
      $pull: { blogs: blog._id },
    });
    if (!dbClear) {
      return res.status(404).send("Couldn't delete category malware");
    }
    return res.status(204).send("blog is deleted successfully");
  } catch (error) {
    console.error("Error: " + error.message);
    return res.status(404).send("Couldn't delete blog");
  }
};

const getBlog = async (req, res) => {
  try {
    console.log("req.params : ", req.params);
    const blog = await Blog.findById(req.params.blog);
    if (!blog) {
      return res.status(404).send("blog is not found");
    }
    return res.status(200).json(blog);
  } catch (error) {

    console.error("Error: " + error.message);
    return res.status(404).send(error);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) return res.status(200).send("No blog found");

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).send("Error" + error.message);
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("user : ", req.user);
    const blog = await Blog.find({ userId: userId });
    console.log('blog : ', blog.data);
    return res.status(200).json({blog: blog, userImage: req.user.userImage}); 
  } catch (error) {
    console.error("Error : ", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// const getBlog = async(req, res) => {
//   try {
//     const {id} = req.body.id;
//     console.log('req.body ', req.body);
//     const response = await Blog.findById(id);
//     console.log('response : ', response);
//     return res.status(200).json(response);
//   } catch (error) {
//     console.error("Error getBlog ", error.message);
//   }
// }

export {
  getUserBlogs,
  getAllBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
  createBlog,
};
