import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../Input.jsx";
import Wrapper from "../Wrapper.jsx";
import useAxiosPrivate from "../../usePrivateAxios.js";

function EditBlog() {
    const navigate = useNavigate();
    const axios = useAxiosPrivate();
    const { id } = useParams(); 
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetchCategories();
        fetchBlog();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/blogs/${id}`);
            console.log("blog: ", response.data);
            setBlog(response.data);
            reset(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching blog:", error);
            setLoading(false);
        }
    };

    const handleBlogUpdate = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('categoryId', data.categoryId);
            formData.append('userId', blog.userId);

            setLoading(true);
            const response = await axios.put(`/api/blogs/${id}`, formData);
            setBlog(response.data);
            setLoading(false);
            navigate(`/userprofile`);
        } catch (error) {
            console.log("Error updating blog:", error.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (!blog) {
        return (
            <div className="w-full h-[60vh] flex justify-center items-center rounded-xl ">
                <h1 className="text-4xl font-bold text-gray-700 bg-white/20 px-8 py-5 rounded-3xl">
                    Blog not found
                </h1>
            </div>
        );
    }

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
                        defaultValue={blog.title}
                        className="text-lg"
                        {...register("title", { required: true })}
                    />
                    <div>
                        <label className="block font-bold mb-2" htmlFor="blogImage">
                            Blog Image
                        </label>
                        {blog.blogImage && (
                            <div className="mb-4 w-full flex justify-center">
                                <img src={blog.blogImage} alt="Blog Image" className="w-1/2 h-auto object-cover rounded-md" />
                            </div>
                        )}
                    </div>
                    <Input
                        type="textarea"
                        label="Content"
                        defaultValue={blog.content}
                        className="text-lg py-20"
                        {...register("content", { required: true })}
                    />
                    <div>
                        <label htmlFor="categoryId" className="block font-bold mb-2">
                            Category
                        </label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            {...register("categoryId", { required: true })}
                            id="categoryId"
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id} selected={category._id === blog.categoryId}>
                                    {category.category}
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
