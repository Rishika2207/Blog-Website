import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";//reducer
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth"; //external source wala function
import { useForm } from "react-hook-form";          

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, SetError] = useState("");
  const loginData = async (data) => {
    SetError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      SetError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(loginData)} className="mt-8">
            <div className="space-y-5">
                  <Input
                  label="Email: "
                  placeholder="Enter your Email"
                  type="email"
                  {...register("email",{ //humme isko spread krna hoga agar nhi karenge toh or kisi input mai agar register h toh value over write hojayegi
                    required:true,
                    validate:{
                      matchPattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                    }
                  })}
//                   The register function is a part of the React Hook Form library. It's used to register an input field with the form, allowing React Hook Form to track its value and manage its validation.
// The first argument "email" specifies the name of the input field being registered. This name is used to identify the field in the form data.
// The second argument { ... } is an object containing configuration options for the input field.
                  />
                  <Input
                  label="password"
                  placeholder="Enter your Password"
                  type="password"
                  {...register("password",{
                    required:true,
                  }
                )}
                  />

                  <Button 
                  type="submit"
                  className="w-full"
                  >Sign in</Button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
