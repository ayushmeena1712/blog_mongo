import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; 
import Input from "../Input.jsx";
import Wrapper from "../Wrapper.jsx"; 
import useAxiosPrivate from "../../usePrivateAxios.js";
import { useNavigate } from "react-router-dom";


function CreateBlog() {
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, reset } = useForm();


  useEffect( () =>{
    fetchCategories();
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleBlog = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("categoryId", data.categoryId);
      formData.append("blogImage", data.blogImage[0]);

      // try {
      //   const action = await dispatch(addBlog(formData));
      //   console.log('action.payload : ', action.payload);
      // } catch (err) {
      //   console.error('Error adding blog:', err);
      //   setError('Failed to add blog. Please try again.');
      // }
      

      const response = await axios.post('/api/blogs/add-blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }        
      });
      console.log("Response from server:", response.data);
      navigate('/userprofile');
      reset();
    } catch (err) {
      console.error("Error submitting blog:", err);
      setError("Failed to create blog post. Please try again.");
    }
  };

  return (
    <Wrapper className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#254336] bg-opacity-60 rounded-lg">
      <div className="max-w-4xl w-full space-y-8 p-10 bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Create a New
            <span className="text-4xl font-serif font-extrabold text-[#95D2B3] p-2">
              {" "}
              Blog
            </span>{" "}
            Post
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 italic">
            ' Share your thoughts and ideas with the world. '
          </p>
        </div>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleBlog)} className="space-y-6">
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
            <Input
              type="file"
              label="Blog Image"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register("blogImage", { required: true })}
              id="blogImage"
            />
          </div>
          <div>
            <label htmlFor="categoryId">Category</label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register("categoryId", { required: true })}
              id="categoryId"
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

export default CreateBlog;
