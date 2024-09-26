import Link from 'next/link'
import React from 'react'

function Success() {
  return (
    <div>  <div className="flex items-center justify-center min-h-screen bg-green-100">
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">Thank you for your payment. Your transaction has been completed successfully.</p>
        <Link href="/" className="mt-4 inline-block px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
          Go to Homepage
        </Link>
      </div>
    </div>
  </div></div>
  )
}

export default Success