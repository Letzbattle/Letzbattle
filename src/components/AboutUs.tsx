// pages/about-us.tsx

import Particles from "./magicui/particles";

const AboutUs = () => {
  return (
    <div className="bg-black h-full flex justify-center items-center">
       <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
    <div className="container mx-auto p-8 z-10 text-white">
      <h1 className="text-4xl font-bold text-center my-20">About Us</h1>
      
      <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
        <p>
        

Welcome to Nexgenbattles, where sports enthusiasts unite to challenge, compete, and celebrate the spirit of athleticism!
At Nexgenbattles, we believe that sports are more than just games; they're a way of life. Our platform was born out of a passion for sports and a desire to bring athletes and teams together like never before.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-2">Our Mission</h2>
        <p>
        Our mission is simple: to create a vibrant and inclusive community for athletes of all levels. Whether you're a seasoned pro or just starting your sporting journey, Nexgenbattles is the place where you can connect, compete, and grow.ned professional or just getting started, there is a place for you in our community.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-2">Why Choose Us?</h2>
        <ul className="list-disc list-inside">
          <li>Organized and well-structured tournaments with live leaderboards.</li>
          <li>A fair play system with robust anti-cheat mechanisms.</li>
          <li>Opportunities to win exciting prizes and rewards.</li>
          <li>A supportive community with forums and discussion boards.</li>
        </ul>

        <h2 className="text-3xl font-semibold mt-6 mb-2">Our Team</h2>
        <p>
          Our team is made up of passionate Athltetes, developers, and event organizers who are dedicated to creating the best experience for our participants.
        </p>
      </div>

      <div className="text-center mt-10">
        <h3 className="text-2xl font-semibold mb-4">Ready to Join the Action?</h3>
        <a href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
          Explore Upcoming Events
        </a>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
