import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosPrivate} from '../axiosInstance.js';

export const addBlog = createAsyncThunk('blogs/addBlog', async (blogData) => { 
  try {
    const response = await axiosPrivate.post('/api/blogs/add-blog', blogData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error : ", error.message);
  }
});

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axiosPrivate.post('/api/blogs');
  return response.data;
});


export const updateBlog = createAsyncThunk('blogs/updateBlog', async ({ id, blogData }) => {
  const response = await axiosPrivate.post(`/api/blogs/${id}`, blogData);
  return response.data;
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  await axiosPrivate.post(`/api/blogs/${id}`);
  return id;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers:{
    getBlog: (state, action) => {
      return state.blogs.find((blog) => blog._id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        console.log("processing addBlog action")
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
        state.blogs[index] = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      });
  },
});

export const { getBlog } = blogSlice.actions;
export default blogSlice.reducer;