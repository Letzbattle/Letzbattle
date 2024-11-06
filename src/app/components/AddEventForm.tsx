"use client";
import { useState } from "react";
import { z } from "zod"; // Import Zod
import { useApi } from "@/hooks/useApi"; // Ensure this is the correct path to your useApi hook
import { useRouter } from "next/navigation";
import Particles from "@/components/magicui/particles";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import BottomGradient from "@/components/ui/BottomGradient";
import axios from "axios";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";

const AddEventForm = () => {
  // Define Zod schema for validation
  const eventSchema = z.object({
    name: z.string().min(1, { message: "Event name is required" }),
    // date: z.string().refine((value) => !isNaN(Date.parse(value)), {
    //   message: "Invalid date",
    // }),
    date: z.string().nonempty({ message: "Date and time are required" }),
    entryFees: z
      .number()
      .min(0, { message: "Entry fees must be a positive number" }),
    prize: z.string().refine(
      (value) => {
        // Extract numeric part from the string and check if it's a positive number
        const numericValue = parseFloat(value.replace(/[^\d.-]/g, ""));
        return numericValue > 0;
      },
      { message: "Prize must be a positive number" }
    ),
    seatsLeft: z.number().min(1, { message: "Seats left must be at least 1" }),
  });

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    time: "",
    entryFees: "",
    prize: "",
    seatsLeft: "",
    gameName: "",
    isopen: true,
    expired: false,
    image: "",
    eventType: "",
  });
  const { post } = useApi();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);

  const [imagePreview, setImagePreview] = useState(""); // For previewing the uploaded image
  const [imageFile, setImageFile] = useState<File | null>(null); // For storing the file before upload
  const [uploading, setUploading] = useState(false); // For showing loading state during upload

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const imageUrl = await uploadImage();

    if (!imageUrl) {
      setError("Image upload failed");
      toast.error("Image upload failed, Please try again.");
      setLoader(false);
      return;
    }

    const imageData = {
      ...eventData,
      image: imageUrl, // Use the uploaded image URL
    };
    // const formattedData = {
    //   ...eventData,
    //   entryFees: parseInt(eventData.entryFees, 10),
    //   seatsLeft: parseInt(eventData.seatsLeft, 10),
    //   date: new Date(eventData.date).toISOString(), // Ensure date is in ISO format (DateTime)
    // };
    // Attempt to parse and validate the data using the Zod schema
    const parsedData = {
      ...imageData,
      entryFees: Number(imageData.entryFees),
      // prize: Number(eventData.prize),
      seatsLeft: Number(imageData.seatsLeft),
    };

    try {
      const combinedDateTime = `${parsedData.date} ${parsedData.time}`;
      eventSchema.parse({ ...parsedData, date: combinedDateTime }); // This will throw if validation fails

      const formattedData = {
        ...parsedData,
        date: combinedDateTime,
        // entryFees: parseInt(eventData.entryFees, 10),
        // seatsLeft: parseInt(eventData.seatsLeft, 10),
        // date: new Date(parsedData.date).toISOString(), // Ensure date is in ISO format
      };

      // Call the API to create the event
      const response = await post("/api/events", formattedData);

      if (response) {
        setLoader(false);
        setSuccess("Event created successfully!");
        setError("");

        router.push("/");
      }
    } catch (validationError: any) {
      setSuccess(""); // Clear any previous success message
      setLoader(false);
      if (validationError instanceof z.ZodError) {
        // If it's a Zod error, extract the first error message and display it
        setError(validationError.errors[0].message);
        validationError.errors.forEach((err) => {
          toast.error(err.message); // Ensure each validation error is displayed
        });
      } else {
        setError("Failed to create event");
        toast.error("Failed to create event. Please try again.");
      }
      // setError(error?.response?.data?.message || "Failed to create event");
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
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black z-10">
        <h1 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Create Event
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Event Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={eventData.name}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </div>

          <div className="mb-4">
            <LabelInputContainer>
              <Label
                htmlFor="gameName"
                className="block text-sm font-medium text-gray-700"
              >
                Game Name
              </Label>
              <Input
                type="gameName"
                id="gameName"
                name="gameName"
                value={eventData.gameName}
                onChange={handleChange}
                className="p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </LabelInputContainer>
          </div>
          <div className="mb-4">
            <LabelInputContainer>
              <Label
                htmlFor="eventType"
                className="block text-sm font-medium text-gray-700"
              >
                Event Type
              </Label>
              <select
                id="eventType"
                name="eventType"
                value={eventData.eventType} // Correctly setting eventType value
                onChange={handleChange}
                className={cn(
                  "flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm"
                )}
                required
              >
                <option value="">Please select one…</option>
                <option value="SCRIMS">Scrims </option>
                <option value="EVENT">Tournament</option>
              </select>
            </LabelInputContainer>
          </div>
          <div className="mb-4">
            <LabelInputContainer>
              <Label>Upload Banner</Label>
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

          <div className="mb-4">
            <LabelInputContainer>
              <Label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Event Date
              </Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className="p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </LabelInputContainer>
          </div>

          {/* Time Input */}
          <div className="mb-4">
            <LabelInputContainer>
              <Label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Event Time
              </Label>
              <Input
                type="time"
                id="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </div>

          <div className="mb-4">
            <LabelInputContainer>
              <Label
                htmlFor="entryFees"
                className="block text-sm font-medium text-gray-700"
              >
                Entry Fees
              </Label>
              <Input
                type="number"
                id="entryFees"
                name="entryFees"
                value={eventData.entryFees}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </div>

          <div className="mb-4">
            <LabelInputContainer>
              <Label
                htmlFor="prize"
                className="block text-sm font-medium text-gray-700"
              >
                Prize
              </Label>
              <Input
                type="number"
                id="prize"
                name="prize"
                value={eventData.prize}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </div>

          <div className="mb-6">
            <LabelInputContainer>
              <Label
                htmlFor="seatsLeft"
                className="block text-sm font-medium text-gray-700"
              >
                Seats Left
              </Label>
              <Input
                type="number"
                id="seatsLeft"
                name="seatsLeft"
                value={eventData.seatsLeft}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </div>

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
              Create Event &rarr;
              <BottomGradient />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;
