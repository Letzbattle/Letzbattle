"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import Modal from "./Modal";
import { button } from "framer-motion/m";
import { useRouter } from "next/navigation";

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
  reviewed: boolean;
  Participant: [];
  // Add other properties if available
}

export function AllEvents() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rulesAccepted, setRulesAccepted] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [allEvents, setAllEvents] = useState([]);
  const [activeTab, setActiveTab] = useState<string>("EVENT");
  const { data: user } = useSession();
  const router = useRouter();
  useEffect(() => {
    const getAllEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/events"
        );
        setAllEvents(res.data.events.filter((event: Event) => event.reviewed));

        // console.log(res.data.events.filter((event: Event) => event.reviewed));
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    getAllEvents();
  }, []);

  const checkIfAlreadyRegistered = useCallback(
    (event: any) => {
      return event.Participant.some(
        (participant: any) => participant.userId === user?.user.id
      );
    },
    [user, allEvents]
  );

  // Filter events based on active tab (eventType)
  const filteredEvents = allEvents.filter(
    (event: any) => event.eventType.toLowerCase() === activeTab.toLowerCase()
  );

  const handleRegisterClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsOpen(true);
  };

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
          Practice
        </button>
      </div>

      {/* Events */}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setRulesAccepted(false);
        }}
        title="Rules"
      >
        <div>
          <h4 className="text-lg font-semibold mb-2">Platform Rules</h4>
          <ul className="list-disc list-inside space-y-1 text-black">
            <li>You must be 13 years or older to participate.</li>
            <li>
              We reserve the right to disqualify any user if suspicious activity
              is detected.
            </li>
            <li>All participants must record their screens during gameplay.</li>
            <li>
              Hackers will be disqualified and permanently banned from the
              platform.
            </li>
          </ul>
          {/* Accept Checkbox */}
          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rulesAccepted}
                onChange={(e) => setRulesAccepted(e.target.checked)}
                className="form-checkbox h-5 w-5 text-emerald-600"
              />
              <span className="text-sm">I accept the rules and guidelines</span>
            </label>
          </div>
          {/* Redirect Button */}
          <div className="mt-6">
            <button
              disabled={!rulesAccepted}
              onClick={() => {
                if (selectedEventId && user?.idToken) {
                  router.push(`/register/${selectedEventId}`);
                } else {
                  router.push(`/login`);
                }
              }}
              className={`w-full px-4 py-2 rounded-lg ${
                rulesAccepted
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Proceed to Event
            </button>
          </div>
        </div>
      </Modal>

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
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Slots Left: {event.seatsLeft-event.Participant.length}
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Total Team: {event.Participant.length}
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      onClick={() => handleRegisterClick(event.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-normal ${
                        checkIfAlreadyRegistered(event)
                          ? "text-gray-400 cursor-not-allowed"
                          : event.seatsLeft > 0
                          ? "dark:text-white"
                          : "text-gray-200 cursor-not-allowed"
                      }`}
                      disabled={
                        checkIfAlreadyRegistered(event) || event.seatsLeft <= 0
                      }
                    >
                      {checkIfAlreadyRegistered(event) ? (
                        <p>Already Registered</p>
                      ) : event.seatsLeft > 0 ? (
                        "Register now →"
                      ) : (
                        "Seats Full"
                      )}
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
