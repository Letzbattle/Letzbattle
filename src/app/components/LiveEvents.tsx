
"use client";
import Particles from "@/components/magicui/particles";
import { useApi } from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function LiveEvents() {
  const [liveEvents, setLiveEvents] = useState<any[]>([]);
  const [loader, setLoader] = useState(true); // Start with loader as true
  const router = useRouter();
  const { get } = useApi();
  const { data: session } = useSession();

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const res = await get(
          "https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/events/my-events"
        );

        const allEvents = res?.data?.events || [];

        // Filter only events where reviewed is true
        const live = allEvents.filter((event: any) => event.reviewed === true);

        setLiveEvents(live);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoader(false); // Turn off loader after the API call completes
      }
    };

    if (session) {
      getAllEvents();
    }
  }, [session, get]);

  return (
    <div className="p-6 min-h-screen bg-black dark:bg-gray-900 relative z-10">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <h1 className="text-4xl text-center mt-24 font-bold text-white dark:text-white mb-10">
        Live Events
      </h1>
      <div className="flex flex-wrap justify-center w-full">
        {/* Show loader while data is being fetched */}
        {loader ? (
          Array(4)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-200 dark:bg-gray-700 w-[22rem] h-[20rem] rounded-xl p-6 animate-pulse mx-6 mb-10"
              >
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                <div className="mt-4 w-3/4 h-6 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                <div className="mt-2 w-1/2 h-6 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
              </div>
            ))
        ) : liveEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {liveEvents.map((event: any) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden transform transition duration-500 hover:scale-105 w-[24rem]"
              >
                <div className="p-6">
                  <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                    {event.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <span className="font-medium">Event Date:</span>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <span className="font-medium">Entry Fees:</span> INR{" "}
                    {event.entryFees}
                  </p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 flex justify-center">
                  <button
                    className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white rounded-lg px-6 py-2 text-lg font-semibold shadow-md hover:shadow-xl hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                    onClick={() => router.push(`/admin/events/${event.id}`)}
                  >
                    See Details &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-gray-400 dark:text-gray-300 text-lg">
              No live events found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveEvents;
