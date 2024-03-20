"use client";

import { PostAuthSignUpReq } from "@/types/api/AuthAPI";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeFill } from "react-icons/bs";

export default function SignUp() {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<PostAuthSignUpReq>();

  const submitHandler = async (data: PostAuthSignUpReq) => {
    const response = await fetch("/api/auth/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });
    if (response.ok) {
      router.push("/");
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <div className="flex min-h-[792px] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-darkBlue ">
        <div className="relative mx-2 mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-xl bg-cyan">
          <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h1 className="text-2xl pt-4 font-medium pb-4">Sign Up</h1>
            <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    {...register("name", { required: true })}
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    {...register("email", { required: true })}
                    name="email"
                    type="text"
                    autoComplete="username"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kata sandi
                  </label>
                </div>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <input
                      {...register("password", { required: true })}
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {passwordShown ? (
                    <button
                      type="button"
                      onClick={() => setPasswordShown(false)}
                      className="btn relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                    >
                      <BsEyeFill
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPasswordShown(true)}
                      className="btn relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 "
                    >
                      <BsEye
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
                  >
                    Daftar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
