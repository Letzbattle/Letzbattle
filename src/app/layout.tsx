import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "./provide/SessionProvider";
import KeepAlive from "./components/KeepAlive";
import { auth } from "../../auth";
import { signOut } from "next-auth/react";
import Script from "next/script";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexGenBattles",
  description: "A Gaming Platform",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <KeepAlive/> */}
      <NextAuthSessionProvider>
        <Header/>
        <ToastContainer  style={{ zIndex: 9999 }} position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss  /> 
      {children}
      <Footer/>
      <Analytics/>
      </NextAuthSessionProvider>
      </body>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

    </html>
  );
}
