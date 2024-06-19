import { useState } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import About from "./components/About.jsx";
import FormWrapper from "./components/FormWrapper.jsx";
import BlogTile from "./components/Blog/BlogTile.jsx";
import BlogPage from "./components/Blog/BlogPage.jsx";
import CreateBlog from "./components/Blog/CreateBlog.jsx";
import EditBlog from "./components/Blog/EditBlog.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Home from "./components/Home.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-2 h-full">
      <div className="flex flex-col gap-y-20 justify-between">
        <Header />
        {/* <About /> */}
        {/* <BlogPage /> */}
        {/* <Home /> */}
        <FormWrapper>
          <ForgotPassword />
        </FormWrapper>
        <Footer />
      </div>
    </div>
  );
}

export default App;
