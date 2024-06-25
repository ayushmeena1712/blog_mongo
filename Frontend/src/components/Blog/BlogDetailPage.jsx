import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import useAxiosPrivate from "../../usePrivateAxios";


function BlogDetailPage() {
  const axios = useAxiosPrivate();
  const { id } = useParams();
  console.log("id : ", id); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/blogs/${id}`);
        console.log("response data:", response.data);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [axios, id]);

  // Placeholder UI while loading
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
    <div className="min-h-screen flex flex-col px-4 ">
      <header className="bg-[#224e38] text-white px-5 py-2 rounded-xl mb-4">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
      </header>
        <p className="text-right text-lg bg-slate-300">{new Date(blog.createdAt).toLocaleDateString()}</p>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <img

          src={blog.blogImage}
          alt={blog.title}
          className="w-1/2 h-auto"
        />
        <h2 className="text-left ml-2 mb-1 font-semibold">Content :</h2>
        <div className="prose lg:prose-xl bg-gray-200 py-5 px-5 rounded-lg">
          <p className="text-justify">{blog.content}</p>
        </div>
      </main>
    </div>
  );
}

export default BlogDetailPage;
