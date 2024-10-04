"use client";
import Particles from "@/components/magicui/particles";
import { useApi } from "@/hooks/useApi";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AdminEvents() {
  const [allEvents, setAllEvents] = useState([]);
  const router = useRouter();
  const {get}=useApi()
  const session=useSession()

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const res = await get("https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/events/my-events");
        setAllEvents(res?.data.events);
      } catch (err) {
        console.error(err);
      }
    };
    getAllEvents();
  }, [session]);

  return (
    <div className="p-6 min-h-screen bg-black dark:bg-gray-900">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <h1 className="text-2xl text-center mt-24 font-bold text-white dark:text-white mb-6">
        Your Created Events
      </h1>

      {allEvents?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allEvents.map((event: any) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {event.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Event Date:{" "}
                  <span className="font-medium">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Entry Fees:{" "}
                  <span className="font-medium">${event.entryFees}</span>
                </p>
              </div>

              <div className="p-4 bg-gray-100 dark:bg-gray-700 flex justify-end">
                <button
                  // variant="primary"
                  className="text-sm font-medium px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                  onClick={() => router.push(`/admin/events/${event.id}`)}
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            No events found.
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminEvents;
