import Link from "next/link";
import React from "react";

function Success() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-200">
      <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <div className="flex flex-col items-center">
          {/* Success Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>

          {/* Heading */}
          <h1 className="mt-4 text-3xl font-bold text-gray-800 text-center">
            Payment Successful!
          </h1>

          {/* Message */}
          <p className="mt-2 text-center text-gray-600">
            Thank you for your payment. Your transaction has been completed
            successfully.
            <br/>
            You will receive an email from us containing all the details about the tournament.
          </p>

          {/* Go to Homepage Button */}
          <Link
            href="/"
            className="mt-6 inline-block px-6 py-3 text-lg font-medium text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
