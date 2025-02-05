// "use client";
// import Particles from "@/components/magicui/particles";
// import { useApi } from "@/hooks/useApi";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// function LiveEvents() {
//   const [liveEvents, setLiveEvents] = useState<any[]>([]);
//   const [loader, setLoader] = useState(true); // Start with loader as true
//   const router = useRouter();
//   const { get } = useApi();
//   const session = useSession();

//   useEffect(() => {
//     const getAllEvents = async () => {
//       try {
//         const res = await get(
//           "https://api.nexgenbattles.com/api/events/my-events"
//         );

//         console.log(res);
//         const allEvents = res?.data?.events;
//         const live = allEvents.filter((event: any) => {
//           return event.reviewed === true;
//         });
//         console.log(live);
//         setLiveEvents(live  || []);
//       } catch (err) {
//         console.error("Error fetching events:", err);
//       } finally {
//         setLoader(false); // Turn off loader after the API call completes
//       }
//     };

//     if (session) {
//       getAllEvents();
//     }
//   }, [session, get]);

//   return (
//     <div className="p-6 min-h-screen bg-black dark:bg-gray-900 relative z-10">
//       <Particles
//         className="fixed inset-0 h-full w-full"
//         quantity={500}
//         ease={100}
//         color="#ffffff"
//         refresh
//       />
//       <h1 className="text-2xl text-center mt-24 font-bold text-white dark:text-white mb-6">
//         Your Created Events
//       </h1>
//       <div className="flex flex-wrap justify-evenly w-full">
//         {/* Show loader while data is being fetched */}
//         {loader ? (
//           Array(6)
//             .fill(0)
//             .map((_, idx) => (
//               <div
//                 key={idx}
//                 className="bg-gray-200 dark:bg-gray-700 w-[20rem] h-[18rem] rounded-xl p-6 animate-pulse mx-4 mb-8"
//               >
//                 <div className="w-full h-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
//                 <div className="mt-4 w-2/3 h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
//                 <div className="mt-2 w-1/2 h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
//               </div>
//             ))
//         ) : liveEvents.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {liveEvents.map((event: any) => (
//               <div
//                 key={event.id}
//                 className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
//               >
//                 <div className="p-4">
//                   <div className="flex justify-between">
//                     <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                       {event.name}
//                     </h2>
//                     <button
//                       className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-40 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//                       onClick={() => router.push(`/admin/events/${event.id}`)}
//                     >
//                       Send Email &rarr;
//                     </button>
//                   </div>

//                   <p className="text-gray-600 dark:text-gray-300 mt-2">
//                     Event Date:{" "}
//                     <span className="font-medium">
//                       {new Date(event.date).toLocaleDateString()}
//                     </span>
//                   </p>
//                   <p className="text-gray-600 dark:text-gray-300 mt-2">
//                     Entry Fees:{" "}
//                     <span className="font-medium">${event.entryFees}</span>
//                   </p>
//                 </div>

//                 <div className="p-4 bg-gray-100 dark:bg-gray-700 flex justify-end">
//                   <button
//                     className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//                     onClick={() => router.push(`/admin/events/${event.id}`)}
//                   >
//                     See Details &rarr;
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex justify-center items-center min-h-[200px]">
//             <p className="text-gray-600 dark:text-gray-300 text-lg">
//               No events found.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default LiveEvents;
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
          "https://api.nexgenbattles.com/api/events/my-events"
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
  }, [session]);

  return (
    <div className="p-6 min-h-screen bg-black dark:bg-gray-900 relative z-10">
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <h1 className="text-2xl text-center mt-24 font-bold text-white dark:text-white mb-6">
        Live Events
      </h1>
      <div className="flex flex-wrap justify-evenly w-full">
        {/* Show loader while data is being fetched */}
        {loader ? (
          Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-200 dark:bg-gray-700 w-[20rem] h-[18rem] rounded-xl p-6 animate-pulse mx-4 mb-8"
              >
                <div className="w-full h-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                <div className="mt-4 w-2/3 h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                <div className="mt-2 w-1/2 h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
              </div>
            ))
        ) : liveEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {liveEvents.map((event: any) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
              >
                <div className="p-4">
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {event.name}
                    </h2>
                    <button
                      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-40 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ml-10"
                      onClick={() => router.push(`/admin/events/${event.id}`)}
                    >
                      Send Email &rarr;
                    </button>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mt-2">
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

                <div className="p-4 bg-gray-100 dark:bg-gray-700 flex justify-end">
                  <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
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
              No live events found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveEvents;
