import React from "react";
import { useState } from "react";
import Input from './Input.jsx'
import { useForm } from "react-hook-form";
import Wrapper from "./Wrapper.jsx";
import Button from "./Button.jsx";
// import axios from '../axiosInstance.js';
import useAxiosPrivate from '../Hooks/useAxiosPrivate.js';
import { useAuth } from "../Authcontext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { setAuth, auth } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const axios = useAxiosPrivate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/users/login', data);
      const { accessToken, refreshToken } = response.data;
      console.log(response.data);
      setAuth({ accessToken, refreshToken });
      console.log("Auth context :", auth);
      navigate('/');
      setError(null);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <Wrapper className={'h-full py-40'}>
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-[#B7B597] rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            Logo
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-[#254336]">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-[#254336]">
          Don't have any account ?{" "}
          <a
            href="/signup"
            className="font-medium  text-primary transition-all duration-200 hover:underline text-[#254336]"
          >
            Sign Up
          </a>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Username or Email: "
              placeholder="Enter your username or email"
              {...register("userName", {
                required: "Username or email is required",
              })}
            />
            {errors.userName && <p className="text-red-600">{errors.userName.message}</p>}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
    </Wrapper>
  );
}

export default Login;
