"use client";

import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import Heading from "../common/Heading";
import React from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const isValidEmail = (email: string) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };
  const [invalidEmail, setInvalidEmail] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const submitHandler = async (data: FormState) => {
    try {
      const response = await axios.post(
        "https://discord.com/api/webhooks/1204707579821817866/oRh72hieHx4kAeoplN_tqznPPXL8nYx9fOI9xd6GMFNLnBHmRw625oA8c_n1lkGQWSld",
        {
          content: "Hi, new message from your website!",
          embeds: [
            {
              title: "New Message",
              description: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
            },
          ],
        }
      );
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };
  return (
    <article className="bg-darkBlue h-full flex flex-col lg:gap-6 justify-center items-center text-cyan">
      <Heading text="Contact Me!" />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-2">
          <div className="">
            <label htmlFor="name" className="block font-medium ">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              name="name"
              id="name"
              className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm  border-lightGray rounded-md border-2 text-darkBlue font-medium"
            />
            {errors.name && <p className="mt-1 text-red-5">name is required</p>}
          </div>
          <div className="">
            <label htmlFor="email" className="block font-medium ">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="text"
              name="email"
              id="email"
              className={`mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm border ${
                invalidEmail ? "border-red-500" : "border-lightGray"
              } rounded-md text-darkBlue font-medium`}
              onBlur={(e) => setInvalidEmail(!isValidEmail(e.target.value))}
            />
            {invalidEmail && (
              <p className="mt-1 text-red-500">
                Please enter a valid email address
              </p>
            )}
          </div>
        </div>

        <div className="">
          <label htmlFor="message" className="blo font-medium ">
            Tell Me!
          </label>
          <textarea
            {...register("message", { required: true })}
            name="message"
            id="message"
            className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm  border-lightGray rounded-md border-2 text-darkBlue font-medium resize-y"
          />
          {errors.message && (
            <p className="mt-1 text-red-5">Message is required</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-grey text-white py-2 px-4 mt-4 rounded-md hover:opacity-75 transition duration-300"
        >
          Submit
        </button>
      </form>
      <div className="flex gap-12 text-lg desktop:text-6xl items-center text-white">
        <Link href="https://www.facebook.com/ronggo.musyafa">
          <BsFacebook />
        </Link>
        <Link href="https://www.instagram.com/ronggotm">
          <BsInstagram />
        </Link>
        <Link href="https://www.linkedin.com/in/ronggo-tsani-musyafa-419950217/">
          <BsLinkedin />
        </Link>
      </div>
    </article>
  );
}
