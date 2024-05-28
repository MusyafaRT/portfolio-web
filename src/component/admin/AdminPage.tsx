"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import ConfirmDialog from "../common/ConfirmDialog";
import useFetchApi from "../common/hooks/useFetchApi";
import { ListProjectRes } from "@/types/api/Project";
import ModalPortfolio from "./ModalPortfolio";
import { CircleProgress } from "../common/CircleProgress";
import ModalStory from "./ModalStory";

export default function AdminPage() {
  const [confirmId, setConfirmId] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const [formModalState, setFormModalState] = React.useState<{
    open: boolean;
    selectedId?: number;
  }>({
    open: false,
    selectedId: undefined,
  });
  const handleShowFormStory = (open: boolean) => {
    setFormStoryModalState({
      open,
    });
  };

  const [formStoryModalState, setFormStoryModalState] = React.useState<{
    open: boolean;
  }>({
    open: false,
  });

  const { data, error, isLoading, mutate } = useFetchApi<null, ListProjectRes>(
    "api/project", // API URL
    null,
    { method: "GET" }, // Options
    { skipCall: false, revalidateOnMount: true } // SWR options
  );

  const handleDelete = async (id: string) => {
    try {
      const resDelete = await axios.delete(`/api/project/${id}`);
      if (resDelete.status === 200) {
        setLoading(false);
      }
      setConfirmId(0);
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setLoading(false);
    }
    mutate();
  };

  const SkeletonLoader = () => (
    <tbody>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <tr key={index}>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <section className="h-screen bg-darkBlue flex w-full flex-col justify-center items-center gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            handleShowForm(!formModalState?.open);
          }}
          className="bg-orange rounded-md p-3 hover:opacity-80"
        >
          Add Portfolio
        </button>
        <button
          onClick={() => {
            handleShowFormStory(!formStoryModalState?.open);
          }}
          className="bg-orange rounded-md p-3 hover:opacity-80"
        >
          Add Story
        </button>
        <Link
          href="/show-story"
          className="bg-orange rounded-md p-3 hover:opacity-80"
        >
          Show Story
        </Link>
      </div>
      <div className="max-w-screen-lg mx-auto">
        <table className="divide-y divide-gray-200">
          <thead className="bg-cyan">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                No
              </th>
              <th
                scope="col"
                className="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="w-1/2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Content
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <tbody className="text-white divide-y divide-gray-200">
              {data?.project?.map((project, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <div className="flex items-end text-sm ">{index + 1}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-end text-sm ">
                      {project.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-end text-sm ">
                      {project.content}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-end text-sm ">
                      {project.image}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 items-end text-sm text-gray-900">
                      <button
                        data-twe-toggle="tooltip"
                        data-twe-html="true"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        title="Edit Data"
                        type="button"
                        onClick={() => {
                          handleShowForm(!formModalState?.open, project.id);
                        }}
                        className="rounded-[6px] bg-[#378b22] py-2 px-3 text-[14px] font-normal text-gray-50"
                      >
                        <PencilAltIcon className="h-5 w-5" />
                      </button>
                      <button
                        data-twe-toggle="tooltip"
                        data-twe-html="true"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        title="Hapus Data"
                        type="button"
                        className="rounded-[6px] bg-red-500 py-2 px-3 text-[14px] font-normal text-gray-50"
                        onClick={() => setConfirmId(project.id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {formModalState?.open && (
            <ModalPortfolio
              open={formModalState?.open}
              setOpen={(open: boolean) => handleShowForm(open)}
              onSuccess={() => mutate()}
              selectedId={formModalState?.selectedId}
            />
          )}
          {formStoryModalState?.open && (
            <ModalStory
              open={formStoryModalState?.open}
              setOpen={(open: boolean) => handleShowFormStory(open)}
              onSuccess={() => mutate()}
            />
          )}
        </table>
      </div>
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={() => handleDelete(confirmId.toString())}
      />
    </section>
  );
}
