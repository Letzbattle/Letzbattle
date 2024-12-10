"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { auth } from "../../../auth";
import { signOut, getSession } from "next-auth/react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [session, setSession] = useState<any>(null);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [user, setUserInfo] = useState<any>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event:any) => {
      // Prevent the default mini-infobar from showing
      event.preventDefault();
      // Save the event to trigger later
      setDeferredPrompt(event);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt?.prompt();

      // Handle the user's choice
      deferredPrompt?.userChoice?.then((choiceResult:any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA installation');
        } else {
          console.log('User dismissed the PWA installation');
        }
        setDeferredPrompt(null); // Clear the prompt after use
      });
    }
  };
  // Fetch session data when the component mounts
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
      setUserInfo(session?.user);
    };

    fetchSession();
  }, []);

  const toggleProfileMenu = () => setProfileOpen(!isProfileOpen);

  return (
    // <AnimatePresence mode="wait">
    //     <motion.div>
    //         {navItems.map((navItem: any, idx: number) => (
    //             <Link
    //                 key={`link=${idx}`}
    //                 href={navItem.link}
    //                 className={cn(
    //                     "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300"
    //                 )}
    //             >
    //                 <span className="block sm:hidden">{navItem.icon} </span>
    //                 <span className="hidden text-sm sm:block">{navItem.name} </span>
    //             </Link>
    //         ))}
    //           {session ? (
    //            <Link
    //            href="/profile"
    //            className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white"
    //        >
    //            <span>Profile</span>
    //            <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    //        </Link>
    //         ) : (
    //             null
    //         )}
    //         {session ? (
    //             <button
    //                 onClick={()=>{signOut()}}
    //                 className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white"
    //             >
    //                 <span>Logout</span>
    //                 <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    //             </button>
    //         ) : (
    //             <>
    //                 <Link
    //                     href="/login"
    //                     className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white"
    //                 >
    //                     <span>Login</span>
    //                     <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    //                 </Link>
    //             </>
    //         )}
    //     </motion.div>
    // </AnimatePresence>
    <nav className="bg-black shadow-md relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" passHref>
          <img
            src="/logo1.png"
            alt="NexGen Battles"
            width={150}
            height={50}
            className="cursor-pointer"
          />
        </Link>
        <div className="hidden sm:flex space-x-8">
          {navItems.map((item: any, idx: number) => (
            <Link key={item.name} href={item.link} passHref>
              <span className="flex items-center space-x-2 text-gray-300 hover:text-white">
                {item.icon}
                <span>{item.name}</span>
              </span>
            </Link>
          ))}
        </div>
        {deferredPrompt && (
        <button onClick={handleInstallClick} className="flex items-center space-x-2 text-gray-300 hover:text-white">
          Install App
        </button>
      )}

        {session ? (
          // <button
          //     onClick={()=>{signOut()}}
          //     className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-white dark:border-white/[0.2] dark:text-white"
          // >
          //     <span>Logout</span>
          //     <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          // </button>
          <div className="relative ml-6">
            <button
              onClick={toggleProfileMenu}
              className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              <img
                src={user?.image || "/default-profile.png"}
                alt="User profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>
            {isProfileOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition ease-out duration-100 transform opacity-100 scale-100 ${
                  isProfileOpen
                    ? "ease-out duration-100"
                    : "ease-in duration-75 opacity-0 scale-95"
                }`}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <Link href="/profile">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Your Profile
                  </span>
                </Link>
                <Link href="/admin/events">
                  <span className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Your Events
                  </span>
                </Link>
                <Link
                  onClick={() => {
                    signOut();
                  }}
                  href={""}
                >
                  <span className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Logout
                  </span>
                </Link>
                
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-white dark:border-white/[0.2] dark:text-white"
            >
              <span>Login</span>
              <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
