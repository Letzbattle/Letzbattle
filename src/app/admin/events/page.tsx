"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function AdminEvents() {
  const [allEvents, setAllEvents] = useState([]);
  const router=useRouter()

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const res = await axios.get(
          'https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/events'
        );
        setAllEvents(res.data.events);
      } catch (err) {
        console.error(err);
      }
    };
    getAllEvents();
  }, []);

  return (
    <div className="p-4">
      <p className="text-lg font-semibold mb-4">Events you created</p>
      {allEvents.length > 0 ? (
        <ul className="space-y-2">
          {allEvents.map((event:any) => (
            <li
              key={event.id}
              className="bg-white shadow rounded p-4 hover:bg-gray-100 transition flex justify-between mx-4"
            >
                <div>
                    {event.name}
                </div>
                <div onClick={()=>router.push(`/admin/events/${event.id}`)}>
                    See details
                </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default AdminEvents;
