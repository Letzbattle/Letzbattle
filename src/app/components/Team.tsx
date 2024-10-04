
import Particles from '@/components/magicui/particles';
import React from 'react';

const teamMembers = [
  { 
    name: 'Rishabh', 
    role: 'CEO & CTO', 
    image: '/team/rishabh.jpg', 
    description: 'Rishabh leads NexGen Battles with unmatched technical expertise, driving the company’s vision and innovation. As the most tech-savvy member of the team, he ensures that our platform remains at the forefront of the gaming industry, delivering fast, reliable, and secure services for all our users.'

  },
  { 
    name: 'Anshu', 
    role: 'COO & Tech Lead (Front-End)', 
    image: '/team/anshu.jpg', 
    description: 'Anshu is the operational leader and front-end tech expert at NexGen Battles, combining his deep understanding of gaming and the gaming industry with his technical prowess. His leadership ensures that our platform is both user-friendly and responsive, making it the perfect fit for the gaming community.'
  },
  { 
    name: 'Prerna', 
    role: 'CMO', 
    image: '/team/prerna.jpg', 
    description: 'Prerna heads the marketing at NexGen Battles, leveraging her SEO optimization skills and marketing insights to grow the brand’s presence. Her strategic thinking ensures that our platform reaches the right audience and stays competitive in the fast-paced gaming ecosystem.'
  }
];

function Team() {
  return (
    <div className="p-6 bg-black dark:bg-gray-900 min-h-screen">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <h1 className="text-4xl font-bold text-white text-center my-8 mt-24">Meet Our Team</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <img src={member.image} alt={member.name} className="rounded-full w-32 h-32 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mt-4">{member.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center">{member.role}</p>
            <p className="text-gray-700 dark:text-gray-300 text-center mt-4">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
