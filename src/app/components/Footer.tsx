import React from "react";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/utils/cn";
import Link from "next/link";

const Footer = () => {
    const items = [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "About",
            href: "/aboutUs",
        },
        {
            title: "Privacy Policy",
            href: "/privacy-policy",
        },
        {
            title: "Terms of Use",
            href: "/termsOfUse",
        },
        {
            title: "Contact Us",
            href: "/contactUs",
        },
    ];
    return (
        <footer className="bg-black">
            <div className="container mx-auto px-4">
                <ul className="flex flex-wrap items-center justify-center gap-3 text-white">
                    {items.map(item => (
                        <li key={item.href} className="z-50">
                            <Link href={item.href}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 text-center text-white">&copy; {new Date().getFullYear()} WarZoneX</div>
            </div>
            {/* <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.4}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(3000px_circle_at_center,white,transparent)]",
                    "inset-y-[-50%] h-[200%] skew-y-6"
                )}
            /> */}
        </footer>
    );
};

export default Footer;



