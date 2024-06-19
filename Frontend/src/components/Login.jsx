import React from "react";
import { useState } from "react";
import Input from './Input.jsx'
import { useForm } from "react-hook-form";
import Wrapper from "./Wrapper.jsx";
import Button from "./Button.jsx";

function Login() {

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

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
            to="/signup"
            className="font-medium  text-primary transition-all duration-200 hover:underline text-[#254336]"
          >
            Sign Up
          </a>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
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
