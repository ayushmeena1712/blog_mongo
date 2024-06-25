import React, { useEffect, useState } from 'react'
import BlogDetail from '../components/Blog/BlogDetailPage'
import { useParams } from 'react-router-dom'
import useAxiosPrivate from '../usePrivateAxios';

function BlogDetailPage() {
  return (
    <div className="mt-8">
     <BlogDetail />
    </div>
  );
}

export default BlogDetailPage;