import Image from "next/image";
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { EventCards } from "@/components/EventCards";

export default function Home() {
  return (
    <div className="bg-black">
      <Header/>
      <HeroSection/>
      <EventCards/>
      {/* <LatestQuestions/> */}
      <Footer/>
    </div>
  );
}
