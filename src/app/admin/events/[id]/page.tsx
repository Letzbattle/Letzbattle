"use client";
import React, { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import Particles from "@/components/magicui/particles";
import Modal from "@/app/components/Modal";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import BottomGradient from "@/components/ui/BottomGradient";
import { toast } from "react-toastify";

function EventDetails({ params }: any) {
  const { get } = useApi();
  const session = useSession();
  const [participants, setParticipants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [failedEmails, setFailedEmails] = useState<string[]>([]);
  const [eventDetails, setEventDetails] = useState<any>();
  const [filteredParticipants, setFilteredParticipants] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFailedModalOpen, setFailedModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailState, setEmailState] = useState({ subject: "", value: "" });
  const [dataLoader, setDataLoader] = useState(true);

  const [visibleEmails, setVisibleEmails] = useState<number[]>([]);

  const toggleEmailVisibility = (id: number) => {
    setVisibleEmails((prev) =>
      prev.includes(id)
        ? prev.filter((emailId) => emailId !== id)
        : [...prev, id]
    );
  };

  const getParticipants = async () => {
    const res = await get(`/api/events/${params.id}/participants`);
    setParticipants(res?.data?.participants);
    setFilteredParticipants(res?.data?.participants);
    setDataLoader(false);
  };

  const getEventDetails = async () => {
    const res = await axios.get(
      `https://api.nexgenbattles.com/api/events/${params.id}`
    );
    setEventDetails(res?.data);
  };

  useEffect(() => {
    if (session?.data) {
      getParticipants();
      getEventDetails();
    }
  }, [session]);

  // const sendEmail = async () => {
  //     setLoading(true); // Start loading
  //     try {
  //       await Promise.all(
  //         participants.map(async (participant: { email: string }) => {
  //           const res = await axios.post('https://api.nexgenbattles.com/api/events/send-email', {
  //             to: participant.email,
  //             subject: emailState.subject,
  //             text: emailState.value
  //           });
  //         })
  //       );
  //       alert("Emails sent successfully!");
  //     } catch (error) {
  //       console.error("Error sending emails", error);
  //       alert("Failed to send emails.");
  //     } finally {
  //       setLoading(false);
  //       setModalOpen(false);
  //       setEmailState({
  //         subject:'',
  //         value:''
  //       })
  //     }
  //   };

  const sendEmail = async () => {
    setLoading(true); // Start loading

    try {
      const res = await axios.post(
        "/api/dispatchMail",
        {
          emails: participants.map((participant) => participant.email),
          subject: emailState.subject,
          message: emailState.value,
        }
      );
      if(res.data.failedEmails.length==0){
        toast.success('All Emails are sent')
      }else{
        toast.error(`${res.data.failedEmails.length} emails are not sent`)
      }

      setFailedEmails(res.data.failedEmails);
    } catch (error) {
      toast.error("An unexpected error occurred while sending emails.");
    } finally {
      setLoading(false);
      setModalOpen(false);
      setFailedModalOpen(true);
      setEmailState({ subject: "", value: "" });
    }
  };

  useEffect(() => {
    const filtered = participants?.filter(
      (participant: any) =>
        participant.captainName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        participant.teamName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredParticipants(filtered);
  }, [searchQuery, participants]);

  return (
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
          {new Date(eventDetails?.event?.date).setHours(0, 0, 0, 0) >=
            new Date().setHours(0, 0, 0, 0) &&
            participants?.length > 0 && (
              <button
                className="rounded-full border border-neutral-200 px-4 py-2 text-sm md:text-base font-medium text-white dark:border-white/[0.2] dark:text-white mx-4"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Send Email
              </button>
            )}
        </h2>

        <Modal
          isOpen={isFailedModalOpen}
          onClose={() => setFailedModalOpen(false)}
        >
          {failedEmails.length > 0 ? (
            <div className="mt-4 text-red-500">
              <h3 className="text-lg font-semibold">Failed to send to:</h3>
              <ul>
                {failedEmails.map((email, index) => (
                  <li key={index}>{email}</li>
                ))}
              </ul>
            </div>
          ):"All Emails are sent successfully"}
        </Modal>

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          {loading ? (
            <div className="flex items-center justify-center h-20">
              <p className="text-black">
                Sending emails, please wait... can take upto 3 mins
              </p>
             
              <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-t-transparent border-black ml-2"></div>
            </div>
          ) : (
            <>
              <LabelInputContainer>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  type="text"
                  value={emailState.subject}
                  onChange={(e) =>
                    setEmailState({ ...emailState, subject: e.target.value })
                  }
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  name="message"
                  placeholder="Message"
                  type="text"
                  value={emailState.value}
                  onChange={(e) =>
                    setEmailState({ ...emailState, value: e.target.value })
                  }
                />
              </LabelInputContainer>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] my-2"
                onClick={sendEmail}
              >
                Send &rarr;
                <BottomGradient />
              </button>
            </>
          )}
        </Modal>

        {/* Total Teams */}
        <div className="mb-4 text-lg text-center font-semibold text-white dark:text-white">
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
        {dataLoader ? (
          <div className="space-y-4">
            {Array.from({
              length: Math.max(5, filteredParticipants.length || 5),
            }).map((_, index) => (
              <div
                key={index}
                className="h-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        ) : filteredParticipants?.length > 0 ? (
          <div className="overflow-x-auto">
            {/* Table layout for larger screens */}
            <table className="hidden md:table min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="px-6 py-3 text-left font-semibold">
                    Captain Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Team Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Player 1
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Player 2
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Player 3
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Player 4
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Player 5
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">Email</th>
                  <th className="px-6 py-3 text-left font-semibold">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant: any) => (
                  <tr
                    key={participant.id}
                    className="border-t dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {participant.captainName}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {participant.teamName}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {participant.player1Name}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {participant.player2Name}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {participant.player3Name}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {participant.player4Name}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {participant.player5Name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {/* {participant.email} */}
                      <span
                        className="cursor-pointer underline text-blue-600 dark:text-blue-400"
                        onClick={() => toggleEmailVisibility(participant.id)}
                      >
                        {visibleEmails.includes(participant.id)
                          ? participant.email
                          : `${participant.email.slice(0, 10)}...`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                      {participant.phoneNumber}
                    </td>
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
                    <span className="font-semibold text-gray-800 dark:text-gray-300">
                      Captain Name:
                    </span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {participant.captainName}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-300">
                      Team Name:
                    </span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {participant.teamName}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-300">
                      Player 1:
                    </span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {participant.player1Name}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-300">
                      Player 2:
                    </span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {participant.player2Name}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-300">
                      Player 3:
                    </span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {participant.player3Name}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-300">
                      Player 4:
                    </span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {participant.player4Name}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-300">
                      Player 5:
                    </span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {participant.player5Name || "N/A"}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-300">
                      Email:
                    </span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {participant.email}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-300">
                      Phone:
                    </span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {participant.phoneNumber}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-white dark:text-white text-lg">
              No participants found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetails;
