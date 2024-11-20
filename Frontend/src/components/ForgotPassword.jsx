import React, { useState } from "react";
import axios from '../axiosInstance.js';
import { useForm } from "react-hook-form";
import Wrapper from "./Wrapper.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";


function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setMessage("");
    console.log(data);
    try {
      const response = await axios.post("/api/users/forgot-password", data);

      if (response.status === 202) {
        setMessage(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
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
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-base text-[#254336]">
            Enter your email or username to reset your password.
          </p>
          {message && <p className="text-green-600 mt-8 text-center">{message}</p>}
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <Input
                label="Email or Username: "
                placeholder="Enter your email or username"
                type="text"
                {...register("emailOrUsername", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

export default ForgotPassword;