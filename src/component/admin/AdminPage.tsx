import { PostProjectReq } from "@/types/api/AuthAPI";
import { PutBlobResult } from "@vercel/blob";
import React from "react";
import { useForm } from "react-hook-form";

export default function AdminPage() {
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [blob, setBlob] = React.useState<PutBlobResult | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostProjectReq>();

  const submitHandler = (data: PostProjectReq) => {};
  return (
    <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8 bg-darkBlue ">
      <div className="relative mx-2 mt-8 sm:mx-auto sm:w-full sm:max-w-md rounded-xl bg-cyan">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h1 className="text-2xl pt-4 font-medium pb-4">
            Upload Project Form
          </h1>
          <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  {...register("title", { required: true })}
                  name="title"
                  type="text"
                  autoComplete="title"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <div className="mt-1">
                <input
                  {...register("content", {
                    required: true,
                    minLength: 10,
                  })}
                  name="content"
                  type="text"
                  autoComplete="username"
                  className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                    errors.content ? "border-red-500" : ""
                  }`}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">Invalid content</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Image
                </label>
              </div>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                  <input
                    {...(register("image"), { required: true })}
                    ref={inputFileRef}
                    type="file"
                  />
                </div>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
              >
                {/* {loading ? <CircleProgress /> : null} */}
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
