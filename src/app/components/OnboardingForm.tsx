"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod"; // Import Zod
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/utils/cn";
import { useApi } from "@/hooks/useApi";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Particles from "../../components/magicui/particles";
import LabelInputContainer from "../../components/ui/LabelInputContainer";
import BottomGradient from "../../components/ui/BottomGradient";

export function OnboardingForm() {
  // Define Zod schema for validation
  const onboardFormSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    age: z.number().min(12, { message: "Age must be at least 12" }),
    gender: z.string().min(1, { message: "Gender is required" }),
    // phoneNumber:z.string().min(10,{message:"Phone number must be at least 10 digits"}),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
    bgmiId: z.string().optional(), // Optional fields
    instagramId: z.string().optional(),
  });

  const [formState, setFormState] = useState({
    name: "",
    age: 0,
    gender: "",
    phoneNumber: "",
    bgmiId: "",
    instagramId: "",
    image: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { post } = useApi();
  const router = useRouter();

  const { data: session, update } = useSession();

  const [imagePreview, setImagePreview] = useState(""); // For previewing the uploaded image
  const [imageFile, setImageFile] = useState<File | null>(null); // For storing the file before upload
  const [uploading, setUploading] = useState(false); // For showing loading state during upload
  const [loader, setLoader] = useState(false);

  // Upload the image to Cloudinary
  const uploadImage = async () => {
    if (!imageFile) {
      return null;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "p5c4mirg"); // Replace with your Cloudinary upload preset dyxvo8jxn
    formData.append("cloud_name", "dyxvo8jxn");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dyxvo8jxn/image/upload`, // Replace with your Cloudinary cloud name
        formData
      );
      setUploading(false);
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
      return null;
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Set up the headers with the JWT token
  //  const headers = {
  //   Authorization: `Bearer ${session?.idToken}`, // Attach the idToken to Authorization
  //   "Content-Type": "application/json", // Add default content type
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "age") {
      setFormState({ ...formState, age: parseInt(value) });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    const imageUrl = await uploadImage();

    if (!imageUrl) {
      setError("Image upload failed");
      return;
    }

    const imageData = {
      ...formState,
      image: imageUrl, // Use the uploaded image URL
    };
    // const validation=onboardFormSchema.safeParse(formState);
    const parsedData = {
      ...imageData,
      // entryFees: Number(eventData.entryFees),
      // // prize: Number(eventData.prize),
      // seatsLeft: Number(eventData.seatsLeft),
    };

    try {
      // const response = await callApi('https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/onboard',formState as any)
      onboardFormSchema.parse(parsedData);
      // if(!validation.success){
      //   const formattedErrors=validation.error.format();
      //   // console.log(formattedErrors);
      //   setError(formattedErrors._errors[0]);
      //   return;
      // }
      // else{
      //   setError("Something went wrong. Please try again.");
      // }

      const response = await post("/api/user/onboard", parsedData);

      if (response) {
        setSuccess("Onboarded successfully!");
        setLoader(false);
        await update();
        router.push("/");

        setError("");
      }
      // const response = await axios.post(
      //   "https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/onboard",
      //   formState,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${session?.idToken}`,
      //     },
      //   }
      // );
      // console.log("Success:", response.data);

      // Reset the form after successful submission
      setFormState({
        name: "",
        age: 0,
        gender: "",
        phoneNumber: "",
        bgmiId: "",
        instagramId: "",
        image: "",
      });

      // Update user isOnboarded to true via the user API
      // await axios.patch(
      //   "https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/user",
      //   { isOnboarded: true }, // Update the onboard status
      //   {
      //     headers: {
      //       Authorization: `Bearer ${session?.idToken}`,
      //     },
      //   }
      // );
    } catch (validationError: any) {
      setSuccess(""); // Clear any previous success message
      setLoader(false);
      if (validationError instanceof z.ZodError) {
        // If it's a Zod error, extract the first error message and display it
        setError(validationError.errors[0].message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      // setError(error?.response?.data?.message || "Failed to create event");
    }
  };
  return (
    <div
      className="bg-black h-full flex justify-center items-center"
      // className="bg-black sm:h-full min-[320px]:h-screen "
    >
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black z-10">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to LetzBattle
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please provide all the necessary details to ensure smooth interaction
          with the app
          {/* Login to aceternity if you can because we don&apos;t have a login flow yet */}
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Tyler"
                type="text"
                value={formState.name}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                placeholder="20"
                type="number"
                value={formState.age}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>
          <div className="mb-4">
            <LabelInputContainer>
              <Label>Upload Profile Image</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {imagePreview && (
                <div>
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="w-full h-auto mt-2"
                  />
                </div>
              )}
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="gender">Gender</Label>
            <select
              name="gender"
              id="gender"
              onChange={handleChange}
              className={cn(
                `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
            file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
            focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
             disabled:cursor-not-allowed disabled:opacity-50
             dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
             group-hover/input:shadow-none transition duration-400
             `
                // className
              )}
            >
              <option value="">Please select one…</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-Binary</option>
              <option value="other">Other</option>
              <option value="Prefer not to answer">Perfer not to Answer</option>
            </select>
            {/* <Input
              id="gender"
              name="gender"
              type="text"
              value={formState.gender}
              onChange={handleChange}
            /> */}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="9999999999"
              type="tel"
              value={formState.phoneNumber}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="bgmiId">Game ID (Optional)</Label>
            <Input
              id="bgmiId"
              name="bgmiId"
              placeholder=""
              type="text"
              value={formState.bgmiId}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="instagramId">Instagram ID (Optional)</Label>
            <Input
              id="instagramId"
              name="instagramId"
              placeholder=""
              type="text"
              value={formState.instagramId}
              onChange={handleChange}
            />
          </LabelInputContainer>
          {loader === true ? (
            <button
              type="button"
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              disabled
            >
              {/* Loading spinner SVG */}
              <svg
                aria-hidden="true"
                className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              Processing...
              <BottomGradient />
            </button>
          ) : (
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Complete Onboarding &rarr;
              <BottomGradient />
            </button>
          )}

          {/* <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Complete Onboarding &rarr;
            <BottomGradient />
          </button> */}

          {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}

          {/* <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
        </form>
      </div>
    </div>
  );
}

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={cn("flex flex-col space-y-2 w-full", className)}>
//       {children}
//     </div>
//   );
// };
