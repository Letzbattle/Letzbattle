"use client";
import React, { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import Particles from "@/components/magicui/particles";

function EventDetails(params: any) {
  const { get } = useApi();
  const session=useSession()
  const [participants, setParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const getParticipants = async () => {
    const res = await get(`/api/events/${params.params.id}/participants`);
    console.log(res?.data);
    setParticipants(res?.data?.participants);
    setFilteredParticipants(res?.data?.participants);
  };
  useEffect(() => {
    getParticipants();
  }, [session]);

  useEffect(() => {
    const filtered = participants?.filter(
      (participant: any) =>
        participant.captainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.teamName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredParticipants(filtered);
  }, [searchQuery, participants]);

  return (
    // <div className="p-6 min-h-screen bg-black dark:bg-gray-900">
    //   <Particles
    //     className="fixed inset-0 h-full w-full"
    //     quantity={500}
    //     ease={100}
    //     color="#ffffff"
    //     refresh
    //   />
    //   <h2 className="text-3xl text-center mt-24 font-bold text-white dark:text-white mb-6">
    //     Event Participants
    //   </h2>

    //   {participants?.length > 0 ? (
    //     <div className="overflow-x-auto">
    //       <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
    //         <thead>
    //           <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
    //             <th className="px-6 py-3 text-left font-semibold">Captain Name</th>
    //             <th className="px-6 py-3 text-left font-semibold">Team Name</th>
    //             <th className="px-6 py-3 text-left font-semibold">Player 1</th>
    //             <th className="px-6 py-3 text-left font-semibold">Player 2</th>
    //             <th className="px-6 py-3 text-left font-semibold">Player 3</th>
    //             <th className="px-6 py-3 text-left font-semibold">Player 4</th>
    //             <th className="px-6 py-3 text-left font-semibold">Player 5</th>
    //             <th className="px-6 py-3 text-left font-semibold">Email</th>
    //             <th className="px-6 py-3 text-left font-semibold">Phone</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {participants.map((participant: any) => (
    //             <tr key={participant.id} className="border-t dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
    //               <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.captainName}</td>
    //               <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.teamName}</td>
    //               <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.player1Name}</td>
    //               <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.player2Name}</td>
    //               <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.player3Name}</td>
    //               <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.player4Name}</td>
    //               <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.player5Name || 'N/A'}</td>
    //               <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.email}</td>
    //               <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.phoneNumber}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   ) : (
    //     <div className="flex justify-center items-center min-h-[200px]">
    //       <p className="text-gray-600 dark:text-gray-300 text-lg">No participants found.</p>
    //     </div>
    //   )}
    // </div>
    <div className="p-4 min-h-screen bg-black dark:bg-gray-900">
     <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh 
      />
      <div className="relative z-10">
      <h2 className="text-3xl text-center mt-24 font-bold text-white dark:text-white mb-6">
        Event Participants
      </h2>

      {/* Total Teams */}
      <div className="mb-4 text-lg text-center font-semibold text-white dark:text-gray-300">
        Total Participating Teams: {filteredParticipants?.length}
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Captain Name or Team Name"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredParticipants?.length > 0 ? (
        <div className="overflow-x-auto">
          {/* Table layout for larger screens */}
          <table className="hidden md:table min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <th className="px-6 py-3 text-left font-semibold">Captain Name</th>
                <th className="px-6 py-3 text-left font-semibold">Team Name</th>
                <th className="px-6 py-3 text-left font-semibold">Player 1</th>
                <th className="px-6 py-3 text-left font-semibold">Player 2</th>
                <th className="px-6 py-3 text-left font-semibold">Player 3</th>
                <th className="px-6 py-3 text-left font-semibold">Player 4</th>
                <th className="px-6 py-3 text-left font-semibold">Player 5</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant: any) => (
                <tr key={participant.id} className="border-t dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.captainName}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.teamName}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.player1Name}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.player2Name}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.player3Name}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.player4Name}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.player5Name || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.email}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{participant.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card layout for smaller screens */}
          <div className="md:hidden space-y-4">
            {filteredParticipants.map((participant: any) => (
              <div
                key={participant.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4"
              >
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">Captain Name:</span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">{participant.captainName}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">Team Name:</span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">{participant.teamName}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">Player 1:</span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">{participant.player1Name}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">Player 2:</span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">{participant.player2Name}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">Player 3:</span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">{participant.player3Name}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">Player 4:</span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">{participant.player4Name}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">Player 5:</span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">{participant.player5Name || "N/A"}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">Email:</span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">{participant.email}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-gray-300">Phone:</span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">{participant.phoneNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-gray-600 dark:text-gray-300 text-lg">No participants found.</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default EventDetails;
