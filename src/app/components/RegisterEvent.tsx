"use client";
import React, { useEffect, useState } from "react";
import Particles from "../../components/magicui/particles";
import LabelInputContainer from "../../components/ui/LabelInputContainer";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useApi } from "@/hooks/useApi";
// import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import { z } from "zod";
import BottomGradient from "../../components/ui/BottomGradient";
import { useRouter } from "next/navigation";
import { param } from "framer-motion/m";
import axios from "axios";
import Razorpay from "razorpay";
import { toast } from "react-toastify";


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
  const [loader, setLoader] = useState(false);

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
router.push('/success')
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
    setLoader(true);

    // Validation logic (same as before)
    const validation = onboardFormSchema.safeParse(formState);

    if (!validation.success) {
      setError(validation.error.errors[0]?.message);
      toast.error(validation.error.errors[0]?.message);
      setLoader(false)
      return;
    }
    if(event.entryFees>0){
      try {
        // Submit participant details to the backend
  
        // After successfully registering, create an order on the backend
        const paymentResponse = await axios.post("https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/payment/order", {
          amount: event.entryFees, // Example amount for the event, in INR
          currency: "INR",
        });
  
        const { orderId, amount } = paymentResponse?.data;
       const res= await handlePayment(orderId, amount);
       setLoader(false);
       console.log({res})
  
  
      } catch (err) {
        setError("Error during registration or payment. Please try again.");
        toast.error("Error during registration or payment. Please try again.");
      }
    }else{
      await post(`/api/events/${params.params.id}/participants`, formState);
      setSuccess("Registration successful!");

      router.push('/success')
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

          {/* <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Complete Registration &rarr;
            <BottomGradient />
          </button> */}
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
              Complete Registration &rarr;
              <BottomGradient />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterEvent;
