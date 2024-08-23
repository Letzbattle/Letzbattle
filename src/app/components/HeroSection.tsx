import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import HeroSectionHeader from "./HeroSectionHeader";

export default async function HeroSection() {
    const questions = {
        documents: [
            {
                title: "Battleground",
                $id: "1",
                attachmentId: "react-guide",
                thumbnail:"battleground.jpeg"
            },
            {
                title: "FreeFire",
                $id: "2",
                attachmentId: "js-guide",
                thumbnail:"freefire.jpeg"

            },
            {
                title: "Valorant",
                $id: "3",
                attachmentId: "css-guide",
                thumbnail:"valorant.jpeg"

            },
            {
                title: "Call of duty",
                $id: "4",
                attachmentId: "css-guide",
                thumbnail:"cod.jpeg"

            },
        ],
    };
   

    return (
        <HeroParallax
            header={<HeroSectionHeader />}
            products={questions.documents.map(q => ({
                title: q.title,
                link: `/questions/${q.$id}/${(q.title)}`,
                thumbnail: q.thumbnail,
            }))}
        />
    );
}
