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

const AddEventForm = () => {

  // Define Zod schema for validation
const eventSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  date: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid date",
  }),
  entryFees: z.number().min(0, { message: "Entry fees must be a positive number" }),
  prize: z
  .string()
  .refine((value) => {
    // Extract numeric part from the string and check if it's a positive number
    const numericValue = parseFloat(value.replace(/[^\d.-]/g, ""));
    return numericValue > 0;
  }, { message: "Prize must be a positive number" }),
  seatsLeft: z.number().min(1, { message: "Seats left must be at least 1" }),
});

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    entryFees: "",
    prize: "",
    seatsLeft: "",
  });
  const { post } = useApi();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const formattedData = {
    //   ...eventData,
    //   entryFees: parseInt(eventData.entryFees, 10),
    //   seatsLeft: parseInt(eventData.seatsLeft, 10),
    //   date: new Date(eventData.date).toISOString(), // Ensure date is in ISO format (DateTime)
    // };
     // Attempt to parse and validate the data using the Zod schema
    const parsedData = {
      ...eventData,
      entryFees: Number(eventData.entryFees),
      // prize: Number(eventData.prize),
      seatsLeft: Number(eventData.seatsLeft),
    };

    try {
      eventSchema.parse(parsedData); // This will throw if validation fails

      const formattedData = {
        ...parsedData,
        // entryFees: parseInt(eventData.entryFees, 10),
        // seatsLeft: parseInt(eventData.seatsLeft, 10),
        date: new Date(parsedData.date).toISOString(), // Ensure date is in ISO format
      };

      // Call the API to create the event
      const response = await post("/api/events", formattedData);

      if (response) {
        setSuccess("Event created successfully!");
        setError("");
        // router.push('/events');
      }
    } catch (validationError: any) {
      setSuccess(""); // Clear any previous success message
      if (validationError instanceof z.ZodError) {
        // If it's a Zod error, extract the first error message and display it
        setError(validationError.errors[0].message);
      } else {
        setError("Failed to create event");
      }
      // setError(error?.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
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

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Create Event &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;
