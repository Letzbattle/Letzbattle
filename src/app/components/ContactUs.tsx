"use client";

import Particles from "@/components/magicui/particles";
import BottomGradient from "@/components/ui/BottomGradient";
import { Input } from "@/components/ui/input";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import ButtonLoader from "@/components/ButtonLoader";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post("/api/user/contact", formData);
      if (response) {
        setSubmitted(true);
        setLoader(false);
      }

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setLoader(false);
      console.error(err);
    }
  };

  return (
    <div className="bg-black h-full flex justify-center items-center">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <div className="z-10">
        <h1 className="text-4xl font-bold text-center mt-32 mb-20 text-white">
          Get in Touch
        </h1>
        <p className="text-lg text-center mb-8 text-white">
          Have questions or feedback? We did love to hear from you! Fill out the
          form below or reach out directly at{" "}
          <a
            href="mailto:Letzbattle.tech@gmail.com"
            className="text-blue-500 underline"
          >
            Letzbattle.tech@gmail.com
          </a>
          .
        </p>

        {submitted ? (
          <div className="text-center text-green-500 font-semibold">
            <p>Thank you for contacting us! We will get back to you soon.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <LabelInputContainer>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </LabelInputContainer>
            </div>
            <div className="mb-4">
              <LabelInputContainer>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </LabelInputContainer>
            </div>
            <div className="mb-4">
              <LabelInputContainer>
                <Label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
                  rows={5}
                  required
                />
              </LabelInputContainer>
            </div>
            {loader === true ? (
              <ButtonLoader />
            ) : (
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Submit &rarr;
                <BottomGradient />
              </button>
            )}
          </form>
        )}

        <div className="text-center text-white mt-12">
          <p>
            Or call us at <span className="font-bold">8851840604</span>
          </p>

          <p className="mt-2">
            Office Address:{" "}
            <span className="font-bold">C-131, C-Block, Ramapark,New Delhi</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
