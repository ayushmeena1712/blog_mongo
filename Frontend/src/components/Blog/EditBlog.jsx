import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Input from "../Input.jsx";
import Wrapper from "../Wrapper.jsx";

const categories = [
    { id: '1', name: 'Technology' },
    { id: '2', name: 'Health' },
    { id: '3', name: 'Finance' },
    // Add more categories as needed
];

// Mock blog data
const blog = {
    title: "Sample Blog Title",
    content: "Sample Blog Content",
    blogImage: "https://via.placeholder.com/150",
    categoryId: '1'
};

function EditBlog() {
    const { id } = useParams();
    const { register, handleSubmit, setValue, watch } = useForm();
    const [currentImage, setCurrentImage] = useState(blog.blogImage);

    useEffect(() => {
        // Pre-fill form fields with mock blog data
        setValue("title", blog.title);
        setValue("content", blog.content);
        setValue("blogImage", blog.blogImage);
        setValue("categoryId", blog.categoryId);
    }, [setValue]);

    const handleBlogUpdate = (data) => {
        console.log(data); // Replace this with actual update logic
    };

    // Watch the blogImage input field for changes
    const blogImage = watch("blogImage");

    // Update the preview when the blogImage input field changes
//     useEffect(() => {
//         if (blogImage && blogImage.length > 0) {
//             const file = blogImage[0]; // Access the first file in the array
//             if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => {
//                     setCurrentImage(reader.result);
//                 };
//                 reader.readAsDataURL(file);
//             }
//         }
//     }, [blogImage]);

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
                        //     label="Blog Image"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            {...register("blogImage")}
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
}

export default EditBlog;
