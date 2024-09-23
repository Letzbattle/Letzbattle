import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "./provide/SessionProvider";
import KeepAlive from "./components/KeepAlive";
import { auth } from "../../auth";
import { signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WarZoneX",
  description: "A Gaming Platform",
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
      {children}
      </NextAuthSessionProvider>
      </body>
    </html>
  );
}
