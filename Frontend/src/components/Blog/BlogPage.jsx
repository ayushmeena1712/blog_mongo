import React, { useState } from 'react';
import BlogTile from './BlogTile';

const categories = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Health' },
  { id: '3', name: 'Finance' },
  // Add more categories as needed
];

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const blogs = [
    {
      id: '1',
      categoryId: '1',
      img: 'https://images.pexels.com/photos/19392714/pexels-photo-19392714/free-photo-of-off-road-expedition-through-the-desert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Sample Blog Title That is Very Long and Will Be Truncated',
      date: 'June 15, 2024'
    },
    {
      id: '2',
      categoryId: '2',
      img: 'https://images.pexels.com/photos/25677016/pexels-photo-25677016/free-photo-of-a-bare-tree-with-no-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Another Blog Title',
      date: 'June 14, 2024'
    }
  ];

  const filteredBlogs = selectedCategory
    ? blogs.filter(blog => blog.categoryId === selectedCategory)
    : blogs;

  return (
    <div className="min-h-screen flex flex-col px-4 ">  
      <header className="bg-[#224e38] text-white px-5 py-2 rounded-xl">
          <div className="flex space-x-4 gap-5 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('')}
              className={`py-2 px-3 text-md font-medium rounded-full ${!selectedCategory ? 'bg-[#62977d] text-[#181104]' : 'bg-[#6B8A7A]'}`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-md font-medium rounded-full ${selectedCategory === category.id ? 'bg-[#62977d] text-[#181104]' : 'bg-[#6B8A7A]'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
      </header>

      {/* Blog Tiles */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => (
              <BlogTile key={index} img={blog.img} title={blog.title} date={blog.date} />
            ))}
          </div>
        ) : (
          <div className="w-full h-[60vh] flex justify-center items-center rounded-xl ">
            <h1 className="text-4xl font-bold text-gray-700 bg-white/20 px-8 py-5 rounded-3xl hover:scale-105 transition duration-300">No blogs found</h1>
          </div>
        )}
      </main>

    </div>
  );
}

export default BlogPage;
