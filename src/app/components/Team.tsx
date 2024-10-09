
// import Particles from '@/components/magicui/particles';
// import React from 'react';

// const teamMembers = [
//   { 
//     name: 'Rishabh', 
//     role: 'CEO & CTO', 
//     image: 'rishabh.jpeg', 
//     description: 'Rishabh leads NexGen Battles with unmatched technical expertise, driving the company’s vision and innovation. As the most tech-savvy member of the team, he ensures that our platform remains at the forefront of the gaming industry, delivering fast, reliable, and secure services for all our users.'

//   },
//   { 
//     name: 'Anshu', 
//     role: 'COO & Tech Lead (Front-End)', 
//     image: 'anshu1.jpg', 
//     description: 'Anshu is the operational leader and front-end tech expert at NexGen Battles, combining his deep understanding of gaming and the gaming industry with his technical prowess. His leadership ensures that our platform is both user-friendly and responsive, making it the perfect fit for the gaming community.'
//   },
//   { 
//     name: 'Prerna', 
//     role: 'CMO', 
//     image: 'prerna.jpeg', 
//     description: 'Prerna heads the marketing at NexGen Battles, leveraging her SEO optimization skills and marketing insights to grow the brand’s presence. Her strategic thinking ensures that our platform reaches the right audience and stays competitive in the fast-paced gaming ecosystem.'
//   }
// ];

// function Team() {
//   return (
//     <div className="p-6 bg-black dark:bg-gray-900 min-h-screen">
//       <Particles
//         className="fixed inset-0 h-full w-full"
//         quantity={500}
//         ease={100}
//         color="#ffffff"
//         refresh
//       />
//       <h1 className="text-4xl font-bold text-white text-center my-8 mt-24">Meet Our Team</h1>
//       <div className="flex flex-wrap justify-center gap-8 relative z-10">
//         {teamMembers.map((member, index) => (
//           <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 transform transition duration-300 hover:scale-105">
//             <img src={member.image} alt={member.name} className="rounded-full w-48 h-64 mx-auto" />
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mt-4">{member.name}</h2>
//             <p className="text-gray-500 dark:text-gray-400 text-center">{member.role}</p>
//             <p className="text-gray-700 dark:text-gray-300 text-center mt-4">{member.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Team;
import Particles from '@/components/magicui/particles';
import Image from 'next/image';
import React from 'react';

const teamMembers = [
  { 
    name: 'Rishabh', 
    role: 'CEO & CTO', 
    image: 'rishabh.jpeg', 
    description: 'Rishabh leads NexGen Battles with unmatched technical expertise, driving the company’s vision and innovation. As the most tech-savvy member of the team, he ensures that our platform remains at the forefront of the gaming industry, delivering fast, reliable, and secure services for all our users.'

  },
  { 
    name: 'Anshu', 
    role: 'COO & Tech Lead (Front-End)', 
    image: 'anshu1.jpg', 
    description: 'Anshu is the operational leader and front-end tech expert at NexGen Battles, combining his deep understanding of gaming and the gaming industry with his technical prowess. His leadership ensures that our platform is both user-friendly and responsive, making it the perfect fit for the gaming community.'
  },
  { 
    name: 'Prerna', 
    role: 'CMO', 
    image: 'prerna.jpeg', 
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
      <div className="flex flex-wrap justify-center gap-8 relative z-10">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 transform transition duration-300 hover:scale-105"
          >
            <div className="relative w-48 h-64 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-blue-600 p-[5px]">
                <img
                  src={member.image} 
                  alt={member.name} 
                  className="rounded-full object-cover w-full h-full shadow-lg border-4 border-white dark:border-gray-900"
                />
              </div>
            </div>
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
