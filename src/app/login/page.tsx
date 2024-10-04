"use client";
import Particles from "@/components/magicui/particles";
import BottomGradient from "@/components/ui/BottomGradient";
import { signIn } from "next-auth/react";
import React from "react";

const Login = () => {
  const login = (provider: "google") => {
    signIn(provider, {
      callbackUrl: "/",
    });

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
      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-52 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] z-10"
        onClick={() => login("google")}
      >
        Login with google &rarr;
        <BottomGradient />
      </button>
    </div>
  );
};

export default Login;
