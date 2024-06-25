import React, { useEffect, useState } from 'react';
import usePrivateAxios from '../../usePrivateAxios.js';
import BlogTile from './BlogTile';

function BlogPage() {
  const axios = usePrivateAxios();
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.post('/api/blogs');
      setBlogs(response.data);
      setBlogsLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.categoryId === selectedCategory)
    : blogs;

  return (
    <div className="min-h-screen flex flex-col px-4">
      <header className="bg-[#224e38] text-white px-5 py-2 rounded-xl">
        <div className="flex space-x-4 gap-5 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('')}
            className={`py-2 px-3 text-md font-medium rounded-full ${
              !selectedCategory ? 'bg-[#62977d] text-[#181104]' : 'bg-[#6B8A7A]'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryFilter(category.id)}
              className={`px-4 py-2 text-md font-medium rounded-full ${
                selectedCategory === category.id
                  ? 'bg-[#62977d] text-[#181104]'
                  : 'bg-[#6B8A7A]'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>
      </header>

      {/* Blog Tiles */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {blogsLoading ? (
          <div className="w-full h-[60vh] flex justify-center items-center rounded-xl">
            <h1 className="text-4xl font-bold text-gray-700 bg-white/20 px-8 py-5 rounded-3xl">
              Loading...
            </h1>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogTile
                key={blog._id}
                id = {blog._id}
                img={blog.blogImage}
                title={blog.title}
                date={new Date(blog.createdAt).toLocaleDateString()}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-[60vh] flex justify-center items-center rounded-xl">
            <h1 className="text-4xl font-bold text-gray-700 bg-white/20 px-8 py-5 rounded-3xl">
              No blogs found
            </h1>
          </div>
        )}
      </main>
    </div>
  );
}

export default BlogPage;
