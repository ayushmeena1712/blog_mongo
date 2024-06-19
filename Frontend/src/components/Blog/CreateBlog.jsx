import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input.jsx";
import Wrapper from "../Wrapper.jsx";

const categories = [
    { id: '1', name: 'Technology' },
    { id: '2', name: 'Health' },
    { id: '3', name: 'Finance' },
    // Add more categories as needed
];

function CreateBlog() {
    const { register, handleSubmit } = useForm();

    const handleBlog = (data) => {
        console.log(data);  // Replace this with actual form handling logic
    };

    return (
        <Wrapper className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#254336] bg-opacity-60 rounded-lg">
        <div className="max-w-4xl w-full space-y-8 p-10 bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-900">
                        Create a New 
                        <span className="text-4xl font-serif font-extrabold text-[#95D2B3] p-2"> Blog</span> Post
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 italic">
                        ' Share your thoughts and ideas with the world. '
                    </p>
                </div>
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
                        {/* <label className="font-bold" htmlFor="blogImage">
                            Blog Image
                        </label> */}
                        <Input
                            type="file"
                            label="Blog Image" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            {...register("blogImage", { required: true })}
                            id="blogImage"
                        />
                    </div>
                    <div>
                        <label className="" htmlFor="categoryId">
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
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
}

export default CreateBlog;
