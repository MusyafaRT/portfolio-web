"use client";

import Contact from "./Contact";
import { useState } from "react";
import axios from "axios";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://discord.com/api/webhooks/1204707579821817866/oRh72hieHx4kAeoplN_tqznPPXL8nYx9fOI9xd6GMFNLnBHmRw625oA8c_n1lkGQWSld",
        {
          content: "Hi, new message from your website!",
          embeds: [
            {
              title: "New Message",
              description: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
            },
          ],
        },
      );
      console.log("Message posted:", response);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setError("Error posting message. Please try again later.");
      console.error("Error posting message:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <footer className=" gap-10 text-cyan  px-8 py-12 bg-darkBlue">
        <div className="flex flex-col desktop:flex-row items-center desktop:items-start justify-between max-w-6xl mx-auto">
          <div className="flex flex-col gap-3 basis-1/4">
            <h1 className="text-4xl font-bold text-center desktop:text-start ">
              RonggoTM
            </h1>
            <p className="text-center desktop:text-start">
              Lorem ipsum dolor sit amet consectetur. Viverra dignissim morbi ut
              eget id elementum volutpat ultrices. Ut ac metus quis montes ipsum
              odio eu.
            </p>
          </div>
          <div className="flex flex-col basis-1/3 items-center gap-4">
            <h1 className="text-3xl font-bold">Get in touch</h1>
            <Contact />
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col desktop:flex-row gap-7 basis-1/2"
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="flex-col justify-center w-full">
                <h3>Your Name</h3>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-grey rounded-md text-black p-2 w-full"
                />
              </div>
              <div className="flex-col justify-center w-full">
                <h3>Email</h3>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-grey rounded-md text-black p-2 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <h3>Tell me!</h3>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full h-[113px] overflow-y-auto bg-grey rounded-md text-black p-2"
              />
              <input
                type="submit"
                value={submitting ? "Sending..." : "Send me"}
                disabled={submitting}
                className="bg-cyan text-darkBlue font-bold py-2 px-4 w-full mt-4 rounded-md"
              />
            </div>
          </form>
        </div>
      </footer>
    </>
  );
}
