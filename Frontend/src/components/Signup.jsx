import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from '../axiosInstance.js';
import Wrapper from "./Wrapper.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const create = async (data) => {
    setError("");
    try { 
      const formData = new FormData();
      formData.append("userImage", data.userImage[0]);
      formData.append("fullName", data.fullName);
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await axios.post('/api/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        console.log("Registration successful:", response.data);
        navigate('../');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <Wrapper className={`flex h-full py-20`}>
      <div className="flex items-center w-full justify-center">
        <div
          className={`mx-auto w-full max-w-lg bg-[#B7B597] rounded-xl p-10 border border-black/10 bg-opacity-95`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">Logo</span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <a
              href="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </a>
          </p>
          { error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                label="User Image"
                placeholder="User Image"
                type="file"
                {...register("userImage", { required: true })}
              />
              <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("fullName", {
                  required: true,
                })}
              />
              <Input
                label="Username: "
                placeholder="Enter the user name"
                {...register("userName", {
                  required: true,
                })}
              />
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

export default Signup;