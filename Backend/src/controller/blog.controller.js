import { Blog } from "../model/blog.model.js";
import { Category } from "../model/category.model.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content , categoryId, userId} = req.body;
    const blog = await Blog.create({
      title: title,
      content: content,
      categoryId: categoryId,
      userId: userId,
    });

    if(!blog){ 
      return res.status(404).send("Couldn't create blog");
    }

    const isSaved = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { blogs: blog._id } }, 
    );

    if(!isSaved){
      return res.status(404).send("Couldn't saved category malware");
    }

    return res.status(201).send(blog);

  } catch (error) {
    res.status(404).send(error);
  }
};

export const updateBlog = async(req, res) => {
      try {
            const {title, content, categoryId, userId} = req.body;
            const blog = await Blog.findByIdAndUpdate(
                  req.params.id,
                  {
                        title,
                        content,
                        categoryId,
                        userId,
                  }
            );

            

            if(!blog){
                  return res.status(404).send("Couldn't update blog");
            }

            return res.status(201).send(blog);
      } catch (error) {
            return res.status(404).send(error);
      }
}


export const deleteBlog = async(req, res) => {
      try {
            const blog = await Blog.findByIdAndDelete(req.params.id);
            console.log(`Blog deleted is ${blog}`);
            
            if(blog){ return res.status(404).send("blog is not deleted successfully"); }
            const dbClear = await Category.findByIdAndUpdate(
                  blog._id,
                  { $pull: { blogs: blog._id } }, 
            )
            if(!dbClear){
                  return res.status(404).send("Couldn't delete category malware");
            }
            return res.status(204).send("blog is deleted successfully");
      } catch (error) {
            return res.status(404).send("Couldn't delete blog");
      }
}

export const getBlog = async(req, res) => {
      try {
            const blog = await Blog.findById(req.params.id);
            if(!blog){ return res.status(404).send("blog is not found"); }
            return res.status(200).send(blog);
      } catch (error) {
            return res.status(404).send(error);
      }
}