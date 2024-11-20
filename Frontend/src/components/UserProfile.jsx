import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogTile from './Blog/BlogTile.jsx';
import Wrapper from './Wrapper.jsx';
import useAxiosPrivate from '../usePrivateAxios.js';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const fullName = 'ayush';
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [contextMenu, setContextMenu] = useState({ visible: false, blogId: null, positionX: 0, positionY: 0 });

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.post('/api/blogs/userProfile');
        setBlogs(response.data.blog);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      }
    };

    fetchUserBlogs();
  }, [axios]);

  const handleRightClick = (event, blogId) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      blogId: blogId,
      positionX: event.clientX,
      positionY: event.clientY,
    });
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      console.log("delete blog:", blogId);
      await axios.delete(`/api/blogs/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      navigate('/');
    } catch (error) {
      console.log('Error:', error.message);
    }
    setContextMenu({ visible: false, blogId: null, positionX: 0, positionY: 0 });
  };

  return (
    <Wrapper className="h-full py-40">
      <div className="flex items-center justify-center w-full">
        <div className="bg-white/40 max-w-7xl w-full space-y-8 p-10 backdrop-blur-none bg-opacity-80 rounded-lg shadow-lg">
        {user && 
          <div className="flex items-center mb-8">
            <img src={`${user.userImage}`} alt="User Avatar" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{user.userName}</h2>
              <p className="text-gray-600">@{user.userName.toLowerCase().replace(/\s+/g, '')}</p>
            </div>
          </div>
          }

          {blogs.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div key={blog._id} className="relative">
                  <Link to={`/edit/${blog._id}`}>
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
              className="absolute bg-white shadow-lg rounded-lg py-2 px-4"
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
  );
}

export default UserProfile;
