"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { createMessage } from "@/app/services/message";

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await createMessage({
      title: subject,
      senderemail: email,
      message: message,
    });
    if (data?.status) {
      toast.success(data.message);
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      toast.error("Unexpected error occured");
    }
  };
  return (
    <section className="bg-black opacity-90" id="contact">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">
          Contact Us
        </h2>

        <form action="#" className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              className="shadow-sm bg-gray-50 border border-gray-300 t text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="your email@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-white"
            >
              Subject
            </label>
            <Input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm outline-none dark:bg-gray-700 dark:border-gray-600"
              placeholder="Let us know what you think"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              required
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 bg-emerald-900 text-white w-full lg:w-[250px] rounded"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
