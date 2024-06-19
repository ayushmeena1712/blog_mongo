import React, {useState}from "react";
// import { useHistory } from "react-router-dom";
import BlogTile from "./Blog/BlogTile.jsx";   


const user = {
    userName: "john_doe",
    fullName: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/150", // Example avatar URL
};

// Updated mock blog data
const blogs = [
    {
        id: 1,
        img: 'https://images.pexels.com/photos/19392714/pexels-photo-19392714/free-photo-of-off-road-expedition-through-the-desert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'Sample Blog Title That is Very Long and Will Be Truncated',
        date: 'June 15, 2024'
    },
    {
        id: 2,
        img: 'https://images.pexels.com/photos/25677016/pexels-photo-25677016/free-photo-of-a-bare-tree-with-no-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'Another Blog Title',
        date: 'June 14, 2024'
    }
];

function UserProfile() {
    const [contextMenu, setContextMenu] = useState({ visible: false, blogId: null, positionX: 0, positionY: 0 });

    const handleLeftClick = (blogId) => {
        console.log(`Opening blog post with ID: ${blogId}`);
    };

    const handleRightClick = (event, blogId) => {
        event.preventDefault();
        // Set the context menu position relative to the viewport
        setContextMenu({
            visible: true,
            blogId: blogId,
            positionX: event.clientX,
            positionY: event.clientY,
        });
        console.log(`Right-click on blog post with ID: ${blogId}`);
    };

    const handleDeleteBlog = (blogId) => {
        console.log(`Deleting blog with ID: ${blogId}`);
        setContextMenu({ visible: false, blogId: null, positionX: 0, positionY: 0 });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#254336] bg-opacity-60">
            <div className="max-w-5xl w-full space-y-8 p-10 backdrop-blur-none bg-opacity-80 rounded-lg shadow-lg">
                {/* User Avatar and Information */}
                <div className="flex items-center mb-8">
                    <img src={user.avatar} alt="User Avatar" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{user.fullName}</h2>
                        <p className="text-gray-600">@{user.userName}</p>
                    </div>
                </div>

                {/* Blog Tiles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="relative"
                        >
                            <BlogTile
                                img={blog.img}
                                title={blog.title}
                                date={blog.date}
                                onClick={() => handleLeftClick(blog.id)}
                                onContextMenu={(e) => handleRightClick(e, blog.id)}
                            />
                        </div>
                    ))}
                </div>

                {/* Context Menu */}
                {contextMenu.visible && (
                    <div
                        className="fixed bg-white shadow-lg rounded-lg py-2 px-4"
                        style={{ top: contextMenu.positionY, left: contextMenu.positionX, position: 'absolute' }}
                        onMouseLeave={() => setContextMenu({ visible: false, blogId: null, positionX: 0, positionY: 0 })}
                    >
                        <button
                            className="text-red-500"
                            onClick={() => handleDeleteBlog(contextMenu.blogId)}
                            style={{ position: 'relative', marginTop: '5px'}}
                        >
                            Delete Post
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;