import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog } from '../app/blogSlice.js';
import { Link } from 'react-router-dom';
import BlogTile from './Blog/BlogTile.jsx';
import Wrapper from './Wrapper.jsx';

function UserProfile() {
    const dispatch = useDispatch();
    const fullName = 'ayush';
    const [blogs, setBlogs] = useState([]);
    const [contextMenu, setContextMenu] = useState({ visible: false, blogId: null, positionX: 0, positionY: 0 });
  
    useEffect(() => {
      const fetchUserBlogs = async () => {
        try {
          const response = await axios.get('/api/blogs/userProfile');
          setBlogs(response.data);
        } catch (error) {
          console.error('Error fetching user blogs:', error);
        }
      };
  
      fetchUserBlogs();
    }, []);
  
    const handleRightClick = (event, blogId) => {
      event.preventDefault();
      setContextMenu({
        visible: true,
        blogId: blogId,
        positionX: event.clientX,
        positionY: event.clientY,
      });
    };
  
    const handleDeleteBlog = (blogId) => {
      dispatch(deleteBlog(blogId));
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      setContextMenu({ visible: false, blogId: null, positionX: 0, positionY: 0 });
    };
    
  return (
    <Wrapper className="h-full py-40">
      <div className="flex items-center justify-center w-full">
        <div className="max-w-5xl w-full space-y-8 p-10 backdrop-blur-none bg-opacity-80 rounded-lg shadow-lg">
          <div className="flex items-center mb-8">
            <img src="/default-avatar.png" alt="User Avatar" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{fullName}</h2>
              <p className="text-gray-600">@{fullName.toLowerCase().replace(/\s+/g, '')}</p>
            </div>
          </div>

          {blogs.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="relative">
                  <Link to={`/editBlog/${blog._id}`}>
                    <BlogTile
                      img={blog.blogImage}
                      title={blog.title}
                      date={new Date(blog.createdAt).toLocaleDateString()}
                      onContextMenu={(e) => handleRightClick(e, blog._id)}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {contextMenu.visible && (
            <div
              className="fixed bg-white shadow-lg rounded-lg py-2 px-4"
              style={{ top: contextMenu.positionY, left: contextMenu.positionX, position: 'absolute' }}
              onMouseLeave={() => setContextMenu({ visible: false, blogId: null, positionX: 0, positionY: 0 })}
            >
              <button
                className="text-red-500"
                onClick={() => handleDeleteBlog(contextMenu.blogId)}
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

  export default UserProfile;