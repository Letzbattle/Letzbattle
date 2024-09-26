"use client";
import React, { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useSession } from "next-auth/react";

function EventDetails(params: any) {
  const { get } = useApi();
  const session=useSession()
  const [participants, setParticipants] = useState([]);
  const getParticipants = async () => {
    const res = await get(`/api/events/${params.params.id}/participants`);
    console.log(res?.data);
    setParticipants(res?.data?.participants)
  };
  useEffect(() => {
    getParticipants();
  }, [session]);
  return (
    <div className="p-4">
    <h2 className="text-2xl font-semibold mb-4">Participants</h2>
    {participants?.length > 0 ? (
      <table className="min-w-full table-auto bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Captain Name</th>
            <th className="px-4 py-2 text-left">Team Name</th>
            <th className="px-4 py-2 text-left">Player 1</th>
            <th className="px-4 py-2 text-left">Player 2</th>
            <th className="px-4 py-2 text-left">Player 3</th>
            <th className="px-4 py-2 text-left">Player 4</th>
            <th className="px-4 py-2 text-left">Player 5</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant: any) => (
            <tr key={participant.id} className="border-t">
              <td className="px-4 py-2">{participant.captainName}</td>
              <td className="px-4 py-2">{participant.teamName}</td>
              <td className="px-4 py-2">{participant.player1Name}</td>
              <td className="px-4 py-2">{participant.player2Name}</td>
              <td className="px-4 py-2">{participant.player3Name}</td>
              <td className="px-4 py-2">{participant.player4Name}</td>
              <td className="px-4 py-2">{participant.player5Name || 'N/A'}</td>
              <td className="px-4 py-2">{participant.email}</td>
              <td className="px-4 py-2">{participant.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No participants found.</p>
    )}
  </div>
  );
}

export default EventDetails;
