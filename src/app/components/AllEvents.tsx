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
  gameName: string;
  isopen: boolean;
  expired: boolean;
  image: string;
  eventType: string;
  Participant: [];
  // Add other properties if available
}

export function AllEvents() {
  const [loading, setLoading] = useState<boolean>(false);
  const [allEvents, setAllEvents] = useState([]);
  const [activeTab, setActiveTab] = useState<string>("EVENT");
  const { data: user } = useSession();
  useEffect(() => {
    const getAllEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/events"
        );
        setAllEvents(res.data.events);
        setLoading(false);
        console.log(res.data.events);
        // console.log(allEvents);
        // setAllEvents(res.data.events);
      } catch (err) {
        console.error(err);
        setLoading(false); // Stop loader even if there’s an error
      }
    };
    getAllEvents();
  }, []);

  // Filter events based on active tab (eventType)
  const filteredEvents = allEvents.filter(
    (event: any) => event.eventType.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className="flex flex-col items-center justify-center w-full px-2">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-10 text-center text-white">
        Events
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8 w-full justify-center">
        <button
          onClick={() => setActiveTab("EVENT")}
          className={`px-6 py-2 text-lg font-semibold rounded-md transition-all duration-300 ${
            activeTab === "EVENT"
              ? "bg-emerald-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Tournament
        </button>
        <button
          onClick={() => setActiveTab("SCRIMS")}
          className={`px-6 py-2 text-lg font-semibold rounded-md transition-all duration-300 ${
            activeTab === "SCRIMS"
              ? "bg-emerald-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Scrims
        </button>
      </div>

      {/* Events */}

      <div className="flex flex-wrap justify-evenly w-full">
        {/* Skeleton Loading Effect */}
        {loading &&
          Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-200 dark:bg-gray-700 w-[30rem] h-[28rem] rounded-xl p-6 animate-pulse mb-8"
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
        {/* {!loading &&
          filteredEvents.map((event: Event) => (
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
                    href={user ? `/register/${event.id}` : "/login"}
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
          ))} */}

        {/* Display filtered events based on active tab */}
        {!loading && filteredEvents.length > 0
          ? filteredEvents.map((event: Event) => (
              <CardContainer
                className="inter-var  w-full sm:w-[30rem] mx-2"
                key={event.id}
              >
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {event.name}
                  </CardItem>
                  {/* <CardItem
                    translateZ={20}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 uppercase absolute top-4 right-2"
                  >
                    {event.gameName}
                  </CardItem> */}
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
                      className="h-60 object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                    <CardItem
                      translateZ={20}
                      // as={Link}
                      // href={user ? `/register/${event.id}` : "/login"}
                      className="px-4 py-2 rounded-xl text-xs font-normal text-white bg-emerald-500 absolute top-2 right-2"
                    >
                      {event.isopen === true ? "Open" : "Coming"}
                    </CardItem>
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    // className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff]"
                    className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-xl font-bold leading-none tracking-tighter text-transparent mt-5 mx-auto"
                  >
                    Prize Pool: INR {event.prize}
                  </CardItem>

                  <div className="flex justify-between items-center mt-10">
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href={user ? `/register/${event.id}` : "/login"}
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
            ))
          : !loading && (
              <p className="text-lg font-semibold text-gray-500 dark:text-gray-300">
                No events available for {activeTab}.
              </p>
            )}
      </div>
    </div>
  );
}
