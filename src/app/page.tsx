import Image from "next/image";
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import Footer from "./components/Footer";
import { auth } from '../../auth';
import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { redirect } from "next/navigation";
import Header from "./components/Header";

export default async function Home() {
  const session = await auth();
  const user = await getUserById(session?.user.id || '');

  if (user) {
    if (!user.isOnboarded) {
      // Redirect to the onboarding page
      return redirect('/onboard');
    }
  } else {
    return redirect('/login'); 
  }

  console.log({ user });
  
  return (
    <div className="bg-black">
      <Header />
      <HeroSection />
      {/* <LatestQuestions /> */}
      <Footer />
    </div>
  );
}
