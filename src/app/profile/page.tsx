"use client";
import React, { useEffect, useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Particles from "@/components/magicui/particles";

const Profile = () => {
  const [user, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const { data: session, status, update } = useSession();
  const { get } = useApi();
  const router = useRouter();

  // Handle sign out
  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/" });
    setLoading(false);
  };

  // if (!session) {
  //   router.push("/login");
  //   return null;
  // }

  const fetchSession = async () => {
    const session = await getSession();
    console.log(session?.user?.email, "email");

    if (status === "authenticated") {
      const userInfo = await get(
        "https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/user"
      );
      console.log("user", userInfo?.data.user);
      setUserInfo(userInfo?.data.user);
      setLoader(false);
    }
  };

  useEffect(() => {
    console.log(session?.user?.email, "email");

    fetchSession();
  }, [session?.user?.email]);

  return (
    <>
      {/* <div>{userInfo ? JSON.stringify(userInfo) : "Loading..."}</div> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-black dark:bg-gray-800 px-4 py-10">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full sm:w-[24rem] relative z-10">
          <Particles
            className="fixed inset-0 h-full w-full"
            quantity={500}
            ease={100}
            color="#ffffff"
            refresh
          />
          {loader === true ? (
            <div className="w-[20rem] h-[18rem] rounded-xl p-6 animate-pulse mx-auto mb-8">
              <img className="w-36 h-36 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto" />
              <h1 className="mt-4 w-1/3 h-5 bg-gray-300 dark:bg-gray-600 rounded-md mx-auto"></h1>
              <p className="mt-2 w-2/3 h-5 bg-gray-300 dark:bg-gray-600 rounded-md mx-auto"></p>
              <button className="mt-2 w-full h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></button>
              <button className="mt-2 w-full h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></button>
            </div>
          ) : (
            <div className="relative z-20">
              <div className="flex flex-col items-center text-center">
                <img
                  src={user?.image || "/default-profile.png"} // Fallback if no image
                  alt="Profile Picture"
                  height={100}
                  width={100}
                  className="rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {user?.name || "User Name"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col items-center">
                <Link
                  href="/profile/edit"
                  className="w-full text-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 mb-4"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className={`w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ${
                    loading ? "opacity-50" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Signing Out..." : "Log Out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
