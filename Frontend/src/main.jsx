import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css' 
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import About from "./pages/AboutPage.jsx";  
import BlogPage from "./pages/BlogPage.jsx";
import CreateBlog from "./pages/CreateBlogPage.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Home from "./pages/HomePage.jsx";
import ForgotPassword from "./pages/ForgotPasswordPage.jsx";
import {AuthProvider} from "./Authcontext.jsx";
import EditBlogPage from './pages/EditBlogPage.jsx'
import BlogDetailPage from './pages/BlogDetailPage.jsx'
import AuthLayout from "./components/AuthLayout.jsx"
import ForgotPasswordVerify from './components/ForgotPasswordVerify.jsx'
import LayoutForUserForm from './LayoutForUserForm.jsx'


const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/about',
          element: (
            <AuthLayout authentication={false} onBoth={true}>
              <About />
            </AuthLayout>
          ),
        },
        {
          path: '/all-blogs',
          element: (
            <AuthLayout authentication={false} onBoth={true}>
              <BlogPage />
            </AuthLayout>
          ),
        },
        {
          path: '/blog/:id',
          element: <BlogDetailPage />,
        },
        {
          path: '/userprofile',
          element: (
            <AuthLayout authentication>
              <UserProfile />
            </AuthLayout>
          ),
        },
        {
          path: '/add-blog',
          element: (
            <AuthLayout authentication>
              <CreateBlog />
            </AuthLayout>
          ),
        },
        {
          path: '/edit-blog/:id',
          element: (
            <AuthLayout authentication>
              <EditBlogPage />
            </AuthLayout>
          ),
        },
        {
          path: '/edit/:id',
          element: (
            <AuthLayout authentication>
              <EditBlogPage />
            </AuthLayout>
          ),
        },
      ],
    },
    {
      path: '/',
      element: <LayoutForUserForm />,
      children: [
        {
          path: 'login',
          element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: 'signup',
          element: (
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          ),
        },
        {
          path: 'forgot-password',
          element: (
            <AuthLayout authentication={false}>
              <ForgotPassword />
            </AuthLayout>
          ),
        },
        {
          path: 'forgot-password/:secret',
          element: (
            <AuthLayout authentication={false}>
              <ForgotPasswordVerify />
            </AuthLayout>
          ),
        },
      ],
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
        <RouterProvider router={router}/> 
    </AuthProvider>
  </React.StrictMode>,
)
