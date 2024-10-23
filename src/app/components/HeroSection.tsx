import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import HeroSectionHeader from "./HeroSectionHeader";

export default async function HeroSection() {
    const questions = {
        documents: [
            {
                title: "BGMI",
                $id: "1",
                attachmentId: "react-guide",
                thumbnail:"https://wallpaperaccess.com/full/6163684.jpg"
            },
            {
                title: "FreeFire",
                $id: "2",
                attachmentId: "js-guide",
                thumbnail:"https://images.hdqwalls.com/download/garena-free-fire-4k-v8-2048x1152.jpg"

            },
            {
                title: "Valvorant",
                $id: "3",
                attachmentId: "css-guide",
                thumbnail:"https://global-img.gamergen.com/valorant-29-05-2020-key-art-1_0900953381.jpg"

            },
            {
                title: "Clash of clanes",
                $id: "4",
                attachmentId: "css-guide",
                thumbnail:"https://assets-prd.ignimgs.com/2022/02/28/clash-of-clans-1646090932362.jpg"

            },
        ],
    };
   

    return (
        <HeroParallax
            header={<HeroSectionHeader />}
            products={questions.documents.map(q => ({
                title: q.title,
                link: `/aboutUs`,
                thumbnail: q.thumbnail,
            }))}
        />
    );
}
