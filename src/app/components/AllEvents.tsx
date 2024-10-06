"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Event {
  id: string;
  name: string;
  date: string;
  entryFees: number;
  prize: string;
  seatsLeft: number;
  gameName: string,
  isopen: boolean,
  expired: boolean,
  image: string,
  Participant:[]
  // Add other properties if available
}

export function AllEvents() {
  const [loading, setLoading] = useState<boolean>(false);
  const [allEvents, setAllEvents] = useState([]);
const {data:user}=useSession()
  useEffect(() => {
    const getAllEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/events"
        );
        setAllEvents(res.data.events);
        setLoading(false);
        // console.log(res.data);
        // console.log(allEvents);
        // setAllEvents(res.data.events);
      } catch (err) {
        console.error(err);
        setLoading(false); // Stop loader even if there’s an error
      }
    };
    getAllEvents();
  }, []);

  return (

    <div className="flex flex-col items-center justify-center">
    {/* Heading */}
    <h1 className="text-4xl font-bold mb-10 text-center text-white">Tournaments</h1>
    
    <div className="flex flex-wrap justify-evenly w-full">
      {/* Skeleton Loading Effect */}
      {loading &&
        Array(6).fill(0).map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-200 dark:bg-gray-700 w-[30rem] h-[28rem] rounded-xl p-6 animate-pulse mx-4 mb-8"
          >
            <div className="w-full h-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="mt-4 w-2/3 h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="mt-2 w-1/2 h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="mt-6 w-full h-8 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="flex justify-between items-center mt-6">
              <div className="w-1/3 h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
              <div className="w-1/3 h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            </div>
          </div>
        ))}

      {/* Events */}
      {!loading &&
        allEvents.map((event: Event) => (
          <CardContainer className="inter-var" key={event.id}>
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
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
                Date & Time: {new Date(event.date).toLocaleString()}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Entry Fees Per Team: {event.entryFees}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src={event.image || "/battleground.jpeg"}
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
                  href={user?`/register/${event.id}`:'/login'}
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
  </div>
  );
}
