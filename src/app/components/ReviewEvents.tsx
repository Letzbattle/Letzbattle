
"use client";
import Particles from "@/components/magicui/particles";
import { useApi } from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ReviewEvents() {
  const [reviewEvents, setReviewEvents] = useState<any[]>([]);
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

        // Filter only events where reviewed is false
        const review = allEvents.filter((event: any) => event.reviewed === false);

        setReviewEvents(review);
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
    <div className="p-6 min-h-screen bg-black dark:bg-gray-900 relative z-10 flex flex-col items-center">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <h1 className="text-4xl text-center mt-24 font-bold text-white dark:text-white mb-8">
        In Review Events
      </h1>
      <div className="w-full max-w-[1200px] flex flex-wrap justify-center gap-8">
        {/* Show loader while data is being fetched */}
        {loader ? (
          Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-200 dark:bg-gray-700 w-[22rem] h-[20rem] rounded-xl p-6 animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                <div className="mt-4 w-2/3 h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                <div className="mt-2 w-1/2 h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
              </div>
            ))
        ) : reviewEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewEvents.map((event: any) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition duration-500 hover:scale-105 w-[22rem]"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {event.name}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-4">
                    Event Date:{" "}
                    <span className="font-medium">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Entry Fees:{" "}
                    <span className="font-medium">INR {event.entryFees}</span>
                  </p>
                </div>
                <div className="p-6 bg-gray-100 dark:bg-gray-700 flex justify-end">
                  <button
                    className="bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-700 dark:to-zinc-800 text-white font-medium py-2 px-6 rounded-lg shadow hover:shadow-lg transition duration-300"
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
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No events in review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewEvents;
