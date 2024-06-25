import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Input.jsx";
import Wrapper from "../Wrapper.jsx";
import { updateBlog, getBlog, fetchBlogs } from "../../app/blogSlice.js";

function EditBlog() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, watch } = useForm();
    const [currentImage, setCurrentImage] = useState(null);
    const categories = useSelector(state => state.categories.categories);
    const blog = dispatch(getBlog(id));

    useEffect(() => {
        if (!blog) {
            dispatch(fetchBlogs());
        }
    }, [blog, dispatch]);

    useEffect(() => {
        if (blog) {
            setValue("title", blog.title);
            setValue("content", blog.content);
            setValue("categoryId", blog.categoryId);
            setCurrentImage(blog.blogImage);
        }
    }, [blog, setValue]);

    const handleBlogUpdate = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('categoryId', data.categoryId);
        formData.append('userId', blog.userId);
       
        if (data.blogImage && data.blogImage.length > 0) {
          formData.append('blogImage', data.blogImage[0]);
        } else { 
          formData.append('blogImage', blog.blogImage);
        }
      
        dispatch(updateBlog({ id, blogData: formData }));
      };
      

    const blogImage = watch("blogImage");

    useEffect(() => {
        if (blogImage && blogImage.length > 0) {
            const file = blogImage[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setCurrentImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    }, [blogImage]);

    return (
        <Wrapper className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#254336] bg-opacity-60 rounded-lg">
            <div className="max-w-4xl w-full space-y-8 p-10 bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-900">
                        Edit Your 
                        <span className="text-4xl font-serif font-extrabold text-[#95D2B3] p-2"> Blog</span> Post
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 italic">
                        ' Update your blog details below. '
                    </p>
                </div>
                <form onSubmit={handleSubmit(handleBlogUpdate)} className="space-y-6">
                    <Input
                        type="text"
                        label="Title"
                        className="text-lg"
                        {...register("title", { required: true })}
                    />
                    <Input
                        type="text"
                        label="Content"
                        className="text-lg"
                        {...register("content", { required: true })}
                    />
                    <div>
                        <label className="block font-bold mb-2" htmlFor="blogImage">
                            Blog Image
                        </label>
                        {currentImage && (
                            <div className="mb-4 w-full flex justify-center">
                                <img src={currentImage} alt="Current Blog" className="w-32 h-32 object-cover rounded-md" />
                            </div>
                        )}
                        <Input
                            type="file"
                            label="Blog Image"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            {...register("blogImage")}
                            id="blogImage"
                        />
                    </div>
                    <div>
                        <label htmlFor="categoryId">
                            Category
                        </label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            {...register("categoryId", { required: true })}
                            id="categoryId"
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
}

export default EditBlog;
