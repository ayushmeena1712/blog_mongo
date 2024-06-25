import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice.js';
import blogReducer from './blogSlice.js'; 

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    blog: blogReducer,
  },
});

export default store;