import Image from "next/image";
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import Footer from "./components/Footer";
import { auth } from '../../auth';
import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { redirect } from "next/navigation";
import Header from "./components/Header";
import { AllEvents } from "@/app/components/AllEvents";

export default async function Home() {
  const session = await auth();
  const user = await getUserById(session?.user.id || '');
  if (user) {
    if (!user.isOnboarded) {
      // Redirect to the onboarding page
      return redirect('/onboard');
    }
  }

  
  return (
    <div className="bg-black">
      {/* <Header/> */}
      <HeroSection/>
      <AllEvents/>
      {/* <LatestQuestions/> */}
      {/* <Footer/> */}
    </div>
  );
}
