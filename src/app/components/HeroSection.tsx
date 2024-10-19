import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import HeroSectionHeader from "./HeroSectionHeader";

export default async function HeroSection() {
    const questions = {
        documents: [
            {
                title: "cricket",
                $id: "1",
                attachmentId: "react-guide",
                thumbnail:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRku-G5mzCVk1bW7rE8s6ti6FYZQCKxMH15Ud6RU6cwDhqJ_1Vl9-e9jTSgu_9AYZZGMQ4&usqp=CAU"
            },
            {
                title: "Kabbadi",
                $id: "2",
                attachmentId: "js-guide",
                thumbnail:"https://www.newsonair.gov.in/wp-content/uploads/2024/08/kabaddi-league.jpg"

            },
            {
                title: "Football",
                $id: "3",
                attachmentId: "css-guide",
                thumbnail:"https://cdn.britannica.com/31/183231-050-8D8EB720/Carli-Lloyd-penalty-goal-semifinal-match-Germany-2015.jpg"

            },
            {
                title: "Arm Wrestling",
                $id: "4",
                attachmentId: "css-guide",
                thumbnail:"https://designforceinc.com/wp-content/uploads/2016/03/world-armwrestling-league-branding-style-guide.jpg"

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
