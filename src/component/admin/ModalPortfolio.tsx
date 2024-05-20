"use client";

import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import useFetchApi from "../common/hooks/useFetchApi";
import { ProjectDetailReq, ProjectDetailRes } from "@/types/api/Project";
import { CircleProgress } from "../common/CircleProgress";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  selectedId?: number;
}

interface FormState {
  title: string;
  type: string;
  content: string;
  image?: string;
}

function ModalPortfolio(props: ModalProps) {
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const { open, setOpen, selectedId } = props;
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const { data: dataProject } = useFetchApi<ProjectDetailReq, ProjectDetailRes>(
    `/api/project/detail/${selectedId}`,
    { id: selectedId },
    { method: "GET" }
  );

  const submitHandler = async (data: FormState) => {
    setIsLoading(true);
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    if (!selectedId) {
      try {
        const response = await axios.post(
          `/api/project?filename=${file.name}`,
          {
            title: data.title,
            content: data.content,
            type: data.type,
            image: file,
            authorId: session.user.id,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.status === 200) {
          props.onSuccess();
          toggleModal();
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error uploading project:", error);
        setIsLoading(false);
      }
    } else {
      try {
        const response = await axios.put(
          `/api/project/${selectedId}?filename=${file.name}`,
          {
            title: data.title,
            content: data.content,
            type: data.type,
            image: file,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.status === 200) {
          props.onSuccess();
          toggleModal();
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error updating project:", error);
        setIsLoading(false);
      }
    }
  };

  React.useEffect(() => {
    if (selectedId && dataProject) {
      setValue("title", dataProject?.project?.title);
      setValue("type", dataProject?.project?.type);
      setValue("content", dataProject?.project?.content);
      setValue("image", dataProject?.project?.image);
    }
  }, [dataProject && selectedId]);

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        onClose={toggleModal}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="my-8 inline-block w-full max-w-sm transform rounded-2xl bg-white p-6 text-left align-middle shadow-sm transition-all">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="bg-white px-4 pt-5 pb-4  sm:p-6 sm:pb-4">
                  <div className="mt-5 sm:col-span-6">
                    <div className="mt-5 sm:col-span-6">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        {selectedId ? "Update Portfolio" : "Create Portfolio"}
                      </Dialog.Title>
                      <div className="mt-5">
                        <div className="mb-4">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Title
                          </label>
                          <input
                            {...register("title", { required: true })}
                            type="text"
                            name="title"
                            id="title"
                            className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-lightGray rounded-md border-2"
                          />
                          {errors.title && (
                            <p className="mt-1 text-red-500 text-sm">
                              Title is required
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Type
                          </label>
                          <input
                            {...register("type", { required: true })}
                            type="text"
                            name="type"
                            id="type"
                            className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-lightGray rounded-md border-2"
                          />
                          {errors.type && (
                            <p className="mt-1 text-red-500 text-sm">
                              Type is required
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <textarea
                            {...register("content", { required: true })}
                            name="content"
                            id="content"
                            className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-lightGray rounded-md border-2 resize-none"
                          />
                          {errors.content && (
                            <p className="mt-1 text-red-500 text-sm">
                              Description is required
                            </p>
                          )}
                        </div>

                        <div className="mt-4">
                          <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Project Image
                          </label>

                          <div className="mt-2">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md border border-lightGray shadow-sm py-2 px-3 flex items-center justify-center text-sm font-medium text-darkBlue hover:text-darkBlue hover:border-darkBlue focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-darkBlue"
                            >
                              <input
                                className="w-full block"
                                {...(register("image"), { required: true })}
                                ref={inputFileRef}
                                type="file"
                              />
                            </label>
                          </div>
                          {errors.image && (
                            <p className="mt-1 text-red-500 text-sm">
                              Image is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange text-base font-medium hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {isLoading ? <CircleProgress /> : null}
                    {selectedId ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-lightGray shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalPortfolio;
