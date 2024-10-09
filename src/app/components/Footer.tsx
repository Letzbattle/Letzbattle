// import React from "react";
// import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
// import { cn } from "@/utils/cn";
// import Link from "next/link";

// const Footer = () => {
//     const items = [
//         {
//             title: "Home",
//             href: "/",
//         },
//         {
//             title: "About",
//             href: "/aboutUs",
//         },
//         {
//             title: "Privacy Policy",
//             href: "/privacy-policy",
//         },
//         {
//             title: "Terms of Use",
//             href: "/termsOfUse",
//         },
//         {
//             title: "Contact Us",
//             href: "/contactUs",
//         },
//     ];
//     return (
//         <footer className="bg-black">
//             <div className="container mx-auto px-4">
//                 <ul className="flex flex-wrap items-center justify-center gap-3 text-white">
//                     {items.map(item => (
//                         <li key={item.href} className="z-50">
//                             <Link href={item.href}>{item.title}</Link>
//                         </li>
//                     ))}
//                 </ul>
//                 <div className="mt-4 text-center text-white">&copy; {new Date().getFullYear()} WarZoneX</div>
//             </div>
//             {/* <AnimatedGridPattern
//                 numSquares={30}
//                 maxOpacity={0.4}
//                 duration={3}
//                 repeatDelay={1}
//                 className={cn(
//                     "[mask-image:radial-gradient(3000px_circle_at_center,white,transparent)]",
//                     "inset-y-[-50%] h-[200%] skew-y-6"
//                 )}
//             /> */}
//         </footer>
//     );
// };

// export default Footer;

"use client";
import React from "react";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import Particles from "@/components/magicui/particles";

const Footer: React.FC = () => {
  return (
    <footer className=" bg-black text-white py-8 w-full">
      {/* <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      /> */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="md:flex md:justify-between md:space-x-8 ">
          <div className="mb-6 md:mb-0 z-20">
            <a href="#" className="flex items-center">
              <Image src={"/logo.jpeg"} alt="logo" width={80} height={80} />
              <span className="self-center text-2xl font-bold text-white ml-3">
                NexGen Battles
              </span>
            </a>
            <p className="mt-4 text-gray-400">
              Next-generation battles for modern gamers.
            </p>
            <div className="flex mt-4 space-x-4">
              <a
                href="https://www.facebook.com/"
                className="text-gray-500 hover:text-cyan-500"
                target="_blank"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/"
                className="text-gray-500 hover:text-cyan-500"
                target="_blank"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagram size={20} />
              </a>
              <a
                href="https://x.com/"
                className="text-gray-500 hover:text-cyan-500"
                target="_blank"
              >
                <span className="sr-only">Twitter</span>
                <FaTwitter size={20} />
              </a>
              <a
                href="https://github.com/"
                className="text-gray-500 hover:text-cyan-500"
                target="_blank"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub size={20} />
              </a>
              <a
                href="https://youtube.com/"
                className="text-gray-500 hover:text-cyan-500"
                target="_blank"
              >
                <span className="sr-only">YouTube</span>
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          <div className="md:flex md:justify-between md:gap-14 z-20">
            <div className="min-[320px]:mb-6">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/aboutUs"
                    className="text-base text-gray-500 hover:text-cyan-500"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-base text-gray-500 hover:text-cyan-500"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contactUs"
                    className="text-base text-gray-500 hover:text-cyan-500"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ourTeam"
                    className="text-base text-gray-500 hover:text-cyan-500"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-base text-gray-500 hover:text-cyan-500"
                  >
                    Shipping
                  </Link>
                </li>
              </ul>
            </div>

            <div className="min-[320px]:mb-6">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    href="/claimPolicy"
                    className="text-base text-gray-500 hover:text-cyan-500"
                  >
                    Claim
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookiePolicy"
                    className="text-base text-gray-500 hover:text-cyan-500"
                  >
                    Cookie
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacyPolicy"
                    className="text-base text-gray-500 hover:text-cyan-500"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/termsOfUse"
                    className="text-base text-gray-500 hover:text-cyan-500"
                  >
                    Terms
                  </Link>
                </li>
                 <li>
                  <Link
                    href="/cancellation"
                    className="text-base text-gray-500 hover:text-cyan-500"
                  >
                    Cancellation and refund
                  </Link>
                </li>
              </ul>
            </div>

            <div className=" md:block mr-10">
              <h2 className="text-lg font-semibold mb-4">
                Subscribe to our newsletter
              </h2>
              <p className="text-gray-400 mb-4">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-gray-300 p-2 flex-1 rounded-l"
                />
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 rounded-r"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-base text-gray-400">
            &copy; 2024 NexGen Battles, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
