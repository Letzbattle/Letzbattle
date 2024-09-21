"use client";
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        onClick={() => login("google")}
      >
        Login with google
      </button>
    </div>
  );
};

export default Login;
