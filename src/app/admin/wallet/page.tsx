"use client";
import { useApi } from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Wallet() {
  const [allEvents, setAllEvents] = useState([]);
  const router = useRouter();
  const { get } = useApi();
  const session = useSession();

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const res = await get("api/events/my-events");
        setAllEvents(res?.data.events);
      } catch (err) {
        console.error(err);
      }
    };
    getAllEvents();
  }, [session]);

  return (
    <div className="container mx-auto p-6 my-5">
      <h1 className="text-2xl font-semibold mb-6">My Wallet</h1>
      <ul className="space-y-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
          <h2 className="text-xl font-medium">Event Name</h2>
          <h2 className="text-xl font-medium">Balance</h2>
          <h2 className="text-xl font-medium">Redeemed Date</h2>
        </div>
        {allEvents?.map((event: any) => (
          <li
            key={event.id}
            className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg"
          >
            <div className="text-lg font-medium w-1/12">{event.name}</div>
            <div className="text-lg font-semibold text-blue-600">
              Rs.{event.entryFees * event.Participant?.length}
            </div>
            <div className="text-sm text-gray-500">
              {/* Add flag logic here if current date is greater than or equal to the event.date then redemed or add a field in the db to track if it is redeemed */}
              Will be redeemed three days after {event.date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wallet;
