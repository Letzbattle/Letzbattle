"use client";
import React, { useEffect, useState } from "react";
import Particles from "./magicui/particles";
import LabelInputContainer from "./ui/LabelInputContainer";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useApi } from "@/hooks/useApi";
// import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import { z } from "zod";
import BottomGradient from "./ui/BottomGradient";
import { useRouter } from "next/navigation";
import { param } from "framer-motion/m";
import axios from "axios";
import Razorpay from "razorpay";


const RegisterEvent = (params: any) => {

  // Define Zod schema for validation
  const onboardFormSchema = z.object({
    captainName: z.string().min(2, { message: "Captain name is required" }),
    teamName: z.string().min(2, { message: "Team name is required" }),
    player1Name: z.string().min(2,{ message: "Player one name is required" }),
    player2Name: z.string().min(2,{ message: "Player one name is required" }),
    player3Name: z.string().min(2,{ message: "Player one name is required" }),
    player4Name: z.string().min(2,{ message: "Player one name is required" }),
    player5Name: z.string().optional(), // Optional fields
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
    email: z.string().min(1, { message: "Email is required." }).email('Email is invalid.'), 
  });

  const [formState, setFormState] = useState({
    captainName: "",
    teamName: "",
    player1Name: "",
    player2Name: "",
    player3Name: "",
    player4Name: "",
    player5Name: "",
    email: "",
    phoneNumber: "",
  });

  const [event, setEvent] = useState({
    name:"",
    entryFees:0.

  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { post, get } = useApi();
  const router = useRouter();

  const { data: session, update } = useSession();

  useEffect(()=>{
    const getEventDetails= async () =>{
      try{
        const res=await axios.get(`https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/events/${params.params.id}`);
        console.log(res);
        setEvent(res.data.event);

      }
      catch (err) {
        console.error(err);
      }
      
    }
    getEventDetails();
  },[params.params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handlePayment = async (orderId: string, amount: number) => {
    const options = {
      key: process.env.RAZORPAY_API_KEY, // Enter the Key ID generated from Razorpay Dashboard
      amount: amount * 100, // Razorpay expects the amount in paise, so multiply by 100
      currency: "INR",
      name: event.name,
      description: "Payment for event registration",
      order_id: orderId, // Razorpay order_id generated from backend
      handler: async (response: any) => {
        const paymentData = {
          orderId: orderId,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        };
        // Verify payment by sending the response data to your backend
        try {
          await axios.post("https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/payment/verify", paymentData);
          await post(`/api/events/${params.params.id}/participants`, formState);

          setSuccess("Payment successful and verified!");

          // Proceed with further actions, like updating user data or redirecting
        } catch (error) {
          setError("Payment verification failed");
        }
      },
      prefill: {
        name: formState.captainName,
        email: formState.email,
        contact: formState.phoneNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = (window as any).Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation logic (same as before)
    const validation = onboardFormSchema.safeParse(formState);

    if (!validation.success) {
      setError(validation.error.errors[0]?.message);
      return;
    }

    try {
      // Submit participant details to the backend

      // After successfully registering, create an order on the backend
      const paymentResponse = await axios.post("https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/payment/order", {
        amount: event.entryFees, // Example amount for the event, in INR
        currency: "INR",
      });

      const { orderId, amount } = paymentResponse?.data;
     const res= await handlePayment(orderId, amount);
     console.log({res})


    } catch (err) {
      setError("Error during registration or payment. Please try again.");
    }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const validation=onboardFormSchema.safeParse(formState);
  //   const parsedData = {
  //     ...formState,
  //   };

  //   try {
  //     onboardFormSchema.parse(parsedData);

  //     const response = await post(`/api/events/${params.params.id}/participants`, parsedData);

  //     if (response) {
  //       setSuccess("Submit successfully!");
  //       await update();
  //       router.push("/");

  //       setError("");
  //     }
  //     // Reset the form after successful submission
  //     setFormState({
  //       captainName: "",
  //       teamName: "",
  //       player1Name: "",
  //       player2Name: "",
  //       player3Name: "",
  //       player4Name: "",
  //       player5Name: "",
  //       email: "",
  //       phoneNumber: "",
  //     });

  //   } catch (validationError: any) {
  //     setSuccess(""); // Clear any previous success message
  //     if (validationError instanceof z.ZodError) {
  //       // If it's a Zod error, extract the first error message and display it
  //       setError(validationError.errors[0].message);
  //     } else {
  //       setError("Something went wrong. Please try again.");
  //     }
  //     // setError(error?.response?.data?.message || "Failed to create event");
  //   }
  // };
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
          Register for {event?.name}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please provide all the necessary details to ensure smooth interaction
          with the app
        </p> */}

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="captainName">Captain Name</Label>
              <Input
                id="captainName"
                name="captainName"
                placeholder="Enter Your Name"
                type="text"
                value={formState.captainName}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                name="teamName"
                placeholder="Enter Your Team Name"
                type="text"
                value={formState.teamName}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="player1Name">Player One Name</Label>
            <Input
              id="player1Name"
              name="player1Name"
              type="text"
              value={formState.player1Name}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="player2Name">Player Two Name</Label>
            <Input
              id="player2Name"
              name="player2Name"
              type="text"
              value={formState.player2Name}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="player3Name">Player Three Name</Label>
            <Input
              id="player3Name"
              name="player3Name"
              type="text"
              value={formState.player3Name}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="player4Name">Player Four Name</Label>
            <Input
              id="player4Name"
              name="player4Name"
              type="text"
              value={formState.player4Name}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="player5Name">Player Five Name</Label>
            <Input
              id="player5Name"
              name="player5Name"
              type="text"
              value={formState.player5Name}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter Your Phone Number"
              type="tel"
              value={formState.phoneNumber}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter Your Email"
              type="text"
              value={formState.email}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Complete Registration &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterEvent;
