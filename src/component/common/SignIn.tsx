"use client";
import { PostAuthSignInReq } from "@/types/api/AuthAPI";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeFill, BsGoogle } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { CircleProgress } from "./CircleProgress";

export default function SignIn() {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostAuthSignInReq>();

  const submitHandler = async (data: PostAuthSignInReq) => {
    setLoading(true);
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (signInData) {
      router.push("/admin");
    }
    if (signInData?.error) {
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center py-[22.5px] sm:px-6 lg:px-8 bg-darkBlue min-h-screen">
        <div className="relative mx-2 mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-xl bg-cyan">
          <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h1 className="text-2xl pt-4 font-medium pb-4">
              Sign in to your account
            </h1>
            <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                    name="email"
                    type="text"
                    autoComplete="email"
                    className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      Invalid email address
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Konfirmasi Kata sandi
                  </label>
                </div>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <input
                      {...register("password", { required: true })}
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      className={`block w-full rounded-none px-3 rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {passwordShown ? (
                    <button
                      type="button"
                      onClick={() => setPasswordShown(false)}
                      className="btn relative -ml-px inline-flex items-center space-x-2 rounded-r-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
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
                      className="btn relative -ml-px inline-flex items-center space-x-2 rounded-r-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 "
                    >
                      <BsEye
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    Password is not match
                  </p>
                )}
                <div className="mt-4 flex gap-2">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
                  >
                    {loading ? <CircleProgress /> : "Sign In"}
                  </button>
                </div>
              </div>
              <p className="text-sm font-light text-gray-800 dark:text-gray-700">
                Don’t have an account yet?{" "}
                <a
                  href="sign-up"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
            <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-500">
                OR
              </p>
            </div>
            <a
              className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-bold tracking-wide uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-white text-blue-700"
              href="#!"
              role="button"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="me-2 w-7"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Continue with Google
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
