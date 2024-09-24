"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import axios from "axios";

interface Event {
  id: string;
  name: string;
  date: string;
  entryFees: number;
  prize: string;
  seatsLeft: number;
  // Add other properties if available
}

export function AllEvents() {
  const [Loading, setLoading] = useState<boolean>(false);
  const [allEvents,setAllEvents] = useState([]);

  useEffect(()=>{
    const getAllEvents = async () => {
      setLoading(true);
      try{

      
      const res = await axios.get("https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/events");
      setAllEvents(res.data.events);
      setLoading(false);
      // console.log(res.data);
      // console.log(allEvents);
      // setAllEvents(res.data.events);
      }catch(err){
        console.error(err)
      }
    };
    getAllEvents();
  },[]);

  return (
    <div className="flex flex-wrap justify-evenly" >
      {/* <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      /> */}
      {allEvents.map((event:Event)=>(
         <CardContainer className="inter-var" key={event.id}>
         <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
           <CardItem
             translateZ="50"
             className="text-xl font-bold text-neutral-600 dark:text-white"
           >
             {event.name}
           </CardItem>
           <CardItem
             as="p"
             translateZ="60"
             className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
           >
             {/* Hover over this card to unleash the power of CSS perspective */}
             Date & Time: {new Date(event.date).toLocaleString()}
           </CardItem>
           <CardItem
             as="p"
             translateZ="60"
             className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
           >
             {/* Hover over this card to unleash the power of CSS perspective */}
             Entry Fees Per Team: {event.entryFees}
           </CardItem>
           <CardItem translateZ="100" className="w-full mt-4">
             <Image
               src="/battleground.jpeg"
               height="1000"
               width="1000"
               className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
               alt="thumbnail"
             />
           </CardItem>
           <div className="flex justify-between items-center mt-20">
             <CardItem
               translateZ={20}
               as={Link}
               href="https://twitter.com/mannupaaji"
               target="__blank"
               className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
             >
               Register now →
             </CardItem>
             <CardItem
               translateZ={20}
               as="button"
               className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
             >
               Slots Left: {event.seatsLeft}
             </CardItem>
           </div>
         </CardBody>
       </CardContainer>
      ))}
    </div>
    // <div className="bg-black h-screen flex justify-center items-center">
     
    // </div>
  );
}
